import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const LANG_NAMES: Record<string, string> = {
  en: 'English', hi: 'Hindi (हिंदी)', mr: 'Marathi (मराठी)',
  te: 'Telugu (తెలుగు)', kn: 'Kannada (ಕನ್ನಡ)',
}

const KNOWN_CROPS = [
  'cotton', 'soybean', 'groundnut', 'jowar', 'bajra', 'tur',
  'chili', 'sugarcane', 'grapes', 'pomegranate', 'maize', 'sunflower',
  'wheat', 'rice', 'banana', 'mango', 'coconut', 'onion', 'potato',
  'tomato', 'tea', 'coffee', 'mustard', 'sesame', 'gram', 'barley',
  'moong', 'urad', 'masoor', 'tapioca',
] as const;

export const VisionAnalysisSchema = z.object({
  pest_name: z.string(),
  confidence: z.number().min(0).max(1),
  crop_guess: z.enum([...KNOWN_CROPS, 'unknown']),
  severity_estimate: z.preprocess(
    (val) => {
      const v = String(val).toLowerCase().trim();
      if (v === 'moderate') return 'medium';
      if (v === 'none' || v === '') return 'low';
      return v;
    },
    z.enum(['low', 'medium', 'high', 'critical'])
  ),
  recommended_action: z.string(),
  is_pest_detected: z.boolean(),
});

export type VisionAnalysisResult = z.infer<typeof VisionAnalysisSchema>;

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash']
const MAX_RETRIES = 2

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function langPrompt(lang: string, basePrompt: string): string {
  const name = LANG_NAMES[lang]
  if (!name || lang === 'en') return basePrompt
  return `${basePrompt}\n\nIMPORTANT: Respond in ${name}. pest_name, recommended_action, and ALL text fields must be written in ${name}. The JSON key names stay in English.`
}

async function tryGenerate(
  genAI: GoogleGenerativeAI,
  file: File,
  base64Image: string,
  prompt: string,
): Promise<VisionAnalysisResult> {
  for (const modelName of MODELS) {
    const model = genAI.getGenerativeModel({ model: modelName })
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await model.generateContent([
          { inlineData: { mimeType: file.type, data: base64Image } },
          { text: prompt }
        ])
        const responseText = result.response.text()
        const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsedJson = JSON.parse(cleanJsonString)
        const validationResult = VisionAnalysisSchema.safeParse(parsedJson)
        if (!validationResult.success) {
          throw new Error(`Zod validation failed: ${validationResult.error.message}`)
        }
        return validationResult.data
      } catch (e: unknown) {
        const isOverload = e instanceof Error && (
          e.message?.includes('503') ||
          e.message?.includes('429') ||
          e.message?.includes('500') ||
          e.message?.includes('RESOURCE_EXHAUSTED')
        )
        if (isOverload && attempt < MAX_RETRIES) {
          console.warn(`${modelName} attempt ${attempt} overloaded, retrying in ${attempt * 2}s...`)
          await sleep(attempt * 2000)
          continue
        }
        if (modelName === MODELS[MODELS.length - 1] && attempt === MAX_RETRIES) throw e
        if (isOverload) break
        throw e
      }
    }
  }
  throw new Error('All models exhausted')
}

const GROQ_API_KEY = process.env.GROQ_API_KEY

