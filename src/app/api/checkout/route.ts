import { NextRequest, NextResponse } from "next/server";
import {
  stripe,
  PLANS,
  TIER_PLANS,
  getPriceId,
  isValidTier,
  isValidInterval,
} from "@/lib/stripe";
import type { SubscriptionTier, BillingInterval } from "@/lib/supabase/database.types";

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return NextResponse.json(
        { error: "Payment service not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { tier, interval, plan, email, orgName } = body;

    // Support both new tier-based and legacy plan-based checkout
    let selectedTier: SubscriptionTier;
    let selectedInterval: BillingInterval;

    if (tier && isValidTier(tier)) {
      // New tier-based checkout
      selectedTier = tier;
      selectedInterval = isValidInterval(interval) ? interval : "year";
    } else if (plan && ["monthly", "yearly"].includes(plan)) {
      // Legacy plan-based checkout (maps to Collective PRO)
      selectedTier = "collective_pro";
      selectedInterval = plan === "monthly" ? "month" : "year";
    } else {
      return NextResponse.json(
        { error: "Invalid plan or tier selected" },
        { status: 400 }
      );
    }

    const tierPlan = TIER_PLANS[selectedTier];
    const priceId = getPriceId(selectedTier, selectedInterval);

    // Check if price ID is configured
    if (!priceId) {
      return NextResponse.json(
        { error: "Plan not available yet. Please join the waitlist." },
        { status: 503 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://avolve.io";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/${selectedTier}?interval=${selectedInterval}`,
      metadata: {
        tier: selectedTier,
        tierName: tierPlan.name,
        interval: selectedInterval,
        orgName: orgName || "",
      },
      subscription_data: {
        metadata: {
          tier: selectedTier,
          interval: selectedInterval,
          seatLimit: tierPlan.seatLimit?.toString() || "unlimited",
        },
        trial_period_days: undefined, // No trial
      },
      allow_promotion_codes: true,
      // Collect billing address for tax compliance
      billing_address_collection: "auto",
      // Enable automatic tax calculation if configured
      automatic_tax: {
        enabled: !!process.env.STRIPE_TAX_ENABLED,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
