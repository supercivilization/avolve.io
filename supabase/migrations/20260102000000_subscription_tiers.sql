-- Avolve Subscription Tiers Migration
-- Implements the 5S × 4T Framework with 3 subscription tiers

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

-- Enable moddatetime extension for auto-updating timestamps
create extension if not exists moddatetime with schema extensions;

-- ============================================================================
-- ENUMS
-- ============================================================================

-- Subscription tier levels
create type subscription_tier as enum (
  'individual_vip',   -- $28/mo or $288/yr - Single solopreneur, AI-only
  'collective_pro',   -- $288/mo or $2,888/yr - Team (up to 10), AI + Community + Group
  'ecosystem_ceo'     -- $2,888/mo or $22,888/yr - Organization (unlimited), Full Technician
);

-- Subscription status
create type subscription_status as enum (
  'active',
  'trialing',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete'
);

-- Billing interval
create type billing_interval as enum (
  'month',
  'year'
);

-- ============================================================================
-- ORGANIZATIONS (for Collective PRO and Ecosystem CEO tiers)
-- ============================================================================

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  tier subscription_tier not null default 'collective_pro',
  owner_id uuid references auth.users(id) on delete set null,
  stripe_customer_id text unique,
  stripe_subscription_id text,
  seat_limit int not null default 10,
  seats_used int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create slug from name
create or replace function generate_org_slug()
returns trigger as $$
begin
  if new.slug is null then
    new.slug := lower(regexp_replace(new.name, '[^a-zA-Z0-9]+', '-', 'g'));
    -- Ensure uniqueness by appending random suffix if needed
    while exists (select 1 from organizations where slug = new.slug and id != new.id) loop
      new.slug := new.slug || '-' || substr(gen_random_uuid()::text, 1, 4);
    end loop;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger organizations_generate_slug
  before insert on organizations
  for each row execute function generate_org_slug();

-- Auto-update updated_at
create trigger organizations_updated_at
  before update on organizations
  for each row execute function extensions.moddatetime(updated_at);

-- ============================================================================
-- ORGANIZATION MEMBERS
-- ============================================================================

create table organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  invited_by uuid references auth.users(id) on delete set null,
  invited_at timestamptz,
  joined_at timestamptz not null default now(),
  unique(organization_id, user_id)
);

-- Track seat count
create or replace function update_org_seats()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update organizations set seats_used = seats_used + 1 where id = new.organization_id;
  elsif tg_op = 'DELETE' then
    update organizations set seats_used = seats_used - 1 where id = old.organization_id;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger org_members_seat_count
  after insert or delete on organization_members
  for each row execute function update_org_seats();

-- ============================================================================
-- SUBSCRIPTIONS (links users to Stripe subscriptions)
-- ============================================================================

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  organization_id uuid references organizations(id) on delete cascade,
  tier subscription_tier not null,
  status subscription_status not null default 'incomplete',
  billing_interval billing_interval not null default 'month',
  stripe_customer_id text not null,
  stripe_subscription_id text unique,
  stripe_price_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Either user_id or organization_id must be set, not both
  constraint subscription_owner check (
    (user_id is not null and organization_id is null) or
    (user_id is null and organization_id is not null)
  )
);

create trigger subscriptions_updated_at
  before update on subscriptions
  for each row execute function extensions.moddatetime(updated_at);

-- ============================================================================
-- FEATURE ACCESS (defines what each tier can access)
-- ============================================================================

create table feature_access (
  id uuid primary key default gen_random_uuid(),
  tier subscription_tier not null,
  feature_key text not null,
  enabled boolean not null default true,
  limits jsonb, -- e.g., {"max_projects": 5, "storage_gb": 10}
  created_at timestamptz not null default now(),
  unique(tier, feature_key)
);

