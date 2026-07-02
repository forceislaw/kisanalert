'use client'

import React, { useState } from 'react'

export default function CollapsibleSection({ title, children, defaultOpen = true }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="eyebrow w-full flex items-center justify-between cursor-pointer text-left"
      >
        <span>{title}</span>
        <span className="text-charcoal-muted text-xs transition-transform duration-200" style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
          &#9660;
        </span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}
