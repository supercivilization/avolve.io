-- Avolve Subscription Tiers
-- Migration: 20260102000001_avolve_tiers.sql
-- Purpose: Multi-tier subscription system with organizations and feature access

-- ============================================================================
-- SUBSCRIPTION TIER ENUM
-- ============================================================================

do $$ begin
  create type subscription_tier as enum ('individual_vip', 'collective_pro', 'ecosystem_ceo');
exception
  when duplicate_object then null;
end $$;

-- ============================================================================
-- ORGANIZATIONS TABLE
-- For Collective PRO and Ecosystem CEO team/org management
-- ============================================================================

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier subscription_tier not null default 'individual_vip',
  owner_id uuid references auth.users(id) on delete set null,
  stripe_customer_id text,
  stripe_subscription_id text,
  seat_limit int default 1, -- 1 for VIP, 10 for PRO, unlimited (null) for CEO
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for owner lookups
create index if not exists idx_organizations_owner
  on public.organizations(owner_id);

-- Index for Stripe lookups
create index if not exists idx_organizations_stripe_customer
  on public.organizations(stripe_customer_id);

-- ============================================================================
-- ORGANIZATION MEMBERS TABLE
-- Track team membership for Collective PRO and Ecosystem CEO
-- ============================================================================

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null default 'member', -- 'owner', 'admin', 'member'
  invited_email text, -- For pending invitations
  invited_at timestamptz,
  joined_at timestamptz default now(),

  -- Ensure unique membership per user per org
  unique(organization_id, user_id)
);

-- Index for user's organizations lookup
create index if not exists idx_org_members_user
  on public.organization_members(user_id);

-- Index for org's members lookup
create index if not exists idx_org_members_org
  on public.organization_members(organization_id);

-- ============================================================================
-- FEATURE ACCESS TABLE
-- Define what each tier can access in the 5S × 4T matrix
-- ============================================================================

create table if not exists public.feature_access (
  id uuid primary key default gen_random_uuid(),
  tier subscription_tier not null,
  feature_key text not null, -- e.g., 'solutions.training', 'services.technician'
  enabled boolean not null default true,
  limits jsonb default '{}'::jsonb, -- e.g., {"daily_limit": 100, "monthly_limit": null}

  -- Unique constraint per tier/feature combo
  unique(tier, feature_key)
);

-- Index for tier lookups
create index if not exists idx_feature_access_tier
  on public.feature_access(tier);

-- ============================================================================
-- SUBSCRIPTIONS TABLE
-- Track individual subscription status
-- ============================================================================

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  organization_id uuid references public.organizations(id) on delete cascade,
  tier subscription_tier not null default 'individual_vip',
  stripe_subscription_id text,
  stripe_price_id text,
  status text not null default 'active', -- 'active', 'canceled', 'past_due', 'trialing'
  billing_interval text not null default 'month', -- 'month' or 'year'
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Each user can only have one active subscription
  unique(user_id)
);

-- Index for Stripe lookups
create index if not exists idx_subscriptions_stripe
  on public.subscriptions(stripe_subscription_id);

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Organizations updated_at trigger
drop trigger if exists on_organizations_updated on public.organizations;
create trigger on_organizations_updated
  before update on public.organizations
  for each row
  execute function public.handle_updated_at();

-- Subscriptions updated_at trigger
drop trigger if exists on_subscriptions_updated on public.subscriptions;
create trigger on_subscriptions_updated
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.feature_access enable row level security;
alter table public.subscriptions enable row level security;

-- Organizations: Users can read their own org, service role can manage all
drop policy if exists "Users can read own organization" on public.organizations;
create policy "Users can read own organization"
  on public.organizations for select
  using (
    owner_id = auth.uid() or
    id in (
      select organization_id from public.organization_members
      where user_id = auth.uid()
    )
  );

-- Organization members: Members can read their org's members
drop policy if exists "Members can read org members" on public.organization_members;
create policy "Members can read org members"
  on public.organization_members for select
  using (
    user_id = auth.uid() or
    organization_id in (
      select organization_id from public.organization_members
      where user_id = auth.uid()
    )
  );

-- Feature access: Anyone can read (public pricing info)
drop policy if exists "Anyone can read feature access" on public.feature_access;
create policy "Anyone can read feature access"
  on public.feature_access for select
  using (true);

