'use client'

import React from 'react'

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive,
}: {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/30 p-4" onClick={onCancel}>
      <div className="card-editorial p-6 max-w-sm w-full text-center space-y-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-sm font-bold text-charcoal">{title}</h3>
        <p className="text-xs text-charcoal-muted">{message}</p>
        <div className="flex gap-3 justify-center pt-2">
          <button onClick={onCancel} className="btn-secondary text-xs px-4 py-1.5">{cancelLabel}</button>
          <button
            onClick={onConfirm}
            className={`text-xs px-4 py-1.5 font-medium border cursor-pointer ${
              destructive
                ? 'bg-terra text-white border-terra hover:bg-terra-tint'
                : 'btn-primary'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
