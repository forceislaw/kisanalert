'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthProvider'

export default function RegisterPage() {
  const router = useRouter()
  const { signUp, signInWithGoogle, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('error') === 'email_exists') return 'An account with this email already exists. Try signing in instead.'
      if (params.get('error') === 'auth_failed') return 'Google sign-in failed. Please try again.'
    }
    return null
  })
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const registeredRef = useRef(false)
  const loginTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (registeredRef.current && user) {
      if (loginTimerRef.current) clearTimeout(loginTimerRef.current)
      router.push('/onboarding')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password)
    setLoading(false)

    if (error) {
      setError(error)
    } else {
      registeredRef.current = true
      if (user) {
        router.push('/onboarding')
      } else {
        setMessage('Registration successful! Check your email to confirm your account.')
        loginTimerRef.current = setTimeout(() => router.push('/login'), 3000)
      }
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
            Register
          </h1>
          <p className="eyebrow mt-1">Create your KisanAlert account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && !error.includes('already exists') && (
            <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm">{error}</div>
          )}
          {error?.includes('already exists') && (
            <div className="p-3 border border-ochre bg-ochre/10 text-charcoal text-sm">
              An account with this email already exists.{' '}
              <Link href="/login" className="text-sage font-medium hover:underline">Sign in instead</Link>
            </div>
          )}
          {message && (
            <div className="p-3 border border-sage bg-sage/10 text-sage-dark text-sm">{message}</div>
          )}

          <div>
            <label className="eyebrow block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="select-editorial w-full"
              placeholder="farmer@example.com"
              required
            />
          </div>

          <div>
            <label className="eyebrow block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="select-editorial w-full"
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div>
            <label className="eyebrow block mb-1.5">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="select-editorial w-full"
              placeholder="Repeat password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Registering...' : 'Create Account'}
          </button>

          <div className="relative flex items-center py-1">
            <hr className="rule-h flex-1" />
            <span className="px-3 text-xs text-charcoal-muted font-mono">or</span>
            <hr className="rule-h flex-1" />
          </div>

          <button
            type="button"
            onClick={() => signInWithGoogle('register')}
            className="btn-secondary w-full flex items-center justify-center gap-2 text-sm py-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          <p className="text-sm text-charcoal-muted text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-sage font-medium hover:underline">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
