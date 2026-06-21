'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface KpiData {
  totalCrops: number
  activeAlerts: number
  totalRegions: number
  overallRisk: number
  totalReports: number
}

export default function KpiGrid() {
  const { dict } = useLocale()
  const [data, setData] = useState<KpiData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dashboard')
        const json = await res.json()
        if (json.data) setData(json.data)
      } catch {
        setData({ totalCrops: 12, activeAlerts: 0, totalRegions: 13, overallRisk: 0, totalReports: 0 })
      }
    }
    fetchData()
  }, [])

  const totalCrops = data?.totalCrops ?? '--'
  const activeAlerts = data?.activeAlerts ?? '--'
  const totalRegions = data?.totalRegions ?? '--'
  const overallRisk = data?.overallRisk ?? '--'
  const totalReports = data?.totalReports ?? '--'

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-stone bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.totalCrops}</span>
        <span className="block text-3xl font-mono font-bold text-charcoal">{totalCrops}</span>
        <span className="block text-xs text-charcoal-muted mt-1">{dict.dashboard.regionsWatch}: {totalRegions}</span>
      </div>

      <div className="border border-terra bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.activeAlerts}</span>
        <span className="block text-3xl font-mono font-bold text-charcoal">{activeAlerts}</span>
        <span className="block text-xs text-terra-dark mt-1">{totalReports} total reports</span>
      </div>

      <div className="border border-stone bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.regionsWatch}</span>
        <span className="block text-3xl font-mono font-bold text-charcoal">{totalRegions}</span>
        <span className="block text-xs text-charcoal-muted mt-1">Rain shadow districts</span>
      </div>

      <div className="border border-stone bg-parchment-tint p-4">
        <span className="eyebrow block mb-1">{dict.dashboard.overallRisk}</span>
        <span className="block text-3xl font-mono font-bold text-charcoal">{overallRisk}</span>
        <span className="block text-xs text-charcoal-muted mt-1">Moderate-High scale</span>
      </div>
    </div>
  )
}
