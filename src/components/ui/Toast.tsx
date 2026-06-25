'use client'

import React, { useEffect } from 'react'

export type ToastType = 'success' | 'error'

export default function Toast({
  message,
  type,
  onClose,
}: {
  message: string
  type: ToastType
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in fade-in slide-in-from-bottom-2">
      <div className={`card-editorial px-4 py-3 flex items-center gap-3 text-sm ${
        type === 'success' ? 'border-sage' : 'border-terra'
      }`}>
        <span className={type === 'success' ? 'text-sage' : 'text-terra'}>
          {type === 'success' ? '✓' : '✗'}
        </span>
        <span className="text-charcoal">{message}</span>
        <button onClick={onClose} className="ml-2 text-charcoal-muted hover:text-charcoal cursor-pointer text-xs">
          x
        </button>
      </div>
    </div>
  )
}
