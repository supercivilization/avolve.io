"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/subscription";
import { FeatureGate } from "@/components/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Boxes,
  Download,
  ExternalLink,
  Lock,
  Code,
  FileCode,
  Workflow,
} from "lucide-react";

// Tools/Technology across the 5S framework
const tools = [
  {
    category: "Solutions",
    items: [
      {
        title: "AI SaaS Starter",
        description: "Next.js + AI SDK + Supabase template",
        type: "template",
        feature: "solutions.technology",
      },
      {
        title: "Landing Page Kit",
        description: "High-converting landing page components",
        type: "template",
        feature: "solutions.technology",
      },
    ],
  },
  {
    category: "Systems",
    items: [
      {
        title: "Notion SOPs Pack",
        description: "Pre-built SOP templates for Notion",
        type: "template",
        feature: "systems.technology",
      },
      {
        title: "Zapier Automation Recipes",
        description: "Ready-to-use automation workflows",
        type: "automation",
        feature: "systems.technology",
      },
    ],
  },
  {
    category: "Software",
    items: [
      {
        title: "React Component Library",
        description: "Production-ready UI components",
        type: "code",
        feature: "software.technology",
      },
      {
        title: "API Route Templates",
        description: "Common API patterns and handlers",
        type: "code",
        feature: "software.technology",
      },
      {
        title: "Database Schema Pack",
        description: "Common database schemas and migrations",
        type: "code",
        feature: "software.technology",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        title: "Client Portal Template",
        description: "White-label client dashboard",
        type: "template",
        feature: "services.technology",
        tier: "collective_pro",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        title: "Debug Toolkit",
        description: "Scripts and tools for common debugging",
        type: "code",
        feature: "support.technology",
      },
    ],
  },
];

const typeIcons = {
  template: FileCode,
  code: Code,
  automation: Workflow,
};

const typeLabels = {
  template: "Template",
  code: "Code",
  automation: "Automation",
};

export default function ToolsPage() {
  const { tier } = useSubscription();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Boxes className="h-4 w-4" />
          <span>Tools</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">The Lever</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold">Templates & Tools</h1>
        <p className="mt-1 text-muted-foreground">
          Technology that multiplies your effort. Download and customize.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <FileCode className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">32</p>
                <p className="text-sm text-muted-foreground">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-sm text-muted-foreground">Code Snippets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <Workflow className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Automations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tools by Category */}
      {tools.map((category) => (
        <div key={category.category}>
          <h2 className="mb-4 text-xl font-semibold">{category.category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((tool) => {
              const TypeIcon = typeIcons[tool.type as keyof typeof typeIcons];

              return (
                <FeatureGate
                  key={tool.title}
                  feature={tool.feature}
                  fallback={
                    <Card className="opacity-60">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Upgrade to access this tool.
                        </p>
                      </CardContent>
                    </Card>
                  }
                >
                  <Card className="group hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                          <TypeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <Badge variant="outline">{typeLabels[tool.type as keyof typeof typeLabels]}</Badge>
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </FeatureGate>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
