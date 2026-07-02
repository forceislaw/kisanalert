import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const svc = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
    await svc.from('push_subscriptions').upsert(
      { endpoint: body.endpoint, keys: body.keys, ip_address: ip, updated_at: new Date().toISOString() },
      { onConflict: 'endpoint' },
    )
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
