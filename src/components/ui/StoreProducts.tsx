'use client'

import React, { useEffect, useState } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface Product {
  product_name: string
  product_type: string
  brand: string
  price_range: string
  store_type: 'general' | 'agro'
  unit: string
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

export default function StoreProducts({ districtId, pestName, districtName }: StoreProductsProps) {
  const { dict } = useLocale()
  const [products, setProducts] = useState<Product[] | null>(null)

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
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setProducts([])
      })
    return () => { ctrl.abort() }
  }, [districtId, pestName])

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
      <div className="space-y-1.5">
        {products.map((p, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2 border border-stone bg-parchment">
            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 border rounded-sm shrink-0 ${TYPE_COLORS[p.product_type] || TYPE_COLORS.other}`}>
              {p.product_type}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-charcoal truncate">{p.product_name}</p>
              <p className="text-[11px] text-charcoal-muted">{p.brand} · {p.unit}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-charcoal whitespace-nowrap">{p.price_range}</p>
              <p className="text-[10px] text-charcoal-muted">{p.store_type === 'general' ? 'General Store' : 'Agro Store'}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-charcoal-muted mt-2 italic">
        {dict.ui.pricesMayVary || 'Prices may vary by store location'}
      </p>
    </div>
  )
}
