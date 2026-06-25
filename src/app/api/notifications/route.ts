import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod'

const PrefsSchema = z.object({
  sms_alerts: z.boolean(),
  email_alerts: z.boolean(),
  critical_only: z.boolean(),
})

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('user_notification_prefs')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Notifications GET Error:', error.message)
    return NextResponse.json({ error: 'Failed to load preferences.' }, { status: 500 })
  }

  return NextResponse.json({
    data: data || { sms_alerts: true, email_alerts: true, critical_only: false }
  })
}

export async function PUT(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = PrefsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid preferences.', details: parsed.error.issues }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('user_notification_prefs')
    .upsert([{
      user_id: user.id,
      sms_alerts: parsed.data.sms_alerts,
      email_alerts: parsed.data.email_alerts,
      critical_only: parsed.data.critical_only,
      updated_at: new Date().toISOString(),
    }] as never[])
    .select()
    .single()

  if (error) {
    console.error('Notifications PUT Error:', error.message)
    return NextResponse.json({ error: 'Failed to save preferences.' }, { status: 500 })
  }

  return NextResponse.json({ data })
}