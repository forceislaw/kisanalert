import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { generateFakeReports } from '@/lib/seed/generateReports'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
import { z } from 'zod'

const CreateReportSchema = z.object({
  district_id: z.number(),
  crop_id: z.number(),
  detected_pest_id: z.number(),
  severity_level: z.enum(['low', 'moderate', 'high', 'critical']),
  image_storage_path: z.string(),
  confidence_score: z.number().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
})

export async function GET(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(req.url)

    let query = supabase.from('pest_reports').select('*')

    const district = searchParams.get('district')
    if (district) query = query.eq('district_id', parseInt(district))

    const severity = searchParams.get('severity')
    if (severity) query = query.eq('severity_level', severity)

    const status = searchParams.get('status')
    if (status) query = query.eq('status', status)

    const mine = searchParams.get('mine')
    if (mine === 'true') {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) query = query.eq('user_id', user.id)
    }

    const days = searchParams.get('days')
    if (days) {
      const since = new Date()
      since.setDate(since.getDate() - parseInt(days))
      query = query.gte('created_at', since.toISOString())
    }

    query = query.order('created_at', { ascending: false })

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    const mapped = (data || []).map((r: Record<string, unknown>) => ({
      ...r,
      reported_at: r.created_at,
    }))

    return NextResponse.json({ data: mapped })
  } catch {
    let fakeData = generateFakeReports(RAIN_SHADOW_DISTRICTS.length, 80)

    const { searchParams } = new URL(req.url)
    const district = searchParams.get('district')
    const severity = searchParams.get('severity')
    const status = searchParams.get('status')
    const mine = searchParams.get('mine')
    const days = searchParams.get('days')

    if (district) fakeData = fakeData.filter(r => r.district_id === parseInt(district))
    if (severity) fakeData = fakeData.filter(r => r.severity_level === severity)
    if (status) fakeData = fakeData.filter(r => r.status === status)
    if (mine === 'true') fakeData = []
    if (days) {
      const since = new Date()
      since.setDate(since.getDate() - parseInt(days))
      fakeData = fakeData.filter(r => new Date(r.reported_at) >= since)
    }

    fakeData.sort((a, b) => new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime())

    return NextResponse.json({ data: fakeData })
  }
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

    const { data, error } = await supabase
      .from('pest_reports')
      .insert([{ ...validation.data, status, user_id: userId }] as never[])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error: unknown) {
    console.error('Reports Create API Error:', error)
    return NextResponse.json({ error: 'Failed to create report.' }, { status: 500 })
  }
}