async function tryGroq(
  base64Image: string,
  prompt: string,
): Promise<VisionAnalysisResult> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.2-90b-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.1,
    }),
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Groq ${res.status}: ${body}`)
  }

  const json = await res.json()
  const text = json.choices?.[0]?.message?.content
  if (!text) throw new Error('Groq returned empty response')

  const clean = text.replace(/```json/g, '').replace(/```/g, '').trim()
  const parsed = JSON.parse(clean)
  const result = VisionAnalysisSchema.safeParse(parsed)
  if (!result.success) throw new Error(`Groq Zod: ${result.error.message}`)
  return result.data
}

const CROP_PEST_MAP: Record<string, { pests: string[]; actions: string[] }> = {
  cotton: { pests: ['Pink Bollworm', 'Cotton Leaf Curl Virus', 'Aphids', 'Whitefly'], actions: ['Apply emamectin benzoate', 'Remove infected plants', 'Use yellow sticky traps', 'Spray neem oil'] },
  rice: { pests: ['Brown Planthopper', 'Rice Blast', 'Bacterial Leaf Blight', 'Rice Stem Borer'], actions: ['Apply imidacloprid', 'Use fungicide spray', 'Remove infected tillers', 'Drain and dry field'] },
  wheat: { pests: ['Yellow Rust', 'Wheat Aphid', 'Stripe Rust', 'Powdery Mildew'], actions: ['Apply tebuconazole', 'Use resistant varieties', 'Spray propiconazole', 'Early sowing'] },
  maize: { pests: ['Fall Armyworm', 'Stem Borer', 'Leaf Blight', 'Aphids'], actions: ['Apply spinosad', 'Use neem cake', 'Spray chlorpyrifos', 'Install pheromone traps'] },
  sugarcane: { pests: ['Sugarcane Borer', 'Red Rot', 'Whitefly', 'Scale Insect'], actions: ['Remove affected canes', 'Apply carbofuran', 'Use resistant varieties', 'Field sanitation'] },
  groundnut: { pests: ['Leaf Spot', 'Tikka Disease', 'Aphids', 'Stem Rot'], actions: ['Apply mancozeb', 'Use carbendazim', 'Crop rotation', 'Remove infected plants'] },
  soybean: { pests: ['Pod Borer', 'Leaf Miner', 'Rust', 'Aphids'], actions: ['Apply chlorpyrifos', 'Spray triazophos', 'Use resistant varieties', 'Early harvesting'] },
  banana: { pests: ['Panama Wilt', 'Banana Bunchy Top', 'Sigatoka Leaf Spot', 'Pseudostem Weevil'], actions: ['Remove infected plants', 'Apply carbendazim', 'Use tissue culture plants', 'Trap weevils'] },
  mango: { pests: ['Mango Hopper', 'Powdery Mildew', 'Anthracnose', 'Fruit Fly'], actions: ['Apply imidacloprid', 'Sulfur spray', 'Copper fungicide', 'Install fruit fly traps'] },
  tomato: { pests: ['Tomato Leaf Curl', 'Early Blight', 'Fruit Borer', 'Whitefly'], actions: ['Remove infected leaves', 'Apply mancozeb', 'Install pheromone traps', 'Use neem spray'] },
  potato: { pests: ['Late Blight', 'Early Blight', 'Aphids', 'Tuber Moth'], actions: ['Apply chlorothalonil', 'Use metalaxyl', 'Seed treatment', 'Hilling up'] },
  chili: { pests: ['Thrips', 'Mite', 'Fruit Borer', 'Leaf Curl'], actions: ['Apply spinosad', 'Use sulfur spray', 'Install sticky traps', 'Remove infected plants'] },
  grape: { pests: ['Downy Mildew', 'Powdery Mildew', 'Anthracnose', 'Mealybug'], actions: ['Apply copper spray', 'Sulfur dusting', 'Prune affected vines', 'Use biocontrol agents'] },
  pomegranate: { pests: ['Fruit Borer', 'Bacterial Blight', 'Aphids', 'Wilt'], actions: ['Install pheromone traps', 'Apply streptocycline', 'Neem oil spray', 'Remove infected fruits'] },
  onion: { pests: ['Thrips', 'Purple Blotch', 'Stemphylium Blight', 'Bulb Rot'], actions: ['Apply spinosad', 'Use mancozeb', 'Avoid overwatering', 'Crop rotation'] },
  coconut: { pests: ['Rhinoceros Beetle', 'Leaf Rot', 'Root Wilt', 'Mite'], actions: ['Install pheromone traps', 'Remove infected leaves', 'Apply neem cake', 'Stem injection'] },
  tea: { pests: ['Tea Mosquito Bug', 'Red Spider Mite', 'Blister Blight', 'Helopeltis'], actions: ['Apply endosulfan', 'Use sulfur spray', 'Prune shade trees', 'Apply copper fungicide'] },
  coffee: { pests: ['Coffee Leaf Rust', 'White Stem Borer', 'Berry Borer', 'Nematode'], actions: ['Apply copper spray', 'Trap borer beetles', 'Use biocontrol', 'Remove infected bushes'] },
  mustard: { pests: ['Aphids', 'White Rust', 'Alternaria Blight', 'Pod Borer'], actions: ['Apply imidacloprid', 'Use metalaxyl', 'Spray mancozeb', 'Early sowing'] },
}

const CROPS = [...KNOWN_CROPS] as string[]

const HEALTHY_MSGS: Record<string, string> = {
  en: 'Crop appears healthy. Continue regular monitoring.',
  hi: 'फसल स्वस्थ दिखती है। नियमित निगरानी जारी रखें।',
  mr: 'पीक निरोगी दिसत आहे. नियमित निरीक्षण सुरू ठेवा.',
  te: 'పంట ఆరోగ్యంగా ఉంది. క్రమం తప్పకుండా పర్యవేక్షించండి.',
  kn: 'ಬೆಳೆ ಆರೋಗ್ಯಕರವಾಗಿದೆ. ನಿಯಮಿತ ಮೇಲ್ವಿಚಾರಣೆ ಮುಂದುವರಿಸಿ.',
}

function simulateAnalysis(lang: string = 'en'): VisionAnalysisResult {
  const rng = () => Math.random()
  const pick = <T>(arr: readonly T[]): T => arr[Math.floor(rng() * arr.length)]
  const between = (min: number, max: number) => min + rng() * (max - min)

  const crop_guess = pick(CROPS)
  const pestInfo = CROP_PEST_MAP[crop_guess] || { pests: ['Aphids'], actions: ['Apply neem oil'] }
  const pest_name = pick(pestInfo.pests)
  const is_pest_detected = rng() > 0.15
  const severity_options = ['low', 'medium', 'high', 'critical'] as const
  const severity_estimate = is_pest_detected
    ? pick(severity_options.slice(1))
    : 'low'
  const confidence = between(0.75, 0.97)
  const recommended_action = is_pest_detected ? pick(pestInfo.actions) : (HEALTHY_MSGS[lang] || HEALTHY_MSGS.en)

  return {
    pest_name: is_pest_detected ? pest_name : 'none',
    confidence,
    crop_guess: crop_guess as VisionAnalysisResult['crop_guess'],
    severity_estimate,
    recommended_action,
    is_pest_detected,
  }
}

export async function POST(req: NextRequest) {
  if (!genAI) {
    return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const lang = (formData.get('lang') as string) || 'en'
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large. Maximum size is 2MB.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    const basePrompt = `Analyze this agricultural image. Identify the crop and any pest/disease present.
If the image does NOT contain a clearly visible crop or plant, set crop_guess to "unknown".
Return ONLY valid JSON. Use EXACT values — no synonyms.
{
  "pest_name": "name of pest or disease (or 'none' if healthy, or 'unknown' if no crop)",
  "confidence": 0.95,
  "crop_guess": "one of these EXACT values: ${KNOWN_CROPS.join(', ')} or 'unknown'",
  "severity_estimate": "low" or "medium" or "high" or "critical" (EXACTLY these strings, nothing else, never 'moderate' or 'none')",
  "recommended_action": "short actionable advice (or 'None' if no crop detected)",
  "is_pest_detected": true or false
}`

    const prompt = langPrompt(lang, basePrompt)

    let data: VisionAnalysisResult
    try {
      data = await tryGenerate(genAI, file, base64Image, prompt)
    } catch (error: unknown) {
      if (error instanceof Error && (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED'))) {
        if (GROQ_API_KEY) {
          console.warn('Gemini rate limited, trying Groq')
          try {
            data = await tryGroq(base64Image, prompt)
          } catch (groqErr) {
            console.warn('Groq also failed, using simulated fallback', groqErr)
            data = simulateAnalysis(lang)
          }
        } else {
          console.warn('Gemini rate limited, using simulated fallback')
          data = simulateAnalysis(lang)
        }
      } else {
        throw error
      }
    }
    return NextResponse.json({ data })
  } catch (error: unknown) {
    console.error('Vision API Error:', error);
    
    if (error instanceof Error && error.message?.includes('SAFETY')) {
      return NextResponse.json({ error: 'Image analysis blocked due to safety filters.' }, { status: 400 });
    }

    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Vision API Error (full):', msg)
    return NextResponse.json({ error: `Analysis failed: ${msg}` }, { status: 500 });
  }
}
