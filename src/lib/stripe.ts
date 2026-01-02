import Stripe from "stripe";
import type { SubscriptionTier, BillingInterval } from "./supabase/database.types";

// Initialize Stripe with API key
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  : null;

// ============================================================================
// STRIPE PRICE IDS
// Create products in Stripe Dashboard or via CLI:
//
// Individual VIP ($28/mo, $288/yr):
// stripe products create --name="Individual VIP" --description="For solopreneurs ready to level up"
// stripe prices create --product=prod_xxx --unit-amount=2800 --currency=usd --recurring[interval]=month
// stripe prices create --product=prod_xxx --unit-amount=28800 --currency=usd --recurring[interval]=year
//
// Collective PRO ($288/mo, $2,888/yr):
// stripe products create --name="Collective PRO" --description="For teams that ship together"
// stripe prices create --product=prod_xxx --unit-amount=28800 --currency=usd --recurring[interval]=month
// stripe prices create --product=prod_xxx --unit-amount=288800 --currency=usd --recurring[interval]=year
//
// Ecosystem CEO ($2,888/mo, $22,888/yr):
// stripe products create --name="Ecosystem CEO" --description="For organizations building at scale"
// stripe prices create --product=prod_xxx --unit-amount=288800 --currency=usd --recurring[interval]=month
// stripe prices create --product=prod_xxx --unit-amount=2288800 --currency=usd --recurring[interval]=year
// ============================================================================

export const STRIPE_PRICE_IDS: Record<SubscriptionTier, { monthly: string; yearly: string }> = {
  individual_vip: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP_MONTHLY || "",
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIP_YEARLY || "",
  },
  collective_pro: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || "",
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY || "",
  },
  ecosystem_ceo: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_CEO_MONTHLY || "",
    yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_CEO_YEARLY || "",
  },
};

// ============================================================================
// TIER PLANS CONFIGURATION
// ============================================================================

export interface TierPlan {
  tier: SubscriptionTier;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  seatLimit: number | null;
  features: string[];
  highlighted?: boolean;
}

export const TIER_PLANS: Record<SubscriptionTier, TierPlan> = {
  individual_vip: {
    tier: "individual_vip",
    name: "Individual VIP",
    tagline: "For solopreneurs ready to level up",
    monthlyPrice: 28,
    yearlyPrice: 288,
    seatLimit: 1,
    features: [
      "Full access to Solutions, Systems, Software",
      "Training docs, techniques, and templates",
      "AI chat assistant (100 messages/day)",
      "Community forum access",
      "Self-serve support resources",
    ],
  },
  collective_pro: {
    tier: "collective_pro",
    name: "Collective PRO",
    tagline: "For teams that ship together",
    monthlyPrice: 288,
    yearlyPrice: 2888,
    seatLimit: 10,
    features: [
      "Everything in Individual VIP",
      "Team workspace (up to 10 seats)",
      "Monthly office hours with technicians",
      "Group code reviews (2/month)",
      "Priority support (24hr response)",
      "Quarterly system reviews",
    ],
    highlighted: true,
  },
  ecosystem_ceo: {
    tier: "ecosystem_ceo",
    name: "Ecosystem CEO",
    tagline: "For organizations building at scale",
    monthlyPrice: 2888,
    yearlyPrice: 22888,
    seatLimit: null,
    features: [
      "Everything in Collective PRO",
      "Unlimited seats",
      "Dedicated technician",
      "Private Slack channel",
      "Weekly strategy calls",
      "Custom solutions development",
      "SLA guarantees (4hr response)",
    ],
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getPriceId(tier: SubscriptionTier, interval: BillingInterval): string {
  return STRIPE_PRICE_IDS[tier][interval === "month" ? "monthly" : "yearly"];
}

export function getPrice(tier: SubscriptionTier, interval: BillingInterval): number {
  const plan = TIER_PLANS[tier];
  return interval === "month" ? plan.monthlyPrice : plan.yearlyPrice;
}

export function getYearlySavings(tier: SubscriptionTier): number {
  const plan = TIER_PLANS[tier];
  return plan.monthlyPrice * 12 - plan.yearlyPrice;
}

export function isValidTier(tier: string): tier is SubscriptionTier {
  return ["individual_vip", "collective_pro", "ecosystem_ceo"].includes(tier);
}

export function isValidInterval(interval: string): interval is BillingInterval {
  return ["month", "year"].includes(interval);
}

// ============================================================================
// LEGACY SUPPORT (for backwards compatibility)
// ============================================================================

export const STRIPE_PRICES = {
  monthly: STRIPE_PRICE_IDS.collective_pro.monthly,
  yearly: STRIPE_PRICE_IDS.collective_pro.yearly,
};

export const PLANS = {
  monthly: {
    name: "Monthly",
    price: TIER_PLANS.collective_pro.monthlyPrice,
    period: "month" as const,
    description: "Flexible monthly billing. Cancel anytime.",
    priceId: STRIPE_PRICES.monthly,
  },
  yearly: {
    name: "Annual",
    price: TIER_PLANS.collective_pro.yearlyPrice,
    period: "year" as const,
    originalPrice: TIER_PLANS.collective_pro.monthlyPrice * 12,
    savings: getYearlySavings("collective_pro"),
    description: "Best value. Save with annual billing.",
    priceId: STRIPE_PRICES.yearly,
  },
};