-- Insert default feature access rules
insert into feature_access (tier, feature_key, enabled, limits) values
  -- Individual VIP Features (Training, Techniques, Technology - no Technician)
  ('individual_vip', 'training_docs', true, null),
  ('individual_vip', 'training_tutorials', true, null),
  ('individual_vip', 'techniques_playbooks', true, null),
  ('individual_vip', 'techniques_sops', true, null),
  ('individual_vip', 'technology_templates', true, null),
  ('individual_vip', 'technology_components', true, null),
  ('individual_vip', 'support_knowledge_base', true, null),
  ('individual_vip', 'support_community_forum', true, null),
  ('individual_vip', 'ai_chat', true, '{"messages_per_day": 100}'),
  ('individual_vip', 'projects', true, '{"max_active": 3}'),

  -- Collective PRO Features (everything in VIP + team features + some Technician)
  ('collective_pro', 'training_docs', true, null),
  ('collective_pro', 'training_tutorials', true, null),
  ('collective_pro', 'training_advanced', true, null),
  ('collective_pro', 'techniques_playbooks', true, null),
  ('collective_pro', 'techniques_sops', true, null),
  ('collective_pro', 'techniques_workshops', true, null),
  ('collective_pro', 'technology_templates', true, null),
  ('collective_pro', 'technology_components', true, null),
  ('collective_pro', 'technology_premium', true, null),
  ('collective_pro', 'technician_office_hours', true, '{"hours_per_month": 2}'),
  ('collective_pro', 'technician_group_reviews', true, '{"reviews_per_quarter": 1}'),
  ('collective_pro', 'support_knowledge_base', true, null),
  ('collective_pro', 'support_community_forum', true, null),
  ('collective_pro', 'support_priority', true, null),
  ('collective_pro', 'support_mentors', true, null),
  ('collective_pro', 'ai_chat', true, '{"messages_per_day": 500}'),
  ('collective_pro', 'projects', true, '{"max_active": 10}'),
  ('collective_pro', 'team_workspace', true, '{"max_seats": 10}'),

  -- Ecosystem CEO Features (everything + dedicated Technician)
  ('ecosystem_ceo', 'training_docs', true, null),
  ('ecosystem_ceo', 'training_tutorials', true, null),
  ('ecosystem_ceo', 'training_advanced', true, null),
  ('ecosystem_ceo', 'training_custom', true, null),
  ('ecosystem_ceo', 'training_one_on_one', true, null),
  ('ecosystem_ceo', 'techniques_playbooks', true, null),
  ('ecosystem_ceo', 'techniques_sops', true, null),
  ('ecosystem_ceo', 'techniques_workshops', true, null),
  ('ecosystem_ceo', 'techniques_custom', true, null),
  ('ecosystem_ceo', 'techniques_executive', true, null),
  ('ecosystem_ceo', 'technology_templates', true, null),
  ('ecosystem_ceo', 'technology_components', true, null),
  ('ecosystem_ceo', 'technology_premium', true, null),
  ('ecosystem_ceo', 'technology_custom', true, null),
  ('ecosystem_ceo', 'technology_enterprise', true, null),
  ('ecosystem_ceo', 'technician_office_hours', true, '{"hours_per_month": "unlimited"}'),
  ('ecosystem_ceo', 'technician_dedicated', true, null),
  ('ecosystem_ceo', 'technician_slack_access', true, null),
  ('ecosystem_ceo', 'technician_weekly_calls', true, null),
  ('ecosystem_ceo', 'technician_partnership', true, null),
  ('ecosystem_ceo', 'support_knowledge_base', true, null),
  ('ecosystem_ceo', 'support_community_forum', true, null),
  ('ecosystem_ceo', 'support_priority', true, null),
  ('ecosystem_ceo', 'support_mentors', true, null),
  ('ecosystem_ceo', 'support_white_glove', true, null),
  ('ecosystem_ceo', 'support_sla', true, '{"response_hours": 4}'),
  ('ecosystem_ceo', 'ai_chat', true, '{"messages_per_day": "unlimited"}'),
  ('ecosystem_ceo', 'projects', true, '{"max_active": "unlimited"}'),
  ('ecosystem_ceo', 'team_workspace', true, '{"max_seats": "unlimited"}');

-- ============================================================================
-- ADD TIER TO PROFILES
-- ============================================================================

