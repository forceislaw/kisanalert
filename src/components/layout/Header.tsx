'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useAuth } from '@/lib/auth/AuthProvider'
import { Dictionary } from '@/lib/i18n/getDictionary'
import LanguageSwitcher from '@/components/nav/LanguageSwitcher'

const navItems: { href: string; labelKey: keyof Dictionary['nav'] }[] = [
  { href: 'dashboard', labelKey: 'dashboard' },
  { href: 'dashboard/map', labelKey: 'map' },
  { href: 'reports', labelKey: 'reports' },
  { href: 'dashboard/upload', labelKey: 'reportNew' },
  { href: 'settings', labelKey: 'settings' },
]

export default function Header() {
  const { dict } = useLocale()
  const { user, loading, signOut } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const currentPath = pathname.replace(/^\//, '')

  const isActive = (href: string) => {
    if (href === 'dashboard') return currentPath === 'dashboard' || currentPath === ''
    return currentPath.startsWith(href)
  }

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header className="editorial-header bg-parchment">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-12">
            <Link href="/dashboard" className="flex items-center gap-2 no-underline">
              <span className="text-xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
                KisanAlert
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-0 h-8">
              {navItems.map((item, i) => (
                <React.Fragment key={item.href}>
                  {i > 0 && <div className="rule-v mx-10 h-4" />}
                  <Link
                    href={`/${item.href}`}
                    className={`nav-link-editorial text-sm px-3 ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {dict.nav[item.labelKey]}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
            <button
              className="md:hidden ml-4 p-1 cursor-pointer"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {menuOpen && (
            <div className="absolute top-16 left-0 right-0 z-50 bg-parchment border-b border-stone shadow-md md:hidden">
              <div className="flex flex-col px-4 py-3 gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${item.href}`}
                    onClick={handleNavClick}
                    className={`px-3 py-2 text-sm ${isActive(item.href) ? 'bg-parchment-tint font-medium' : ''}`}
                  >
                    {dict.nav[item.labelKey]}
                  </Link>
                ))}
                <div className="border-t border-stone my-2" />
                <div className="flex items-center gap-3 px-3 py-2">
                  {loading ? null : user ? (
                    <button onClick={signOut} className="btn-secondary text-xs px-3 py-1">Sign Out</button>
                  ) : (
                    <Link href="/login" onClick={handleNavClick} className="btn-primary text-xs px-3 py-1 no-underline">Sign In</Link>
                  )}
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
          <div className="hidden md:flex items-center gap-3">
            {loading ? null : user ? (
              <button onClick={signOut} className="btn-secondary text-xs px-3 py-1">
                Sign Out
              </button>
            ) : (
              <Link href="/login" className="btn-primary text-xs px-3 py-1 no-underline">
                Sign In
              </Link>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
