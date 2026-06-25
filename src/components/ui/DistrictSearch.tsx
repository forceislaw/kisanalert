'use client'

import React, { useState, useRef, useEffect } from 'react'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface DistrictSearchProps {
  value: number | null
  onChange: (districtId: number | null) => void
  className?: string
  allowAll?: boolean
  placeholder?: string
  nameToIdMap?: Record<string, number>
}

export function DistrictSearch({ value, onChange, className, allowAll, placeholder, nameToIdMap }: DistrictSearchProps) {
  const { dict } = useLocale();
  const [query, setQuery] = useState(() => {
    if (!value || !nameToIdMap) return ''
    const name = Object.entries(nameToIdMap).find(([, id]) => id === value)?.[0]
    return name || ''
  })
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
      <input
        placeholder={placeholder || dict.ui.searchDistrict}
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        className="select-editorial w-full"
      />
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-input bg-popover shadow-md">
          {allowAll && (
            <button
              type="button"
              className={`w-full text-left px-2.5 py-1.5 text-sm hover:bg-accent cursor-pointer ${!value ? 'bg-accent font-medium' : ''}`}
              onClick={() => { onChange(null); setOpen(false); setQuery('') }}
            >
              {dict.ui.allDistricts}
            </button>
          )}
          {filtered.length === 0 && (
            <div className="px-2.5 py-2 text-sm text-muted-foreground">{dict.ui.noDistrictsFound}</div>
          )}
          {filtered.map((d) => {
            const dbId = nameToIdMap?.[d.name_en] || 0
            return (
              <button
                key={dbId}
                type="button"
                className={`w-full text-left px-2.5 py-1.5 text-sm hover:bg-accent cursor-pointer flex justify-between gap-2 ${dbId === value ? 'bg-accent font-medium' : ''}`}
                onClick={() => { onChange(dbId || null); setOpen(false); setQuery(d.name_en) }}
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
