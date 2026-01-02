import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Shield, Zap, Users, Building2 } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { SpotsCounter } from "@/components/spots-counter";
import { TierCheckoutForm } from "./checkout-form";
import { TIER_PLANS, getYearlySavings, isValidTier, isValidInterval } from "@/lib/stripe";
import type { SubscriptionTier, BillingInterval } from "@/lib/supabase/database.types";

// Dynamic metadata based on tier
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier } = await params;

  if (!isValidTier(tier)) {
    return { title: "Checkout - Avolve" };
  }

  const plan = TIER_PLANS[tier as SubscriptionTier];

  return {
    title: `${plan.name} - Checkout | Avolve`,
    description: `Subscribe to ${plan.name}. ${plan.tagline}`,
  };
}

const tierIcons: Record<SubscriptionTier, typeof Zap> = {
  individual_vip: Zap,
  collective_pro: Users,
  ecosystem_ceo: Building2,
};

const tierColors: Record<SubscriptionTier, string> = {
  individual_vip: "text-blue-600 bg-blue-500/10",
  collective_pro: "text-purple-600 bg-purple-500/10",
  ecosystem_ceo: "text-amber-600 bg-amber-500/10",
};

export default async function TierCheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ tier: string }>;
  searchParams: Promise<{ interval?: string }>;
}) {
  const { tier } = await params;
  const { interval: intervalParam } = await searchParams;

  // Validate tier
  if (!isValidTier(tier)) {
    notFound();
  }

  const validTier = tier as SubscriptionTier;
  const plan = TIER_PLANS[validTier];
  const TierIcon = tierIcons[validTier];

  // Validate interval (default to yearly)
  const interval: BillingInterval = isValidInterval(intervalParam || "")
    ? (intervalParam as BillingInterval)
    : "year";

  const price = interval === "month" ? plan.monthlyPrice : plan.yearlyPrice;
  const monthlySavings = getYearlySavings(validTier);
  const monthlyEquivalent = Math.round(plan.yearlyPrice / 12);

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="mx-auto max-w-lg">
        {/* Back link */}
        <Link
          href="/#pricing"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to pricing
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            {validTier === "individual_vip" && "Start your personal transformation journey"}
            {validTier === "collective_pro" && "Power up your team with Avolve"}
            {validTier === "ecosystem_ceo" && "Scale your organization with dedicated support"}
          </p>
        </div>

        {/* Plan summary card */}
        <div className="relative mb-8 rounded-2xl border-2 border-primary bg-background p-6">
          <BorderBeam size={120} duration={10} />

          {/* Tier header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tierColors[validTier]}`}>
                <TierIcon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-sm text-muted-foreground">{plan.tagline}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${price.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">
                /{interval === "month" ? "month" : "year"}
              </div>
              {interval === "year" && (
                <>
                  <div className="mt-1 text-xs text-muted-foreground">
                    ${monthlyEquivalent}/mo equivalent
                  </div>
                  <div className="mt-0.5 text-xs text-green-600 dark:text-green-400 font-medium">
                    Save ${monthlySavings}/year
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Features summary */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <h3 className="text-sm font-medium mb-3">What's included:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {plan.features.slice(0, 5).map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
              {plan.features.length > 5 && (
                <li className="text-primary">+ {plan.features.length - 5} more features</li>
              )}
            </ul>
          </div>

          {/* Seat info for team/enterprise tiers */}
          {plan.seatLimit && plan.seatLimit > 1 && (
            <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">
              <span className="font-medium">Team plan:</span>{" "}
              <span className="text-muted-foreground">Up to {plan.seatLimit} team members</span>
            </div>
          )}
          {!plan.seatLimit && validTier === "ecosystem_ceo" && (
            <div className="mt-4 rounded-lg bg-muted/50 p-3 text-sm">
              <span className="font-medium">Enterprise:</span>{" "}
              <span className="text-muted-foreground">Unlimited team members</span>
            </div>
          )}
        </div>

        {/* Spots remaining for VIP */}
        {validTier === "individual_vip" && (
          <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <SpotsCounter showTotal={true} className="text-foreground font-medium" /> spots remaining
          </div>
        )}

        {/* Checkout form */}
        <TierCheckoutForm tier={validTier} interval={interval} />

        {/* Trust badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>SSL encrypted</span>
          </div>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {interval === "month" ? (
              <>
                Want to save ${monthlySavings}?{" "}
                <Link
                  href={`/checkout/${validTier}?interval=year`}
                  className="text-primary hover:underline"
                >
                  Switch to annual
                </Link>
              </>
            ) : (
              <>
                Prefer flexibility?{" "}
                <Link
                  href={`/checkout/${validTier}?interval=month`}
                  className="text-primary hover:underline"
                >
                  Switch to monthly
                </Link>
              </>
            )}
          </p>
        </div>

        {/* Other tiers */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground mb-3">Looking for a different plan?</p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(TIER_PLANS).map(([key, tierPlan]) => {
              if (key === validTier) return null;
              return (
                <Link
                  key={key}
                  href={`/checkout/${key}?interval=${interval}`}
                  className="text-sm text-primary hover:underline"
                >
                  {tierPlan.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
