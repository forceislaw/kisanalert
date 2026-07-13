'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface KpiData {
  totalCrops: number
  activeAlerts: number
  totalRegions: number
  overallRisk: number
  totalReports: number
  changes: {
    activeAlerts: number | null
    totalReports: number | null
    overallRisk: number | null
  } | null
}

function ChangeBadge({ value }: { value: number | null }) {
  if (value === null) return null
  const isUp = value > 0
  const isDown = value < 0
  const arrow = isUp ? '↑' : isDown ? '↓' : '→'
  const abs = Math.abs(value)
  const color = isUp ? 'text-terra' : isDown ? 'text-forest' : 'text-charcoal-muted'
  return (
    <span className={`ml-1.5 text-[11px] font-semibold ${color}`}>
      {arrow}{abs}%
    </span>
  )
}

export default function KpiGrid({ days }: { days?: number }) {
  const { dict } = useLocale()
  const [data, setData] = useState<KpiData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = days && days > 0 ? `?days=${days}` : ''
        const res = await fetch(`/api/dashboard${params}`)
        const json = await res.json()
        if (json.data) setData(json.data)
      } catch {
        setData({ totalCrops: 12, activeAlerts: 0, totalRegions: 13, overallRisk: 0, totalReports: 0, changes: null })
      }
    }
    fetchData()
  }, [days])

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-stone bg-parchment-tint p-4 space-y-2">
            <div className="h-2.5 w-16 bg-stone-tint animate-pulse" />
            <div className="h-8 w-12 bg-stone-tint animate-pulse" />
            <div className="h-3 w-24 bg-stone-tint animate-pulse" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-stone bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.totalCrops}</span>
        <span className="block text-3xl font-mono font-bold text-charcoal">{data.totalCrops}</span>
        <span className="block text-xs text-charcoal-muted mt-1">{dict.dashboard.regionsWatch}: {data.totalRegions}</span>
      </div>

      <div className="border border-terra bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.activeAlerts}</span>
        <div className="flex items-baseline">
          <span className="block text-3xl font-mono font-bold text-charcoal">{data.activeAlerts}</span>
          <ChangeBadge value={data.changes?.activeAlerts ?? null} />
        </div>
        <span className="block text-xs text-terra-dark mt-1">
          {data.totalReports} total reports
          {data.changes?.totalReports !== null && data.changes?.totalReports !== undefined && (
            <ChangeBadge value={data.changes?.totalReports ?? null} />
          )}
        </span>
      </div>

      <div className="border border-stone bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.regionsWatch}</span>
        <span className="block text-3xl font-mono font-bold text-charcoal">{data.totalRegions}</span>
        <span className="block text-xs text-charcoal-muted mt-1">Rain shadow districts</span>
      </div>

      <div className="border border-stone bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.overallRisk}</span>
        <div className="flex items-baseline">
          <span className="block text-3xl font-mono font-bold text-charcoal">{data.overallRisk}</span>
          <ChangeBadge value={data.changes?.overallRisk ?? null} />
        </div>
        <span className="block text-xs text-charcoal-muted mt-1">Moderate-High scale</span>
      </div>
    </div>
  )
}
