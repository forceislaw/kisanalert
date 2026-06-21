import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod'

const PrefsSchema = z.object({
  sms_alerts: z.boolean(),
  email_alerts: z.boolean(),
  critical_only: z.boolean(),
})

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data, error } = await (supabase
      .from('user_notification_prefs') as any)
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error) throw new Error(error.message)

    return NextResponse.json({
      data: data || { sms_alerts: true, email_alerts: true, critical_only: false }
    })
  } catch {
    return NextResponse.json({ data: { sms_alerts: true, email_alerts: true, critical_only: false } })
  }
}

export async function PUT(req: NextRequest) {
  try {
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

    const { data, error } = await (supabase
      .from('user_notification_prefs') as any)
      .upsert({
        user_id: user.id,
        ...parsed.data,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw new Error(error.message)

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Failed to save preferences.' }, { status: 500 })
  }
}
