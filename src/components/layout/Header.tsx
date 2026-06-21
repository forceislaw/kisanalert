'use client'

import React from 'react'
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

  const currentPath = pathname.replace(/^\//, '')

  const isActive = (href: string) => {
    if (href === 'dashboard') return currentPath === 'dashboard' || currentPath === ''
    return currentPath.startsWith(href)
  }

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
          </div>
          <div className="flex items-center gap-3">
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
