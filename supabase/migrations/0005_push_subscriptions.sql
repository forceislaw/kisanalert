CREATE TABLE IF NOT EXISTS push_subscriptions (
  endpoint TEXT PRIMARY KEY,
  keys JSONB NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can upsert their own subscription"
  ON push_subscriptions
  FOR ALL
  USING (true)
  WITH CHECK (true);
