-- profiles
create table profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  phone_number text,
  preferred_lang text check (preferred_lang in ('en','hi','mr','te','kn')) default 'en',
  created_at timestamptz default now()
);

-- districts (all India)
create table districts (
  id serial primary key,
  name_en text not null,
  state_en text not null,
  latitude double precision not null,
  longitude double precision not null
);

-- crops
create table crops (
  id serial primary key,
  key_name text not null unique
);

-- pests
create table pests (
  id serial primary key,
  key_name text not null,
  scientific_name text not null,
  danger_level text check (danger_level in ('low','moderate','high','critical')) not null
);

-- user_notification_prefs
create table user_notification_prefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null unique,
  sms_alerts boolean default true,
  email_alerts boolean default true,
  critical_only boolean default false,
  updated_at timestamptz default now()
);

-- pest_reports
create table pest_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  crop_id int references crops(id),
  district_id int references districts(id),
  detected_pest_id int references pests(id),
  image_storage_path text not null,
  severity_level text check (severity_level in ('low','moderate','high','critical')) not null,
  status text default 'pending',
  confidence_score numeric(5,2),
  latitude double precision,
  longitude double precision,
  diagnosis_translations jsonb,
  countermeasure_translations jsonb,
  prevention_translations jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE pests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notification_prefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pest_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- profiles: users can read/update own profile
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- districts/crops/pests: public read, admin write (via service role)
CREATE POLICY "public_read" ON districts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON crops FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public_read" ON pests FOR SELECT TO anon, authenticated USING (true);

-- user_notification_prefs: users manage own prefs
CREATE POLICY "prefs_select_own" ON user_notification_prefs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "prefs_upsert_own" ON user_notification_prefs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "prefs_update_own" ON user_notification_prefs FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- pest_reports: anon can insert/select, auth can insert own + select all
CREATE POLICY "reports_anon_insert" ON pest_reports FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "reports_anon_select" ON pest_reports FOR SELECT TO anon USING (true);
CREATE POLICY "reports_auth_insert_own" ON pest_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reports_auth_select_all" ON pest_reports FOR SELECT TO authenticated USING (true);

-- Indexes
create index idx_reports_district on pest_reports(district_id);
create index idx_reports_reported_at on pest_reports(created_at);
create index idx_reports_user on pest_reports(user_id);
create index idx_reports_severity on pest_reports(severity_level);