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

ALTER TABLE pest_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert" ON pest_reports FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon select" ON pest_reports FOR SELECT TO anon USING (true);
CREATE POLICY "auth insert own" ON pest_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "auth select all" ON pest_reports FOR SELECT TO authenticated USING (true);
