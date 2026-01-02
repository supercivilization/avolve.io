import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, MessageCircle, Target, TrendingUp, Users } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Particles } from "@/components/ui/particles";

export const metadata: Metadata = {
  title: "Avolve 365 - Your AI Accountability Partner for Solopreneurs",
  description: "365 days of AI-powered accountability. Daily check-ins, progress tracking, and an AI thinking partner that knows your journey. Only 365 spots available. $288/month or $2,888/year.",
  alternates: {
    canonical: "https://avolve.io",
  },
};

// Scarcity config - update these numbers as spots are taken
const TOTAL_SPOTS = 365;
const SPOTS_TAKEN = 4;
const SPOTS_REMAINING = TOTAL_SPOTS - SPOTS_TAKEN;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background particles */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        staticity={50}
        ease={50}
        color="oklch(0.5 0 0)"
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Scarcity Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              Only <NumberTicker value={SPOTS_REMAINING} className="font-bold" /> of {TOTAL_SPOTS} spots remaining
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            365 Days to Transform
            <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
              Your Business
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            An AI accountability partner that checks in daily, knows your goals, and helps you
            make consistent progress. No more going it alone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/checkout?plan=monthly">
              <ShimmerButton className="h-14 px-8 text-lg font-semibold">
                Start for $288/month
              </ShimmerButton>
            </Link>
            <Link
              href="/checkout?plan=yearly"
              className="group relative overflow-hidden rounded-lg border border-border bg-background px-8 py-4 text-lg font-semibold transition-all hover:border-primary"
            >
              <BorderBeam size={100} duration={8} />
              <span className="relative z-10">
                Save $568 → $2,888/year
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <p className="mt-6 text-sm text-muted-foreground">
            Cancel anytime • No contracts • 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            The Lonely Reality of Building Alone
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Decision Fatigue",
                description: "Endless choices with no one to talk them through. Should you focus on marketing or product? Hire or bootstrap? Every decision falls on you.",
              },
              {
                title: "Isolation Spiral",
                description: "No team to celebrate wins or process setbacks. The highs and lows hit different when you're carrying them alone.",
              },
              {
                title: "Inconsistent Progress",
                description: "Great weeks followed by lost momentum. Without external accountability, it's easy to let priorities slip.",
              },
              {
                title: "Shiny Object Syndrome",
                description: "New ideas constantly competing for attention. No one to help you stay focused on what actually moves the needle.",
              },
            ].map((problem) => (
              <div
                key={problem.title}
                className="rounded-xl border border-border/50 bg-background p-6"
              >
                <h3 className="mb-2 text-lg font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-lg text-muted-foreground">
            Studies show accountability increases goal completion rates to{" "}
            <span className="font-bold text-foreground">95%</span>. You don't need more
            willpower—you need a system.
          </p>
        </div>
      </section>

      {/* Solution Section - The Daily Loop */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Your Daily Accountability Loop
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
            A simple daily rhythm that compounds into massive transformation over 365 days.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Morning */}
            <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-amber-500/5 to-transparent p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Morning Priority</h3>
              <p className="text-muted-foreground">
                Start each day with clarity. Your AI partner helps you identify the ONE thing
                that will move your business forward today.
              </p>
            </div>

            {/* Midday */}
            <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-blue-500/5 to-transparent p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Midday Unblock</h3>
              <p className="text-muted-foreground">
                Stuck on a decision? Need to think through a problem? Your AI thinking partner
                is there when you need to work through challenges.
              </p>
            </div>

            {/* Evening */}
            <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-violet-500/5 to-transparent p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Evening Review</h3>
              <p className="text-muted-foreground">
                Track your progress, celebrate wins, and plan tomorrow. See how small daily
                actions compound into big results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Everything You Get
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Daily AI check-ins (morning + evening)",
              "On-demand thinking partner access",
              "Progress tracking dashboard",
              "Goal setting and milestone tracking",
              "Weekly progress summaries",
              "Monthly reflection prompts",
              "Streak tracking and motivation",
              "Export your journey anytime",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-lg p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Choose Your Journey
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
            Less than the cost of one session with a human coach. Available 24/7.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Monthly */}
            <div className="relative rounded-2xl border border-border bg-background p-8">
              <h3 className="mb-2 text-xl font-semibold">Monthly</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$288</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                Perfect for trying it out. Cancel anytime.
              </p>
              <Link href="/checkout?plan=monthly" className="block">
                <ShimmerButton className="w-full justify-center">
                  Get Started
                </ShimmerButton>
              </Link>
            </div>

            {/* Yearly - Highlighted */}
            <div className="relative rounded-2xl border-2 border-primary bg-background p-8">
              <BorderBeam size={150} duration={10} />
              <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                SAVE $568
              </div>
              <h3 className="mb-2 text-xl font-semibold">Annual</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">$2,888</span>
                <span className="text-muted-foreground">/year</span>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">
                Best value. Commit to your transformation.
              </p>
              <Link href="/checkout?plan=yearly">
                <ShimmerButton className="w-full justify-center">
                  Get Started
                </ShimmerButton>
              </Link>
            </div>
          </div>

          {/* Scarcity reminder */}
          <div className="mt-12 rounded-xl border border-amber-500/30 bg-amber-500/10 p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                Limited Availability
              </span>
            </div>
            <p className="text-muted-foreground">
              Only <span className="font-bold text-foreground">{SPOTS_REMAINING}</span> of{" "}
              {TOTAL_SPOTS} spots remaining. When they're gone, they're gone.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Common Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Why only 365 spots?",
                a: "We want to maintain quality and ensure every member gets real value. By limiting spots, we can evolve the experience based on feedback from a focused community of serious solopreneurs.",
              },
              {
                q: "What makes this different from just using ChatGPT?",
                a: "Context and consistency. Your AI partner remembers your goals, tracks your progress over time, and proactively checks in. It's the difference between having a conversation and having a relationship.",
              },
              {
                q: "What if I miss a day?",
                a: "Life happens. The system adapts to your schedule and helps you get back on track without judgment. Progress, not perfection.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Monthly subscribers can cancel at any time. Annual subscribers can request a prorated refund within the first 30 days.",
              },
              {
                q: "When does my 365 days start?",
                a: "Your journey begins the day you sign up. You'll have access for a full 365 days from your start date.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border/50 bg-background p-6">
                <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Stop Going It Alone?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Join {SPOTS_TAKEN} other solopreneurs who have already started their 365-day
            transformation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/checkout?plan=yearly">
              <ShimmerButton className="h-14 px-8 text-lg font-semibold">
                Start Your Journey → $2,888/year
              </ShimmerButton>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            30-day money-back guarantee • Cancel anytime
          </p>

          {/* Final scarcity */}
          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              <NumberTicker value={SPOTS_REMAINING} className="font-bold text-foreground" /> spots
              remaining
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
