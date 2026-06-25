-- IP blocklist for manual blocking of malicious IPs
create table blocked_ips (
  ip_address text primary key,
  reason text,
  blocked_at timestamptz default now(),
  expires_at timestamptz
);

ALTER TABLE blocked_ips ENABLE ROW LEVEL SECURITY;

-- Only service role can manage; public read for proxy check
CREATE POLICY "blocked_ips_read_anon" ON blocked_ips FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "blocked_ips_read_service" ON blocked_ips FOR SELECT TO service_role USING (true);
CREATE POLICY "blocked_ips_write_service" ON blocked_ips FOR INSERT TO service_role WITH CHECK (true);
CREATE POLICY "blocked_ips_delete_service" ON blocked_ips FOR DELETE TO service_role USING (true);

-- Log table for suspicious requests (rate limit hits, WAF blocks)
create table security_log (
  id bigserial primary key,
  ip_address text not null,
  event_type text not null,
  path text,
  user_agent text,
  reason text,
  created_at timestamptz default now()
);

ALTER TABLE security_log ENABLE ROW LEVEL SECURITY;

-- Only service role can manage
CREATE POLICY "security_log_read_service" ON security_log FOR SELECT TO service_role USING (true);
CREATE POLICY "security_log_insert_anon" ON security_log FOR INSERT TO anon WITH CHECK (true);
