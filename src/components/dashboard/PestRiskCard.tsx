'use client'

import React, { useEffect, useState } from 'react'

interface RiskData {
  state: string
  city: string
  temp: number
  season: string
  recentReports: number
  risk: { level: 'low' | 'medium' | 'high' | 'critical'; score: number; factors: string[] }
  topPests: string[]
}

const LEVELS = ['critical', 'high', 'medium', 'low'] as const

const LEVEL_META: Record<string, { label: string; dot: string }> = {
  low: { label: 'Low', dot: '#3D5A45' },
  medium: { label: 'Medium', dot: '#D4A04A' },
  high: { label: 'High', dot: '#E07A5F' },
  critical: { label: 'Critical', dot: '#C0392B' },
}

function StateCard({ d }: { d: RiskData }) {
  const m = LEVEL_META[d.risk.level]
  return (
    <div className="card-editorial p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-charcoal">{d.state}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 border uppercase tracking-wider" style={{ borderColor: m.dot, color: m.dot }}>
          {m.label} &middot; {d.risk.score}/100
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-charcoal-muted">
        <span>{d.temp.toFixed(0)}&deg;C</span>
        <span>{d.season.replace('Kharif (', '').replace('Rabi (', '').replace(')', '')}</span>
        <span>{d.recentReports} report{d.recentReports !== 1 ? 's' : ''}</span>
      </div>
      {d.topPests.length > 0 && (
        <p className="text-xs text-terra font-medium">{d.topPests.join(', ')}</p>
      )}
    </div>
  )
}

export default function PestRiskCard() {
  const [data, setData] = useState<RiskData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pest-risk').then(r => r.json()).then(d => {
      if (d.risk) setData(d.risk)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const counts: Record<string, number> = {}
  for (const l of LEVELS) counts[l] = data.filter(d => d.risk.level === l).length

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card-editorial p-3 space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-24 bg-stone-tint animate-pulse" />
              <div className="h-3 w-16 bg-stone-tint animate-pulse" />
            </div>
            <div className="h-2 w-32 bg-stone-tint animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>
          Pest Risk Forecast
        </h3>
        <p className="text-xs text-charcoal-muted">3-day forecast &middot; temp + season + reports</p>
      </div>

      <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider">
        {LEVELS.map((level) => {
          if (counts[level] === 0) return null
          const m = LEVEL_META[level]
          return (
            <span key={level} className="inline-flex items-center gap-1.5" style={{ color: m.dot }}>
              <span className="w-2 h-2 rounded-full" style={{ background: m.dot }} />
              {m.label} {counts[level]}
            </span>
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        {data.slice(0, 6).map(d => (
          <StateCard key={d.state} d={d} />
        ))}
      </div>
    </div>
  )
}
