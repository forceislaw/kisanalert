'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/AuthProvider'

export default function RegisterPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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
    if (error) {
      setError(error)
      setLoading(false)
    } else {
      setMessage('Registration successful! Check your email to confirm your account.')
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 space-y-8">
      <div className="border-b border-stone pb-5">
        <h1 className="text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          Register
        </h1>
        <p className="eyebrow mt-1">Create your KisanAlert account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 border border-terra bg-terra/10 text-terra-dark text-sm">{error}</div>
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

        <p className="text-sm text-charcoal-muted text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-sage font-medium hover:underline">Sign In</Link>
        </p>
      </form>
    </div>
  )
}
