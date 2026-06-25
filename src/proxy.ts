import { NextRequest, NextResponse } from 'next/server'

const rateMap = new Map<string, { timestamps: number[]; path: string }[]>()
const WINDOW_MS = 60_000

const LIMITS: Record<string, number> = {
  '/api/vision-analyze': 10,
  '/api/reports': 60,
  '/api/dashboard': 120,
  '/api/heatmap': 120,
  '/api/lookups': 120,
  '/api/notifications': 30,
  'default': 120,
}

const ALLOWED_ORIGINS = [
  'https://kisanalert-app.vercel.app',
  'https://kisanalert.vercel.app',
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean) as string[]

const MAX_BODY_MB = 6

const SQLI_PATTERNS = [
  /(\bOR\b|\bAND\b)\s+[\d\"']+\s*[=<>]/i,
  /\bUNION\b\s+\bSELECT\b/i,
  /\bDROP\s+TABLE\b/i,
  /\bALTER\s+TABLE\b/i,
  /\bCREATE\s+TABLE\b/i,
  /\bSELECT\s+.*\bFROM\b.*\bWHERE\b/i,
  /'\s*--/,
  /;\s*DROP\s/i,
  /\bxp_cmdshell\b/i,
  /\bWAITFOR\s+DELAY\b/i,
  /\/\*!\d+\s+SELECT/i,
  /'\s*OR\s*'\d*'\s*=\s*'/i,
  /'\s*OR\s*1\s*=\s*1/i,
]

const XSS_PATTERNS = [
  /<script[^>]*>/i,
  /javascript\s*:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /onclick\s*=/i,
  /onfocus\s*=/i,
  /onmouseover\s*=/i,
  /<[^>]*>\s*alert\s*\(/i,
  /document\.cookie/i,
  /eval\s*\(/i,
  /String\.fromCharCode/i,
  /<svg[^>]*>/i,
  /<iframe[^>]*>/i,
]

const TRAVERSAL_PATTERNS = [
  /\.\.(\/|\\)/,
  /%2e%2e/,
  /%252e%252e/,
  /\.\.%00/,
  /\.\.(\\|%5c)/,
  /etc\/passwd/i,
  /etc\/shadow/i,
  /boot\.ini/i,
  /windows\\win\.ini/i,
]

const BOT_USER_AGENTS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /zgrab/i,
  /masscan/i,
  /dirbuster/i,
  /gobuster/i,
  /wpscan/i,
  /acunetix/i,
  /burpsuite/i,
  /nessus/i,
  /openvas/i,
  /python-requests/i,
  /go-http-client/i,
  /curl/i,
  /wget/i,
]

function scanValues(values: string[], patterns: RegExp[]): string | null {
  for (const v of values) {
    if (!v || v.length > 2000) continue
    const decoded = decodeURIComponent(v)
    for (const p of patterns) {
      if (p.test(decoded)) return p.source
    }
  }
  return null
}

function wafCheck(req: NextRequest): NextResponse | null {
  const url = new URL(req.url)
  const ua = req.headers.get('user-agent') || ''

  for (const b of BOT_USER_AGENTS) {
    if (b.test(ua)) {
      return new NextResponse(null, { status: 403 })
    }
  }

  const allParams: string[] = []
  url.searchParams.forEach((v) => allParams.push(v))
  allParams.push(url.pathname)

  const sqli = scanValues(allParams, SQLI_PATTERNS)
  if (sqli) {
    return new NextResponse(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const xss = scanValues(allParams, XSS_PATTERNS)
  if (xss) {
    return new NextResponse(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const trav = scanValues(allParams, TRAVERSAL_PATTERNS)
  if (trav) {
    return new NextResponse(JSON.stringify({ error: 'Bad request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const cl = req.headers.get('content-length')
  if (cl && parseInt(cl) > MAX_BODY_MB * 1024 * 1024) {
    return new NextResponse(JSON.stringify({ error: 'Request too large' }), {
      status: 413,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return null
}

export function proxy(req: NextRequest) {
  const now = Date.now()
  const url = new URL(req.url)
  const isApi = url.pathname.startsWith('/api')

  if (isApi) {
    const blocked = wafCheck(req)
    if (blocked) return blocked

    const origin = req.headers.get('origin')
    const referer = req.headers.get('referer')

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const sourceOrigin = origin || (referer ? new URL(referer).origin : null)
      if (sourceOrigin) {
        const allowed = ALLOWED_ORIGINS.some(o => {
          if (o === sourceOrigin) return true
          try { return new URL(o).hostname === new URL(sourceOrigin).hostname } catch { return false }
        })
        if (!allowed) {
          return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      }
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown'

    const limit = Object.entries(LIMITS).find(([path]) => url.pathname.startsWith(path))?.[1] || LIMITS['default']

    const entries = (rateMap.get(ip) || []).filter(e => now - e.timestamps[e.timestamps.length - 1] < WINDOW_MS)
    const ipTotal = entries.reduce((sum, e) => sum + e.timestamps.length, 0)

    if (ipTotal >= LIMITS['default']) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
      })
    }

    const pathEntry = entries.find(e => e.path === url.pathname)
    const pathCount = pathEntry?.timestamps.length || 0
    if (pathCount >= limit) {
      return new NextResponse(JSON.stringify({ error: `Too many requests to ${url.pathname}` }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
      })
    }

    if (pathEntry) {
      pathEntry.timestamps.push(now)
    } else {
      entries.push({ timestamps: [now], path: url.pathname })
    }
    rateMap.set(ip, entries)
  }

  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '0')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  if (isApi) {
    response.headers.set('Content-Security-Policy', "default-src 'none'; base-uri 'none'; form-action 'none'")
  } else {
    response.headers.set('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://*.supabase.co",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co",
      "base-uri 'self'",
      "frame-src 'none'",
      "object-src 'none'",
    ].join('; '))
  }

  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
