"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/subscription";
import { FeatureGate } from "@/components/feature-gate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Lock,
  ArrowRight,
} from "lucide-react";

// Training modules across the 5S framework
const modules = [
  {
    category: "Solutions",
    items: [
      {
        title: "AI SaaS Foundations",
        description: "Build AI-powered products from scratch",
        duration: "2h 30m",
        lessons: 12,
        status: "available",
        feature: "solutions.training",
      },
      {
        title: "Template Architecture",
        description: "Design reusable templates and blueprints",
        duration: "1h 45m",
        lessons: 8,
        status: "available",
        feature: "solutions.training",
      },
    ],
  },
  {
    category: "Systems",
    items: [
      {
        title: "System Architecture 101",
        description: "Design scalable systems from day one",
        duration: "3h 15m",
        lessons: 15,
        status: "available",
        feature: "systems.training",
      },
      {
        title: "Automation Fundamentals",
        description: "Automate repetitive tasks effectively",
        duration: "2h",
        lessons: 10,
        status: "coming_soon",
        feature: "systems.training",
      },
    ],
  },
  {
    category: "Software",
    items: [
      {
        title: "Modern React Patterns",
        description: "Server components, RSC, and more",
        duration: "4h",
        lessons: 20,
        status: "available",
        feature: "software.training",
      },
      {
        title: "Full-Stack TypeScript",
        description: "Type-safe from database to frontend",
        duration: "3h 30m",
        lessons: 16,
        status: "available",
        feature: "software.training",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        title: "Client Communication",
        description: "Effective communication strategies",
        duration: "1h 30m",
        lessons: 6,
        status: "pro_only",
        feature: "services.training",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        title: "Self-Serve Troubleshooting",
        description: "Debug and solve common issues",
        duration: "1h",
        lessons: 5,
        status: "available",
        feature: "support.training",
      },
    ],
  },
];

export default function TrainingPage() {
  const { tier } = useSubscription();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="h-4 w-4" />
          <span>Training</span>
          <span className="rounded bg-muted px-1.5 py-0.5 text-xs">The Map</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold">Training Library</h1>
        <p className="mt-1 text-muted-foreground">
          Build your theoretical foundations across the 5S framework.
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold">Your Progress</p>
              <p className="text-sm text-muted-foreground">3 of 12 modules completed</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">25%</p>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
        </CardContent>
      </Card>

      {/* Modules by Category */}
      {modules.map((category) => (
        <div key={category.category}>
          <h2 className="mb-4 text-xl font-semibold">{category.category}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {category.items.map((module) => (
              <FeatureGate
                key={module.title}
                feature={module.feature}
                fallback={
                  <Card className="opacity-60">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Upgrade to access this training module.
                      </p>
                    </CardContent>
                  </Card>
                }
              >
                <Card className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      {module.status === "coming_soon" && (
                        <Badge variant="outline">Coming Soon</Badge>
                      )}
                      {module.status === "pro_only" && (
                        <Badge variant="secondary">PRO</Badge>
                      )}
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {module.lessons} lessons
                        </span>
                      </div>
                      {module.status === "available" && (
                        <Button size="sm" className="group/btn">
                          <Play className="mr-1 h-4 w-4" />
                          Start
                        </Button>
                      )}
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
