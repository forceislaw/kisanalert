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

export function proxy(req: NextRequest) {
  const now = Date.now()
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown'

  const url = new URL(req.url)
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

  const response = NextResponse.next()

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '0')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)')

  return response
}

export const config = {
  matcher: '/api/:path*',
}
