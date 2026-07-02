# KisanAlert — Pest Intelligence Platform

AI-powered agricultural pest detection, monitoring, and early warning for Indian farmers.

## Features

- **AI Crop Diagnosis** — Snap a photo; Gemini identifies pests and diseases instantly
- **Live Outbreak Map** — Real-time severity markers across 20 states
- **Community Reports** — Browse, search, and submit pest reports
- **Weather Overlay** — Current temperatures for major crop-growing states
- **Dashboard** — KPI grid, outbreak trends, top affected districts
- **Multi-language** — English, Hindi, Marathi, Telugu, Kannada
- **Responsive** — Works on desktop and mobile

## Tech Stack

Next.js 15 • Supabase (auth, DB, storage) • Google Gemini AI • OpenWeather • react-leaflet • GSAP • Tailwind CSS • Deployed on Vercel

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `OPENWEATHER_API_KEY` | OpenWeather API key (optional, for weather overlay) |

## Deployment

Push to `master` → auto-deploys to Vercel.

```bash
vercel --prod
```

## Translations

Nav and dashboard sections are fully translated into hi/mr/te/kn. The landing page, auth flows, onboarding, and UI labels still need native-speaker translations — see `src/lib/i18n/dictionary.ts`.

## Known Limitations

- **CSP**: Page routes use `unsafe-inline` and `unsafe-eval` because Next.js hydration scripts and GSAP animations require them. API routes have strict CSP (`default-src 'none'`).
- **Rate limiting**: Per-instance in-memory (not distributed across Vercel regions). Requires Vercel KV (paid) or Upstash Redis to share state.
- **Offline**: Service worker caches static assets only. Full offline support would require a more aggressive caching strategy.
