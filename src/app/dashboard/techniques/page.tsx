"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/subscription";
import { FeatureGate } from "@/components/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  FileText,
  ArrowRight,
  CheckCircle,
  Lock,
} from "lucide-react";

// Techniques/Playbooks across the 5S framework
const playbooks = [
  {
    category: "Solutions",
    items: [
      {
        title: "MVP Launch Playbook",
        description: "Step-by-step guide to launching your first product",
        steps: 12,
        feature: "solutions.techniques",
      },
      {
        title: "Feature Prioritization",
        description: "How to decide what to build next",
        steps: 8,
        feature: "solutions.techniques",
      },
    ],
  },
  {
    category: "Systems",
    items: [
      {
        title: "Weekly Review SOP",
        description: "Structured process for weekly reflection and planning",
        steps: 6,
        feature: "systems.techniques",
      },
      {
        title: "Client Onboarding Process",
        description: "Repeatable client onboarding system",
        steps: 10,
        feature: "systems.techniques",
      },
    ],
  },
  {
    category: "Software",
    items: [
      {
        title: "Code Review Checklist",
        description: "Comprehensive checklist for reviewing code",
        steps: 15,
        feature: "software.techniques",
      },
      {
        title: "Deployment Pipeline",
        description: "Safe, fast deployment processes",
        steps: 8,
        feature: "software.techniques",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        title: "Discovery Call Framework",
        description: "Structure effective client discovery calls",
        steps: 7,
        feature: "services.techniques",
        tier: "collective_pro",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        title: "Troubleshooting Framework",
        description: "Systematic approach to solving problems",
        steps: 5,
        feature: "support.techniques",
      },
    ],
  },
];

export default function TechniquesPage() {
  const { tier } = useSubscription();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wrench className="h-4 w-4" />
          <span>Techniques</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">The Method</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold">Playbooks & SOPs</h1>
        <p className="mt-1 text-muted-foreground">
          Master the practical how-to with step-by-step processes.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Playbooks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Wrench className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Playbooks by Category */}
      {playbooks.map((category) => (
        <div key={category.category}>
          <h2 className="mb-4 text-xl font-semibold">{category.category}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {category.items.map((playbook) => (
              <FeatureGate
                key={playbook.title}
                feature={playbook.feature}
                fallback={
                  <Card className="opacity-60">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{playbook.title}</CardTitle>
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription>{playbook.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Upgrade to access this playbook.
                      </p>
                    </CardContent>
                  </Card>
                }
              >
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{playbook.title}</CardTitle>
                      {"tier" in playbook && playbook.tier === "collective_pro" && (
                        <Badge variant="secondary">PRO</Badge>
                      )}
                    </div>
                    <CardDescription>{playbook.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {playbook.steps} steps
                      </span>
                      <Button size="sm" variant="ghost" className="group/btn text-primary">
                        View Playbook
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FeatureGate>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
