import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)
  const daysParam = searchParams.get('days')
  const days = Math.min(365, Math.max(1, daysParam ? parseInt(daysParam) : 7))

  const since = new Date()
  since.setDate(since.getDate() - days)

  const { data: rawReports, error } = await supabase
    .from('pest_reports')
    .select('district_id, severity_level, created_at')
    .gte('created_at', since.toISOString())

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const reports = (rawReports || []) as { district_id: number | null; severity_level: string }[]

  const districtMap = new Map<number, { totalReports: number; weightedScore: number }>()

  for (let i = 0; i < RAIN_SHADOW_DISTRICTS.length; i++) {
    districtMap.set(i + 1, { totalReports: 0, weightedScore: 0 })
  }

  for (const r of reports) {
    if (!r.district_id) continue
    const entry = districtMap.get(r.district_id)
    if (!entry) continue

    entry.totalReports++
    const severityWeight: Record<string, number> = { low: 0.25, moderate: 0.5, high: 0.75, critical: 1.0 }
    entry.weightedScore += severityWeight[r.severity_level] || 0
  }

  const heatData = RAIN_SHADOW_DISTRICTS.map((d, i) => {
    const stats = districtMap.get(i + 1) || { totalReports: 0, weightedScore: 0 }
    const maxPossibleWeight = stats.totalReports * 1.0
    const intensityScore = maxPossibleWeight > 0
      ? Math.round((stats.weightedScore / maxPossibleWeight) * 100)
      : 0

    return {
      districtId: i + 1,
      name: d.name_en,
      lat: d.latitude,
      lng: d.longitude,
      intensityScore,
      reportCount: stats.totalReports,
    }
  }).filter(d => d.reportCount > 0)

  return NextResponse.json({ data: heatData })
}
