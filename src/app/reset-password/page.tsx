'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useLocale } from '@/lib/i18n/LocaleProvider'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { updatePassword } = useAuth()
  const { dict } = useLocale()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const { error: err } = await updatePassword(password)
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      setMessage(dict.auth.passwordUpdated)
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card-editorial p-8 space-y-8">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" className="mx-auto mb-4">
            <circle cx="20" cy="20" r="20" fill="#E07A5F"/>
            <path d="M20 28 C11 24 13 12 20 8 C27 12 29 24 20 28Z" fill="#F7F5F0"/>
          </svg>
          <h1 className="text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
            {dict.auth.setNewPassword}
          </h1>
          <p className="eyebrow mt-1">{dict.auth.setNewPasswordDesc}</p>
        </div>

        {!ready ? (
          <p className="text-sm text-charcoal-muted text-center py-4">{dict.auth.verifyingResetLink}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm">{error}</div>
            )}
            {message && (
              <div className="p-3 border border-sage bg-sage/10 text-sage-dark text-sm">{message}</div>
            )}

            <div>
              <label className="eyebrow block mb-1.5">{dict.auth.newPassword}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="select-editorial w-full"
                placeholder={dict.auth.atLeast6Chars}
                required
              />
            </div>

            <div>
              <label className="eyebrow block mb-1.5">{dict.auth.confirmPassword}</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="select-editorial w-full"
                placeholder={dict.auth.repeatPassword}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? dict.auth.updating : dict.auth.updatePassword}
            </button>

            <p className="text-sm text-charcoal-muted text-center">
              <Link href="/login" className="text-sage font-medium hover:underline">{dict.auth.backToSignIn}</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
