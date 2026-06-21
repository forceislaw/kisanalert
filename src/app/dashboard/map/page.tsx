'use client'

import React, { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import MapShell from '@/components/map/MapShell'
import { DistrictHeatData } from '@/components/map/DistrictHeatLayer'
import { MarkerData } from '@/components/map/MapInner'
import SeverityBadge from '@/components/ui/SeverityBadge'
import { DistrictSearch } from '@/components/ui/DistrictSearch'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
import { CROPS } from '@/lib/seed/crops'
import { PESTS } from '@/lib/seed/pests'

export default function MapPage() {
  const { dict } = useLocale()
  const [heatData, setHeatData] = useState<DistrictHeatData[]>([])
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')

  React.useEffect(() => {
    const fetchHeatData = async () => {
      try {
        const res = await fetch('/api/heatmap?days=30')
        const json = await res.json()
        if (json.data) setHeatData(json.data)
      } catch (err) {
        console.error('Failed to fetch heat data', err)
      }
    }
    fetchHeatData()
  }, [])

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const params = new URLSearchParams()
        if (selectedDistrict) params.set('district', selectedDistrict)
        params.set('days', '30')
        const res = await fetch(`/api/reports?${params}`)
        const json = await res.json()
        if (json.data) {
          const markersList: MarkerData[] = json.data.map((r: { id: string; district_id: number; severity_level?: string; confidence_score?: number; crop_id: number; detected_pest_id: number; reported_at: string; lat?: number; lng?: number }) => {
            const distIdx = r.district_id ? r.district_id - 1 : 0
            const dist = RAIN_SHADOW_DISTRICTS[distIdx]
            return {
              id: r.id,
              lat: r.lat || dist.latitude,
              lng: r.lng || dist.longitude,
              severity: (r.severity_level === 'moderate' ? 'medium' : r.severity_level || 'low') as MarkerData['severity'],
              confidence: r.confidence_score || 0.7,
              cropName: CROPS[r.crop_id ? r.crop_id - 1 : 0]?.key_name || 'Unknown',
              pestName: PESTS[r.detected_pest_id ? r.detected_pest_id - 1 : 0]?.key_name || 'Unknown',
              reportedAt: r.reported_at,
            }
          })
          setMarkers(markersList)
        }
      } catch (err) {
        console.error('Failed to fetch reports', err)
      }
    }
    fetchReports()
  }, [selectedDistrict])

  const selectedIdx = selectedDistrict ? parseInt(selectedDistrict) - 1 : -1
  const selectedDistrictData = selectedIdx >= 0 ? RAIN_SHADOW_DISTRICTS[selectedIdx] : null

  return (
    <div className="space-y-12">
      <div className="border-b border-stone pb-5">
        <h1 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          {dict.map.title}
        </h1>
        <p className="eyebrow mt-1">{dict.map.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <div className="map-frame">
            <MapShell heatData={heatData} markers={markers} />
          </div>
        </div>
        <div className="space-y-10">
          <div>
            <span className="eyebrow block mb-2">{dict.map.selectDistrict}</span>
            <DistrictSearch
              allowAll
              value={selectedDistrict ? parseInt(selectedDistrict) : null}
              onChange={(id) => setSelectedDistrict(id ? String(id) : '')}
            />
          </div>

          <hr className="rule-h" />

          <div>
            <span className="eyebrow block mb-2">{dict.map.legend}</span>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                <span className="w-3 h-3" style={{ background: '#E07A5F' }} />
                <span>{dict.map.highSeverity}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                <span className="w-3 h-3" style={{ background: '#C9973B' }} />
                <span>{dict.map.mediumSeverity}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-charcoal-muted">
                <span className="w-3 h-3" style={{ background: '#7A9450' }} />
                <span>{dict.map.lowSeverity}</span>
              </div>
            </div>
          </div>

          {selectedDistrictData && (
            <div className="card-editorial p-4">
              <h3 className="text-sm font-bold text-charcoal mb-1">{selectedDistrictData.name_en}</h3>
              <p className="text-xs text-charcoal-muted mb-1">{selectedDistrictData.state_en}</p>
              <p className="text-xs text-charcoal-muted mt-2">Active Reports: {markers.filter(m => {
                const dist = RAIN_SHADOW_DISTRICTS.find(d =>
                  Math.abs(d.latitude - m.lat) < 0.5 && Math.abs(d.longitude - m.lng) < 0.5
                )
                return dist === selectedDistrictData
              }).length}</p>
            </div>
          )}

          {markers.length > 0 && (
            <div className="card-editorial p-4">
              <h3 className="text-sm font-bold text-charcoal mb-2">Recent Reports ({markers.length})</h3>
              <div className="space-y-2">
                {markers.slice(0, 5).map((m) => (
                  <div key={m.id} className="text-xs border-b border-stone pb-1 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium text-charcoal">{m.pestName}</span>
                      <SeverityBadge severity={m.severity} />
                    </div>
                    <span className="text-charcoal-muted">{m.cropName} &middot; {new Date(m.reportedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
