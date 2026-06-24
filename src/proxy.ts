import { NextRequest, NextResponse } from 'next/server'

const rateMap = new Map<string, number[]>()

const WINDOW_MS = 60_000
const MAX_REQUESTS = 60

export function proxy(req: NextRequest) {
  const now = Date.now()
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown'

  const timestamps = (rateMap.get(ip) || []).filter(t => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    })
  }

  timestamps.push(now)
  rateMap.set(ip, timestamps)

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