alter table profiles add column if not exists tier subscription_tier default null;
alter table profiles add column if not exists stripe_customer_id text unique;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Organizations RLS
alter table organizations enable row level security;

create policy "Users can view organizations they belong to"
  on organizations for select
  using (
    owner_id = auth.uid() or
    id in (select organization_id from organization_members where user_id = auth.uid())
  );

create policy "Owners can update their organizations"
  on organizations for update
  using (owner_id = auth.uid());

create policy "Authenticated users can create organizations"
  on organizations for insert
  with check (auth.uid() is not null);

-- Organization Members RLS
alter table organization_members enable row level security;

create policy "Users can view members of their organizations"
  on organization_members for select
  using (
    organization_id in (
      select id from organizations where owner_id = auth.uid()
      union
      select organization_id from organization_members where user_id = auth.uid()
    )
  );

create policy "Org owners and admins can manage members"
  on organization_members for all
  using (
    organization_id in (
      select id from organizations where owner_id = auth.uid()
      union
      select organization_id from organization_members
      where user_id = auth.uid() and role in ('owner', 'admin')
    )
  );

-- Subscriptions RLS
alter table subscriptions enable row level security;

create policy "Users can view their own subscriptions"
  on subscriptions for select
  using (
    user_id = auth.uid() or
    organization_id in (select organization_id from organization_members where user_id = auth.uid())
  );

-- Feature Access RLS (public read)
alter table feature_access enable row level security;

create policy "Anyone can view feature access rules"
  on feature_access for select
  using (true);

-- ============================================================================
-- INDEXES
-- ============================================================================

create index idx_subscriptions_user_id on subscriptions(user_id);
create index idx_subscriptions_organization_id on subscriptions(organization_id);
create index idx_subscriptions_stripe_customer_id on subscriptions(stripe_customer_id);
create index idx_subscriptions_stripe_subscription_id on subscriptions(stripe_subscription_id);
create index idx_org_members_user_id on organization_members(user_id);
create index idx_org_members_organization_id on organization_members(organization_id);
create index idx_feature_access_tier on feature_access(tier);
create index idx_profiles_tier on profiles(tier);
create index idx_profiles_stripe_customer_id on profiles(stripe_customer_id);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get user's current tier
create or replace function get_user_tier(user_uuid uuid)
returns subscription_tier as $$
declare
  user_tier subscription_tier;
begin
  -- First check direct subscription
  select tier into user_tier
  from subscriptions
  where user_id = user_uuid and status = 'active'
  order by
    case tier
      when 'ecosystem_ceo' then 1
      when 'collective_pro' then 2
      when 'individual_vip' then 3
    end
  limit 1;

  if user_tier is not null then
    return user_tier;
  end if;

  -- Check organization membership
  select o.tier into user_tier
  from organizations o
  join organization_members om on o.id = om.organization_id
  join subscriptions s on s.organization_id = o.id
  where om.user_id = user_uuid and s.status = 'active'
  order by
    case o.tier
      when 'ecosystem_ceo' then 1
      when 'collective_pro' then 2
      when 'individual_vip' then 3
    end
  limit 1;

  return user_tier; -- Returns null if no active subscription
end;
$$ language plpgsql security definer;

-- Check if user has access to a feature
create or replace function has_feature_access(user_uuid uuid, feature text)
returns boolean as $$
declare
  user_tier subscription_tier;
begin
  user_tier := get_user_tier(user_uuid);

  if user_tier is null then
    return false;
  end if;

  return exists (
    select 1 from feature_access
    where tier = user_tier
    and feature_key = feature
    and enabled = true
  );
end;
$$ language plpgsql security definer;

-- Get feature limits for a user
create or replace function get_feature_limits(user_uuid uuid, feature text)
returns jsonb as $$
declare
  user_tier subscription_tier;
  feature_limits jsonb;
begin
  user_tier := get_user_tier(user_uuid);

  if user_tier is null then
    return null;
  end if;

  select limits into feature_limits
  from feature_access
  where tier = user_tier
  and feature_key = feature
  and enabled = true;

  return feature_limits;
end;
$$ language plpgsql security definer;
