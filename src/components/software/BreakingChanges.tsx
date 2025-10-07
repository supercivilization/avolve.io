"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertTriangle, ArrowRight } from "lucide-react"

/**
 * Diff-style code comparisons showing old vs new patterns.
 * Helps developers understand and migrate breaking changes.
 * Uses zinc color scheme for Software layer.
 */
interface BreakingChange {
  /** Unique identifier */
  id: string
  /** Version when change was introduced */
  version: string
  /** Title of the breaking change */
  title: string
  /** Brief description */
  description: string
  /** Old code pattern (before) */
  oldCode: string
  /** New code pattern (after) */
  newCode: string
  /** Migration instructions */
  migrationSteps?: string[]
  /** Severity level */
  severity: "high" | "medium" | "low"
}

interface BreakingChangesProps {
  /** List of breaking changes to display */
  changes: BreakingChange[]
  /** Optional description */
  description?: string
  className?: string
}

export function BreakingChanges({
  changes,
  description,
  className
}: BreakingChangesProps) {
  const getSeverityBadge = (severity: BreakingChange["severity"]) => {
    switch (severity) {
      case "high":
        return {
          label: "High Impact",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
      case "medium":
        return {
          label: "Medium Impact",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
      case "low":
        return {
          label: "Low Impact",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
    }
  }

  return (
    <Card className={cn("border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          Breaking Changes
        </CardTitle>
        {description && (
          <CardDescription className="text-zinc-600 dark:text-zinc-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {changes.map((change) => {
          const severity = getSeverityBadge(change.severity)

          return (
            <div
              key={change.id}
              className="space-y-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{change.title}</h3>
                    <Badge variant="outline" className="border-zinc-300 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                      v{change.version}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{change.description}</p>
                </div>
                <Badge variant="outline" className={severity.color}>
                  {severity.label}
                </Badge>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                {/* Old Code */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                      Before
                    </span>
                  </div>
                  <div className="rounded-lg border border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
                    <pre className="overflow-x-auto p-3">
                      <code className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                        {change.oldCode}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden items-center justify-center lg:flex lg:col-span-2">
                  <ArrowRight className="h-6 w-6 text-zinc-400" />
                </div>

                {/* New Code */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                      After
                    </span>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
                    <pre className="overflow-x-auto p-3">
                      <code className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                        {change.newCode}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {change.migrationSteps && change.migrationSteps.length > 0 && (
                <div className="rounded-lg border border-zinc-200 bg-zinc-100/50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Migration Steps:</div>
                  <ol className="mt-2 space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                    {change.migrationSteps.map((step, index) => (
                      <li key={index} className="list-decimal">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
