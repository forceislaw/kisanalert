import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { endpoint } = await req.json()
    if (!endpoint) return NextResponse.json({ error: 'missing endpoint' }, { status: 400 })
    const svc = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )
    await svc.from('push_subscriptions').delete().eq('endpoint', endpoint)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
