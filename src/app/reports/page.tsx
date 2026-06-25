'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useAuth } from '@/lib/auth/AuthProvider'
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
  image_storage_path?: string
}

export default function ReportsPage() {
  const { dict } = useLocale()
  const { user } = useAuth()
  const [reports, setReports] = useState<Report[]>([])
  const [filterSeverity, setFilterSeverity] = useState('')
  const [filterDistrict, setFilterDistrict] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMine, setShowMine] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const limit = 20

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        setFetchError(null)
        const params = new URLSearchParams()
        if (filterSeverity) params.set('severity', filterSeverity)
        if (filterDistrict) params.set('district', filterDistrict)
        if (filterStatus) params.set('status', filterStatus)
        if (searchQuery) params.set('search', searchQuery)
        if (showMine && user?.id) params.set('user_id', user.id)
        params.set('page', String(page))
        params.set('limit', String(limit))
        const res = await fetch(`/api/reports?${params}`)
        const json = await res.json()
        if (json.error) throw new Error(json.error)
        if (json.data) setReports(json.data)
        if (typeof json.total === 'number') setTotal(json.total)
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : 'Failed to load reports')
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [filterSeverity, filterDistrict, filterStatus, searchQuery, showMine, user?.id, page])

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
        <div className="relative min-w-[180px] sm:min-w-[220px]">
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1) }}
            placeholder="Search crop, pest, district..."
            className="select-editorial w-full pl-7"
          />
          <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>
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
          onClick={() => { if (user) setShowMine(v => !v) }}
          className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
            !user ? 'opacity-40 cursor-not-allowed' :
            showMine ? 'bg-charcoal text-white border-charcoal cursor-pointer' :
            'bg-transparent text-charcoal-muted border-stone hover:border-charcoal cursor-pointer'
          }`}
          title={!user ? 'Log in to see your reports' : ''}
        >
          My Reports
        </button>
      </div>

      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/30 p-4" onClick={() => setSelectedReport(null)}>
          <div className="card-editorial p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 text-xs text-charcoal-muted hover:text-charcoal cursor-pointer"
            >
              Close
            </button>
            <h3 className="text-lg font-bold text-charcoal mb-5" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              Report Details
            </h3>

            {selectedReport.image_storage_path && (
              <div className="mb-5 border border-stone bg-parchment">
                <Image
                  src={selectedReport.image_storage_path}
                  alt="Crop image"
                  width={400}
                  height={192}
                  className="w-full h-48 object-contain"
                  unoptimized
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <span className="text-charcoal-muted">District</span>
              <span className="text-charcoal font-medium">{getDistrictName(selectedReport)}</span>
              <span className="text-charcoal-muted">State</span>
              <span className="text-charcoal">{selectedReport.district_state || '-'}</span>
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
        </div>
      )}

      {fetchError && (
        <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm">{fetchError}</div>
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
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-stone/50">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="py-3 px-4">
                        <div className="h-3 bg-stone-tint animate-pulse" style={{ width: `${60 + j * 8}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
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
