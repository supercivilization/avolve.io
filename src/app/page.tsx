import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, MessageCircle, Target, TrendingUp, Users, Zap, Building2 } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { SpotsRemainingBadge, SpotsCounter } from "@/components/spots-counter";
import { SpotsMeter } from "@/components/spots-meter";
import { LiveViewers } from "@/components/live-viewers";
import { RecentActivity } from "@/components/recent-activity";
import { PricingTiers, FeatureComparison } from "@/components/pricing-tiers";

export const metadata: Metadata = {
  title: "Avolve - Solutions, Systems, Software for Solopreneurs",
  description: "The complete platform for solopreneurs: Solutions, Systems, Software, Services, and Support. From Individual VIP to Ecosystem CEO. Start at $28/month.",
  alternates: {
    canonical: "https://avolve.io",
  },
};

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
          {/* Live Viewers - shows real presence */}
          <BlurFade delay={0} inView>
            <div className="mb-4 flex justify-center">
              <LiveViewers page="/" />
            </div>
          </BlurFade>

          {/* Dynamic Scarcity Badge - real-time from database */}
          <BlurFade delay={0.1} inView>
            <div className="mb-8 flex justify-center">
              <SpotsRemainingBadge />
            </div>
          </BlurFade>

          {/* Main Headline */}
          <BlurFade delay={0.2} inView>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Solutions, Systems, Software
              <span className="block bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100">
                For Solopreneurs
              </span>
            </h1>
          </BlurFade>

          {/* Subheadline */}
          <BlurFade delay={0.3} inView>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              The complete platform to level up your business. Training, techniques, technology,
              and technician support—tailored to where you are on your journey.
            </p>
          </BlurFade>

          {/* CTA Buttons */}
          <BlurFade delay={0.4} inView>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/checkout/individual_vip">
                <ShimmerButton className="h-14 px-8 text-lg font-semibold">
                  Start at $28/month
                </ShimmerButton>
              </Link>
              <Link
                href="#pricing"
                className="group relative overflow-hidden rounded-lg border border-border bg-background px-8 py-4 text-lg font-semibold transition-all hover:border-primary"
              >
                <BorderBeam size={100} duration={8} />
                <span className="relative z-10">
                  Compare All Plans
                </span>
              </Link>
            </div>
          </BlurFade>

          {/* Trust indicators */}
          <BlurFade delay={0.5} inView>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                Individual to Enterprise
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                Teams up to unlimited
              </span>
              <span className="hidden sm:inline">•</span>
              <span>30-day money-back guarantee</span>
            </div>
          </BlurFade>

          {/* Recent Activity Feed - shows real purchases */}
          <BlurFade delay={0.6} inView>
            <div className="mt-10">
              <RecentActivity limit={3} />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0} inView>
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              The Lonely Reality of Building Alone
            </h2>
          </BlurFade>

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
            ].map((problem, index) => (
              <BlurFade key={problem.title} delay={0.1 + index * 0.1} inView>
                <div className="rounded-xl border border-border/50 bg-background p-6 h-full">
                  <h3 className="mb-2 text-lg font-semibold">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.5} inView>
            <p className="mt-12 text-center text-lg text-muted-foreground">
              Studies show accountability increases goal completion rates to{" "}
              <span className="font-bold text-foreground">95%</span>. You don't need more
              willpower—you need a system.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Solution Section - The Daily Loop */}
      <section className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <BlurFade delay={0} inView>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Your Daily Accountability Loop
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
              A simple daily rhythm that compounds into massive transformation over 365 days.
            </p>
          </BlurFade>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Morning */}
            <BlurFade delay={0.2} inView>
              <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-amber-500/5 to-transparent p-8 h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                  <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Morning Priority</h3>
                <p className="text-muted-foreground">
                  Start each day with clarity. Your AI partner helps you identify the ONE thing
                  that will move your business forward today.
                </p>
              </div>
            </BlurFade>

            {/* Midday */}
            <BlurFade delay={0.3} inView>
              <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-blue-500/5 to-transparent p-8 h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Midday Unblock</h3>
                <p className="text-muted-foreground">
                  Stuck on a decision? Need to think through a problem? Your AI thinking partner
                  is there when you need to work through challenges.
                </p>
              </div>
            </BlurFade>

            {/* Evening */}
            <BlurFade delay={0.4} inView>
              <div className="relative rounded-2xl border border-border/50 bg-gradient-to-b from-violet-500/5 to-transparent p-8 h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
                  <TrendingUp className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Evening Review</h3>
                <p className="text-muted-foreground">
                  Track your progress, celebrate wins, and plan tomorrow. See how small daily
                  actions compound into big results.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* The 5S Framework */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0} inView>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              The 5S Framework
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
              Five pillars of value, each delivered through Training, Techniques, Technology, and Technician access.
            </p>
          </BlurFade>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[
              {
                title: "Solutions",
                description: "Pre-built answers to common challenges. Templates, guides, and proven blueprints.",
                color: "blue",
              },
              {
                title: "Systems",
                description: "Repeatable processes that scale. SOPs, automations, and workflows.",
                color: "purple",
              },
              {
                title: "Software",
                description: "Tools and implementations. Components, configs, and integrations.",
                color: "green",
              },
              {
                title: "Services",
                description: "Done-with-you expertise. Reviews, consultations, and implementations.",
                color: "amber",
              },
              {
                title: "Support",
                description: "Help when you need it. Community, documentation, and direct access.",
                color: "rose",
              },
            ].map((pillar, index) => (
              <BlurFade key={pillar.title} delay={0.1 + index * 0.05} inView>
                <div className={`rounded-xl border border-${pillar.color}-500/20 bg-${pillar.color}-500/5 p-6 h-full`}>
                  <h3 className={`mb-2 text-lg font-semibold text-${pillar.color}-600 dark:text-${pillar.color}-400`}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>

          {/* 4T Mastery Cycle */}
          <BlurFade delay={0.4} inView>
            <div className="mt-16">
              <h3 className="mb-8 text-center text-xl font-semibold">The 4T Mastery Cycle</h3>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { title: "Training", subtitle: "The Map", description: "Learn the theory and foundations" },
                  { title: "Techniques", subtitle: "The Method", description: "Master the practical how-to" },
                  { title: "Technology", subtitle: "The Lever", description: "Use tools that multiply your effort" },
                  { title: "Technician", subtitle: "The Artist", description: "Get human expertise when context matters" },
                ].map((phase, index) => (
                  <div key={phase.title} className="rounded-lg border border-border bg-background p-4 text-center">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {phase.subtitle}
                    </div>
                    <h4 className="mb-1 text-lg font-semibold">{phase.title}</h4>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-6xl">
          <BlurFade delay={0} inView>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Choose Your Level
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
              Three tiers designed to meet you where you are. Scale up as you grow.
            </p>
          </BlurFade>

          {/* New 3-Tier Pricing */}
          <BlurFade delay={0.2} inView>
            <PricingTiers showToggle={true} defaultInterval="year" />
          </BlurFade>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <BlurFade delay={0} inView>
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Compare Plans
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
              See what's included at each level across the 5S framework.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <FeatureComparison />
          </BlurFade>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-20 md:py-32">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0} inView>
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              Common Questions
            </h2>
          </BlurFade>

          <div className="space-y-6">
            {[
              {
                q: "What's the difference between the three tiers?",
                a: "Each tier adds more depth, scope, and human involvement. Individual VIP is self-serve with AI assistance. Collective PRO adds team features and group sessions with technicians. Ecosystem CEO includes dedicated 1:1 support, unlimited seats, and SLA guarantees.",
              },
              {
                q: "Why only 365 spots for Individual VIP?",
                a: "We want to maintain quality and ensure every member gets real value. By limiting spots, we can evolve the experience based on feedback from a focused community of serious solopreneurs.",
              },
              {
                q: "Can I upgrade my plan later?",
                a: "Absolutely. You can upgrade anytime and we'll prorate the difference. Many members start with Individual VIP and upgrade as their team grows.",
              },
              {
                q: "What's included in 'Technician' access?",
                a: "Technicians are human experts who provide personalized guidance. At PRO level, this means office hours and group sessions. At CEO level, you get a dedicated technician with direct Slack access.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Monthly subscribers can cancel at any time. Annual subscribers can request a prorated refund within the first 30 days.",
              },
              {
                q: "Do you offer discounts for nonprofits or education?",
                a: "Yes! Contact us for special pricing on Collective PRO and Ecosystem CEO tiers for qualifying organizations.",
              },
            ].map((faq, index) => (
              <BlurFade key={faq.q} delay={0.1 * index} inView>
                <div className="rounded-xl border border-border/50 bg-background p-6">
                  <h3 className="mb-2 text-lg font-semibold">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/50 bg-muted/30 px-6 py-20 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade delay={0} inView>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Level Up?
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <p className="mb-10 text-lg text-muted-foreground">
              Join solopreneurs and teams who are building with Solutions, Systems, and Software.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/checkout/individual_vip">
                <ShimmerButton className="h-14 px-8 text-lg font-semibold">
                  Start at $28/month
                </ShimmerButton>
              </Link>
              <Link
                href="/checkout/collective_pro"
                className="rounded-lg border border-border bg-background px-8 py-4 text-lg font-semibold transition-all hover:border-primary"
              >
                Team Plan from $288/mo
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              30-day money-back guarantee • Upgrade anytime • Cancel anytime
            </p>
          </BlurFade>

          {/* Final dynamic scarcity */}
          <BlurFade delay={0.3} inView>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                <SpotsCounter showTotal={false} className="font-bold text-foreground" /> Individual VIP spots
                remaining
              </span>
            </div>
          </BlurFade>

          {/* Recent activity at bottom */}
          <BlurFade delay={0.4} inView>
            <div className="mt-8">
              <RecentActivity limit={2} />
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
