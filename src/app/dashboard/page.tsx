'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import KpiGrid from '@/components/dashboard/KpiGrid'
import MapShell from '@/components/map/MapShell'
import OutbreakTrendChart from '@/components/dashboard/OutbreakTrendChart'
import TopDistrictsTable from '@/components/dashboard/TopDistrictsTable'
import type { WeatherData } from '@/components/map/MapInner'

const TIME_RANGES = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: 'All', value: 0 },
]

export default function DashboardPage() {
  const { dict } = useLocale()
  const [days, setDays] = useState(7)
  const [weather, setWeather] = useState<WeatherData[]>([])

  useEffect(() => {
    fetch('/api/weather').then(r => r.json()).then(data => {
      if (data.weather) setWeather(data.weather)
    }).catch(() => {})
  }, [])

  return (
    <div className="space-y-12">
      <div className="border-b border-stone pb-5 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
            {dict.dashboard.title}
          </h1>
          <p className="eyebrow mt-1">{dict.dashboard.subtitle}</p>
        </div>
        <div className="flex gap-1">
          {TIME_RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => setDays(r.value)}
              className={`px-2.5 py-1 text-xs font-medium border transition-colors cursor-pointer ${
                days === r.value
                  ? 'bg-charcoal text-white border-charcoal'
                  : 'bg-transparent text-charcoal-muted border-stone hover:border-charcoal'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <span className="eyebrow block mb-4">Geospatial Overview</span>
            <div className="map-frame">
              <MapShell weather={weather} />
            </div>
          </div>

          <hr className="rule-h" />

          <div>
            <span className="eyebrow block mb-4">{dict.dashboard.outbreakTrend}</span>
            <OutbreakTrendChart days={days} />
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <span className="eyebrow block mb-4">{dict.dashboard.overallRisk}</span>
            <KpiGrid days={days} />
          </div>

          <hr className="rule-h" />

          <div>
            <span className="eyebrow block mb-4">{dict.dashboard.topDistricts}</span>
            <TopDistrictsTable days={days} />
          </div>
        </div>
      </div>
    </div>
  )
}
