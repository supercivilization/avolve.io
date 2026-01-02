import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PricingTiers } from "@/components/pricing-tiers";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Choose Your Plan - Avolve",
  description: "Choose the right Avolve plan for you. Individual VIP, Collective PRO, or Ecosystem CEO.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; tier?: string }>;
}) {
  const params = await searchParams;

  // If a specific tier is provided via query param, redirect to that tier's checkout
  if (params.tier) {
    const validTiers = ["individual_vip", "collective_pro", "ecosystem_ceo"];
    if (validTiers.includes(params.tier)) {
      redirect(`/checkout/${params.tier}`);
    }
  }

  // Legacy support: if plan=monthly or plan=yearly, redirect to Collective PRO
  if (params.plan === "monthly" || params.plan === "yearly") {
    redirect(`/checkout/collective_pro?interval=${params.plan === "monthly" ? "month" : "year"}`);
  }

  // Show pricing comparison page
  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your needs. Scale up anytime as you grow.
          </p>
        </div>

        {/* Pricing tiers */}
        <PricingTiers showToggle={true} defaultInterval="year" />

        {/* FAQ link */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have questions about which plan is right for you?
          </p>
          <Button asChild variant="outline">
            <Link href="/#faq">
              View FAQ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
