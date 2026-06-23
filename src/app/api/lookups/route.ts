import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServiceClient()

  const [cropsRes, pestsRes, districtsRes] = await Promise.all([
    supabase.from('crops').select('id, key_name'),
    supabase.from('pests').select('id, key_name'),
    supabase.from('districts').select('id, name_en'),
  ])

  const cropMap: Record<string, number> = {}
  for (const c of (cropsRes.data as { id: number; key_name: string }[]) || []) cropMap[c.key_name] = c.id

  const pestMap: Record<string, number> = {}
  for (const p of (pestsRes.data as { id: number; key_name: string }[]) || []) pestMap[p.key_name] = p.id

  const districtMap: Record<string, number> = {}
  for (const d of (districtsRes.data as { id: number; name_en: string }[]) || []) districtMap[d.name_en] = d.id

  return NextResponse.json({ cropMap, pestMap, districtMap })
}
