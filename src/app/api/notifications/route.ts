import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Database } from '@/lib/supabase/types'

const PrefsSchema = z.object({
  sms_alerts: z.boolean(),
  email_alerts: z.boolean(),
  critical_only: z.boolean(),
})

type PrefsInsert = Database['public']['Tables']['user_notification_prefs']['Insert']

const prefsInsertData = (userId: string, prefs: z.infer<typeof PrefsSchema>): PrefsInsert[] => [{
  user_id: userId,
  sms_alerts: prefs.sms_alerts,
  email_alerts: prefs.email_alerts,
  critical_only: prefs.critical_only,
  updated_at: new Date().toISOString(),
}]

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

  if (error) throw new Error(error.message)

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
    .upsert(prefsInsertData(user.id, parsed.data) as any)
    .select()
    .single()

  if (error) throw new Error(error.message)

  return NextResponse.json({ data })
}