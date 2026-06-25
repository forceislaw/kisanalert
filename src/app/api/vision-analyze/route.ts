import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

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

export async function POST(req: NextRequest) {
  if (!genAI) {
    return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large. Maximum size is 5MB.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    const prompt = `Analyze this agricultural image. Identify the crop and any pest/disease present.
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

    const data = await tryGenerate(genAI, file, base64Image, prompt)
    return NextResponse.json({ data })
  } catch (error: unknown) {
    console.error('Vision API Error:', error);
    
    if (error instanceof Error && error.message?.includes('429')) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }
    if (error instanceof Error && error.message?.includes('SAFETY')) {
      return NextResponse.json({ error: 'Image analysis blocked due to safety filters.' }, { status: 400 });
    }

    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('Vision API Error (full):', msg)
    return NextResponse.json({ error: `Analysis failed: ${msg}` }, { status: 500 });
  }
}
