import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { SuccessCelebration } from "./celebration";

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
    <main className="relative min-h-screen overflow-hidden px-4 py-20 md:py-32">
      {/* Confetti celebration effect */}
      <SuccessCelebration />

      <div className="mx-auto max-w-lg text-center">
        {/* Success Icon with animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/25">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            {/* Animated ring */}
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
          </div>
        </div>

        {/* Celebration Header */}
        <div className="mb-2 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">
            You're In!
          </span>
          <Sparkles className="h-5 w-5" />
        </div>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Welcome to Avolve 365!
        </h1>

        <p className="mb-8 text-lg text-muted-foreground">
          You just made a powerful commitment to yourself. Your 365-day transformation
          journey begins <span className="font-semibold text-foreground">right now</span>.
        </p>

        {/* Personalized welcome card */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 text-left">
          <BorderBeam size={100} duration={12} colorFrom="#22c55e" colorTo="#10b981" />

          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
              <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
            </span>
            What happens next
          </h2>

          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                1
              </span>
              <div>
                <span className="font-medium text-foreground">Check your email</span>
                <p className="text-sm">Login details and your getting started guide are on their way</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                2
              </span>
              <div>
                <span className="font-medium text-foreground">Set up your goals</span>
                <p className="text-sm">Tell your AI partner what you're working toward</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                3
              </span>
              <div>
                <span className="font-medium text-foreground">Start tomorrow morning</span>
                <p className="text-sm">Your first daily check-in awaits</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Motivation message */}
        <div className="mb-8 rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-sm italic text-muted-foreground">
            "The journey of a thousand miles begins with a single step."
            <span className="mt-1 block font-medium text-foreground">
              You just took yours.
            </span>
          </p>
        </div>

        {/* CTA */}
        <Link href="/">
          <ShimmerButton className="w-full justify-center h-12">
            Back to Home
          </ShimmerButton>
        </Link>

        {/* Session ID for support */}
        {sessionId && (
          <p className="mt-6 text-xs text-muted-foreground">
            Order reference: <code className="rounded bg-muted px-1.5 py-0.5">{sessionId.slice(0, 24)}...</code>
          </p>
        )}
      </div>
    </main>
  );
}
