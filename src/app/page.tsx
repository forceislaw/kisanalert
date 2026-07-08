'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import SplitText from '@/components/ui/SplitText'
import { useAuth } from '@/lib/auth/AuthProvider'
import { useLocale } from '@/lib/i18n/LocaleProvider'

export default function RootPage() {
  useEffect(() => {
    const search = window.location.search
    if (search) {
      window.location.href = '/auth/callback' + search
    }
  }, [])
  const { user, loading } = useAuth()
  const { dict } = useLocale()
  const [splash, setSplash] = useState(true)
  const [fading, setFading] = useState(false)

  const features = [
    {
      title: dict.landing.featureAiTitle,
      desc: dict.landing.featureAiDesc,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <path d="M16 28 C7 24 9 12 16 6 C23 12 25 24 16 28Z" stroke="#4A5D23" strokeWidth="1.5" fill="none"/>
          <path d="M16 6 L16 28" stroke="#4A5D23" strokeWidth="1" strokeDasharray="2 2"/>
        </svg>
      ),
    },
    {
      title: dict.landing.featureMapTitle,
      desc: dict.landing.featureMapDesc,
      icon: (
        <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
          <circle cx="16" cy="14" r="6" stroke="#E07A5F" strokeWidth="1.5" fill="none"/>
          <path d="M16 20 L16 28" stroke="#E07A5F" strokeWidth="1.5"/>
          <path d="M10 26 L22 26" stroke="#E07A5F" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      title: dict.landing.featureLangTitle,
      desc: dict.landing.featureLangDesc,
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
      title: dict.landing.featureAlertTitle,
      desc: dict.landing.featureAlertDesc,
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
    { num: '01', title: dict.landing.step1Title, desc: dict.landing.step1Desc },
    { num: '02', title: dict.landing.step2Title, desc: dict.landing.step2Desc },
    { num: '03', title: dict.landing.step3Title, desc: dict.landing.step3Desc },
    { num: '04', title: dict.landing.step4Title, desc: dict.landing.step4Desc },
  ]

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
            text="APENTOMOS"
            className="text-[clamp(2rem,8vw,6rem)] font-bold tracking-[0.08em] text-sage leading-[1.15]"
            style={{ fontFamily: 'Georgia, serif' }}
            delay={60}
            duration={0.8}
            ease="power4.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
        <SplitText
          text={dict.landing.pestIntelligence}
          className="text-xs sm:text-sm tracking-[0.25em] uppercase mt-6 text-charcoal-muted font-sans"
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
              {dict.landing.pestIntelligence}
            </p>
            <p className="mt-6 text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed font-sans">
              {dict.landing.heroDesc}
            </p>
            <div className="mt-10 flex items-center gap-4">
              {loading ? null : user ? (
                <Link
                  href="/dashboard"
                  className="bg-charcoal text-parchment px-6 py-3 text-sm font-medium no-underline border border-charcoal hover:bg-charcoal-tint transition-colors"
                >
                  {dict.landing.dashboard}
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="bg-charcoal text-parchment px-6 py-3 text-sm font-medium no-underline border border-charcoal hover:bg-charcoal-tint transition-colors"
                  >
                    {dict.landing.getStarted}
                  </Link>
                  <Link
                    href="/login"
                    className="text-charcoal px-6 py-3 text-sm font-medium no-underline border border-stone hover:border-charcoal transition-colors"
                  >
                    {dict.landing.signIn}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal-muted">
            <span className="text-[0.6rem] tracking-[0.2em] uppercase font-mono">{dict.landing.scroll}</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={1.5} d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 border-t border-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              {dict.landing.whyTitle}
            </h2>
            <p className="text-center text-charcoal-muted text-sm mt-3 max-w-lg mx-auto">
              {dict.landing.whyDesc}
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
              {dict.landing.howTitle}
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

        {/* Research & Impact Section */}
        <section className="py-24 px-6 border-t border-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              Research &amp; Impact
            </h2>
            <p className="text-center text-charcoal-muted text-sm mt-3 max-w-2xl mx-auto">
              Built on agricultural research and government data to address India&apos;s pest crisis
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <div className="card-editorial p-6 space-y-2">
                <p className="text-3xl font-bold text-terra" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>80%</p>
                <p className="text-sm text-charcoal">of pre-harvest crop loss in India is caused by pests and diseases</p>
                <p className="text-xs text-charcoal-muted">— <a href="https://www.icar.org.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal">ICAR Annual Report 2023</a></p>
              </div>
              <div className="card-editorial p-6 space-y-2">
                <p className="text-3xl font-bold text-terra" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>40%</p>
                <p className="text-sm text-charcoal">of smallholder farmers lack timely access to pest advisory services</p>
                <p className="text-xs text-charcoal-muted">— <a href="https://www.fao.org/india/en/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal">FAO India Country Report 2022</a></p>
              </div>
              <div className="card-editorial p-6 space-y-2">
                <p className="text-3xl font-bold text-terra" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>15&ndash;25%</p>
                <p className="text-sm text-charcoal">of potential crop yield is lost annually to pest outbreaks that go undetected</p>
                <p className="text-xs text-charcoal-muted">— <a href="https://www.plantwise.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal">CABI Plantwise Report 2021</a></p>
              </div>
              <div className="card-editorial p-6 space-y-2">
                <p className="text-3xl font-bold text-terra" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>120M</p>
                <p className="text-sm text-charcoal">Indian farming households that could benefit from AI-assisted pest detection</p>
                <p className="text-xs text-charcoal-muted">— <a href="https://www.niti.gov.in" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal">NITI Aayog Agriculture Strategy 2023</a></p>
              </div>
            </div>
            <div className="text-center mt-8">
              <a href="/research" className="text-sm text-sage font-medium hover:underline">View full research &amp; methodology &rarr;</a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 border-t border-stone text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
              {dict.landing.ctaTitle}
            </h2>
            <p className="text-charcoal-muted text-sm mt-3">
              {dict.landing.ctaDesc}
            </p>
            <Link
              href="/register"
              className="inline-block mt-8 bg-charcoal text-parchment px-8 py-3 text-sm font-medium no-underline border border-charcoal hover:bg-charcoal-tint transition-colors"
            >
              {dict.landing.ctaButton}
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-stone py-8 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-charcoal-muted font-mono">
            <span>&copy; 2026 Apentomos</span>
            <span>{dict.landing.footerTagline}</span>
          </div>
        </footer>
      </div>
    </>
  )
}
