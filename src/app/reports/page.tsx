'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useAuth } from '@/lib/auth/AuthProvider'
import SeverityBadge from '@/components/ui/SeverityBadge'
import { DistrictSearch } from '@/components/ui/DistrictSearch'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import Toast from '@/components/ui/Toast'
import type { ToastType } from '@/components/ui/Toast'

interface Report {
  id: string
  user_id: string | null
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
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [showMine, setShowMine] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)
  const limit = 20

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => setDebouncedSearch(searchQuery), 300)
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current) }
  }, [searchQuery])

  useEffect(() => {
    if (selectedReport) {
      closeBtnRef.current?.focus()
    }
  }, [selectedReport])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedReport(null)
    if (e.key === 'Tab' && selectedReport && modalRef.current) {
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [selectedReport])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleDelete = useCallback(async () => {
    if (!selectedReport) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/reports?id=${selectedReport.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete')
      setReports(prev => prev.filter(r => r.id !== selectedReport.id))
      setSelectedReport(null)
      setTotal(prev => Math.max(0, prev - 1))
      setToast({ message: 'Report deleted successfully', type: 'success' })
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Failed to delete report', type: 'error' })
    } finally {
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }, [selectedReport])

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        setFetchError(null)
        const params = new URLSearchParams()
        if (filterSeverity) params.set('severity', filterSeverity)
        if (filterDistrict) params.set('district', filterDistrict)
        if (filterStatus) params.set('status', filterStatus)
        if (debouncedSearch) params.set('search', debouncedSearch)
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
  }, [filterSeverity, filterDistrict, filterStatus, debouncedSearch, showMine, user?.id, page])

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
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/30 p-4"
          onClick={() => setSelectedReport(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Report details"
        >
          <div
            ref={modalRef}
            className="card-editorial p-6 max-w-xl w-full relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
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

            {user && selectedReport.user_id === user.id && (
              <div className="mt-6 pt-4 border-t border-stone flex justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={deleting}
                  className="text-xs px-3 py-1.5 font-medium border border-terra text-terra hover:bg-terra/5 cursor-pointer disabled:opacity-40"
                >
                  {deleting ? 'Deleting...' : 'Delete Report'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Report"
        message="Are you sure you want to delete this report? This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        destructive
      />

      {fetchError && (
        <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm">{fetchError}</div>
      )}

      <div className="card-editorial">
        <div className="overflow-x-auto">
          <table className="w-full text-sm select-none" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.date}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.district}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.crop}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.pest}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.severity}</th>
                <th className="text-left py-3 px-4 eyebrow">{dict.reports.status}</th>
              </tr>
            </thead>
            <tbody
              onKeyDown={e => {
                const row = (e.target as HTMLElement).closest('tr')
                if (!row || !row.dataset.id) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  const report = reports.find(r => r.id === row.dataset.id)
                  if (report) setSelectedReport(report)
                }
              }}
            >
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
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
                    data-id={r.id}
                    tabIndex={0}
                    className="cursor-pointer hover:bg-parchment-tint focus:bg-parchment-dark outline-none"
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
