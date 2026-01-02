"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSubscription } from "@/lib/subscription";
import { TIER_PRICING, SubscriptionTier } from "@/lib/supabase/database.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { SpotsCounter } from "@/components/spots-counter";
import { Check, Sparkles, Users, Building2, Zap } from "lucide-react";

// ============================================================================
// PricingTiers Component
// Three-column pricing comparison with billing toggle
// ============================================================================

interface PricingTiersProps {
  className?: string;
  showToggle?: boolean;
  defaultInterval?: "month" | "year";
}

export function PricingTiers({
  className,
  showToggle = true,
  defaultInterval = "year",
}: PricingTiersProps) {
  const [billingInterval, setBillingInterval] = useState<"month" | "year">(defaultInterval);
  const { tier: currentTier, isLoading } = useSubscription();

  const tiers = Object.values(TIER_PRICING);

  return (
    <div className={cn("w-full", className)}>
      {/* Billing Toggle */}
      {showToggle && (
        <div className="mb-10 flex justify-center">
          <BillingToggle
            interval={billingInterval}
            onChange={setBillingInterval}
          />
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        {tiers.map((tierInfo) => (
          <PricingCard
            key={tierInfo.tier}
            tierInfo={tierInfo}
            billingInterval={billingInterval}
            isCurrentTier={currentTier === tierInfo.tier}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Spots remaining (only for VIP tier) */}
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <SpotsCounter showTotal={true} className="text-foreground font-medium" /> spots remaining for Individual VIP
          </span>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// BillingToggle Component
// ============================================================================

interface BillingToggleProps {
  interval: "month" | "year";
  onChange: (interval: "month" | "year") => void;
}

function BillingToggle({ interval, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border bg-background/50 p-1.5 backdrop-blur">
      <button
        onClick={() => onChange("month")}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          interval === "month"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange("year")}
        className={cn(
          "relative rounded-full px-4 py-2 text-sm font-medium transition-all",
          interval === "year"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yearly
        <span className="absolute -right-2 -top-2 rounded-full bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          -17%
        </span>
      </button>
    </div>
  );
}

// ============================================================================
// PricingCard Component
// ============================================================================

interface PricingCardProps {
  tierInfo: (typeof TIER_PRICING)[SubscriptionTier];
  billingInterval: "month" | "year";
  isCurrentTier: boolean;
  isLoading: boolean;
}

function PricingCard({
  tierInfo,
  billingInterval,
  isCurrentTier,
  isLoading,
}: PricingCardProps) {
  const price = billingInterval === "month" ? tierInfo.monthly : tierInfo.yearly;
  const monthlyEquivalent = billingInterval === "year" ? Math.round(tierInfo.yearly / 12) : tierInfo.monthly;

  const tierIcons: Record<SubscriptionTier, typeof Zap> = {
    individual_vip: Zap,
    collective_pro: Users,
    ecosystem_ceo: Building2,
  };

  const TierIcon = tierIcons[tierInfo.tier];

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg",
        tierInfo.highlighted && "border-primary/50 shadow-lg shadow-primary/10",
        isCurrentTier && "ring-2 ring-primary"
      )}
    >
      {/* Highlighted badge */}
      {tierInfo.highlighted && (
        <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-medium text-primary-foreground">
          Most Popular
        </div>
      )}

      {/* Current tier badge */}
      {isCurrentTier && (
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            <Check className="h-3 w-3" />
            Current Plan
          </span>
        </div>
      )}

      <CardHeader className={cn("pt-8", (tierInfo.highlighted || isCurrentTier) && "pt-12")}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              tierInfo.tier === "individual_vip" && "bg-blue-500/10 text-blue-600",
              tierInfo.tier === "collective_pro" && "bg-purple-500/10 text-purple-600",
              tierInfo.tier === "ecosystem_ceo" && "bg-amber-500/10 text-amber-600"
            )}
          >
            <TierIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl">{tierInfo.name}</CardTitle>
            <CardDescription className="text-sm">{tierInfo.tagline}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6">
        {/* Pricing */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">${price.toLocaleString()}</span>
            <span className="text-muted-foreground">
              /{billingInterval === "month" ? "mo" : "yr"}
            </span>
          </div>
          {billingInterval === "year" && (
            <p className="mt-1 text-sm text-muted-foreground">
              ${monthlyEquivalent}/month equivalent
            </p>
          )}
          {tierInfo.seatLimit && tierInfo.seatLimit > 1 && (
            <p className="mt-1 text-sm text-muted-foreground">
              Up to {tierInfo.seatLimit} team members
            </p>
          )}
          {!tierInfo.seatLimit && tierInfo.tier === "ecosystem_ceo" && (
            <p className="mt-1 text-sm text-muted-foreground">
              Unlimited team members
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="flex-1 space-y-3">
          {tierInfo.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-4">
          {isCurrentTier ? (
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          ) : tierInfo.highlighted ? (
            <div className="relative">
              <ShimmerButton
                className="w-full"
                shimmerSize="0.1em"
                background="hsl(var(--primary))"
              >
                <Link
                  href={`/checkout/${tierInfo.tier}?interval=${billingInterval}`}
                  className="flex w-full items-center justify-center gap-2 py-2"
                >
                  Get {tierInfo.name}
                </Link>
              </ShimmerButton>
            </div>
          ) : (
            <Button asChild className="w-full" variant={tierInfo.tier === "ecosystem_ceo" ? "default" : "outline"}>
              <Link href={`/checkout/${tierInfo.tier}?interval=${billingInterval}`}>
                Get {tierInfo.name}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>

      {/* Border beam for highlighted tier */}
      {tierInfo.highlighted && <BorderBeam size={300} duration={15} />}
    </Card>
  );
}

// ============================================================================
// Compact Pricing (for checkout pages, etc.)
// ============================================================================

interface CompactPricingProps {
  tier: SubscriptionTier;
  interval: "month" | "year";
  className?: string;
}

export function CompactPricing({ tier, interval, className }: CompactPricingProps) {
  const tierInfo = TIER_PRICING[tier];
  const price = interval === "month" ? tierInfo.monthly : tierInfo.yearly;

  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{tierInfo.name}</h3>
          <p className="text-sm text-muted-foreground">{tierInfo.tagline}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">${price.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">
            per {interval === "month" ? "month" : "year"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Feature Comparison Table
// ============================================================================

interface FeatureComparisonProps {
  className?: string;
}

export function FeatureComparison({ className }: FeatureComparisonProps) {
  const categories = [
    {
      name: "Solutions",
      features: [
        { name: "Training & Docs", vip: true, pro: true, ceo: true },
        { name: "Techniques & Playbooks", vip: true, pro: true, ceo: true },
        { name: "Templates & Technology", vip: true, pro: "Premium", ceo: "Custom" },
        { name: "Technician Access", vip: false, pro: "Office Hours", ceo: "Dedicated" },
      ],
    },
    {
      name: "Systems",
      features: [
        { name: "Architecture Guides", vip: true, pro: "Deep Dive", ceo: "Bespoke" },
        { name: "SOPs & Processes", vip: true, pro: "Team SOPs", ceo: "Custom SOPs" },
        { name: "Automations", vip: true, pro: "Multi-user", ceo: "Custom" },
        { name: "System Reviews", vip: false, pro: "Quarterly", ceo: "On-demand" },
      ],
    },
    {
      name: "Support",
      features: [
        { name: "Knowledge Base", vip: true, pro: "Premium", ceo: "White-glove" },
        { name: "Response Time", vip: "Forum", pro: "24hr", ceo: "4hr SLA" },
        { name: "Direct Access", vip: false, pro: "Mentors", ceo: "Slack + Phone" },
      ],
    },
  ];

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-4 pr-4 text-left font-medium">Feature</th>
            <th className="px-4 py-4 text-center font-medium">Individual VIP</th>
            <th className="px-4 py-4 text-center font-medium">Collective PRO</th>
            <th className="px-4 py-4 text-center font-medium">Ecosystem CEO</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <>
              <tr key={category.name} className="border-b bg-muted/30">
                <td colSpan={4} className="py-2 font-semibold">
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature, i) => (
                <tr key={`${category.name}-${i}`} className="border-b">
                  <td className="py-3 pr-4 text-muted-foreground">{feature.name}</td>
                  <td className="px-4 py-3 text-center">
                    <FeatureValue value={feature.vip} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <FeatureValue value={feature.pro} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <FeatureValue value={feature.ceo} />
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-green-500" />;
  }
  if (value === false) {
    return <span className="text-muted-foreground">—</span>;
  }
  return <span className="text-sm font-medium">{value}</span>;
}
