"use client";

import { ReactNode } from "react";
import { useSubscription, useFeatureAccess, getUpgradePath } from "@/lib/subscription";
import type { SubscriptionTier } from "@/lib/supabase/database.types";
import { TIER_PRICING } from "@/lib/supabase/database.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

// ============================================================================
// FeatureGate Component
// Conditionally render content based on user's subscription tier
// ============================================================================

interface FeatureGateProps {
  /** The feature key to check access for (e.g., 'services.technician') */
  feature: string;
  /** Content to show when user has access */
  children: ReactNode;
  /** Content to show when user doesn't have access (optional) */
  fallback?: ReactNode;
  /** Minimum tier required (alternative to feature-based check) */
  minTier?: SubscriptionTier;
  /** Show loading state while checking access */
  showLoading?: boolean;
}

export function FeatureGate({
  feature,
  children,
  fallback,
  minTier,
  showLoading = true,
}: FeatureGateProps) {
  const { tier, isLoading, hasAccess } = useSubscription();
  const { isEnabled } = useFeatureAccess(tier);

  // Show loading state
  if (isLoading && showLoading) {
    return (
      <div className="animate-pulse rounded-lg bg-muted/50 p-8">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="mt-2 h-4 w-48 rounded bg-muted" />
      </div>
    );
  }

  // Check access
  const hasFeatureAccess = minTier
    ? tierMeetsMinimum(tier, minTier)
    : isEnabled(feature);

  // User has access - show content
  if (hasFeatureAccess) {
    return <>{children}</>;
  }

  // User doesn't have access - show fallback or upgrade prompt
  return fallback ? (
    <>{fallback}</>
  ) : (
    <UpgradePrompt feature={feature} currentTier={tier} />
  );
}

// ============================================================================
// UpgradePrompt Component
// Shown when user needs to upgrade to access a feature
// ============================================================================

interface UpgradePromptProps {
  feature: string;
  currentTier: SubscriptionTier | null;
}

export function UpgradePrompt({ feature, currentTier }: UpgradePromptProps) {
  const upgradeTier = getUpgradePath(currentTier);

  if (!upgradeTier) {
    // Already at highest tier but still no access - shouldn't happen
    return null;
  }

  const tierInfo = TIER_PRICING[upgradeTier];
  const featureLabel = formatFeatureLabel(feature);

  return (
    <Card className="border-dashed border-muted-foreground/30 bg-gradient-to-br from-muted/30 to-muted/10">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">Unlock {featureLabel}</CardTitle>
        <CardDescription>
          This feature is available on {tierInfo.name} and above
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-background/50 p-4 text-center">
          <div className="text-3xl font-bold">
            ${tierInfo.monthly}
            <span className="text-base font-normal text-muted-foreground">/mo</span>
          </div>
          <div className="text-sm text-muted-foreground">
            or ${tierInfo.yearly}/year (save ${tierInfo.monthly * 12 - tierInfo.yearly})
          </div>
        </div>

        <ul className="space-y-2 text-sm">
          {tierInfo.features.slice(0, 3).map((feat, i) => (
            <li key={i} className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        <Button asChild className="w-full">
          <Link href={`/checkout/${upgradeTier}`}>
            Upgrade to {tierInfo.name}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// TierBadge Component
// Display user's current tier as a badge
// ============================================================================

interface TierBadgeProps {
  tier: SubscriptionTier | null;
  className?: string;
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  if (!tier) {
    return (
      <span className={`inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ${className}`}>
        Free
      </span>
    );
  }

  const tierInfo = TIER_PRICING[tier];

  const tierColors: Record<SubscriptionTier, string> = {
    individual_vip: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    collective_pro: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    ecosystem_ceo: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tierColors[tier]} ${className}`}>
      <Sparkles className="h-3 w-3" />
      {tierInfo.name}
    </span>
  );
}

// ============================================================================
// RequireTier HOC
// Wrap entire pages/sections that require a minimum tier
// ============================================================================

interface RequireTierProps {
  children: ReactNode;
  minTier: SubscriptionTier;
  fallbackUrl?: string;
}

export function RequireTier({
  children,
  minTier,
  fallbackUrl = "/checkout",
}: RequireTierProps) {
  const { tier, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!tierMeetsMinimum(tier, minTier)) {
    const tierInfo = TIER_PRICING[minTier];

    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Access Restricted</h2>
          <p className="mt-2 text-muted-foreground">
            This content requires a {tierInfo.name} subscription
          </p>
        </div>
        <Button asChild size="lg">
          <Link href={fallbackUrl}>
            Upgrade Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}

// ============================================================================
// Helper Functions
// ============================================================================

function tierMeetsMinimum(
  userTier: SubscriptionTier | null,
  requiredTier: SubscriptionTier
): boolean {
  if (!userTier) return false;

  const tierOrder: SubscriptionTier[] = [
    "individual_vip",
    "collective_pro",
    "ecosystem_ceo",
  ];

  const userIndex = tierOrder.indexOf(userTier);
  const requiredIndex = tierOrder.indexOf(requiredTier);

  return userIndex >= requiredIndex;
}

function formatFeatureLabel(featureKey: string): string {
  // Convert 'services.technician' to 'Technician Services'
  const parts = featureKey.split(".");
  if (parts.length !== 2) return featureKey;

  const [category, type] = parts;
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return `${capitalizedType} ${capitalizedCategory}`;
}
