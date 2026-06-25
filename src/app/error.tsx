'use client'

import { useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { dict } = useLocale()
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="card-alert p-8 max-w-md text-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" className="mx-auto">
          <circle cx="20" cy="20" r="20" fill="#E07A5F"/>
          <path d="M20 28 C11 24 13 12 20 8 C27 12 29 24 20 28Z" fill="#F7F5F0"/>
        </svg>
        <h2 className="text-lg font-bold text-charcoal">{dict.errors.somethingWentWrong}</h2>
        <p className="text-sm text-charcoal-muted">{dict.errors.unexpectedError}</p>
        <button
          onClick={() => reset()}
          className="btn-primary text-sm px-4 py-1.5"
        >
          {dict.errors.tryAgain}
        </button>
      </div>
    </div>
  )
}
