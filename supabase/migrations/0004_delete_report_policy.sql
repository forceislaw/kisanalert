-- RLS policy: authenticated users can delete their own reports
CREATE POLICY "reports_auth_delete_own"
  ON pest_reports
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS policy: anon cannot delete
ALTER TABLE pest_reports FORCE ROW LEVEL SECURITY;
