'use client'

import React, { useEffect, useState, useMemo } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface Product {
  product_name: string
  product_type: string
  brand: string
  price_range: string
  store_type: 'general' | 'agro'
  unit: string
  link?: string
}

interface StoreProductsProps {
  districtId: number | null
  pestName: string | null
  districtName?: string
}

const TYPE_COLORS: Record<string, string> = {
  fungicide: 'bg-emerald/10 text-emerald border-emerald/30',
  insecticide: 'bg-terra/10 text-terra-dark border-terra/30',
  pesticide: 'bg-amber/10 text-amber-dark border-amber/30',
  'bio-control': 'bg-sage/10 text-sage border-sage/30',
  trap: 'bg-stone-tint text-charcoal-muted border-stone',
  other: 'bg-parchment-dark text-charcoal-muted border-stone',
}

function shortenName(name: string): string {
  const BORING = /\b(buy|online|best|price|in|india|for|of|the|at|shop|now|get)\b/gi
  let s = name.replace(BORING, '').replace(/\s+/g, ' ').trim()
  if (s.length > 60) s = s.slice(0, 57) + '...'
  return s
}

function parseMaxPrice(priceRange: string): number {
  const matches = priceRange.match(/₹([\d,]+)/g)
  if (!matches) return 0
  const vals = matches.map(s => parseFloat(s.replace(/[₹,]/g, '')))
  return Math.max(...vals)
}

function formatPriceValue(num: number): string {
  if (num >= 1000) return `₹${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}k`
  return `₹${num}`
}

export default function StoreProducts({ districtId, pestName, districtName }: StoreProductsProps) {
  const { dict } = useLocale()
  const [products, setProducts] = useState<Product[] | null>(null)
  const [isSerp, setIsSerp] = useState(false)
  const [priceFilter, setPriceFilter] = useState(100)

  useEffect(() => {
    const ctrl = new AbortController()
    const params = new URLSearchParams()
    if (districtId) params.set('district_id', String(districtId))
    if (pestName) params.set('pest_name', pestName)
    fetch(`/api/store-products?${params}`, { signal: ctrl.signal })
      .then(r => r.json())
      .then(data => {
        if (ctrl.signal.aborted) return
        setProducts(data.products || [])
        setIsSerp(data.source === 'serp')
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setProducts([])
      })
    return () => { ctrl.abort() }
  }, [districtId, pestName])

  const maxPrice = useMemo(() => {
    if (!products?.length) return 0
    return Math.max(...products.map(p => parseMaxPrice(p.price_range)))
  }, [products])

  const filtered = useMemo(() => {
    if (!products?.length) return []
    const threshold = maxPrice * priceFilter / 100
    return products.filter(p => parseMaxPrice(p.price_range) <= threshold)
  }, [products, maxPrice, priceFilter])

  if (products === null) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 bg-parchment-dark animate-pulse border border-stone" />
        ))}
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div>
      <p className="eyebrow mb-2">{dict.ui.availableProducts || 'Available Products'}</p>
      {districtName && (
        <p className="text-xs text-charcoal-muted mb-3">
          {dict.ui.nearbyStores || 'Nearby stores in'} <span className="font-medium text-charcoal">{districtName}</span>
        </p>
      )}

      {isSerp && products.length > 1 && (
        <div className="mb-4 px-2 py-3 border border-stone bg-parchment-tint">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal-muted">Price</span>
            <span className="text-[11px] font-medium text-charcoal">
              Up to {formatPriceValue(maxPrice * priceFilter / 100)}
              <span className="text-charcoal-muted font-normal ml-1">({filtered.length}/{products.length})</span>
            </span>
          </div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[priceFilter]}
            onValueChange={([v]) => setPriceFilter(v)}
            max={100}
            step={1}
          >
            <Slider.Track className="relative flex-grow rounded-full h-1 bg-stone-tint">
              <Slider.Range className="absolute rounded-full h-full bg-sage" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 bg-parchment-tint border border-charcoal shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] rounded-full hover:bg-parchment focus:outline-none focus:shadow-[0_0_0_4px_rgba(74,93,35,0.3)]"
              aria-label="Max price"
            />
          </Slider.Root>
        </div>
      )}

      <div className="space-y-1.5">
        {filtered.map((p, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 px-3 py-2 border border-stone bg-parchment ${p.link ? 'hover:border-charcoal-muted transition-colors' : ''}`}
          >
            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 border rounded-sm shrink-0 mt-0.5 ${TYPE_COLORS[p.product_type] || TYPE_COLORS.other}`}>
              {p.product_type}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal leading-snug line-clamp-2" title={p.product_name}>
                {shortenName(p.product_name)}
              </p>
              <p className="text-[11px] text-charcoal-muted mt-0.5">
                {p.brand}
                {isSerp && p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-sage underline hover:text-sage-dark" onClick={e => e.stopPropagation()}>
                    View Deal
                  </a>
                )}
              </p>
            </div>
            <div className="text-right shrink-0 min-w-[90px]">
              <p className="text-xs font-semibold text-charcoal">{p.price_range}</p>
              <p className="text-[10px] text-charcoal-muted mt-0.5">{p.store_type === 'general' ? 'General Store' : 'Agro Store'}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && products.length > 0 && (
        <p className="text-[11px] text-charcoal-muted mt-2">No products within this price range.</p>
      )}

      {isSerp && (
        <p className="text-[10px] text-charcoal-muted mt-2">
          Prices from Google Shopping · may vary by store
        </p>
      )}
      {!isSerp && (
        <p className="text-[10px] text-charcoal-muted mt-2 italic">
          {dict.ui.pricesMayVary || 'Prices may vary by store location'}
        </p>
      )}
    </div>
  )
}
