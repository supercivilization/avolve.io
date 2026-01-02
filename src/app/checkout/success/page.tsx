import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export const metadata: Metadata = {
  title: "Welcome to Avolve 365",
  description: "Your 365-day transformation journey begins now.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;

  return (
    <main className="min-h-screen px-4 py-20 md:py-32">
      <div className="mx-auto max-w-lg text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Header */}
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Welcome to Avolve 365!
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your 365-day transformation journey begins now.
        </p>

        {/* Next Steps */}
        <div className="mb-8 rounded-xl border border-border bg-muted/30 p-6 text-left">
          <h2 className="mb-4 text-lg font-semibold">What happens next:</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                1
              </span>
              <span>Check your email for login details and getting started guide</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                2
              </span>
              <span>Set up your goals and accountability preferences</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                3
              </span>
              <span>Start your first daily check-in tomorrow morning</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <Link href="/">
          <ShimmerButton className="w-full justify-center h-12">
            Back to Home
          </ShimmerButton>
        </Link>

        {/* Session ID for debugging */}
        {sessionId && (
          <p className="mt-6 text-xs text-muted-foreground">
            Order reference: {sessionId.slice(0, 20)}...
          </p>
        )}
      </div>
    </main>
  );
}
