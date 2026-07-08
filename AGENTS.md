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
