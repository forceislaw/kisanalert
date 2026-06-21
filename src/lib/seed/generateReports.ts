import { RAIN_SHADOW_DISTRICTS } from './districts'
import { CROPS } from './crops'
import { PESTS } from './pests'

interface FakeReport {
  id: string
  district_id: number
  crop_id: number
  detected_pest_id: number
  severity_level: 'low' | 'moderate' | 'high' | 'critical'
  image_storage_path: string
  status: string
  confidence_score: number | null
  reported_at: string
  lat: number | null
  lng: number | null
}

const severityLevels: FakeReport['severity_level'][] = ['low', 'moderate', 'high', 'critical']

function randomSeverity(): FakeReport['severity_level'] {
  const weights = [0.3, 0.35, 0.2, 0.15]
  const rand = Math.random()
  let cumulative = 0
  for (let i = 0; i < severityLevels.length; i++) {
    cumulative += weights[i]
    if (rand <= cumulative) return severityLevels[i]
  }
  return 'low'
}

function randomDate(daysAgo: number): string {
  const d = new Date()
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo))
  return d.toISOString()
}

export function generateFakeReports(
  districtCount: number = RAIN_SHADOW_DISTRICTS.length,
  count: number = 80
): FakeReport[] {
  const reports: FakeReport[] = []

  for (let i = 0; i < count; i++) {
    const districtIndex = i % districtCount
    const district = RAIN_SHADOW_DISTRICTS[districtIndex]

    const cropIndex = Math.floor(Math.random() * CROPS.length)
    const pestIndex = Math.floor(Math.random() * PESTS.length)
    const severity = randomSeverity()

    reports.push({
      id: `seed-${i.toString().padStart(4, '0')}`,
      district_id: districtIndex + 1,
      crop_id: cropIndex + 1,
      detected_pest_id: pestIndex + 1,
      severity_level: severity,
      image_storage_path: '',
      status: 'verified',
      confidence_score: +(0.5 + Math.random() * 0.5).toFixed(2),
      reported_at: randomDate(30),
      lat: district.latitude + (Math.random() - 0.5) * 0.3,
      lng: district.longitude + (Math.random() - 0.5) * 0.3,
    })
  }

  return reports
}
