'use client'

import React from 'react'
import Link from 'next/link'

export default function EmailVerifiedPage() {
  return (
    <div className="max-w-md mx-auto mt-24">
      <div className="card-editorial p-8 space-y-6 text-center">
        <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-sage-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
            Email Verified
          </h1>
          <p className="text-sm text-charcoal-muted mt-2">
            Your email has been successfully verified. You can now sign in to your account.
          </p>
        </div>

        <Link
          href="/login"
          className="btn-primary inline-flex items-center justify-center px-6 py-2 text-sm"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
