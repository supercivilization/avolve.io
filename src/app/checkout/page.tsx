import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, Shield } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = {
  title: "Checkout - Avolve 365",
  description: "Complete your Avolve 365 subscription. AI-powered accountability for solopreneurs.",
};

// Pricing config
const PLANS = {
  monthly: {
    name: "Monthly",
    price: 288,
    period: "month",
    description: "Flexible monthly billing. Cancel anytime.",
  },
  yearly: {
    name: "Annual",
    price: 2888,
    period: "year",
    originalPrice: 3456,
    savings: 568,
    description: "Best value. 2 months free.",
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  const planKey = params.plan === "yearly" ? "yearly" : "monthly";
  const plan = PLANS[planKey];

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="mx-auto max-w-lg">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            Start your 365-day transformation journey
          </p>
        </div>

        {/* Plan summary card */}
        <div className="relative mb-8 rounded-2xl border-2 border-primary bg-background p-6">
          <BorderBeam size={120} duration={10} />
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Avolve 365 - {plan.name}</h2>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${plan.price}</div>
              <div className="text-sm text-muted-foreground">/{plan.period}</div>
              {planKey === "yearly" && (
                <div className="mt-1 text-xs text-green-600 dark:text-green-400 font-medium">
                  Save ${PLANS.yearly.savings}
                </div>
              )}
            </div>
          </div>

          {/* Features summary */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <h3 className="text-sm font-medium mb-3">What's included:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Daily AI accountability check-ins</li>
              <li>• On-demand AI thinking partner</li>
              <li>• Progress tracking dashboard</li>
              <li>• 30-day money-back guarantee</li>
            </ul>
          </div>
        </div>

        {/* Checkout form */}
        <CheckoutForm plan={planKey} />

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

        {/* Plan toggle */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {planKey === "monthly" ? (
              <>
                Want to save $568?{" "}
                <Link href="/checkout?plan=yearly" className="text-primary hover:underline">
                  Switch to annual
                </Link>
              </>
            ) : (
              <>
                Prefer flexibility?{" "}
                <Link href="/checkout?plan=monthly" className="text-primary hover:underline">
                  Switch to monthly
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
