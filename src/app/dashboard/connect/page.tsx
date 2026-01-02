"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/subscription";
import { FeatureGate, UpgradePrompt } from "@/components/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  MessageSquare,
  Video,
  Clock,
  ArrowRight,
  Slack,
  Phone,
} from "lucide-react";

// Connect/Technician options by tier
const connectOptions = [
  {
    title: "Community Forum",
    description: "Connect with other solopreneurs, ask questions, share wins",
    icon: MessageSquare,
    feature: "support.technician",
    tier: "all",
    action: "Join Discussion",
    color: "blue",
  },
  {
    title: "Office Hours",
    description: "Monthly group sessions with technicians",
    icon: Video,
    feature: "services.technician",
    tier: "collective_pro",
    action: "View Schedule",
    color: "purple",
    badge: "PRO",
  },
  {
    title: "Group Code Reviews",
    description: "Get feedback on your code from experts",
    icon: Users,
    feature: "software.technician",
    tier: "collective_pro",
    action: "Submit Code",
    color: "green",
    badge: "PRO",
  },
  {
    title: "Private Slack Channel",
    description: "Direct access to your dedicated technician",
    icon: Slack,
    feature: "support.technician",
    tier: "ecosystem_ceo",
    action: "Open Slack",
    color: "amber",
    badge: "CEO",
  },
  {
    title: "Weekly Strategy Calls",
    description: "1:1 calls with your dedicated technician",
    icon: Phone,
    feature: "services.technician",
    tier: "ecosystem_ceo",
    action: "Schedule Call",
    color: "rose",
    badge: "CEO",
  },
];

const tierColors = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  green: "bg-green-500/10 text-green-600 dark:text-green-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function ConnectPage() {
  const { tier, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Check if user has any technician access
  const hasTechnicianAccess = tier === "collective_pro" || tier === "ecosystem_ceo";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Connect</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">The Artist</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold">Human Expertise</h1>
        <p className="mt-1 text-muted-foreground">
          Get personalized guidance from technicians when context matters.
        </p>
      </div>

      {/* SLA Info for CEO tier */}
      {tier === "ecosystem_ceo" && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-semibold">Your SLA Guarantee</p>
                <p className="text-sm text-muted-foreground">4-hour response time, 24-hour resolution</p>
              </div>
            </div>
            <Badge variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-400">
              Active
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Connect Options */}
      <div className="grid gap-6 md:grid-cols-2">
        {connectOptions.map((option) => {
          const Icon = option.icon;
          const colorClass = tierColors[option.color as keyof typeof tierColors];

          // Community forum is available to all
          if (option.tier === "all") {
            return (
              <Card key={option.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          }

          // Feature-gated options
          return (
            <FeatureGate
              key={option.title}
              feature={option.feature}
              fallback={
                <Card className="border-dashed opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass} opacity-50`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary">{option.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/checkout">
                        Upgrade to Unlock
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              }
            >
              <Card className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{option.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </FeatureGate>
          );
        })}
      </div>

      {/* Upgrade prompt for VIP users */}
      {tier === "individual_vip" && (
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">Want Direct Access?</h3>
              <p className="mb-4 text-muted-foreground">
                Upgrade to Collective PRO for office hours and group sessions, or Ecosystem CEO for dedicated 1:1 support.
              </p>
              <Button asChild>
                <Link href="/checkout">
                  View Upgrade Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
