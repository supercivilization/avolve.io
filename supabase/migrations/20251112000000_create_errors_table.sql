-- Create errors table for application error tracking
create table if not exists errors (
  id uuid primary key default gen_random_uuid(),

  -- Error details
  message text not null,
  stack text,
  error_type text,

  -- Context
  url text,
  route text,
  method text,
  user_agent text,

  -- User tracking (nullable for anonymous errors)
  user_id uuid references auth.users(id) on delete set null,
  session_id text,

  -- Environment
  environment text default 'production',
  deployment_id text,

  -- Metadata
  metadata jsonb default '{}'::jsonb,

  -- Status
  resolved boolean default false,
  resolved_at timestamp with time zone,
  resolved_by uuid references auth.users(id) on delete set null,

  -- Timestamps
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indexes for performance
create index idx_errors_created_at on errors(created_at desc);
create index idx_errors_resolved on errors(resolved) where resolved = false;
create index idx_errors_user_id on errors(user_id) where user_id is not null;
create index idx_errors_url on errors(url);
create index idx_errors_error_type on errors(error_type);

-- RLS policies
alter table errors enable row level security;

-- Allow inserting errors (public can log errors)
create policy "Allow public to insert errors"
  on errors for insert
  to anon, authenticated
  with check (true);

-- Only admins can view errors (you'll need to define admin role or use specific user IDs)
create policy "Allow authenticated users to view their own errors"
  on errors for select
  to authenticated
  using (user_id = auth.uid());

-- Admin policy (update this with your admin check logic)
create policy "Allow admins to view all errors"
  on errors for select
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      -- Add your admin check here, e.g., profiles.role = 'admin'
    )
  );

-- Admin update policy
create policy "Allow admins to update errors"
  on errors for update
  to authenticated
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      -- Add your admin check here
    )
  )
  with check (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      -- Add your admin check here
    )
  );

-- Function to update updated_at timestamp
create or replace function update_errors_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger update_errors_updated_at_trigger
  before update on errors
  for each row
  execute function update_errors_updated_at();

-- Function to clean up old resolved errors (optional cleanup job)
create or replace function cleanup_old_errors(days_old integer default 90)
returns integer as $$
declare
  deleted_count integer;
begin
  delete from errors
  where resolved = true
    and resolved_at < now() - (days_old || ' days')::interval;

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$ language plpgsql security definer;
