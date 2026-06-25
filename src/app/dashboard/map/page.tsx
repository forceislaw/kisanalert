'use client'

import React, { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import MapShell from '@/components/map/MapShell'
import { MarkerData } from '@/components/map/MapInner'
import SeverityBadge from '@/components/ui/SeverityBadge'
import { DistrictSearch } from '@/components/ui/DistrictSearch'

export default function MapPage() {
  const { dict } = useLocale()
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [districtGeo, setDistrictGeo] = useState<Record<number, { latitude: number; longitude: number }>>({})
  const [geoReady, setGeoReady] = useState(false)
  const [loadingMarkers, setLoadingMarkers] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  React.useEffect(() => {
    fetch('/api/lookups').then(r => r.json()).then((json) => {
      if (json.districtGeo) setDistrictGeo(json.districtGeo)
      setGeoReady(true)
    }).catch(() => setGeoReady(true))
  }, [])

  React.useEffect(() => {
    if (!geoReady) return
    const fetchData = async () => {
      setLoadingMarkers(true)
      try {
        const res = await fetch(`/api/reports?${new URLSearchParams(selectedDistrict ? { district: selectedDistrict, days: '30' } : { days: '30' })}`)
        const reportsJson = await res.json()
        if (reportsJson.data) {
          const markersList: MarkerData[] = reportsJson.data.map((r: { id: string; district_id: number; severity_level?: string; confidence_score?: number; reported_at: string; latitude?: number | null; longitude?: number | null; crop_name?: string | null; pest_name?: string | null }) => {
            const districtLoc = districtGeo[r.district_id]
            const useGps = r.latitude && r.longitude && districtLoc &&
              Math.abs(r.latitude - districtLoc.latitude) < 1 &&
              Math.abs(r.longitude - districtLoc.longitude) < 1
            const geo = useGps
              ? { latitude: r.latitude, longitude: r.longitude }
              : districtLoc || { latitude: 20.5, longitude: 78.9 }
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
        setFetchError(err instanceof Error ? err.message : 'Failed to load map data')
      } finally {
        setLoadingMarkers(false)
      }
    }
    fetchData()
  }, [selectedDistrict, geoReady, districtGeo])

  return (
    <div className="space-y-12">
      <div className="border-b border-stone pb-5">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          {dict.map.title}
        </h1>
        <p className="eyebrow mt-1">{dict.map.subtitle}</p>
      </div>

      {fetchError && (
        <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm">{fetchError}</div>
      )}

      

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
        <div className="lg:col-span-3">
          <div className="map-frame">
            <MapShell markers={markers} />
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

          {loadingMarkers ? (
            <div className="card-editorial p-4 space-y-3">
              <div className="h-3 w-16 bg-stone-tint animate-pulse" />
              <div className="h-4 w-24 bg-stone-tint animate-pulse" />
              <div className="h-4 w-20 bg-stone-tint animate-pulse" />
              <div className="h-4 w-22 bg-stone-tint animate-pulse" />
              <div className="h-4 w-18 bg-stone-tint animate-pulse" />
            </div>
          ) : (
            <div className="card-editorial p-4">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-3">{dict.map.legend}</span>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 border border-charcoal shadow-[1px_1px_0px_0px_#1C1917]" style={{ background: '#E07A5F' }} />
                  <span className="text-xs font-bold text-charcoal">Critical</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 border border-charcoal shadow-[1px_1px_0px_0px_#1C1917]" style={{ background: '#C9973B' }} />
                  <span className="text-xs font-bold text-charcoal">{dict.map.highSeverity}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 border border-charcoal shadow-[1px_1px_0px_0px_#1C1917]" style={{ background: '#4A5D23' }} />
                  <span className="text-xs font-bold text-charcoal">{dict.map.mediumSeverity}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 border border-charcoal shadow-[1px_1px_0px_0px_#1C1917]" style={{ background: '#7A9450' }} />
                  <span className="text-xs font-bold text-charcoal">{dict.map.lowSeverity}</span>
                </div>
              </div>
            </div>
          )}

          {selectedDistrict && markers.length > 0 && (
            <div className="card-editorial p-4">
              <p className="text-xs text-charcoal-muted mt-2">Active Reports: {markers.length}</p>
            </div>
          )}

          <div className="card-editorial p-4">
            <h3 className="text-sm font-bold text-charcoal mb-2">
              Recent Reports {markers.length > 0 && `(${markers.length})`}
            </h3>
            {loadingMarkers ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between">
                      <div className="h-3 w-24 bg-stone-tint animate-pulse" />
                      <div className="h-3 w-10 bg-stone-tint animate-pulse" />
                    </div>
                    <div className="h-2.5 w-32 bg-stone-tint animate-pulse" />
                  </div>
                ))}
              </div>
            ) : markers.length === 0 ? (
              <p className="text-xs text-charcoal-muted py-4 text-center">No recent reports</p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
