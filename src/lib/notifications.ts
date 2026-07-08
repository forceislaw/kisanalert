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
        from: 'Apentomos <notifications@apentomos.app>',
        to: params.to,
        subject: params.subject,
        text: params.text,
      }),
    })
    const ok = res.ok
    if (!ok) console.warn('Resend error:', await res.text())
    return { sent: ok }
  } catch (e) {
    console.error('Failed to send email:', e)
    return { sent: false, reason: String(e) }
  }
}
