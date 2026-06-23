import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServiceClient()

  const [cropsRes, pestsRes, districtsRes] = await Promise.all([
    supabase.from('crops').select('id, key_name'),
    supabase.from('pests').select('id, key_name'),
    supabase.from('districts').select('id, name_en, latitude, longitude'),
  ])

  const cropMap: Record<string, number> = {}
  for (const c of (cropsRes.data as { id: number; key_name: string }[]) || []) cropMap[c.key_name] = c.id

  const pestMap: Record<string, number> = {}
  for (const p of (pestsRes.data as { id: number; key_name: string }[]) || []) pestMap[p.key_name] = p.id

  const districtMap: Record<string, number> = {}
  const districtGeo: Record<number, { latitude: number; longitude: number }> = {}
  for (const d of (districtsRes.data as { id: number; name_en: string; latitude: number; longitude: number }[]) || []) {
    districtMap[d.name_en] = d.id
    districtGeo[d.id] = { latitude: d.latitude, longitude: d.longitude }
  }

  return NextResponse.json({ cropMap, pestMap, districtMap, districtGeo })
}
