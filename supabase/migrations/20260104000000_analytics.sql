-- Custom Analytics Tables
-- Simple, privacy-respecting analytics without third-party services

-- Page views table
create table if not exists page_views (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text not null,
  path text not null,
  referrer text,
  user_agent text,
  screen_width int,
  screen_height int,
  created_at timestamptz default now() not null
);

-- Create indexes for common queries
create index idx_page_views_path on page_views(path);
create index idx_page_views_created_at on page_views(created_at desc);
create index idx_page_views_user_id on page_views(user_id);
create index idx_page_views_session_id on page_views(session_id);

-- Custom events table
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  session_id text not null,
  event_name text not null,
  event_category text,
  event_data jsonb,
  path text,
  created_at timestamptz default now() not null
);

-- Create indexes for events
create index idx_analytics_events_name on analytics_events(event_name);
create index idx_analytics_events_category on analytics_events(event_category);
create index idx_analytics_events_created_at on analytics_events(created_at desc);
create index idx_analytics_events_user_id on analytics_events(user_id);

-- Aggregated daily stats (materialized for performance)
create table if not exists daily_stats (
  date date primary key,
  total_page_views int default 0,
  unique_visitors int default 0,
  unique_sessions int default 0,
  avg_session_duration interval,
  top_pages jsonb,
  top_referrers jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS Policies
alter table page_views enable row level security;
alter table analytics_events enable row level security;
alter table daily_stats enable row level security;

-- Anyone can insert page views (for anonymous tracking)
create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);

-- Users can view their own page views
create policy "Users can view own page views"
  on page_views for select
  using (auth.uid() = user_id);

-- Service role can view all page views
create policy "Service role can view all page views"
  on page_views for select
  using (auth.role() = 'service_role');

-- Anyone can insert analytics events
create policy "Anyone can insert analytics events"
  on analytics_events for insert
  with check (true);

-- Users can view their own events
create policy "Users can view own analytics events"
  on analytics_events for select
  using (auth.uid() = user_id);

-- Service role can view all events
create policy "Service role can view all analytics events"
  on analytics_events for select
  using (auth.role() = 'service_role');

-- Service role can manage daily stats
create policy "Service role can manage daily stats"
  on daily_stats for all
  using (auth.role() = 'service_role');

-- Function to get dashboard analytics (for admin)
create or replace function get_analytics_summary(
  days_ago int default 7
)
returns jsonb
language plpgsql
security definer
as $$
declare
  result jsonb;
  start_date timestamptz;
begin
  start_date := now() - (days_ago || ' days')::interval;

  select jsonb_build_object(
    'total_page_views', (
      select count(*) from page_views
      where created_at >= start_date
    ),
    'unique_visitors', (
      select count(distinct coalesce(user_id::text, session_id)) from page_views
      where created_at >= start_date
    ),
    'unique_sessions', (
      select count(distinct session_id) from page_views
      where created_at >= start_date
    ),
    'top_pages', (
      select jsonb_agg(jsonb_build_object('path', path, 'views', views))
      from (
        select path, count(*) as views
        from page_views
        where created_at >= start_date
        group by path
        order by views desc
        limit 10
      ) as top
    ),
    'events_by_category', (
      select jsonb_agg(jsonb_build_object('category', event_category, 'count', event_count))
      from (
        select event_category, count(*) as event_count
        from analytics_events
        where created_at >= start_date and event_category is not null
        group by event_category
        order by event_count desc
        limit 10
      ) as cats
    ),
    'top_events', (
      select jsonb_agg(jsonb_build_object('name', event_name, 'count', event_count))
      from (
        select event_name, count(*) as event_count
        from analytics_events
        where created_at >= start_date
        group by event_name
        order by event_count desc
        limit 10
      ) as events
    ),
    'daily_breakdown', (
      select jsonb_agg(jsonb_build_object('date', date, 'views', views, 'visitors', visitors))
      from (
        select
          date_trunc('day', created_at)::date as date,
          count(*) as views,
          count(distinct coalesce(user_id::text, session_id)) as visitors
        from page_views
        where created_at >= start_date
        group by date_trunc('day', created_at)::date
        order by date
      ) as daily
    )
  ) into result;

  return result;
end;
$$;
