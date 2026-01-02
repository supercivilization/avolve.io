"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { TIER_PLANS } from "@/lib/stripe";
import type { SubscriptionTier, BillingInterval } from "@/lib/supabase/database.types";

interface TierCheckoutFormProps {
  tier: SubscriptionTier;
  interval: BillingInterval;
}

export function TierCheckoutForm({ tier, interval }: TierCheckoutFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = TIER_PLANS[tier];

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tier, interval, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Secure Checkout</span>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            We'll send your login details here
          </p>
        </div>

        {/* Team email for PRO/CEO */}
        {tier !== "individual_vip" && (
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium mb-2">
              Organization name <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              id="orgName"
              placeholder="Your company or team name"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              You can invite team members after checkout
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <ShimmerButton
          type="submit"
          disabled={loading}
          className="w-full justify-center h-12"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Redirecting to payment...
            </>
          ) : (
            `Get ${plan.name}`
          )}
        </ShimmerButton>
      </form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
      </p>
    </div>
  );
}