-- Subscriptions: Users can read their own subscription
drop policy if exists "Users can read own subscription" on public.subscriptions;
create policy "Users can read own subscription"
  on public.subscriptions for select
  using (user_id = auth.uid());

-- ============================================================================
-- SEED FEATURE ACCESS DATA
-- Define the 5S × 4T feature matrix for each tier
-- ============================================================================

-- Clear existing and insert fresh
delete from public.feature_access;

-- Individual VIP Features ($28/mo, $288/yr)
insert into public.feature_access (tier, feature_key, enabled, limits) values
  -- Solutions
  ('individual_vip', 'solutions.training', true, '{}'),
  ('individual_vip', 'solutions.techniques', true, '{}'),
  ('individual_vip', 'solutions.technology', true, '{}'),
  ('individual_vip', 'solutions.technician', false, '{}'),
  -- Systems
  ('individual_vip', 'systems.training', true, '{}'),
  ('individual_vip', 'systems.techniques', true, '{}'),
  ('individual_vip', 'systems.technology', true, '{}'),
  ('individual_vip', 'systems.technician', false, '{}'),
  -- Software
  ('individual_vip', 'software.training', true, '{}'),
  ('individual_vip', 'software.techniques', true, '{}'),
  ('individual_vip', 'software.technology', true, '{}'),
  ('individual_vip', 'software.technician', false, '{}'),
  -- Services
  ('individual_vip', 'services.training', false, '{}'),
  ('individual_vip', 'services.techniques', false, '{}'),
  ('individual_vip', 'services.technology', false, '{}'),
  ('individual_vip', 'services.technician', false, '{}'),
  -- Support
  ('individual_vip', 'support.training', true, '{}'),
  ('individual_vip', 'support.techniques', true, '{}'),
  ('individual_vip', 'support.technology', true, '{}'),
  ('individual_vip', 'support.technician', true, '{"type": "forum"}'),
  -- General features
  ('individual_vip', 'ai_chat', true, '{"daily_limit": 100}'),
  ('individual_vip', 'community', true, '{"type": "forum"}');

-- Collective PRO Features ($288/mo, $2,888/yr)
insert into public.feature_access (tier, feature_key, enabled, limits) values
  -- Solutions
  ('collective_pro', 'solutions.training', true, '{"level": "advanced"}'),
  ('collective_pro', 'solutions.techniques', true, '{"workshops": true}'),
  ('collective_pro', 'solutions.technology', true, '{"premium": true}'),
  ('collective_pro', 'solutions.technician', true, '{"type": "office_hours", "monthly": 1}'),
  -- Systems
  ('collective_pro', 'systems.training', true, '{"level": "deep_dive"}'),
  ('collective_pro', 'systems.techniques', true, '{"team_sops": true}'),
  ('collective_pro', 'systems.technology', true, '{"multi_user": true}'),
  ('collective_pro', 'systems.technician', true, '{"type": "reviews", "quarterly": 1}'),
  -- Software
  ('collective_pro', 'software.training', true, '{"level": "expert"}'),
  ('collective_pro', 'software.techniques', true, '{"team_patterns": true}'),
  ('collective_pro', 'software.technology', true, '{"team_tools": true}'),
  ('collective_pro', 'software.technician', true, '{"type": "group_reviews", "monthly": 2}'),
  -- Services
  ('collective_pro', 'services.training', true, '{"type": "group_consultation"}'),
  ('collective_pro', 'services.techniques', true, '{"type": "team_workshops"}'),
  ('collective_pro', 'services.technology', true, '{"team_tools": true}'),
  ('collective_pro', 'services.technician', true, '{"type": "priority_support"}'),
  -- Support
  ('collective_pro', 'support.training', true, '{"type": "premium_kb"}'),
  ('collective_pro', 'support.techniques', true, '{"escalation": true}'),
  ('collective_pro', 'support.technology', true, '{"team_diagnostics": true}'),
  ('collective_pro', 'support.technician', true, '{"type": "mentors", "response_hours": 24}'),
  -- General features
  ('collective_pro', 'ai_chat', true, '{"daily_limit": 500}'),
  ('collective_pro', 'community', true, '{"type": "forum", "priority": true}'),
  ('collective_pro', 'team_workspace', true, '{"seats": 10}'),
  ('collective_pro', 'office_hours', true, '{"monthly": 1}');

