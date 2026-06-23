'use client'

import React, { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import MapShell from '@/components/map/MapShell'
import { MarkerData } from '@/components/map/MapInner'
import SeverityBadge from '@/components/ui/SeverityBadge'
import { DistrictSearch } from '@/components/ui/DistrictSearch'

const PALETTE_SEV: Record<string, string> = {
  critical: '#DC2626',
  high: '#EA580C',
  medium: '#65A30D',
  low: '#059669',
}

export default function MapPage() {
  const { dict } = useLocale()
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [districtGeo, setDistrictGeo] = useState<Record<number, { latitude: number; longitude: number }>>({})
  const [geoReady, setGeoReady] = useState(false)

  React.useEffect(() => {
    fetch('/api/lookups').then(r => r.json()).then((json) => {
      if (json.districtGeo) setDistrictGeo(json.districtGeo)
      setGeoReady(true)
    })
  }, [])

  React.useEffect(() => {
    if (!geoReady) return
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/reports?${new URLSearchParams(selectedDistrict ? { district: selectedDistrict, days: '30' } : { days: '30' })}`)
        const reportsJson = await res.json()
        if (reportsJson.data) {
          const markersList: MarkerData[] = reportsJson.data.map((r: { id: string; district_id: number; severity_level?: string; confidence_score?: number; reported_at: string; latitude?: number | null; longitude?: number | null; crop_name?: string | null; pest_name?: string | null }) => {
            const geo = (r.latitude && r.longitude)
              ? { latitude: r.latitude, longitude: r.longitude }
              : districtGeo[r.district_id] || { latitude: 20.5, longitude: 78.9 }
            return {
              id: r.id,
              lat: geo.latitude,
              lng: geo.longitude,
              severity: (r.severity_level === 'moderate' ? 'medium' : r.severity_level || 'low') as MarkerData['severity'],
              confidence: r.confidence_score || 0.7,
              cropName: r.crop_name || 'Unknown',
              pestName: r.pest_name || 'Unknown',
              reportedAt: r.reported_at,
            }
          })
          setMarkers(markersList)
        }
      } catch (err) {
        console.error('Failed to fetch map data', err)
      }
    }
    fetchData()
  }, [selectedDistrict, geoReady, districtGeo])

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
            <MapShell markers={markers} />
          </div>
        </div>
          <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">{dict.map.selectDistrict}</span>
            <DistrictSearch
              allowAll
              value={selectedDistrict ? parseInt(selectedDistrict) : null}
              onChange={(id) => setSelectedDistrict(id ? String(id) : '')}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-3">{dict.map.legend}</span>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ background: '#DC2626' }} />
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ background: '#EA580C' }} />
                <span>High</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ background: '#65A30D' }} />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600">
                <span className="w-3 h-3 rounded-full" style={{ background: '#059669' }} />
                <span>Low</span>
              </div>
            </div>
          </div>

          {markers.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Reports <span className="text-gray-400 font-normal">{markers.length}</span></h3>
              <div className="space-y-2">
                {markers.slice(0, 5).map((m) => {
                  const dotColor = PALETTE_SEV[m.severity] || '#059669'
                  return (
                    <div key={m.id} className="flex items-start gap-2.5 py-1.5 border-b border-gray-100 last:border-0">
                      <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-xs font-medium text-gray-900 truncate">{m.pestName}</span>
                          <SeverityBadge severity={m.severity} />
                        </div>
                        <span className="text-[11px] text-gray-400">{m.cropName} &middot; {new Date(m.reportedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
