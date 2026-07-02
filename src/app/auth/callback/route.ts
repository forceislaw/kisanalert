import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/supabase/types'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  let errorMsg = searchParams.get('error')

  async function getSupabase() {
    const cookieStore = await cookies()
    return createServerClient<Database>(
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
  }

  if (tokenHash && type === 'signup') {
    const supabase = await getSupabase()
    const { error } = await supabase.auth.verifyOtp({ type: 'signup', token_hash: tokenHash })
    if (!error) return NextResponse.redirect(new URL('/login?verified=true', origin))
    return NextResponse.redirect(new URL('/login?error=auth_failed', origin))
  }

  if (code) {
    const supabase = await getSupabase()

    // If type=signup is present, this is email verification, skip OAuth exchange
    if (type === 'signup') {
      const { error: verifyError } = await supabase.auth.verifyOtp({ type: 'signup', token_hash: code })
      if (!verifyError) return NextResponse.redirect(new URL('/login?verified=true', origin))
      errorMsg = verifyError?.message
    } else {
      // OAuth flow (Google sign-in or PKCE email verification)
      let exchangeError: { message: string } | null = null
      try {
        const result = await supabase.auth.exchangeCodeForSession(code)
        exchangeError = result.error
      } catch (e: any) {
        exchangeError = { message: e?.message || 'Unexpected error exchanging code' }
      }

      if (!exchangeError) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user?.id) {
          await supabase.from('profiles').upsert(
            { id: user.id, full_name: user.user_metadata?.full_name || null, phone_number: user.user_metadata?.phone || null } as never,
            { onConflict: 'id' },
          )
        }

        const from = searchParams.get('from')
        if (from === 'register') {
          const hasMultipleIdentities = (user?.identities?.length || 0) > 1
          const alreadyOnboarded = user?.user_metadata?.onboarded === true
          let hasExistingData = false
          try {
            const { count } = await supabase.from('pest_reports').select('*', { count: 'exact', head: true }).eq('user_id', user!.id)
            const { data: profile } = await supabase.from('profiles').select('id').eq('id', user!.id).maybeSingle()
            if ((count && count > 0) || profile) hasExistingData = true
          } catch { /* ignore */ }
          if (hasMultipleIdentities || alreadyOnboarded || hasExistingData) {
            await supabase.auth.signOut()
            return NextResponse.redirect(new URL('/login?error=email_exists', origin))
          }
        }
        if (user?.user_metadata?.onboarded) return NextResponse.redirect(new URL('/dashboard', origin))

        const { count } = await supabase.from('pest_reports').select('*', { count: 'exact', head: true }).eq('user_id', user!.id)
        const { data: profile } = await supabase.from('profiles').select('id').eq('id', user!.id).maybeSingle()
        if ((count && count > 0) || profile) {
          await supabase.auth.updateUser({ data: { onboarded: true } })
          return NextResponse.redirect(new URL('/dashboard', origin))
        }
        return NextResponse.redirect(new URL('/onboarding', origin))
      }

      // Exchange failed — try email verification via code (acts as token_hash)
      const { error: verifyError } = await supabase.auth.verifyOtp({ type: 'signup', token_hash: code })
      if (!verifyError) return NextResponse.redirect(new URL('/login?verified=true', origin))

      errorMsg = exchangeError?.message || verifyError?.message
    }
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
