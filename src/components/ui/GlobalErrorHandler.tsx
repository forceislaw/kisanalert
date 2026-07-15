'use client'

import { useEffect, type ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

export function GlobalErrorHandler({ children }: { children: ReactNode }) {
  useEffect(() => {
    function handleGlobal(event: ErrorEvent) {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: event.message,
          source: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {})
    }

    function handleRejection(event: PromiseRejectionEvent) {
      const error = event.reason instanceof Error ? {
        name: event.reason.name,
        message: event.reason.message,
        stack: event.reason.stack,
      } : { name: 'UnhandledRejection', message: String(event.reason), stack: undefined }

      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          error,
          source: 'Unhandled Promise Rejection',
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {})
    }

    window.addEventListener('error', handleGlobal)
    window.addEventListener('unhandledrejection', handleRejection)
    return () => {
      window.removeEventListener('error', handleGlobal)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return <ErrorBoundary>{children}</ErrorBoundary>
}
