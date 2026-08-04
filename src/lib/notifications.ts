export async function sendNotification(params: {
  to: string
  subject: string
  text: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log('Notification (no RESEND_API_KEY):', params.subject, '->', params.to)
    return { sent: false, reason: 'no_api_key' }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Apentomos <onboarding@resend.dev>',
        to: params.to,
        subject: params.subject,
        text: params.text,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.warn('Resend error:', res.status, errText)
      await logError('resend_send_failed', { status: res.status, body: errText, to: params.to, subject: params.subject })
      return { sent: false, reason: `resend_${res.status}` }
    }

    return { sent: true }
  } catch (e) {
    console.error('Failed to send email:', e)
    await logError('resend_exception', { error: String(e), to: params.to, subject: params.subject })
    return { sent: false, reason: String(e) }
  }
}

async function logError(type: string, payload: Record<string, unknown>) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://apentomos.app'
    await fetch(`${base}/api/log-error`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload, timestamp: new Date().toISOString() }),
    })
  } catch {
    // swallow logging errors
  }
}
