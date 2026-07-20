-- Local / production PostgreSQL schema for AVX Fitness
-- App also auto-creates a lean `registrations` table when DATABASE_URL is set.
-- File-based store (data/store/db.json) is the fallback if DATABASE_URL is unset.

create extension if not exists "pgcrypto";

create type lead_status as enum (
  'New',
  'Contacted',
  'Consultation Scheduled',
  'Consultation Completed',
  'Trial Scheduled',
  'Joined',
  'Not Interested',
  'Follow Up',
  'Closed'
);

create table if not exists registrations (
  id text primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  country_code text not null,
  whatsapp text not null,
  age int not null,
  gender text not null,
  city text not null,
  preferred_language text not null,
  height_cm numeric not null,
  current_weight_kg numeric not null,
  target_weight_kg numeric not null,
  activity_level text not null,
  fitness_experience text not null,
  existing_membership text not null,
  workout_location text not null,
  available_time_per_day text not null,
  goals text[] not null default '{}',
  target_period text,
  biggest_challenge text,
  previous_programs text,
  preferred_program text,
  preferred_trainer text,
  additional_message text,
  preferred_date date,
  preferred_time text,
  consultation_type text,
  preferred_branch text,
  preferred_trainer_booking text,
  privacy_accepted boolean not null,
  contact_consent boolean not null,
  medical_disclaimer boolean not null,
  marketing_consent boolean not null default false,
  lead_source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status lead_status not null default 'New',
  assigned_staff text,
  follow_up_date date,
  internal_notes text,
  sheets_synced boolean not null default false,
  sheets_sync_error text,
  calendar_event_id text,
  calendar_synced boolean not null default false,
  calendar_sync_error text
);

create table if not exists bookings (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  trainer_slug text not null,
  consultation_type text not null,
  date date not null,
  time text not null,
  program text,
  branch text not null,
  notes text,
  timezone text,
  status text not null default 'confirmed',
  calendar_event_id text,
  meet_link text,
  registration_id text references registrations(id),
  unique (trainer_slug, date, time, status)
);

create table if not exists class_sessions (
  id text primary key,
  name text not null,
  trainer text not null,
  trainer_slug text not null,
  date date not null,
  start_time text not null,
  end_time text not null,
  duration_minutes int not null,
  branch text not null,
  capacity int not null,
  booked int not null default 0,
  difficulty text not null,
  category text not null,
  mode text not null,
  program_slug text
);

create table if not exists class_registrations (
  id text primary key,
  class_id text not null references class_sessions(id),
  name text not null,
  email text not null,
  phone text not null,
  waitlist boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists trainers (
  slug text primary key,
  name text not null,
  role text not null,
  photo text,
  certifications text[] default '{}',
  specializations text[] default '{}',
  years_experience int,
  bio text,
  modes text[] default '{}',
  availability text,
  instagram text,
  filters text[] default '{}'
);

create table if not exists membership_plans (
  id text primary key,
  name text not null,
  price text not null,
  duration text not null,
  facilities text[] default '{}',
  sessions text,
  trainer_support text,
  nutrition_support text,
  terms text,
  recommended boolean default false
);

create table if not exists site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

create table if not exists integration_failures (
  id text primary key,
  created_at timestamptz not null default now(),
  type text not null,
  entity_id text not null,
  error text not null,
  resolved boolean not null default false
);

-- Optional client portal tables
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  full_name text not null,
  email text unique not null,
  membership_plan_id text references membership_plans(id),
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists member_measurements (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  recorded_at date not null,
  weight_kg numeric,
  notes text
);
