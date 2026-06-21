'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import SeverityBadge from '@/components/ui/SeverityBadge'
import { DistrictSearch } from '@/components/ui/DistrictSearch'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
import { CROPS } from '@/lib/seed/crops'
import { PESTS } from '@/lib/seed/pests'

interface Report {
  id: string
  district_id: number
  crop_id: number
  detected_pest_id: number
  severity_level: 'low' | 'moderate' | 'high' | 'critical'
  status: string
  reported_at: string
}

export default function ReportsPage() {
  const { dict } = useLocale()
  const [reports, setReports] = useState<Report[]>([])
  const [filterSeverity, setFilterSeverity] = useState('')
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showMine, setShowMine] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filterSeverity) params.set('severity', filterSeverity)
        if (filterDistrict) params.set('district', filterDistrict)
        if (filterStatus) params.set('status', filterStatus)
        if (showMine) params.set('mine', 'true')
        const res = await fetch(`/api/reports?${params}`)
        const json = await res.json()
        if (json.data) setReports(json.data)
      } catch (err) {
        console.error('Failed to fetch reports', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [filterSeverity, filterDistrict, filterStatus, showMine])

  const getCropName = (id: number) => CROPS[id - 1]?.key_name || `crop-${id}`
  const getPestName = (id: number) => PESTS[id - 1]?.key_name || `pest-${id}`
  const getDistrictName = (id: number) => RAIN_SHADOW_DISTRICTS[id - 1]?.name_en || `district-${id}`

  const severityMap: Record<string, string> = {
    critical: 'critical',
    high: 'high',
    moderate: 'medium',
    low: 'low',
  }

  return (
    <div className="space-y-12">
      <div className="border-b border-stone pb-5">
        <h1 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          {dict.reports.title}
        </h1>
        <p className="eyebrow mt-1">{dict.reports.subtitle}</p>
      </div>

      <div className="flex gap-3 flex-wrap items-end">
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="select-editorial"
        >
          <option value="">{dict.reports.allSeverities}</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select-editorial"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="action_taken">Action Taken</option>
        </select>
        <DistrictSearch
          allowAll
          placeholder={dict.reports.allDistricts}
          value={filterDistrict ? parseInt(filterDistrict) : null}
          onChange={(id) => setFilterDistrict(id ? String(id) : '')}
        />
        <button
          onClick={() => setShowMine(v => !v)}
          className={`px-3 py-1.5 text-xs font-medium border cursor-pointer transition-colors ${
            showMine ? 'bg-charcoal text-white border-charcoal' : 'bg-transparent text-charcoal-muted border-stone hover:border-charcoal'
          }`}
        >
          My Reports
        </button>
      </div>

      <div className="card-editorial overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone">
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.date}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.district}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.crop}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.pest}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.severity}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.status}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-charcoal-muted text-sm">{dict.common.loading}</td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-charcoal-muted text-sm">{dict.reports.noReports}</td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r.id} className="border-b border-stone/50">
                    <td className="py-3 px-4 text-charcoal-muted text-xs">{new Date(r.reported_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-charcoal font-medium">{getDistrictName(r.district_id)}</td>
                    <td className="py-3 px-4 text-charcoal-muted">{getCropName(r.crop_id)}</td>
                    <td className="py-3 px-4 text-charcoal-muted">{getPestName(r.detected_pest_id)}</td>
                    <td className="py-3 px-4"><SeverityBadge severity={severityMap[r.severity_level] || r.severity_level || 'low'} /></td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 font-medium border ${
                        r.status === 'verified' ? 'status-verified' :
                        r.status === 'action_taken' ? 'status-action' :
                        'status-pending'
                      }`}>
                        {r.status || 'pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
