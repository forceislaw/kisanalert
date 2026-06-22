'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import SeverityBadge from '@/components/ui/SeverityBadge'
import { DistrictSearch } from '@/components/ui/DistrictSearch'

interface Report {
  id: string
  district_id: number
  crop_id: number
  detected_pest_id: number
  severity_level: 'low' | 'moderate' | 'high' | 'critical'
  status: string
  reported_at: string
  crop_name?: string
  district_name?: string
  district_state?: string
  pest_name?: string
}

export default function ReportsPage() {
  const { dict } = useLocale()
  const [reports, setReports] = useState<Report[]>([])
  const [filterSeverity, setFilterSeverity] = useState('')
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showMine, setShowMine] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const limit = 20

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (filterSeverity) params.set('severity', filterSeverity)
        if (filterDistrict) params.set('district', filterDistrict)
        if (filterStatus) params.set('status', filterStatus)
        if (showMine) params.set('mine', 'true')
        params.set('page', String(page))
        params.set('limit', String(limit))
        params.set('_t', String(Date.now()))
        const res = await fetch(`/api/reports?${params}`)
        const json = await res.json()
        if (json.data) {
          console.log('API reports sample:', json.data[0])
          setReports(json.data)
        }
        if (typeof json.total === 'number') setTotal(json.total)
      } catch (err) {
        console.error('Failed to fetch reports', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [filterSeverity, filterDistrict, filterStatus, showMine, page])

  const totalPages = Math.ceil(total / limit)

  const getCropName = (report: Report) => report.crop_name || `crop-${report.crop_id}`
  const getPestName = (report: Report) => report.pest_name || `pest-${report.detected_pest_id}`
  const getDistrictName = (report: Report) => report.district_name || `district-${report.district_id}`

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

      {selectedReport && (
        <div className="border border-stone bg-parchment-tint p-4 relative">
          <button
            onClick={() => setSelectedReport(null)}
            className="absolute top-2 right-2 text-xs text-charcoal-muted hover:text-charcoal cursor-pointer"
          >
            Close
          </button>
          <h3 className="text-sm font-bold text-charcoal mb-3">Report Details</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
            <span className="text-charcoal-muted">District</span>
            <span className="text-charcoal font-medium">{getDistrictName(selectedReport)}</span>
            <span className="text-charcoal-muted">Crop</span>
            <span className="text-charcoal">{getCropName(selectedReport)}</span>
            <span className="text-charcoal-muted">Pest</span>
            <span className="text-charcoal">{getPestName(selectedReport)}</span>
            <span className="text-charcoal-muted">Severity</span>
            <span><SeverityBadge severity={severityMap[selectedReport.severity_level] || selectedReport.severity_level || 'low'} /></span>
            <span className="text-charcoal-muted">Status</span>
            <span className={`text-xs px-2 py-0.5 font-medium border w-fit ${
              selectedReport.status === 'verified' ? 'status-verified' :
              selectedReport.status === 'action_taken' ? 'status-action' : 'status-pending'
            }`}>{selectedReport.status || 'pending'}</span>
            <span className="text-charcoal-muted">Date</span>
            <span className="text-charcoal">{new Date(selectedReport.reported_at).toLocaleString()}</span>
          </div>
        </div>
      )}

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
                  <tr
                    key={r.id}
                    className="border-b border-stone/50 cursor-pointer hover:bg-parchment-tint transition-colors"
                    onClick={() => setSelectedReport(r)}
                  >
                    <td className="py-3 px-4 text-charcoal-muted text-xs">{new Date(r.reported_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-charcoal font-medium">{getDistrictName(r)}</td>
                    <td className="py-3 px-4 text-charcoal-muted">{getCropName(r)}</td>
                    <td className="py-3 px-4 text-charcoal-muted">{getPestName(r)}</td>
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

      {total > limit && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-charcoal-muted">{total} total reports</span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="px-3 py-1 text-xs border border-stone disabled:opacity-30 cursor-pointer disabled:cursor-default"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-xs text-charcoal-muted">{page} / {totalPages}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-3 py-1 text-xs border border-stone disabled:opacity-30 cursor-pointer disabled:cursor-default"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
