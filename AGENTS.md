<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Auth & Reports ("My Reports")
- GET `/api/reports` uses `createServerSupabaseClient()` (anon key + session) with joins for crop/district/pest names.
- "My Reports" filter passes `user_id` as query param from `useAuth().user.id` on the frontend.
- The "My Reports" button is disabled (opacity 40%) when no user is logged in.
- Users must log in to filter their own reports. Without login, all reports are visible anonymously.
- Notifications (email alerts) in Settings also require login. Preference rows keyed to `user_id`.

## Polish Items Completed (24 Jun 2026)
- Auth pages (login, register, forgot, reset) wrapped in `card-editorial` with Apentomos leaf SVG logo.
- 404 and error pages use `card-alert` with logo.
- Text search on Reports page: `search` query param → API does `ilike` on districts.name_en, crops.key_name, pests.key_name, then `or()` filter on IDs.
- Dashboard time filter: 7d/30d/All buttons, `days` prop drilled down to KpiGrid, TopDistrictsTable, OutbreakTrendChart.
- Settings: checkboxes replaced with custom `.toggle-switch` CSS (`.toggle-track`, `.toggle-thumb`).
- Loading skeletons: reports table → 5 skeleton rows; KPI grid → 4 skeleton blocks; OutbreakTrendChart → skeleton bars; TopDistrictsTable → skeleton list items.
- ConfirmDialog component at `src/components/ui/ConfirmDialog.tsx` — used for "Discard" on upload analysis.
- `.toggle-switch` CSS added to `globals.css` in `@layer components`.

## Infrastructure Fixes (15 Jul 2026)
- **OpenWeather blocked from Vercel US East**: Moved weather data fetch to client side via `src/lib/useWeather.ts` hook. Requires `NEXT_PUBLIC_OPENWEATHER_API_KEY` in Vercel env (same value as `OPENWEATHER_API_KEY`). Browser fetches OpenWeather directly, bypassing Vercel server block.
- **Error tracking**: Added `src/components/ui/ErrorBoundary.tsx` (React error boundary), `src/components/ui/GlobalErrorHandler.tsx` (catches `window.onerror` + unhandled rejections), and `src/app/api/log-error/route.ts` (POST endpoint that logs to `console.error`, visible in Vercel deployment logs).
- **PostCSS CVE (GHSA-qx2v-qp2m-jg93)**: Next.js 16.2.9 bundles `postcss@8.4.31` internally. Cannot be overridden via `overrides` in `package.json`. Not exploitable in this app (XSS via CSS stringify requires user-generated CSS input). Accepted risk.
