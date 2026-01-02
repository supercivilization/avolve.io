"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/subscription";
import { TierBadge, UpgradePrompt } from "@/components/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  User,
  CreditCard,
  Bell,
  Shield,
  Building,
  Users,
  ArrowRight,
  ExternalLink,
  Check,
} from "lucide-react";

const tierFeatures = {
  individual_vip: {
    name: "Individual VIP",
    seatLimit: 1,
    features: [
      "Full documentation access",
      "AI chat assistance",
      "All templates",
      "Community forum",
    ],
  },
  collective_pro: {
    name: "Collective PRO",
    seatLimit: 10,
    features: [
      "Everything in Individual VIP",
      "Team workspace (up to 10 seats)",
      "Monthly office hours",
      "Priority support",
      "Quarterly reviews",
    ],
  },
  ecosystem_ceo: {
    name: "Ecosystem CEO",
    seatLimit: -1, // unlimited
    features: [
      "Everything in Collective PRO",
      "Unlimited seats",
      "Dedicated technician",
      "Private Slack channel",
      "Weekly strategy calls",
      "SLA guarantee (4hr response)",
    ],
  },
};

export default function SettingsPage() {
  const { tier, organization, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const currentTierInfo = tier ? tierFeatures[tier] : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold">Account Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account, subscription, and preferences.
        </p>
      </div>

      {/* Subscription Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan and billing</CardDescription>
              </div>
            </div>
            <TierBadge tier={tier} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentTierInfo && (
            <>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{currentTierInfo.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentTierInfo.seatLimit === -1
                        ? "Unlimited seats"
                        : `${currentTierInfo.seatLimit} seat${currentTierInfo.seatLimit > 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  {currentTierInfo.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link href="/checkout">
                    {tier === "ecosystem_ceo" ? "Manage Plan" : "Upgrade Plan"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost">
                  Billing Portal
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </>
          )}

          {!currentTierInfo && (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                You don't have an active subscription.
              </p>
              <Button asChild>
                <Link href="/checkout">
                  View Plans
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Organization Card (for team tiers) */}
      {(tier === "collective_pro" || tier === "ecosystem_ceo") && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Organization</CardTitle>
                <CardDescription>Team and workspace settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {organization?.name || "Your Organization"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tier === "ecosystem_ceo"
                      ? "Unlimited team members"
                      : "Up to 10 team members"}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Profile</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-start">
              Edit Profile
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Notifications</CardTitle>
                <CardDescription>Email and alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-start">
              Manage Notifications
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Security</CardTitle>
                <CardDescription>Password and authentication</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-start">
              Security Settings
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Billing Settings */}
        <Card className="group hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10">
                <CreditCard className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Billing</CardTitle>
                <CardDescription>Invoices and payment methods</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-start">
              Billing History
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
