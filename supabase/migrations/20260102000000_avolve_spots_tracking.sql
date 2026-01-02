-- Avolve 365 Spots Tracking
-- Migration: 20260102000000_avolve_spots_tracking.sql
-- Purpose: Real-time scarcity tracking for 365-spot limited offer

-- ============================================================================
-- SPOTS TRACKER TABLE
-- Single row table to track available spots
-- ============================================================================

create table if not exists public.avolve_spots (
  id uuid primary key default gen_random_uuid(),
  total_spots int not null default 365,
  spots_taken int not null default 0,
  updated_at timestamptz not null default now()
);

-- Insert initial state (365 total, 4 taken = 361 remaining)
insert into public.avolve_spots (total_spots, spots_taken)
values (365, 4)
on conflict do nothing;

-- Function to update timestamp on change
create or replace function public.handle_spots_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for updated_at
drop trigger if exists on_spots_updated on public.avolve_spots;
create trigger on_spots_updated
  before update on public.avolve_spots
  for each row
  execute function public.handle_spots_updated_at();

-- ============================================================================
-- ACTIVITY LOG TABLE
-- Track purchases for real-time activity feed (anonymized)
-- ============================================================================

create table if not exists public.avolve_activity (
  id uuid primary key default gen_random_uuid(),
  event_type text not null default 'purchase',
  city text, -- Optional: from IP geolocation
  country_code text, -- Optional: 2-letter country code
  plan text not null, -- 'monthly' or 'yearly'
  created_at timestamptz not null default now()
);

-- Index for recent activity queries
create index if not exists idx_avolve_activity_created_at
  on public.avolve_activity(created_at desc);

-- Auto-cleanup old activity (keep last 24 hours)
create or replace function public.cleanup_old_activity()
returns trigger as $$
begin
  delete from public.avolve_activity
  where created_at < now() - interval '24 hours';
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_activity_cleanup on public.avolve_activity;
create trigger on_activity_cleanup
  after insert on public.avolve_activity
  for each row
  execute function public.cleanup_old_activity();

-- ============================================================================
-- PRESENCE TABLE (Ephemeral)
-- Track anonymous page viewers for "X people viewing" indicator
-- ============================================================================

create table if not exists public.avolve_presence (
  id uuid primary key default gen_random_uuid(),
  session_id text not null, -- Anonymous session identifier
  page text not null default '/', -- Page being viewed
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

-- Index for counting active viewers
create index if not exists idx_avolve_presence_page_last_seen
  on public.avolve_presence(page, last_seen_at desc);

-- Unique constraint to prevent duplicate sessions
create unique index if not exists idx_avolve_presence_session_page
  on public.avolve_presence(session_id, page);

-- Auto-cleanup stale presence (older than 5 minutes)
create or replace function public.cleanup_stale_presence()
returns trigger as $$
begin
  delete from public.avolve_presence
  where last_seen_at < now() - interval '5 minutes';
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_presence_cleanup on public.avolve_presence;
create trigger on_presence_cleanup
  after insert or update on public.avolve_presence
  for each row
  execute function public.cleanup_stale_presence();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Spots table: Anyone can read, only service role can update
alter table public.avolve_spots enable row level security;

drop policy if exists "Anyone can read spots" on public.avolve_spots;
create policy "Anyone can read spots"
  on public.avolve_spots for select
  using (true);

-- Activity table: Anyone can read recent, only service role can insert
alter table public.avolve_activity enable row level security;

drop policy if exists "Anyone can read recent activity" on public.avolve_activity;
create policy "Anyone can read recent activity"
  on public.avolve_activity for select
  using (created_at > now() - interval '1 hour');

-- Presence table: Anyone can read/insert/update their own session
alter table public.avolve_presence enable row level security;

drop policy if exists "Anyone can read presence counts" on public.avolve_presence;
create policy "Anyone can read presence counts"
  on public.avolve_presence for select
  using (true);

drop policy if exists "Anyone can insert presence" on public.avolve_presence;
create policy "Anyone can insert presence"
  on public.avolve_presence for insert
  with check (true);

drop policy if exists "Anyone can update own presence" on public.avolve_presence;
create policy "Anyone can update own presence"
  on public.avolve_presence for update
  using (true);

drop policy if exists "Anyone can delete own presence" on public.avolve_presence;
create policy "Anyone can delete own presence"
  on public.avolve_presence for delete
  using (true);

-- ============================================================================
-- ENABLE REALTIME
-- ============================================================================

-- Enable realtime for spots (live counter updates)
alter publication supabase_realtime add table public.avolve_spots;

-- Enable realtime for activity (live feed updates)
alter publication supabase_realtime add table public.avolve_activity;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to increment spots taken (called by webhook)
create or replace function public.increment_spots_taken()
returns void as $$
begin
  update public.avolve_spots
  set spots_taken = spots_taken + 1
  where spots_taken < total_spots;
end;
$$ language plpgsql security definer;

-- Function to get spots remaining
create or replace function public.get_spots_remaining()
returns int as $$
declare
  remaining int;
begin
  select (total_spots - spots_taken) into remaining
  from public.avolve_spots
  limit 1;
  return coalesce(remaining, 0);
end;
$$ language plpgsql security definer;

-- Function to get active viewer count for a page
create or replace function public.get_viewer_count(page_path text default '/')
returns int as $$
declare
  count int;
begin
  select count(*) into count
  from public.avolve_presence
  where page = page_path
    and last_seen_at > now() - interval '5 minutes';
  return coalesce(count, 0);
end;
$$ language plpgsql security definer;
