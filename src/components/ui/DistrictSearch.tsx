'use client'

import React, { useState, useRef, useEffect } from 'react'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
import { Input } from './input'

interface DistrictSearchProps {
  value: number | null
  onChange: (districtId: number | null) => void
  className?: string
  allowAll?: boolean
  placeholder?: string
}

export function DistrictSearch({ value, onChange, className, allowAll, placeholder }: DistrictSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = value ? RAIN_SHADOW_DISTRICTS[value - 1] : null
  useEffect(() => {
    if (selected) setQuery(selected.name_en)
    else if (allowAll) setQuery('')
  }, [value])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = query.trim()
    ? RAIN_SHADOW_DISTRICTS.filter(d =>
        d.name_en.toLowerCase().includes(query.toLowerCase()) ||
        d.state_en.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 100)
    : RAIN_SHADOW_DISTRICTS.slice(0, 100)

  return (
    <div ref={ref} className={`relative ${className || ''}`}>
      <Input
        placeholder={placeholder || "Search district..."}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-input bg-popover shadow-md">
          {allowAll && (
            <button
              type="button"
              className={`w-full text-left px-2.5 py-1.5 text-sm hover:bg-accent cursor-pointer ${!value ? 'bg-accent font-medium' : ''}`}
              onClick={() => { onChange(null); setOpen(false); setQuery('') }}
            >
              All Districts
            </button>
          )}
          {filtered.length === 0 && (
            <div className="px-2.5 py-2 text-sm text-muted-foreground">No districts found</div>
          )}
          {filtered.map((d) => {
            const idx = RAIN_SHADOW_DISTRICTS.indexOf(d)
            return (
              <button
                key={idx}
                type="button"
                className={`w-full text-left px-2.5 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between gap-2 ${idx + 1 === value ? 'bg-accent font-medium' : ''}`}
                onClick={() => { onChange(idx + 1); setOpen(false); setQuery(d.name_en) }}
              >
                <span>{d.name_en}</span>
                <span className="text-xs text-muted-foreground">{d.state_en}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
