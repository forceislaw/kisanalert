'use client'

import React, { useState, useEffect } from 'react'

interface DistrictRisk {
  name: string
  state: string
  riskScore: number
  activeReports: number
}

export default function TopDistrictsTable({ days }: { days?: number }) {
  const [districts, setDistricts] = useState<DistrictRisk[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = days && days > 0 ? `?days=${days}` : ''
        const res = await fetch(`/api/dashboard${params}`)
        const json = await res.json()
        if (json.data?.topDistricts) setDistricts(json.data.topDistricts)
      } catch {
        // keep empty
      }
    }
    fetchData()
  }, [days])

  if (districts.length === 0) {
    return (
      <div className="card-editorial p-4 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            {i > 0 && <hr className="rule-h my-2" />}
            <div className="flex justify-between">
              <div className="h-3 w-28 bg-stone-tint animate-pulse" />
              <div className="h-3 w-8 bg-stone-tint animate-pulse" />
            </div>
            <div className="h-2 w-full bg-stone-tint animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="card-editorial p-4">
      {districts.map((d, i) => {
        const barColor = d.riskScore >= 80 ? 'bg-terra' : d.riskScore >= 60 ? 'bg-ochre' : 'bg-sage'
        const riskLabel = d.riskScore >= 80 ? 'severity-critical px-1.5 py-0.5 text-xs font-bold border' : 'border px-1.5 py-0.5 text-xs font-bold severity-high'
        return (
          <React.Fragment key={d.name}>
            {i > 0 && <hr className="rule-h my-2" />}
            <div className="py-1.5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium text-charcoal truncate">{d.name}</span>
                  <span className="text-xs text-charcoal-muted truncate hidden sm:inline">{d.state}</span>
                </div>
                <span className={riskLabel}>{Math.round(d.riskScore)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-full max-w-[120px] h-1.5 bg-stone-tint">
                  <div className={`h-full ${barColor}`} style={{ width: `${d.riskScore}%` }} />
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <span className="text-xs text-charcoal-muted">{d.activeReports} reports</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
