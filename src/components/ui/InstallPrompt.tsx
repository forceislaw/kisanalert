'use client'

import React, { useEffect, useRef, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [show, setShow] = useState(false)
  const dismissed = useRef(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      if (dismissed.current) return
      setDeferredPrompt(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const result = await deferredPrompt.userChoice
    if (result.outcome === 'accepted') {
      setShow(false)
      dismissed.current = true
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShow(false)
    dismissed.current = true
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto">
      <div className="card-editorial p-4 flex items-center gap-3 shadow-lg">
        <svg viewBox="0 0 40 40" className="w-10 h-10 shrink-0" fill="none">
          <circle cx="20" cy="20" r="20" fill="#E07A5F"/>
          <path d="M20 28C11 24 13 12 20 8C27 12 29 24 20 28Z" fill="#F7F5F0"/>
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-charcoal">Install Apentomos</p>
          <p className="text-xs text-charcoal-muted truncate">Get faster access &amp; offline support</p>
        </div>
        <button onClick={handleInstall} className="btn-primary text-xs px-3 py-1.5 shrink-0">Install</button>
        <button onClick={handleDismiss} className="text-charcoal-muted hover:text-charcoal shrink-0 p-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeWidth={1.5} d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
