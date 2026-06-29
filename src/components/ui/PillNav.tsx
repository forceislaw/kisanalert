'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useAuth } from '@/lib/auth/AuthProvider'
import LanguageSwitcher from '@/components/nav/LanguageSwitcher'
import type { Dictionary } from '@/lib/i18n/getDictionary'
import './PillNav.css'

const NAV_ITEMS: { href: string; labelKey: keyof Dictionary['nav']; tooltip: string }[] = [
  { href: '/dashboard', labelKey: 'dashboard', tooltip: 'Key metrics & outbreak overview' },
  { href: '/dashboard/map', labelKey: 'map', tooltip: 'Geospatial outbreak view' },
  { href: '/reports', labelKey: 'reports', tooltip: 'Browse & search pest reports' },
  { href: '/dashboard/upload', labelKey: 'reportNew', tooltip: 'Upload & submit a pest report' },
  { href: '/settings', labelKey: 'settings', tooltip: 'Account & notification preferences' },
]

export default function PillNav() {
  const { dict } = useLocale()
  const { user, loading, signOut } = useAuth()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tlRefs = useRef<gsap.core.Timeline[]>([])
  const navRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const activeHref = pathname

  useEffect(() => {
    const tlRefsCopy = tlRefs.current
    const pills = navRef.current?.querySelectorAll('.pill')
    if (!pills) return

    pills.forEach((pill, i) => {
      const circle = circleRefs.current[i]
      if (!circle) return

      const rect = pill.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const R = ((w * w) / 4 + h * h) / (2 * h)
      const D = Math.ceil(2 * R) + 2
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1

      circle.style.width = `${D}px`
      circle.style.height = `${D}px`
      circle.style.bottom = `-${delta}px`

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${D - delta}px`,
      })

      const label = pill.querySelector('.pill-label') as HTMLElement | null
      const hoverLabel = pill.querySelector('.pill-label-hover') as HTMLElement | null

      if (label) gsap.set(label, { y: 0 })
      if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 })

      tlRefs.current[i]?.kill()
      const tl = gsap.timeline({ paused: true })
      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0)
      if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0)
      if (hoverLabel) {
        gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 })
        tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0)
      }
      tlRefs.current[i] = tl
    })

    const onResize = () => {
      pills.forEach((pill, i) => {
        const circle = circleRefs.current[i]
        if (!circle) return
        const rect = pill.getBoundingClientRect()
        const w = rect.width
        const h = rect.height
        const R = ((w * w) / 4 + h * h) / (2 * h)
        const D = Math.ceil(2 * R) + 2
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        circle.style.width = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`
        gsap.set(circle, { transformOrigin: `50% ${D - delta}px` })
      })
    }

    window.addEventListener('resize', onResize)

    gsap.set(mobileRef.current, { visibility: 'hidden', opacity: 0 })

    return () => {
      window.removeEventListener('resize', onResize)
      const refs = tlRefsCopy
      refs.forEach((tl) => tl?.kill())
    }
  }, [])

  const handleEnter = (i: number) => {
    tlRefs.current[i]?.tweenTo(tlRefs.current[i]!.duration(), {
      duration: 0.3,
      ease: 'power3.easeOut',
      overwrite: 'auto',
    })
  }

  const handleLeave = (i: number) => {
    tlRefs.current[i]?.tweenTo(0, {
      duration: 0.2,
      ease: 'power3.easeOut',
      overwrite: 'auto',
    })
  }

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)

    if (next) {
      gsap.set(mobileRef.current, { visibility: 'visible' })
      gsap.fromTo(mobileRef.current, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.3, ease: 'power3.easeOut',
      })
    } else {
      gsap.to(mobileRef.current, {
        opacity: 0, y: 10, duration: 0.2, ease: 'power3.easeOut',
        onComplete: () => gsap.set(mobileRef.current, { visibility: 'hidden' }),
      })
    }
  }

  return (
    <header className="bg-parchment">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-3">
        <div className="pill-nav-container">
        <nav className="pill-nav" aria-label="Primary">
          <Link href="/dashboard" className="pill-logo" aria-label="KisanAlert Home" onClick={(e) => {
            const el = e.currentTarget.querySelector('svg')
            if (el) {
              el.classList.remove('spin-once')
              void el.getBoundingClientRect()
              el.classList.add('spin-once')
            }
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
              <circle cx="20" cy="20" r="20" fill="#E07A5F"/>
              <path d="M20 28 C11 24 13 12 20 8 C27 12 29 24 20 28Z" fill="#F7F5F0"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-sans), DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#6B6560' }}>KisanAlert</span>
          </Link>

          <div className="pill-nav-items desktop-only" ref={navRef}>
            <ul className="pill-list" role="menubar">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} role="none">
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={`pill${activeHref === item.href || (item.href === '/dashboard' && pathname === '/') ? ' is-active' : ''}`}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="pill-inner">
                      <span className="hover-circle" aria-hidden="true" ref={(el) => { circleRefs.current[i] = el }} />
                      <span className="label-stack">
                        <span className="pill-label">{dict.nav[item.labelKey]}</span>
                        <span className="pill-label-hover" aria-hidden="true">{dict.nav[item.labelKey]}</span>
                      </span>
                    </span>
                    <span className="pill-tooltip" aria-hidden="true">{item.tooltip}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="mobile-menu-button mobile-only"
            onClick={toggleMobile}
            aria-label="Toggle menu"
            ref={hamburgerRef}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>

        <div className="mobile-menu-popover mobile-only" ref={mobileRef}>
          <ul className="mobile-menu-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? ' is-active' : ''}`}
                  onClick={() => { setMobileOpen(false); toggleMobile() }}
                >
                  {dict.nav[item.labelKey]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 px-4 py-3 border-t border-stone mt-2">
            {loading ? null : user ? (
              <button onClick={signOut} className="text-xs font-medium text-charcoal-muted hover:text-charcoal cursor-pointer">Sign Out</button>
            ) : (
              <Link href="/login" className="text-xs font-medium text-charcoal-muted hover:text-charcoal no-underline" onClick={() => { setMobileOpen(false); toggleMobile() }}>Sign In</Link>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <button onClick={signOut} className="text-xs font-medium text-charcoal-muted hover:text-charcoal cursor-pointer">Sign Out</button>
          ) : (
            <Link href="/login" className="text-xs font-medium text-charcoal-muted hover:text-charcoal no-underline">Sign In</Link>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}