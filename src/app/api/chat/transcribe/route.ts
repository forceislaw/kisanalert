import { NextRequest, NextResponse } from 'next/server'

const GROQ_CHAT_API_KEY = process.env.GROQ_CHAT_API_KEY

export async function POST(req: NextRequest) {
  if (!GROQ_CHAT_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as Blob | null

    if (!audio || audio.size === 0) {
      return NextResponse.json({ error: 'No audio provided' }, { status: 400 })
    }

    if (audio.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Audio too large' }, { status: 400 })
    }

    const whisperForm = new FormData()
    const ext = audio.type.includes('mp4') ? 'mp4' : audio.type.includes('ogg') ? 'ogg' : 'webm'
    whisperForm.append('file', audio, `recording.${ext}`)
    whisperForm.append('model', 'whisper-large-v3-turbo')
    whisperForm.append('language', 'hi')
    whisperForm.append('response_format', 'json')

    const res = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${GROQ_CHAT_API_KEY}` },
      body: whisperForm,
      signal: AbortSignal.timeout(30000),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('Groq whisper error:', res.status, body)
      return NextResponse.json({ error: 'Transcription failed' }, { status: 502 })
    }

    const json = await res.json()
    return NextResponse.json({ text: json.text || '' })
  } catch (error: unknown) {
    console.error('Transcribe error:', error)
    return NextResponse.json({ error: 'Failed to transcribe' }, { status: 500 })
  }
}
