-- districts: TEXT PK (name used as identifier throughout app)
create table districts (
  id text primary key,
  name text not null,
  state text not null,
  lat double precision not null,
  lng double precision not null,
  rain_shadow_zone text not null,
  is_drought_prone boolean default true
);

-- crops: TEXT PK (app uses predefined IDs like 'c0770n00-...')
create table crops (
  id text primary key,
  name_en text not null, name_hi text not null, name_mr text not null,
  name_te text not null, name_kn text not null,
  season text not null
);

-- pests: TEXT PK (app uses predefined IDs like 'p1nkb011-...')
create table pests (
  id text primary key,
  name_en text not null, name_hi text not null, name_mr text not null,
  name_te text not null, name_kn text not null,
  target_crop_ids text[] not null
);

-- pest_reports: UUID PK for reports, TEXT FK references
create table pest_reports (
  id uuid primary key default gen_random_uuid(),
  district_id text references districts(id) not null,
  crop_id text references crops(id) not null,
  pest_id text references pests(id) not null,
  severity text check (severity in ('low','medium','high','critical')) not null,
  reporter_name text,
  image_url text,
  gemini_confidence numeric,
  gemini_raw_response jsonb,
  lat double precision,
  lng double precision,
  status text default 'verified',
  reported_at timestamptz not null,
  created_at timestamptz default now()
);

create index idx_reports_district on pest_reports(district_id);
create index idx_reports_reported_at on pest_reports(reported_at);
