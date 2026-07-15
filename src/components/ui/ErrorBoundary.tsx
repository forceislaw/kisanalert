'use client'

import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (typeof navigator !== 'undefined') {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          error: { name: error.name, message: error.message, stack: error.stack },
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {})
    }

    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="card-alert p-6 max-w-sm text-center space-y-3">
            <p className="text-sm text-charcoal-muted">Something went wrong. <br/>Please refresh the page.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
