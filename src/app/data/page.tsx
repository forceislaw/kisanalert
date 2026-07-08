'use client'

import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/lib/i18n/LocaleProvider'

export default function DataPage() {
  useLocale()

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="card-editorial p-8 space-y-8">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" className="mx-auto mb-4">
            <circle cx="20" cy="20" r="20" fill="#E07A5F"/>
            <path d="M20 28 C11 24 13 12 20 8 C27 12 29 24 20 28Z" fill="#F7F5F0"/>
          </svg>
          <h1 className="text-3xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
            Your Data & Privacy
          </h1>
          <p className="eyebrow mt-1">How Apentomos handles your information</p>
        </div>

        <div className="space-y-6">
          <div className="border-b border-stone pb-4">
            <h2 className="text-lg font-bold text-charcoal mb-2">Where is my data saved?</h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              All data is stored securely on Supabase, a cloud database hosted on AWS servers located in Mumbai, India. Images you upload for pest analysis are stored in Supabase Storage. No data is stored on your device or shared with third parties.
            </p>
          </div>

          <div className="border-b border-stone pb-4">
            <h2 className="text-lg font-bold text-charcoal mb-2">Why is my data being saved?</h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Your data is saved to power the app&apos;s core functionality: submitting pest reports, showing outbreak trends on the dashboard and map, and improving disease detection through AI analysis. Reports help build a community picture of crop health so farmers and authorities can respond faster.
            </p>
          </div>

          <div className="border-b border-stone pb-4">
            <h2 className="text-lg font-bold text-charcoal mb-2">Who can access my data?</h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Pest reports (including district, crop, pest, and severity) are visible to all users — this is by design so the community can see outbreak patterns. Your email address and account details are private and only visible to you. No data is sold, shared with advertisers, or used for anything beyond the app&apos;s features.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link href="/register" className="text-sage font-medium text-sm hover:underline">
            &larr; Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
