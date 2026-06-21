'use client'

import React from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import KpiGrid from '@/components/dashboard/KpiGrid'
import MapShell from '@/components/map/MapShell'
import OutbreakTrendChart from '@/components/dashboard/OutbreakTrendChart'
import TopDistrictsTable from '@/components/dashboard/TopDistrictsTable'

export default function DashboardPage() {
  const { dict } = useLocale()

  return (
    <div className="space-y-12">
      <div className="border-b border-stone pb-5">
        <h1 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          {dict.dashboard.title}
        </h1>
        <p className="eyebrow mt-1">{dict.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <span className="eyebrow block mb-4">Geospatial Overview</span>
            <div className="map-frame">
              <MapShell />
            </div>
          </div>

          <hr className="rule-h" />

          <div>
            <span className="eyebrow block mb-4">{dict.dashboard.outbreakTrend}</span>
            <OutbreakTrendChart />
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <span className="eyebrow block mb-4">{dict.dashboard.overallRisk}</span>
            <KpiGrid />
          </div>

          <hr className="rule-h" />

          <div>
            <span className="eyebrow block mb-4">{dict.dashboard.topDistricts}</span>
            <TopDistrictsTable />
          </div>
        </div>
      </div>
    </div>
  )
}
