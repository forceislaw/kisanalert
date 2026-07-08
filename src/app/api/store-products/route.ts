import { NextRequest, NextResponse } from 'next/server'
import { STORE_PRODUCTS } from '@/lib/seed/store-products'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const districtId = searchParams.get('district_id')
  const pestName = searchParams.get('pest_name')

  let districtName = ''
  if (districtId) {
    const district = RAIN_SHADOW_DISTRICTS[Number(districtId) - 1]
    if (district) districtName = district.name_en
  }

  const pestKey = pestName
    ?.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '') || ''

  let products = STORE_PRODUCTS

  if (pestKey) {
    const pestProducts = products.filter(p => p.pest_key === pestKey)
    if (pestProducts.length > 0) {
      products = pestProducts
    } else {
      const partial = products.filter(p =>
        pestKey.includes(p.pest_key) || p.pest_key.includes(pestKey)
      )
      products = partial.length > 0 ? partial : products.filter(p => p.pest_key === 'general')
    }
  } else {
    products = products.filter(p => p.pest_key === 'general')
  }

  return NextResponse.json({
    products,
    district: districtName,
    pest: pestName || null,
    total: products.length,
  })
}