-- Ecosystem CEO Features ($2,888/mo, $22,888/yr)
insert into public.feature_access (tier, feature_key, enabled, limits) values
  -- Solutions
  ('ecosystem_ceo', 'solutions.training', true, '{"level": "custom_curriculum"}'),
  ('ecosystem_ceo', 'solutions.techniques', true, '{"type": "private_workshops"}'),
  ('ecosystem_ceo', 'solutions.technology', true, '{"bespoke": true}'),
  ('ecosystem_ceo', 'solutions.technician', true, '{"type": "dedicated_builds"}'),
  -- Systems
  ('ecosystem_ceo', 'systems.training', true, '{"level": "bespoke_architecture"}'),
  ('ecosystem_ceo', 'systems.techniques', true, '{"custom_sops": true}'),
  ('ecosystem_ceo', 'systems.technology', true, '{"custom_automations": true}'),
  ('ecosystem_ceo', 'systems.technician', true, '{"type": "architecture_partner"}'),
  -- Software
  ('ecosystem_ceo', 'software.training', true, '{"type": "one_on_one"}'),
  ('ecosystem_ceo', 'software.techniques', true, '{"custom_patterns": true}'),
  ('ecosystem_ceo', 'software.technology', true, '{"custom_components": true}'),
  ('ecosystem_ceo', 'software.technician', true, '{"type": "code_partnership"}'),
  -- Services
  ('ecosystem_ceo', 'services.training', true, '{"type": "strategy_sessions"}'),
  ('ecosystem_ceo', 'services.techniques', true, '{"type": "executive_workshops"}'),
  ('ecosystem_ceo', 'services.technology', true, '{"enterprise_tools": true}'),
  ('ecosystem_ceo', 'services.technician', true, '{"type": "dedicated_technician"}'),
  -- Support
  ('ecosystem_ceo', 'support.training', true, '{"type": "white_glove"}'),
  ('ecosystem_ceo', 'support.techniques', true, '{"direct_escalation": true}'),
  ('ecosystem_ceo', 'support.technology', true, '{"custom_diagnostics": true}'),
  ('ecosystem_ceo', 'support.technician', true, '{"type": "slack_phone", "sla_hours": 4}'),
  -- General features
  ('ecosystem_ceo', 'ai_chat', true, '{}'),
  ('ecosystem_ceo', 'community', true, '{"type": "all", "slack": true}'),
  ('ecosystem_ceo', 'team_workspace', true, '{"seats": null}'),
  ('ecosystem_ceo', 'office_hours', true, '{"weekly": 1}'),
  ('ecosystem_ceo', 'dedicated_technician', true, '{}'),
  ('ecosystem_ceo', 'private_slack', true, '{}'),
  ('ecosystem_ceo', 'sla_guarantee', true, '{"response_hours": 4, "resolution_hours": 24}');

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Get user's current subscription tier
create or replace function public.get_user_tier(p_user_id uuid)
returns subscription_tier as $$
declare
  user_tier subscription_tier;
begin
  select tier into user_tier
  from public.subscriptions
  where user_id = p_user_id
    and status in ('active', 'trialing')
  limit 1;

  return coalesce(user_tier, null);
end;
$$ language plpgsql security definer;

-- Check if user has access to a feature
create or replace function public.has_feature_access(p_user_id uuid, p_feature_key text)
returns boolean as $$
declare
  user_tier subscription_tier;
  feature_enabled boolean;
begin
  -- Get user's tier
  user_tier := public.get_user_tier(p_user_id);

  -- If no subscription, no access
  if user_tier is null then
    return false;
  end if;

  -- Check feature access
  select enabled into feature_enabled
  from public.feature_access
  where tier = user_tier
    and feature_key = p_feature_key;

  return coalesce(feature_enabled, false);
end;
$$ language plpgsql security definer;

-- Get all features for a tier
create or replace function public.get_tier_features(p_tier subscription_tier)
returns table (
  feature_key text,
  enabled boolean,
  limits jsonb
) as $$
begin
  return query
  select fa.feature_key, fa.enabled, fa.limits
  from public.feature_access fa
  where fa.tier = p_tier
  order by fa.feature_key;
end;
$$ language plpgsql security definer;

-- Get organization member count
create or replace function public.get_org_member_count(p_org_id uuid)
returns int as $$
declare
  member_count int;
begin
  select count(*) into member_count
  from public.organization_members
  where organization_id = p_org_id;

  return coalesce(member_count, 0);
end;
$$ language plpgsql security definer;
