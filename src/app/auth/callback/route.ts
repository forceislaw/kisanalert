import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')

  let errorMsg = searchParams.get('error')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()

      // Create profile if it doesn't exist
      if (user?.id) {
        await (supabase.from('profiles') as any).upsert({
          id: user.id,
          full_name: user.user_metadata?.full_name || null,
          phone_number: user.user_metadata?.phone || null,
        }, { onConflict: 'id' })
      }
      const from = searchParams.get('from')

      if (!user?.id) {
        return NextResponse.redirect(new URL('/dashboard', origin))
      }

      // Came from register page — check if this is an existing user trying to re-register
      if (from === 'register') {
        const hasMultipleIdentities = (user.identities?.length || 0) > 1
        const alreadyOnboarded = user?.user_metadata?.onboarded === true

        // Check if user has existing reports or a profile under any user_id with this email
        let hasExistingData = false
        try {
          const serviceClient = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
          )
          const { count } = await serviceClient
            .from('pest_reports')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
          const { data: profile } = await serviceClient
            .from('profiles')
            .select('id')
            .eq('id', user.id)
            .maybeSingle()
          if ((count && count > 0) || profile) hasExistingData = true
        } catch { /* ignore */ }

        if (hasMultipleIdentities || alreadyOnboarded || hasExistingData) {
          // Sign out to prevent auto-login on the login page
          await supabase.auth.signOut()
          return NextResponse.redirect(new URL('/login?error=email_exists', origin))
        }
      }

      if (user?.user_metadata?.onboarded) {
        return NextResponse.redirect(new URL('/dashboard', origin))
      }

      // Check if user has existing reports or a profile
      const serviceClient = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const { count } = await serviceClient
        .from('pest_reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { data: profile } = await serviceClient
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()

      if ((count && count > 0) || profile) {
        await supabase.auth.updateUser({ data: { onboarded: true } })
        return NextResponse.redirect(new URL('/dashboard', origin))
      }

      return NextResponse.redirect(new URL('/onboarding', origin))
    }
    errorMsg = error?.message
  }

  const params = new URLSearchParams()
  if (errorMsg) {
    if (errorMsg.toLowerCase().includes('already registered') || errorMsg.toLowerCase().includes('already exists')) {
      params.set('error', 'email_exists')
    } else {
      params.set('error', 'auth_failed')
    }
  }
  const qs = params.toString()
  return NextResponse.redirect(new URL(qs ? `/login?${qs}` : '/login', origin))
}
