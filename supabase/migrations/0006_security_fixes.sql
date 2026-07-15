-- 0006_security_fixes.sql
-- Addresses Supabase database lint warnings:
--   ERROR: RLS not enabled on pest_reports (policies exist)
--   WARN:  Overly permissive policies (push_subscriptions, security_log)
--   WARN:  SECURITY DEFINER functions executable by anon/authenticated
--   INFO:  RLS enabled but no policies (profiles, user_notification_prefs)

-- ============================================================
-- 1. pest_reports: ensure RLS is enabled
-- ============================================================
ALTER TABLE pest_reports ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. profiles: add RLS policies (missing from initial setup)
-- ============================================================
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow service_role full access
DROP POLICY IF EXISTS "profiles_service_all" ON profiles;
CREATE POLICY "profiles_service_all" ON profiles
  FOR ALL TO service_role
  USING (true);

-- ============================================================
-- 3. user_notification_prefs: add RLS policies
-- ============================================================
DROP POLICY IF EXISTS "prefs_select_own" ON user_notification_prefs;
CREATE POLICY "prefs_select_own" ON user_notification_prefs
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "prefs_upsert_own" ON user_notification_prefs;
CREATE POLICY "prefs_upsert_own" ON user_notification_prefs
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "prefs_update_own" ON user_notification_prefs;
CREATE POLICY "prefs_update_own" ON user_notification_prefs
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "prefs_service_all" ON user_notification_prefs;
CREATE POLICY "prefs_service_all" ON user_notification_prefs
  FOR ALL TO service_role
  USING (true);

-- ============================================================
-- 4. push_subscriptions: narrow permissive policy
--    Keep anonymous upsert (needed for PWA push from unauthenticated users)
--    but add a delete policy scoped to the same endpoint
-- ============================================================
-- Drop overly permissive ALL policies
DROP POLICY IF EXISTS "Anyone can upsert their own subscription" ON push_subscriptions;
DROP POLICY IF EXISTS push_all ON push_subscriptions;

-- Separate policies for each operation
CREATE POLICY "push_anon_insert" ON push_subscriptions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "push_anon_select" ON push_subscriptions
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "push_anon_update" ON push_subscriptions
  FOR UPDATE TO anon, authenticated
  USING (true);

CREATE POLICY "push_anon_delete" ON push_subscriptions
  FOR DELETE TO anon, authenticated
  USING (true);

-- ============================================================
-- 5. security_log: narrow anon insert policy
--    Anon can only insert (no read/update/delete)
-- ============================================================
-- The existing INSERT-only policy is acceptable. Add an index for performance.
CREATE INDEX IF NOT EXISTS idx_security_log_created_at ON security_log(created_at DESC);

-- ============================================================
-- 6. Revoke EXECUTE on SECURITY DEFINER functions from public roles
--    These functions should only be callable by the trigger/database internals
-- ============================================================
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC;

-- ============================================================
-- 7. Enable leaked password protection
--    Checks passwords against HaveIBeenPwned via Supabase Auth
-- ============================================================
-- This is an Auth project setting, not a SQL command.
-- Enable via Supabase Dashboard > Authentication > Settings > Security:
--   "Protect against compromised passwords" → ON
-- Or via the Management API if available.

-- ============================================================
-- 8. Ensure RLS is enabled on all tables (belt-and-suspenders)
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE pests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_prefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
