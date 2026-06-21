'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        reg.onupdatefound = () => {
          const installing = reg.installing
          if (installing) {
            installing.onstatechange = () => {
              if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New content available; refresh when ready.')
              }
            }
          }
        }
      })
      .catch((err) => console.warn('SW registration failed:', err))
  }, [])

  return null
}
