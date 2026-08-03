import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

type ReportRow = {
  id: string
  severity_level: 'low' | 'moderate' | 'high' | 'critical'
  district_id: number | null
  crop_id: number | null
  detected_pest_id: number | null
  created_at: string | null
}

type DistrictRow = {
  id: number
  name_en: string
  state_en: string
}

const staticCache = new Map<string, { data: number; ts: number }>()
const STATIC_CACHE_TTL = 3_600_000

async function getCachedCount(table: string): Promise<number> {
  const cached = staticCache.get(table)
  if (cached && Date.now() - cached.ts < STATIC_CACHE_TTL) return cached.data
  const supabase = await createServerSupabaseClient()
  const { count } = await supabase.from(table as never).select('*', { count: 'exact', head: true })
  const val = count || 0
  staticCache.set(table, { data: val, ts: Date.now() })
  return val
}

function computeMetrics(reports: ReportRow[]) {
  const total = reports.length
  const alerts = reports.filter(r => r.severity_level === 'high' || r.severity_level === 'critical').length
  const weights: Record<string, number> = { low: 0.25, moderate: 0.5, high: 0.75, critical: 1.0 }
  const max = total * 1.0
  const sum = reports.reduce((s, r) => s + (weights[r.severity_level] || 0), 0)
  return { totalReports: total, activeAlerts: alerts, overallRisk: max > 0 ? Math.round((sum / max) * 100) : 0 }
}

function calcChange(current: number, previous: number): number | null {
  if (previous === 0) return current > 0 ? 100 : null
  return Math.round(((current - previous) / previous) * 100)
}

function getTrendBuckets(reports: ReportRow[], bucketCount: number) {
  const buckets: { date: string; isoDate: string; reports: number; critical: number }[] = []
  for (let i = bucketCount - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dayReports = reports.filter(r => (r.created_at?.split('T')[0]) === dateStr)
    const label = bucketCount > 14
      ? d.toLocaleDateString('en', { month: 'short', day: 'numeric' })
      : d.toLocaleDateString('en', { weekday: 'short' })
    buckets.push({
      date: label,
      isoDate: dateStr,
      reports: dayReports.length,
      critical: dayReports.filter(r => r.severity_level === 'critical').length,
    })
  }
  return buckets
}

export async function GET(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { searchParams } = new URL(req.url)

  const daysRaw = searchParams.get('days')
  const days = daysRaw ? Math.min(365, Math.max(1, parseInt(daysRaw))) : null

  const trendBuckets = days || 30

  let queryStart: string | null = null

  if (days) {
    const now = Date.now()
    const DAY_MS = 86_400_000
    queryStart = new Date(now - 2 * days * DAY_MS).toISOString()
  }

  let query = supabase
    .from('pest_reports')
    .select('id, severity_level, district_id, crop_id, detected_pest_id, created_at')

  if (queryStart) {
    query = query.gte('created_at', queryStart)
  }

  const { data: allReports, error: reportsError } = await query
    .order('created_at', { ascending: false })
    .limit(10000)
    .returns<ReportRow[]>()

  if (reportsError) {
    console.error('Dashboard GET Error:', reportsError.message)
    return NextResponse.json({ error: 'Failed to load dashboard.' }, { status: 500 })
  }

  let currentReports = allReports || []
  let previousReports: ReportRow[] = []

  if (days && queryStart) {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    const cutoffStr = cutoff.toISOString()
    currentReports = (allReports || []).filter(r => r.created_at! >= cutoffStr)
    previousReports = (allReports || []).filter(r => r.created_at! < cutoffStr && r.created_at! >= queryStart)
  }

  const metrics = computeMetrics(currentReports)
  const prevMetrics = days ? computeMetrics(previousReports) : null

  const { data: districtData } = await supabase
    .from('districts')
    .select('id, name_en, state_en')
    .returns<DistrictRow[]>()

  const districtMap = new Map<number, { name: string; state: string }>((districtData || []).map(d => [d.id, { name: d.name_en, state: d.state_en }]))

  const districtRisk: { id: number; name: string; state: string; riskScore: number; activeReports: number }[] = []
  for (const [id, info] of districtMap) {
    const reports = currentReports.filter(r => r.district_id === id)
    const weights: Record<string, number> = { low: 0.25, moderate: 0.5, high: 0.75, critical: 1.0 }
    const dWeight = reports.reduce((s, r) => s + (weights[r.severity_level] || 0), 0)
    const dMax = reports.length * 1.0
    districtRisk.push({
      id,
      name: info.name,
      state: info.state,
      riskScore: dMax > 0 ? Math.round((dWeight / dMax) * 100) : 0,
      activeReports: reports.length,
    })
  }

  districtRisk.sort((a, b) => b.riskScore - a.riskScore)

  const trendData = getTrendBuckets(currentReports, trendBuckets)

  const [totalCrops, totalRegions] = await Promise.all([
    getCachedCount('crops'),
    getCachedCount('districts'),
  ])

  return NextResponse.json({
    data: {
      totalCrops,
      activeAlerts: metrics.activeAlerts,
      totalRegions,
      overallRisk: metrics.overallRisk,
      totalReports: metrics.totalReports,
      changes: prevMetrics ? {
        activeAlerts: calcChange(metrics.activeAlerts, prevMetrics.activeAlerts),
        totalReports: calcChange(metrics.totalReports, prevMetrics.totalReports),
        overallRisk: calcChange(metrics.overallRisk, prevMetrics.overallRisk),
      } : null,
      topDistricts: districtRisk.slice(0, 5),
      trendData,
    }
  })
}
