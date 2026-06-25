import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { sendNotification } from '@/lib/notifications'
import type { Database } from '@/lib/supabase/types'

type DistrictRow = Database['public']['Tables']['districts']['Row']

const CreateReportSchema = z.object({
  district_id: z.number(),
  crop_id: z.number(),
  detected_pest_id: z.number().nullable(),
  ai_pest_name: z.string().max(200).optional().nullable(),
  severity_level: z.enum(['low', 'moderate', 'high', 'critical']),
  image_storage_path: z.string(),
  confidence_score: z.number().optional().nullable(),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
})

const BASE_FIELDS = `
  id, user_id, crop_id, district_id, detected_pest_id,
  image_storage_path, severity_level, status, confidence_score,
  latitude, longitude, diagnosis_translations,
  countermeasure_translations, prevention_translations, created_at,
  crops!inner(key_name),
  districts!inner(name_en, state_en),
  pests!left(key_name)
`


function toDisplayName(key: string | null | undefined): string | null {
  if (!key) return null
  return key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const page = Math.max(1, Math.min(100, parseInt(searchParams.get('page') || '1')))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))

  let query = supabase.from('pest_reports').select(BASE_FIELDS, { count: 'exact' })

  const districtRaw = searchParams.get('district')
  const districtId = districtRaw ? parseInt(districtRaw) : null
  if (districtId && !isNaN(districtId) && districtId > 0 && districtId <= 999) {
    query = query.eq('district_id', districtId)
  }

  const VALID_SEVERITIES = ['low', 'moderate', 'high', 'critical']
  const severity = searchParams.get('severity')
  if (severity && VALID_SEVERITIES.includes(severity)) query = query.eq('severity_level', severity)

  const VALID_STATUSES = ['pending', 'verified']
  const status = searchParams.get('status')
  if (status && VALID_STATUSES.includes(status)) query = query.eq('status', status)

  const mineUserId = searchParams.get('user_id')
  if (mineUserId) query = query.eq('user_id', mineUserId)

  const searchRaw = searchParams.get('search')
  const search = searchRaw ? searchRaw.slice(0, 100) : null
  if (search) {
    const term = `%${search}%`
    const [distResult, cropResult, pestResult] = await Promise.all([
      supabase.from('districts').select('id').ilike('name_en', term),
      supabase.from('crops').select('id').ilike('key_name', term),
      supabase.from('pests').select('id').ilike('key_name', term),
    ])
    const districtIds = (distResult.data || []).map((d: { id: number }) => d.id)
    const cropIds = (cropResult.data || []).map((c: { id: number }) => c.id)
    const pestIds = (pestResult.data || []).map((p: { id: number }) => p.id)
    const filters: string[] = []
    if (districtIds.length) filters.push(`district_id.in.(${districtIds.join(',')})`)
    if (cropIds.length) filters.push(`crop_id.in.(${cropIds.join(',')})`)
    if (pestIds.length) filters.push(`detected_pest_id.in.(${pestIds.join(',')})`)
    if (filters.length) {
      query = query.or(filters.join(','))
    } else {
      query = query.eq('id', '-1')
    }
  }

  const days = searchParams.get('days')
  if (days) {
    const since = new Date()
    since.setDate(since.getDate() - parseInt(days))
    query = query.gte('created_at', since.toISOString())
  }

  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, count, error } = await query
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Reports GET Error:', error.message)
    return NextResponse.json({ error: 'Failed to fetch reports.' }, { status: 500 })
  }

  const mapped = (data || []).map((r: Record<string, unknown>) => {
    const crop = r.crops as Record<string, string> | undefined
    const district = r.districts as Record<string, string> | undefined
    const pest = r.pests as Record<string, string> | null | undefined
    const translations = r.diagnosis_translations as Record<string, string> | null
    const rawAiName = translations?.en || null
    const aiPestName = rawAiName ? toDisplayName(rawAiName.replace(/\s+/g, '_')) : null
    const dbPestName = pest?.key_name ? toDisplayName(pest.key_name) : null
    return {
      ...r,
      reported_at: r.created_at,
      crop_name: toDisplayName(crop?.key_name || null),
      district_name: district?.name_en || null,
      district_state: district?.state_en || null,
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

    // Upload image to Supabase Storage if it's a data URI
    let imagePath = validation.data.image_storage_path
    if (imagePath.startsWith('data:')) {
      try {
        const serviceClient = createServiceClient()
        const bucketName = 'report-images'
        const matches = imagePath.match(/^data:image\/(\w+);base64,(.+)$/)
        if (matches) {
          const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1]
          const buffer = Buffer.from(matches[2], 'base64')
          const fileName = `${userId || 'anon'}/${crypto.randomUUID()}.${ext}`

          const { error: bucketError } = await serviceClient.storage.createBucket(bucketName, { public: true })
          if (bucketError && !bucketError.message.includes('already exists')) {
            console.warn('Bucket creation failed:', bucketError.message)
          }

          const { error: uploadError } = await serviceClient.storage
            .from(bucketName)
            .upload(fileName, buffer, { contentType: `image/${ext}`, upsert: false })

          if (!uploadError) {
            const { data: { publicUrl } } = serviceClient.storage.from(bucketName).getPublicUrl(fileName)
            imagePath = publicUrl
          } else {
            console.error('Storage upload failed:', uploadError.message)
            return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 })
          }
        }
      } catch (storageErr) {
        console.error('Storage upload error:', storageErr)
        return NextResponse.json({ error: 'Failed to upload image.' }, { status: 500 })
      }
    }

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
        image_storage_path: imagePath,
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

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Report ID is required.' }, { status: 400 })
    }

    const idResult = z.string().uuid().safeParse(id)
    if (!idResult.success) {
      return NextResponse.json({ error: 'Invalid report ID.' }, { status: 400 })
    }

    const { data: report, error: fetchError } = await supabase
      .from('pest_reports')
      .select('user_id, image_storage_path')
      .eq('id', id)
      .maybeSingle()
      .returns<{ user_id: string | null; image_storage_path: string | null }>()

    if (fetchError) {
      console.error('Reports DELETE fetch error:', fetchError.message)
      return NextResponse.json({ error: 'Failed to find report.' }, { status: 500 })
    }
    if (!report) {
      return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
    }
    if (report.user_id !== user.id) {
      return NextResponse.json({ error: 'You can only delete your own reports.' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('pest_reports')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Reports DELETE error:', deleteError.message)
      return NextResponse.json({ error: 'Failed to delete report.' }, { status: 500 })
    }

    // Clean up storage image if it's a Supabase URL
    if (report.image_storage_path && report.image_storage_path.includes('supabase.co')) {
      try {
        const serviceClient = createServiceClient()
        const bucketName = 'report-images'
        const url = new URL(report.image_storage_path)
        const pathParts = url.pathname.split('/')
        const storagePath = decodeURIComponent(pathParts.slice(pathParts.indexOf(bucketName) + 1).join('/'))
        if (storagePath) {
          await serviceClient.storage.from(bucketName).remove([storagePath])
        }
      } catch (storageErr) {
        console.warn('Storage cleanup failed (non-fatal):', storageErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Reports DELETE API Error:', error)
    return NextResponse.json({ error: 'Failed to delete report.' }, { status: 500 })
  }
}