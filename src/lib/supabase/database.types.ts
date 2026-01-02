/**
 * Supabase Database Types
 *
 * Auto-generate this file with:
 * npx supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
 *
 * Or use the Supabase CLI:
 * supabase gen types typescript --project-id coybefkmcykzbeosjgyt > src/lib/supabase/database.types.ts
 *
 * Run this command whenever you update your database schema to keep types in sync.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type SubscriptionTier = 'individual_vip' | 'collective_pro' | 'ecosystem_ceo'

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export type BillingInterval = 'month' | 'year'

export type OrgMemberRole = 'owner' | 'admin' | 'member'

export interface Database {
  public: {
    Tables: {
      // ============================================================================
      // SPOTS & PRESENCE (From Phase 1)
      // ============================================================================
      avolve_spots: {
        Row: {
          id: string
          total_spots: number
          spots_taken: number
          updated_at: string
        }
        Insert: {
          id?: string
          total_spots?: number
          spots_taken?: number
          updated_at?: string
        }
        Update: {
          id?: string
          total_spots?: number
          spots_taken?: number
          updated_at?: string
        }
      }
      avolve_activity: {
        Row: {
          id: string
          event_type: string
          city: string | null
          country_code: string | null
          plan: string
          created_at: string
        }
        Insert: {
          id?: string
          event_type?: string
          city?: string | null
          country_code?: string | null
          plan: string
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          city?: string | null
          country_code?: string | null
          plan?: string
          created_at?: string
        }
      }
      avolve_presence: {
        Row: {
          id: string
          session_id: string
          page: string
          created_at: string
          last_seen_at: string
        }
        Insert: {
          id?: string
          session_id: string
          page?: string
          created_at?: string
          last_seen_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          page?: string
          created_at?: string
          last_seen_at?: string
        }
      }

      // ============================================================================
      // SUBSCRIPTION TIERS (From Phase 2)
      // ============================================================================
      organizations: {
        Row: {
          id: string
          name: string
          tier: SubscriptionTier
          owner_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          seat_limit: number | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tier?: SubscriptionTier
          owner_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          seat_limit?: number | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tier?: SubscriptionTier
          owner_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          seat_limit?: number | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      organization_members: {
        Row: {
          id: string
          organization_id: string
          user_id: string
          role: string
          invited_email: string | null
          invited_at: string | null
          joined_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          user_id: string
          role?: string
          invited_email?: string | null
          invited_at?: string | null
          joined_at?: string
        }
        Update: {
          id?: string
          organization_id?: string
          user_id?: string
          role?: string
          invited_email?: string | null
          invited_at?: string | null
          joined_at?: string
        }
      }
      feature_access: {
        Row: {
          id: string
          tier: SubscriptionTier
          feature_key: string
          enabled: boolean
          limits: Json
        }
        Insert: {
          id?: string
          tier: SubscriptionTier
          feature_key: string
          enabled?: boolean
          limits?: Json
        }
        Update: {
          id?: string
          tier?: SubscriptionTier
          feature_key?: string
          enabled?: boolean
          limits?: Json
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          organization_id: string | null
          tier: SubscriptionTier
          stripe_subscription_id: string | null
          stripe_price_id: string | null
          status: string
          billing_interval: string
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id?: string | null
          tier?: SubscriptionTier
          stripe_subscription_id?: string | null
          stripe_price_id?: string | null
          status?: string
          billing_interval?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string | null
          tier?: SubscriptionTier
          stripe_subscription_id?: string | null
          stripe_price_id?: string | null
          status?: string
          billing_interval?: string
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      // Add database views here
    }
    Functions: {
      increment_spots_taken: {
        Args: Record<string, never>
        Returns: undefined
      }
      get_spots_remaining: {
        Args: Record<string, never>
        Returns: number
      }
      get_viewer_count: {
        Args: { page_path?: string }
        Returns: number
      }
      get_user_tier: {
        Args: { p_user_id: string }
        Returns: SubscriptionTier | null
      }
      has_feature_access: {
        Args: { p_user_id: string; p_feature_key: string }
        Returns: boolean
      }
      get_tier_features: {
        Args: { p_tier: SubscriptionTier }
        Returns: Array<{
          feature_key: string
          enabled: boolean
          limits: Json
        }>
      }
      get_org_member_count: {
        Args: { p_org_id: string }
        Returns: number
      }
    }
    Enums: {
      subscription_tier: SubscriptionTier
    }
  }
}

// ============================================================================
// CONVENIENCE TYPES
// ============================================================================

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Specific table types
export type Organization = Tables<'organizations'>
export type OrganizationMember = Tables<'organization_members'>
export type FeatureAccess = Tables<'feature_access'>
export type Subscription = Tables<'subscriptions'>
export type AvolveSpots = Tables<'avolve_spots'>
export type AvolveActivity = Tables<'avolve_activity'>
export type AvolvePresence = Tables<'avolve_presence'>

// ============================================================================
// TIER PRICING CONFIGURATION
// ============================================================================

export interface TierPricing {
  tier: SubscriptionTier
  name: string
  tagline: string
  monthly: number
  yearly: number
  seatLimit: number | null
  stripeMonthlyPriceId: string
  stripeYearlyPriceId: string
  features: string[]
  highlighted?: boolean
}

export const TIER_PRICING: Record<SubscriptionTier, TierPricing> = {
  individual_vip: {
    tier: 'individual_vip',
    name: 'Individual VIP',
    tagline: 'For solopreneurs ready to level up',
    monthly: 28,
    yearly: 288,
    seatLimit: 1,
    stripeMonthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP_MONTHLY || '',
    stripeYearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP_YEARLY || '',
    features: [
      'Full access to Solutions, Systems, Software',
      'Training docs, techniques, and templates',
      'AI chat assistant (100 messages/day)',
      'Community forum access',
      'Self-serve support resources',
    ],
  },
  collective_pro: {
    tier: 'collective_pro',
    name: 'Collective PRO',
    tagline: 'For teams that ship together',
    monthly: 288,
    yearly: 2888,
    seatLimit: 10,
    stripeMonthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || '',
    stripeYearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY || '',
    features: [
      'Everything in Individual VIP',
      'Team workspace (up to 10 seats)',
      'Monthly office hours with technicians',
      'Group code reviews (2/month)',
      'Priority support (24hr response)',
      'Quarterly system reviews',
    ],
    highlighted: true,
  },
  ecosystem_ceo: {
    tier: 'ecosystem_ceo',
    name: 'Ecosystem CEO',
    tagline: 'For organizations building at scale',
    monthly: 2888,
    yearly: 22888,
    seatLimit: null,
    stripeMonthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CEO_MONTHLY || '',
    stripeYearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CEO_YEARLY || '',
    features: [
      'Everything in Collective PRO',
      'Unlimited seats',
      'Dedicated technician',
      'Private Slack channel',
      'Weekly strategy calls',
      'Custom solutions development',
      'SLA guarantees (4hr response)',
    ],
  },
}
