import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const KNOWN_CROPS = [
  'cotton', 'soybean', 'groundnut', 'jowar', 'bajra', 'tur',
  'chili', 'sugarcane', 'grapes', 'pomegranate', 'maize', 'sunflower',
  'wheat', 'rice',
] as const;

export const VisionAnalysisSchema = z.object({
  pest_name: z.string(),
  confidence: z.number().min(0).max(1),
  crop_guess: z.enum(KNOWN_CROPS),
  severity_estimate: z.enum(['low', 'medium', 'high', 'critical']),
  recommended_action: z.string(),
  is_pest_detected: z.boolean(),
});

export type VisionAnalysisResult = z.infer<typeof VisionAnalysisSchema>;

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

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      { inlineData: { mimeType: file.type, data: base64Image } },
      {
        text: `Analyze this agricultural image. Identify the crop and any pest/disease present.
Return ONLY valid JSON with crop_guess exactly from this list: ${KNOWN_CROPS.join(', ')}.
{
  "pest_name": "name of pest or disease (or 'none' if healthy)",
  "confidence": 0.95,
  "crop_guess": "one of the listed crops",
  "severity_estimate": "low"|"medium"|"high"|"critical",
  "recommended_action": "short actionable advice",
  "is_pest_detected": true/false
}`
      }
    ]);

    const responseText = result.response.text();
    // Clean potential markdown blocks like ```json ... ```
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    let parsedJson;
    try {
      parsedJson = JSON.parse(cleanJsonString);
    } catch {
      console.error('Failed to parse Gemini response as JSON:', responseText);
      return NextResponse.json({ error: 'Model returned invalid JSON format.' }, { status: 502 });
    }

    // Validate against strict zod schema
    const validationResult = VisionAnalysisSchema.safeParse(parsedJson);
    if (!validationResult.success) {
      console.error('Zod validation failed:', validationResult.error);
      return NextResponse.json({ error: 'Model returned data that failed strict schema validation.' }, { status: 502 });
    }

    return NextResponse.json({ data: validationResult.data });
  } catch (error: unknown) {
    console.error('Vision API Error:', error);
    
    // Handle specific Gemini API errors gracefully
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
