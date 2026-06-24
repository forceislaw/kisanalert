'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import SplitText from '@/components/ui/SplitText'
import { useAuth } from '@/lib/auth/AuthProvider'

const features = [
  {
    title: 'AI Crop Detection',
    desc: 'Snap a photo of an affected crop. Our AI identifies pests and diseases instantly with Gemini-powered analysis.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M16 28 C7 24 9 12 16 6 C23 12 25 24 16 28Z" stroke="#4A5D23" strokeWidth="1.5" fill="none"/>
        <path d="M16 6 L16 28" stroke="#4A5D23" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    title: 'Live Outbreak Map',
    desc: 'Track pest outbreaks in real time across India. Colour-coded markers show severity at a glance.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="14" r="6" stroke="#E07A5F" strokeWidth="1.5" fill="none"/>
        <path d="M16 20 L16 28" stroke="#E07A5F" strokeWidth="1.5"/>
        <path d="M10 26 L22 26" stroke="#E07A5F" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Multi-Language',
    desc: 'Available in English, Hindi, Marathi, Telugu, and Kannada. Built for Indian farmers.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="10" stroke="#C9973B" strokeWidth="1.5" fill="none"/>
        <path d="M8 12 L24 12" stroke="#C9973B" strokeWidth="1.5"/>
        <path d="M8 20 L24 20" stroke="#C9973B" strokeWidth="1.5"/>
        <path d="M16 6 A10 10 0 0 1 16 26" stroke="#C9973B" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Early Alerts',
    desc: 'Get notified when pests threaten your region. Email and SMS alerts when outbreaks are detected near you.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
        <path d="M16 4 L28 26 L4 26 Z" stroke="#1C1917" strokeWidth="1.5" fill="none"/>
        <path d="M16 14 L16 18" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="22" r="1" fill="#1C1917"/>
      </svg>
    ),
  },
]

const steps = [
  { num: '01', title: 'Upload a Photo', desc: 'Take a picture of the affected crop using your phone.' },
  { num: '02', title: 'AI Analysis', desc: 'Gemini AI identifies the pest, disease, and severity instantly.' },
  { num: '03', title: 'View on Map', desc: 'The report appears on the live map so others in your area stay informed.' },
  { num: '04', title: 'Get Alerts', desc: 'Receive notifications when outbreaks are detected near your district.' },
]

export default function RootPage() {
  const { user, loading } = useAuth()
  const [splash, setSplash] = useState(true)
  const [fading, setFading] = useState(false)

  const handleAnimationComplete = useCallback(() => {
    setFading(true)
    setTimeout(() => setSplash(false), 600)
  }, [])

  return (
    <>
      {/* Splash overlay — covers header during initial reveal */}
      <div
        className={`fixed inset-0 z-[100] bg-parchment flex flex-col items-center justify-center overflow-hidden transition-opacity duration-600 ease-in-out ${
          fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={fading ? { pointerEvents: 'none' } : {}}
      >
        <div className="flex items-baseline flex-wrap justify-center">
          <SplitText
            text="Kisan"
            className="text-[clamp(3rem,12vw,9rem)] font-bold tracking-[-0.04em] text-charcoal leading-none"
            delay={60}
            duration={0.8}
            ease="power4.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
          />
          <SplitText
            text="Alert"
            className="text-[clamp(3rem,12vw,9rem)] font-bold tracking-[-0.04em] text-terra leading-none ml-3 sm:ml-5"
            delay={80}
            duration={0.8}
            ease="power4.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
        <SplitText
          text="Pest Intelligence System"
          className="text-xs sm:text-sm text-charcoal-muted tracking-[0.25em] uppercase font-mono mt-6"
          delay={120}
          duration={0.6}
          ease="power3.out"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>

      {/* Main page content — hidden until splash fades */}
      <div className={`bg-parchment -mx-6 md:-mx-10 lg:-mx-16 -mt-10 ${splash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-600 ease-in-out`}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm text-charcoal-muted tracking-[0.25em] uppercase font-mono">
              Pest Intelligence System
            </p>
            <p className="mt-6 text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed font-sans">
              AI-powered early warning for crop pests and diseases. Protect your harvest with real-time detection, live outbreak maps, and instant alerts.
            </p>
            <div className="mt-10 flex items-center gap-4">
              {loading ? null : user ? (
                <Link
                  href="/dashboard"
                  className="bg-charcoal text-parchment px-6 py-3 text-sm font-medium no-underline border border-charcoal hover:bg-charcoal-tint transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="bg-charcoal text-parchment px-6 py-3 text-sm font-medium no-underline border border-charcoal hover:bg-charcoal-tint transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="text-charcoal px-6 py-3 text-sm font-medium no-underline border border-stone hover:border-charcoal transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal-muted">
            <span className="text-[0.6rem] tracking-[0.2em] uppercase font-mono">Scroll</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 border-t border-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              Why KisanAlert?
            </h2>
            <p className="text-center text-charcoal-muted text-sm mt-3 max-w-lg mx-auto">
              Built for Indian agriculture. From AI-powered diagnostics to community-driven outbreak tracking.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {features.map((f) => (
                <div key={f.title} className="card-editorial p-6">
                  <div className="mb-4">{f.icon}</div>
                  <h3 className="text-sm font-semibold text-charcoal mb-2">{f.title}</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 border-t border-stone bg-parchment-tint">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              How It Works
            </h2>
            <div className="mt-12 space-y-8">
              {steps.map((s) => (
                <div key={s.num} className="flex items-start gap-6">
                  <span className="text-3xl font-bold text-terra" style={{ fontFamily: 'var(--font-display), Georgia, serif', minWidth: '3rem' }}>
                    {s.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal">{s.title}</h3>
                    <p className="text-sm text-charcoal-muted mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 border-t border-stone text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              Ready to protect your crops?
            </h2>
            <p className="text-charcoal-muted text-sm mt-3">
              Join farmers and agricultural officers using KisanAlert to detect and respond to pest outbreaks.
            </p>
            <Link
              href="/register"
              className="inline-block mt-8 bg-charcoal text-parchment px-8 py-3 text-sm font-medium no-underline border border-charcoal hover:bg-charcoal-tint transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone py-8 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-charcoal-muted font-mono">
            <span>&copy; 2026 KisanAlert</span>
            <span>Pest Intelligence System</span>
          </div>
        </footer>
      </div>
    </>
  )
}
