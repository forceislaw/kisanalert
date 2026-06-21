'use client'

import { useEffect } from 'react'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="border border-terra bg-terra/10 p-6 max-w-md text-center">
        <h2 className="text-lg font-bold text-charcoal mb-2">Something went wrong</h2>
        <p className="text-sm text-charcoal-muted mb-4">An unexpected error occurred. Please try again.</p>
        <button
          onClick={() => reset()}
          className="btn-primary text-sm px-4 py-1.5"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
