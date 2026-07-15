import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message, source, lineno, colno, error, url, userAgent } = await req.json()

    const errorData = {
      timestamp: new Date().toISOString(),
      message,
      source,
      lineno,
      colno,
      error: error ? { name: error.name, message: error.message, stack: error.stack } : null,
      url,
      userAgent,
    }

    console.error('[Client Error]', JSON.stringify(errorData, null, 2))

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Log-error endpoint failed:', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
