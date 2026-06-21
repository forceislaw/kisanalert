'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useAuth } from '@/lib/auth/AuthProvider'
import LanguageSwitcher from '@/components/nav/LanguageSwitcher'
import Link from 'next/link'

export default function SettingsPage() {
  const { dict } = useLocale()
  const { user } = useAuth()
  const [smsAlerts, setSmsAlerts] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [criticalOnly, setCriticalOnly] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        const res = await fetch('/api/notifications')
        const json = await res.json()
        if (json.data) {
          setSmsAlerts(json.data.sms_alerts)
          setEmailAlerts(json.data.email_alerts)
          setCriticalOnly(json.data.critical_only)
        }
      } catch {
        // use defaults
      }
    }
    if (user) fetchPrefs()
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sms_alerts: smsAlerts, email_alerts: emailAlerts, critical_only: criticalOnly }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12 max-w-2xl mx-auto">
      <div className="border-b border-stone pb-5">
        <h1 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          {dict.settings.title}
        </h1>
        <p className="eyebrow mt-1">{dict.settings.subtitle}</p>
      </div>

      <div className="card-editorial p-5 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-charcoal mb-3">Account</h3>
          {user ? (
            <div className="space-y-1 text-sm text-charcoal-muted">
              <p>Email: <span className="text-charcoal font-medium">{user.email}</span></p>
              <p>Joined: <span className="text-charcoal font-medium">{new Date(user.created_at).toLocaleDateString()}</span></p>
            </div>
          ) : (
            <div className="text-sm text-charcoal-muted">
              <p>Not signed in.</p>
              <Link href="/login" className="text-sage font-medium hover:underline mt-1 inline-block">Sign in to your account</Link>
            </div>
          )}
        </div>
      </div>

      <div className="card-editorial p-5 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-charcoal mb-3">{dict.settings.language}</h3>
          <div className="flex items-center justify-between">
            <p className="text-xs text-charcoal-muted">{dict.settings.languageDescription}</p>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="card-editorial p-5 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-charcoal mb-3">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between py-2 border-b border-stone/50">
              <div>
                <span className="text-sm text-charcoal font-medium">SMS Alerts</span>
                <p className="text-xs text-charcoal-muted">Receive pest outbreak alerts via SMS</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={e => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 accent-sage"
              />
            </label>

            <label className="flex items-center justify-between py-2 border-b border-stone/50">
              <div>
                <span className="text-sm text-charcoal font-medium">Email Alerts</span>
                <p className="text-xs text-charcoal-muted">Receive pest outbreak alerts via email</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={e => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-sage"
              />
            </label>

            <label className="flex items-center justify-between py-2">
              <div>
                <span className="text-sm text-charcoal font-medium">Critical Only</span>
                <p className="text-xs text-charcoal-muted">Only receive alerts for critical severity outbreaks</p>
              </div>
              <input
                type="checkbox"
                checked={criticalOnly}
                onChange={e => setCriticalOnly(e.target.checked)}
                className="w-4 h-4 accent-sage"
              />
            </label>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button onClick={handleSave} disabled={loading} className="btn-primary text-sm px-4 py-1.5 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Preferences'}
            </button>
            {saved && <span className="text-xs text-sage font-medium">Saved!</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
