"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/subscription";
import { FeatureGate, TierBadge } from "@/components/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Wrench,
  Boxes,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const sections = [
  {
    title: "Training",
    subtitle: "The Map",
    description: "Learn the theoretical foundations. Guides, documentation, and structured learning paths.",
    href: "/dashboard/training",
    icon: BookOpen,
    color: "blue",
    stats: { label: "Modules", value: "12" },
  },
  {
    title: "Techniques",
    subtitle: "The Method",
    description: "Master the practical how-to. Playbooks, SOPs, and step-by-step processes.",
    href: "/dashboard/techniques",
    icon: Wrench,
    color: "purple",
    stats: { label: "Playbooks", value: "24" },
  },
  {
    title: "Tools",
    subtitle: "The Lever",
    description: "Use technology that multiplies your effort. Templates, components, and automations.",
    href: "/dashboard/tools",
    icon: Boxes,
    color: "green",
    stats: { label: "Templates", value: "48" },
  },
  {
    title: "Connect",
    subtitle: "The Artist",
    description: "Get human expertise when context matters. Office hours, reviews, and direct access.",
    href: "/dashboard/connect",
    icon: Users,
    color: "amber",
    feature: "services.technician",
  },
];

export default function DashboardPage() {
  const { tier, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back. Here's your path to mastery.
          </p>
        </div>
        <TierBadge tier={tier} className="text-sm" />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-2xl font-bold">12%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
              <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">3 modules</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Up</p>
              <p className="text-2xl font-bold">Systems 101</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4T Sections */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">The 4T Mastery Cycle</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const colorClasses = {
              blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
              purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
              green: "bg-green-500/10 text-green-600 dark:text-green-400",
              amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            };

            const content = (
              <Card className="group h-full transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[section.color as keyof typeof colorClasses]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {section.stats && (
                      <div className="text-right">
                        <p className="text-2xl font-bold">{section.stats.value}</p>
                        <p className="text-xs text-muted-foreground">{section.stats.label}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                        {section.subtitle}
                      </span>
                    </div>
                    <CardDescription className="mt-1">{section.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="ghost" className="group/btn -ml-4 text-primary">
                    <Link href={section.href}>
                      Explore {section.title}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );

            // If section requires a feature, wrap in FeatureGate
            if (section.feature) {
              return (
                <FeatureGate key={section.title} feature={section.feature}>
                  {content}
                </FeatureGate>
              );
            }

            return <div key={section.title}>{content}</div>;
          })}
        </div>
      </div>

      {/* Upgrade CTA for non-CEO tiers */}
      {tier && tier !== "ecosystem_ceo" && (
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">Want more access?</h3>
              <p className="text-sm text-muted-foreground">
                Upgrade to unlock technician access, team features, and priority support.
              </p>
            </div>
            <Button asChild>
              <Link href="/checkout">
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
