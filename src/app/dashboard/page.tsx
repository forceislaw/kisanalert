'use client'

import React, { useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useWeather } from '@/lib/useWeather'
import KpiGrid from '@/components/dashboard/KpiGrid'
import MapShell from '@/components/map/MapShell'
import OutbreakTrendChart from '@/components/dashboard/OutbreakTrendChart'
import TopDistrictsTable from '@/components/dashboard/TopDistrictsTable'
import PestRiskCard from '@/components/dashboard/PestRiskCard'
import CollapsibleSection from '@/components/ui/CollapsibleSection'

const TIME_RANGES = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: 'All', value: 0 },
]

export default function DashboardPage() {
  const { dict } = useLocale()
  const [days, setDays] = useState(7)
  const { weather } = useWeather()

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
          <CollapsibleSection title="Geospatial Overview">
            <div className="map-frame">
              <MapShell weather={weather} />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-charcoal-muted font-sans">
              <span className="font-medium uppercase tracking-wider">Temp</span>
              {[
                { label: '≤ 27°', color: '#3D5A45' },
                { label: '28–32°', color: '#D4A04A' },
                { label: '33–37°', color: '#E07A5F' },
                { label: '≥ 38°', color: '#C0392B' },
              ].map(t => (
                <span key={t.label} className="flex items-center gap-1">
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 2, background: t.color }} />
                  {t.label}
                </span>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection title={dict.dashboard.outbreakTrend}>
            <OutbreakTrendChart days={days} />
          </CollapsibleSection>

          <CollapsibleSection title={dict.dashboard.topDistricts}>
            <TopDistrictsTable key={`td-${days}`} days={days} />
          </CollapsibleSection>
        </div>

        <div className="space-y-10">
          <CollapsibleSection title={dict.dashboard.overallRisk}>
            <KpiGrid key={`kpi-${days}`} days={days} />
          </CollapsibleSection>

          <CollapsibleSection title="Pest Risk Forecast">
            <PestRiskCard />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  )
}
