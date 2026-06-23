import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient, createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { sendNotification } from '@/lib/notifications'
import type { Database } from '@/lib/supabase/types'

type DistrictRow = Database['public']['Tables']['districts']['Row']

const CreateReportSchema = z.object({
  district_id: z.number(),
  crop_id: z.number(),
  detected_pest_id: z.number().nullable(),
  ai_pest_name: z.string().optional().nullable(),
  severity_level: z.enum(['low', 'moderate', 'high', 'critical']),
  image_storage_path: z.string(),
  confidence_score: z.number().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
})

const BASE_FIELDS = `
  id, user_id, crop_id, district_id, detected_pest_id,
  image_storage_path, severity_level, status, confidence_score,
  latitude, longitude, diagnosis_translations,
  countermeasure_translations, prevention_translations, created_at
`

function toDisplayName(key: string | null | undefined): string | null {
  if (!key) return null
  return key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)

  // Fetch lookup maps once
  const [{ data: crops }, { data: districts }, { data: pests }] = await Promise.all([
    supabase.from('crops').select('id, key_name').returns<{ id: number; key_name: string }[]>(),
    supabase.from('districts').select('id, name_en').returns<{ id: number; name_en: string }[]>(),
    supabase.from('pests').select('id, key_name').returns<{ id: number; key_name: string }[]>(),
  ])

  const cropMap = new Map((crops || []).map(c => [c.id, c.key_name]))
  const districtMap = new Map((districts || []).map(d => [d.id, d.name_en]))
  const pestMap = new Map((pests || []).map(p => [p.id, p.key_name]))

  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))

  let countQuery = supabase.from('pest_reports').select('*', { count: 'exact', head: true })
  let dataQuery = supabase.from('pest_reports').select(BASE_FIELDS)

  const district = searchParams.get('district')
  if (district) { countQuery = countQuery.eq('district_id', parseInt(district)); dataQuery = dataQuery.eq('district_id', parseInt(district)) }

  const severity = searchParams.get('severity')
  if (severity) { countQuery = countQuery.eq('severity_level', severity); dataQuery = dataQuery.eq('severity_level', severity) }

  const status = searchParams.get('status')
  if (status) { countQuery = countQuery.eq('status', status); dataQuery = dataQuery.eq('status', status) }

  const mine = searchParams.get('mine')
  if (mine === 'true') {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) { countQuery = countQuery.eq('user_id', user.id); dataQuery = dataQuery.eq('user_id', user.id) }
  }

  const days = searchParams.get('days')
  if (days) {
    const since = new Date()
    since.setDate(since.getDate() - parseInt(days))
    const iso = since.toISOString()
    countQuery = countQuery.gte('created_at', iso)
    dataQuery = dataQuery.gte('created_at', iso)
  }

  const { count, error: countError } = await countQuery
  if (countError) throw new Error(countError.message)

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await dataQuery.order('created_at', { ascending: false }).range(from, to)

  if (error) throw new Error(error.message)

  const mapped = (data || []).map((r: Record<string, unknown>) => {
    const translations = r.diagnosis_translations as Record<string, string> | null
    const rawAiName = translations?.en || null
    const aiPestName = rawAiName ? toDisplayName(rawAiName.replace(/\s+/g, '_')) : null
    const dbPestName = r.detected_pest_id ? (toDisplayName(pestMap.get(r.detected_pest_id as number)) || null) : null
    return {
      ...r,
      reported_at: r.created_at,
      crop_name: toDisplayName(cropMap.get(r.crop_id as number)),
      district_name: districtMap.get(r.district_id as number) || null,
      pest_name: dbPestName || aiPestName || 'No Pest',
    }
  })

  return NextResponse.json({ data: mapped, total: count || 0, page, limit })
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const body = await req.json()

    const validation = CreateReportSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid report data.', details: validation.error.issues }, { status: 400 })
    }

    const { data: { user } } = await supabase.auth.getUser()
    const userId = user?.id || null

    const confidence = validation.data.confidence_score ?? 0
    const status = confidence >= 0.8 ? 'verified' : 'pending'

    const diagnosis_translations: Record<string, string> = {}
    if (validation.data.ai_pest_name) {
      diagnosis_translations.en = validation.data.ai_pest_name
    }

    const { data, error } = await supabase
      .from('pest_reports')
      .insert([{
        district_id: validation.data.district_id,
        crop_id: validation.data.crop_id,
        detected_pest_id: validation.data.detected_pest_id,
        severity_level: validation.data.severity_level,
        image_storage_path: validation.data.image_storage_path,
        confidence_score: validation.data.confidence_score ?? null,
        latitude: validation.data.latitude ?? null,
        longitude: validation.data.longitude ?? null,
        status,
        user_id: userId,
        diagnosis_translations: Object.keys(diagnosis_translations).length > 0 ? diagnosis_translations : null,
      }] as never[])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (userId) {
      const { data: prefData } = await supabase
        .from('user_notification_prefs')
        .select('email_alerts, sms_alerts, critical_only')
        .eq('user_id', userId)
        .maybeSingle()

      const prefs = prefData as { email_alerts: boolean; sms_alerts: boolean; critical_only: boolean } | null

      if (prefs?.email_alerts && user?.email) {
        const severity = validation.data.severity_level
        const isCritical = severity === 'high' || severity === 'critical'
        if (!prefs.critical_only || isCritical) {
          const { data: districtData } = await supabase
            .from('districts')
            .select('name_en')
            .eq('id', validation.data.district_id)
            .maybeSingle()

          sendNotification({
            to: user.email,
            subject: `KisanAlert: ${severity} severity pest report in ${(districtData as DistrictRow | null)?.name_en || 'unknown'} district`,
            text: `A new pest report has been recorded.\nSeverity: ${severity}\nStatus: ${status}\nConfidence: ${(confidence * 100).toFixed(0)}%`,
          })
        }
      }
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: unknown) {
    console.error('Reports Create API Error:', error)
    return NextResponse.json({ error: 'Failed to create report.' }, { status: 500 })
  }
}