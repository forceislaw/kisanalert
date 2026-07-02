import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const STATES = [
  { name: 'Punjab', city: 'Ludhiana', lat: 30.901, lng: 75.8573, zone: 'north' },
  { name: 'Haryana', city: 'Karnal', lat: 29.6857, lng: 76.9905, zone: 'north' },
  { name: 'Uttar Pradesh', city: 'Lucknow', lat: 26.8467, lng: 80.9462, zone: 'north' },
  { name: 'Madhya Pradesh', city: 'Indore', lat: 22.7196, lng: 75.8577, zone: 'central' },
  { name: 'Maharashtra', city: 'Pune', lat: 18.5204, lng: 73.8567, zone: 'west' },
  { name: 'Karnataka', city: 'Bengaluru', lat: 12.9716, lng: 77.5946, zone: 'south' },
  { name: 'Telangana', city: 'Hyderabad', lat: 17.385, lng: 78.4867, zone: 'south' },
  { name: 'Andhra Pradesh', city: 'Vijayawada', lat: 16.5062, lng: 80.648, zone: 'south' },
  { name: 'Tamil Nadu', city: 'Coimbatore', lat: 11.0168, lng: 76.9558, zone: 'south' },
  { name: 'Gujarat', city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, zone: 'west' },
  { name: 'Bihar', city: 'Patna', lat: 25.5941, lng: 85.1376, zone: 'east' },
  { name: 'Rajasthan', city: 'Jaipur', lat: 26.9124, lng: 75.7873, zone: 'north' },
  { name: 'Odisha', city: 'Bhubaneswar', lat: 20.2961, lng: 85.8245, zone: 'east' },
  { name: 'West Bengal', city: 'Kolkata', lat: 22.5726, lng: 88.3639, zone: 'east' },
  { name: 'Chhattisgarh', city: 'Raipur', lat: 21.2514, lng: 81.6296, zone: 'central' },
  { name: 'Jharkhand', city: 'Ranchi', lat: 23.3441, lng: 85.3096, zone: 'east' },
  { name: 'Assam', city: 'Guwahati', lat: 26.1445, lng: 91.7362, zone: 'northeast' },
  { name: 'Kerala', city: 'Kochi', lat: 9.9312, lng: 76.2673, zone: 'south' },
  { name: 'Uttarakhand', city: 'Dehradun', lat: 30.3165, lng: 78.0322, zone: 'north' },
  { name: 'Himachal Pradesh', city: 'Shimla', lat: 31.1048, lng: 77.1734, zone: 'north' },
]

function getSeason(): { name: string; label: string } {
  const m = new Date().getMonth()
  if (m >= 5 && m <= 9) return { name: 'kharif', label: 'Kharif (Jun\u2013Oct)' }
  if (m >= 10 || m <= 3) return { name: 'rabi', label: 'Rabi (Nov\u2013Apr)' }
  return { name: 'zaid', label: 'Zaid (Apr\u2013May)' }
}

const ZONE_PESTS: Record<string, Array<{ pest: string; crop: string; tempThresh: number; severity: string }>> = {
  north: [
    { pest: 'Yellow Rust', crop: 'Wheat', tempThresh: 18, severity: 'high' },
    { pest: 'Pink Bollworm', crop: 'Cotton', tempThresh: 32, severity: 'high' },
  ],
  south: [
    { pest: 'Brown Planthopper', crop: 'Paddy', tempThresh: 22, severity: 'high' },
    { pest: 'Leaf Blight', crop: 'Paddy', tempThresh: 28, severity: 'medium' },
  ],
  east: [
    { pest: 'Rice Blast', crop: 'Paddy', tempThresh: 25, severity: 'high' },
    { pest: 'Leaf Folder', crop: 'Paddy', tempThresh: 27, severity: 'medium' },
  ],
  west: [
    { pest: 'Pink Bollworm', crop: 'Cotton', tempThresh: 32, severity: 'high' },
    { pest: 'Aphids', crop: 'Pulses', tempThresh: 28, severity: 'medium' },
  ],
  central: [
    { pest: 'Fall Armyworm', crop: 'Maize', tempThresh: 30, severity: 'high' },
    { pest: 'Pod Borer', crop: 'Pulses', tempThresh: 26, severity: 'medium' },
  ],
  northeast: [
    { pest: 'Rice Blast', crop: 'Paddy', tempThresh: 25, severity: 'high' },
    { pest: 'Stem Borer', crop: 'Paddy', tempThresh: 24, severity: 'medium' },
  ],
}

function calcRisk(temp: number, reportCount: number, season: string, zonePests: Array<{ pest: string; crop: string; tempThresh: number; severity: string }>): {
  level: 'low' | 'medium' | 'high' | 'critical'
  score: number
  factors: string[]
  triggeredPests: string[]
} {
  let score = 0
  const factors: string[] = []
  const triggeredPests: string[] = []

  // Temperature-based risk
  const tempAbove = zonePests.filter(p => temp >= p.tempThresh)
  triggeredPests.push(...tempAbove.map(p => `${p.pest} (${p.crop})`))
  if (tempAbove.length > 0) {
    score += tempAbove.length * 20
    if (tempAbove.some(p => p.severity === 'high')) score += 10
    factors.push(`${tempAbove.length} pest threshold${tempAbove.length > 1 ? 's' : ''} triggered at ${temp.toFixed(1)}\u00b0C`)
  } else {
    factors.push('No pest thresholds triggered by current temperature')
  }

  // Season
  if (season === 'kharif') {
    score += 15
    factors.push('Kharif season — higher pest activity')
  } else {
    score += 5
    factors.push('Rabi season — moderate pest activity')
  }

  // Recent reports
  if (reportCount >= 10) {
    score += 30
    factors.push(`${reportCount} recent reports in your zone`)
  } else if (reportCount >= 5) {
    score += 20
    factors.push(`${reportCount} recent reports in your zone`)
  } else if (reportCount >= 1) {
    score += 10
    factors.push(`${reportCount} recent report${reportCount > 1 ? 's' : ''} in your zone`)
  }

  // Temperature magnitude
  if (temp >= 38) { score += 15; factors.push('Extreme heat (\u226538\u00b0C) stresses crops') }
  else if (temp >= 33) { score += 10; factors.push('High heat (33\u201337\u00b0C) accelerates pest cycles') }

  let level: 'low' | 'medium' | 'high' | 'critical'
  if (score >= 70) level = 'critical'
  else if (score >= 45) level = 'high'
  else if (score >= 25) level = 'medium'
  else level = 'low'

  return { level, score: Math.min(score, 100), factors, triggeredPests }
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 })

  const { searchParams } = new URL(req.url)
  const targetState = searchParams.get('state')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const season = getSeason()
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const results = await Promise.all(
    STATES
      .filter(s => !targetState || s.name === targetState)
      .map(async (state) => {
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lng}&appid=${apiKey}&units=metric`
          const res = await fetch(url)
          if (!res.ok) return null
          const data = await res.json()
          const temp = data.main?.temp

          const { count } = await supabase
            .from('pest_reports')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', sevenDaysAgo)
            .eq('state', state.name)

          const zonePests = ZONE_PESTS[state.zone] || []
          const risk = calcRisk(temp, count || 0, season.name, zonePests)

          return {
            state: state.name,
            city: state.city,
            temp: Math.round(temp * 10) / 10,
            season: season.label,
            recentReports: count || 0,
            risk,
            topPests: risk.triggeredPests.slice(0, 3),
          }
        } catch {
          return null
        }
      })
  )

  const valid = results.filter(Boolean)
  return NextResponse.json({ risk: valid, generatedAt: new Date().toISOString() })
}
