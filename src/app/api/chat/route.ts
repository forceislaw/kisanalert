import { NextRequest, NextResponse } from 'next/server'

const GROQ_CHAT_API_KEY = process.env.GROQ_CHAT_API_KEY

const SYSTEM_PROMPT = `You are an expert agricultural assistant for Indian farmers, named Quil. You ONLY answer questions about:
- Crop farming and cultivation
- Pest and disease identification, prevention, and treatment
- Soil management and fertilizers
- Irrigation and water management
- Weather impact on crops
- Government agricultural schemes (PM-KISAN, KCC, PMFBY, etc.)
- Market prices and crop selling
- Organic farming and natural pest control
- Seasonal planting and harvesting advice

LANGUAGE RULES:
- If the user writes in a language, respond in that same language.
- If the user says "talk in Hindi" (or any language), switch to that language for all future replies.
- If the user says "talk in English", switch back to English.
- Support Indian languages: Hindi, Marathi, Telugu, Kannada, Tamil, Bengali, Gujarati, Punjabi, etc.
- Never explain what language you're using — just switch seamlessly.

If a question is NOT related to farming, crops, or agriculture, politely respond:
"I'm Quil, a farming assistant. I can only help with agriculture-related questions. Please ask me about crops, pests, soil, or farming."

Be practical, specific, and use Indian context (local crop names, measurements in acres/quintals, INR pricing). Keep responses concise (under 150 words).`

const FARMING_KEYWORDS = [
  'crop', 'farm', 'pest', 'disease', 'soil', 'water', 'irrigation',
  'fertilizer', 'pesticide', 'insecticide', 'fungicide', 'weed',
  'harvest', 'plant', 'seed', 'yield', 'organic', 'compost',
  'weather', 'rain', 'drought', 'flood', 'temperature',
  'market', 'price', 'sell', 'buy', 'mandi', 'quintal',
  'subsidy', 'scheme', 'loan', 'insurance', 'pm-kisan', 'kcc', 'pmfby',
  'kheti', 'kisaan', 'kisan', 'krishi', 'khad', 'beej',
  'acre', 'hectare', 'tonne', 'kg',
  'paddy', 'wheat', 'rice', 'maize', 'cotton', 'sugarcane',
  'vegetable', 'fruit', 'pulses', 'oilseed',
  'फसल', 'कीट', 'खेत', 'किसान', 'खाद', 'बीज', 'सिंचाई',
  'पीक', 'कीड', 'शेत', 'शेतकरी',
  'పంట', 'తెగులు', 'సేద్యం', 'రైతు',
]

function isFarmingRelated(text: string): boolean {
  const lower = text.toLowerCase()
  return FARMING_KEYWORDS.some(kw => lower.includes(kw))
}

export async function POST(req: NextRequest) {
  if (!GROQ_CHAT_API_KEY) {
    return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 })
  }

  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 })
    }

    if (!isFarmingRelated(message)) {
      return NextResponse.json({
        reply: "I'm designed to help with farming and agriculture questions only. Please ask me about crops, pests, soil, or any farming-related topic.",
        nonFarming: true,
      })
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history.slice(-10) : []),
      { role: 'user', content: message },
    ]

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_CHAT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 500,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20000),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('Groq chat error:', res.status, body)
      return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 502 })
    }

    const json = await res.json()
    const reply = json.choices?.[0]?.message?.content

    if (!reply) {
      return NextResponse.json({ error: 'Empty response from AI' }, { status: 502 })
    }

    return NextResponse.json({ reply })
  } catch (error: unknown) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
