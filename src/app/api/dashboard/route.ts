import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

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

export async function GET() {
  const supabase = createServiceClient()

  const { data: reports, error: reportsError } = await supabase
    .from('pest_reports')
    .select('id, severity_level, district_id, crop_id, detected_pest_id, created_at')
    .returns<ReportRow[]>()

  if (reportsError) throw new Error(reportsError.message)

  const { count: totalCrops } = await supabase.from('crops').select('*', { count: 'exact', head: true })
  const { count: totalRegions } = await supabase.from('districts').select('*', { count: 'exact', head: true })

  const totalReports = reports?.length || 0
  const activeAlerts = (reports || []).filter(r =>
    r.severity_level === 'high' || r.severity_level === 'critical'
  ).length

  const severityWeights: Record<string, number> = { low: 0.25, moderate: 0.5, high: 0.75, critical: 1.0 }
  const maxPossibleRisk = totalReports * 1.0
  const weightedSum = (reports || []).reduce((sum, r) => sum + (severityWeights[r.severity_level] || 0), 0)
  const overallRisk = maxPossibleRisk > 0 ? Math.round((weightedSum / maxPossibleRisk) * 100) : 0

  const { data: districtData } = await supabase
    .from('districts')
    .select('id, name_en, state_en')
    .returns<DistrictRow[]>()

  const districtMap = new Map<number, { name: string; state: string }>((districtData || []).map(d => [d.id, { name: d.name_en, state: d.state_en }]))

  const districtRisk: { id: number; name: string; state: string; riskScore: number; activeReports: number }[] = []
  for (const [id, info] of districtMap) {
    const districtReports = (reports || []).filter(r => r.district_id === id)
    const dWeightedSum = districtReports.reduce((sum, r) => sum + (severityWeights[r.severity_level] || 0), 0)
    const dMaxRisk = districtReports.length * 1.0
    districtRisk.push({
      id,
      name: info.name,
      state: info.state,
      riskScore: dMaxRisk > 0 ? Math.round((dWeightedSum / dMaxRisk) * 100) : 0,
      activeReports: districtReports.length,
    })
  }

  districtRisk.sort((a, b) => b.riskScore - a.riskScore)

  const last7Days: { date: string; reports: number; critical: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const dayReports = (reports || []).filter(r => {
      const rDate = r.created_at?.split('T')[0]
      return rDate === dateStr
    })
    last7Days.push({
      date: d.toLocaleDateString('en', { weekday: 'short' }),
      reports: dayReports.length,
      critical: dayReports.filter(r => r.severity_level === 'critical').length,
    })
  }

  return NextResponse.json({
    data: {
      totalCrops: totalCrops || 0,
      activeAlerts,
      totalRegions: totalRegions || 0,
      overallRisk,
      totalReports,
      topDistricts: districtRisk.slice(0, 5),
      trendData: last7Days,
    }
  })
}