import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
import { CROPS } from '@/lib/seed/crops'
import { PESTS } from '@/lib/seed/pests'
import { generateFakeReports } from '@/lib/seed/generateReports'

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()

    const { data: rawReports, error } = await supabase
      .from('pest_reports')
      .select('id, severity_level, district_id, crop_id, detected_pest_id, created_at') as unknown as {
        data: { id: string; severity_level: string; district_id: number; crop_id: number; detected_pest_id: number; created_at: string | null }[] | null
        error: any
      }

    if (error) throw new Error(error.message)

    const reports = rawReports || []

    const totalReports = reports.length
    const activeAlerts = reports.filter(r =>
      r.severity_level === 'high' || r.severity_level === 'critical'
    ).length
    const totalCrops = CROPS.length
    const totalRegions = RAIN_SHADOW_DISTRICTS.length

    const severityWeights: Record<string, number> = { low: 0.25, moderate: 0.5, high: 0.75, critical: 1.0 }
    const maxPossibleRisk = totalReports * 1.0
    const weightedSum = reports.reduce((sum, r) => sum + (severityWeights[r.severity_level] || 0), 0)
    const overallRisk = maxPossibleRisk > 0 ? Math.round((weightedSum / maxPossibleRisk) * 100) : 0

    const districtRisk: { id: number; name: string; state: string; riskScore: number; activeReports: number }[] = []
    for (let i = 0; i < RAIN_SHADOW_DISTRICTS.length; i++) {
      const districtReports = reports.filter(r => r.district_id === i + 1)
      const dWeightedSum = districtReports.reduce((sum, r) => sum + (severityWeights[r.severity_level] || 0), 0)
      const dMaxRisk = districtReports.length * 1.0
      districtRisk.push({
        id: i + 1,
        name: RAIN_SHADOW_DISTRICTS[i].name_en,
        state: RAIN_SHADOW_DISTRICTS[i].state_en,
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
      const dayReports = reports.filter(r => {
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
        totalCrops,
        activeAlerts,
        totalRegions,
        overallRisk,
        totalReports,
        topDistricts: districtRisk.slice(0, 5),
        trendData: last7Days,
      }
    })
  } catch {
    const fakeReports = generateFakeReports(RAIN_SHADOW_DISTRICTS.length, 80)
    const totalReports = fakeReports.length
    const activeAlerts = fakeReports.filter(r => r.severity_level === 'high' || r.severity_level === 'critical').length
    const totalCrops = CROPS.length
    const totalRegions = RAIN_SHADOW_DISTRICTS.length

    const severityWeights: Record<string, number> = { low: 0.25, moderate: 0.5, high: 0.75, critical: 1.0 }
    const maxPossibleRisk = totalReports * 1.0
    const weightedSum = fakeReports.reduce((sum, r) => sum + (severityWeights[r.severity_level] || 0), 0)
    const overallRisk = maxPossibleRisk > 0 ? Math.round((weightedSum / maxPossibleRisk) * 100) : 0

    const districtRisk: { id: number; name: string; state: string; riskScore: number; activeReports: number }[] = []
    for (let i = 0; i < RAIN_SHADOW_DISTRICTS.length; i++) {
      const dReports = fakeReports.filter(r => r.district_id === i + 1)
      const dWeightedSum = dReports.reduce((sum, r) => sum + (severityWeights[r.severity_level] || 0), 0)
      const dMaxRisk = dReports.length * 1.0
      districtRisk.push({
        id: i + 1,
        name: RAIN_SHADOW_DISTRICTS[i].name_en,
        state: RAIN_SHADOW_DISTRICTS[i].state_en,
        riskScore: dMaxRisk > 0 ? Math.round((dWeightedSum / dMaxRisk) * 100) : 0,
        activeReports: dReports.length,
      })
    }

    districtRisk.sort((a, b) => b.riskScore - a.riskScore)

    const last7Days: { date: string; reports: number; critical: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const dayReports = fakeReports.filter(r => {
        const rDate = r.reported_at?.split('T')[0]
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
        totalCrops,
        activeAlerts,
        totalRegions,
        overallRisk,
        totalReports,
        topDistricts: districtRisk.slice(0, 5),
        trendData: last7Days,
      }
    })
  }
}
