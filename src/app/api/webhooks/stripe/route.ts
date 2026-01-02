import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServiceRoleClient } from "@/lib/supabase/server";

// Lazy-initialize Stripe to avoid build-time errors when env vars aren't available
function getStripe() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(apiKey, {
    apiVersion: "2025-12-15.clover",
  });
}

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  return secret;
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }

    case "customer.subscription.deleted": {
      // Could implement spot release on cancellation
      // For now, spots are not released
      console.log("Subscription cancelled:", event.data.object);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = createServiceRoleClient();
  const plan = session.metadata?.plan || "monthly";

  try {
    // 1. Increment spots taken
    const { error: spotsError } = await supabase.rpc("increment_spots_taken");

    if (spotsError) {
      console.error("Error incrementing spots:", spotsError);
    }

    // 2. Log activity for real-time feed
    // Get location from Stripe if available, otherwise leave null
    let city: string | null = null;
    let countryCode: string | null = null;

    if (session.customer_details?.address?.city) {
      city = session.customer_details.address.city;
    }
    if (session.customer_details?.address?.country) {
      countryCode = session.customer_details.address.country;
    }

    const { error: activityError } = await supabase
      .from("avolve_activity")
      .insert({
        event_type: "purchase",
        city,
        country_code: countryCode,
        plan,
      });

    if (activityError) {
      console.error("Error logging activity:", activityError);
    }

    console.log(
      `✅ Checkout completed: ${plan} plan, spots updated, activity logged`
    );
  } catch (error) {
    console.error("Error handling checkout completion:", error);
  }
}
