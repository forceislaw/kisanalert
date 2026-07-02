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
      {d.risk.factors.length > 0 && (
        <div className="text-[10px] space-y-0.5">
          {d.risk.factors.map((f, i) => {
            const color = f.startsWith('Source:') ? '#8B8174'
              : f.includes('No pest threshold') ? '#3D5A45'
              : f.includes('threshold triggered') || f.includes('accelerates') ? '#C0392B'
              : f.includes('Extreme heat') ? '#C0392B'
              : f.includes('High heat') ? '#E07A5F'
              : f.includes('Kharif') || f.includes('reports in your zone') ? '#D4A04A'
              : '#8B8174'
            return (
              <p key={i} className="flex items-start gap-1" style={{ color, fontStyle: f.startsWith('Source:') ? 'italic' : 'normal' }}>
                <span className="shrink-0 mt-0.5">{f.startsWith('Source:') ? '\u2014' : '\u2013'}</span>
                <span>{f}</span>
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function PestRiskCard() {
  const [data, setData] = useState<RiskData[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')

  useEffect(() => {
    fetch('/api/pest-risk').then(r => r.json()).then(d => {
      if (d.risk) setData(d.risk)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const sorted = [...data].sort((a, b) => b.risk.score - a.risk.score)
  const focused = selected ? data.find(d => d.state === selected) : null
  const rest = focused ? sorted.filter(d => d.state !== selected) : sorted

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
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>
            Pest Risk Forecast
          </h3>
          <p className="text-xs text-charcoal-muted">3-day forecast &middot; temp + season + reports</p>
        </div>
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="text-xs border border-stone bg-parchment-tint text-charcoal px-2 py-1 shrink-0 cursor-pointer"
        >
          <option value="">All states</option>
          {data.map(d => (
            <option key={d.state} value={d.state}>{d.state}</option>
          ))}
        </select>
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
        {focused && (
          <div className="card-alert p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-charcoal">{focused.state} <span className="text-[10px] font-normal text-charcoal-muted"> &mdash; your selection</span></span>
              <span className="text-[10px] font-bold px-2 py-0.5 border uppercase tracking-wider" style={{ borderColor: LEVEL_META[focused.risk.level].dot, color: LEVEL_META[focused.risk.level].dot }}>
                {LEVEL_META[focused.risk.level].label} &middot; {focused.risk.score}/100
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-charcoal-muted">
              <span>{focused.temp.toFixed(0)}&deg;C</span>
              <span>{focused.season.replace('Kharif (', '').replace('Rabi (', '').replace(')', '')}</span>
              <span>{focused.recentReports} report{focused.recentReports !== 1 ? 's' : ''}</span>
            </div>
            {focused.risk.factors.length > 0 && (
              <div className="text-[10px] space-y-0.5">
                {focused.risk.factors.map((f, i) => {
                  const color = f.startsWith('Source:') ? '#8B8174'
                    : f.includes('No pest threshold') ? '#3D5A45'
                    : f.includes('threshold triggered') || f.includes('accelerates') ? '#C0392B'
                    : f.includes('Extreme heat') ? '#C0392B'
                    : f.includes('High heat') ? '#E07A5F'
                    : f.includes('Kharif') || f.includes('reports in your zone') ? '#D4A04A'
                    : '#8B8174'
                  return (
                    <p key={i} className="flex items-start gap-1" style={{ color, fontStyle: f.startsWith('Source:') ? 'italic' : 'normal' }}>
                      <span className="shrink-0 mt-0.5">{f.startsWith('Source:') ? '\u2014' : '\u2013'}</span>
                      <span>{f}</span>
                    </p>
                  )
                })}
              </div>
            )}
          </div>
        )}
        {rest.slice(0, focused ? 4 : 6).map(d => (
          <StateCard key={d.state} d={d} />
        ))}
      </div>
    </div>
  )
}
