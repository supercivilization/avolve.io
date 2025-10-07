"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Zap, Copy, Check } from "lucide-react"

/**
 * Prominent 30-second solution with diff-style code.
 * Shows quick fix for common support issues.
 * Uses stone color scheme for Support layer.
 */
interface QuickFixProps {
  /** Issue title */
  title: string
  /** Brief problem description */
  problem: string
  /** Quick fix description */
  solution: string
  /** Old code (incorrect) */
  oldCode?: string
  /** New code (correct fix) */
  newCode?: string
  /** Alternative text-based fix steps */
  steps?: string[]
  /** Estimated fix time */
  estimatedTime?: string
  className?: string
}

export function QuickFix({
  title,
  problem,
  solution,
  oldCode,
  newCode,
  steps,
  estimatedTime = "30 seconds",
  className
}: QuickFixProps) {
  const [copiedCode, setCopiedCode] = React.useState<"old" | "new" | null>(null)

  const copyToClipboard = async (code: string, type: "old" | "new") => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <Card className={cn("border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle className="text-stone-900 dark:text-stone-100">Quick Fix</CardTitle>
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900">
                {estimatedTime}
              </Badge>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 dark:border-red-900 dark:bg-red-950/20">
          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">Problem:</div>
          <div className="mt-1 text-sm text-stone-700 dark:text-stone-300">{problem}</div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-900 dark:bg-green-950/20">
          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">Solution:</div>
          <div className="mt-1 text-sm text-stone-700 dark:text-stone-300">{solution}</div>
        </div>

        {oldCode && newCode && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">Code Change:</div>

            <div className="grid gap-3 lg:grid-cols-2">
              {/* Old Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                    Before (Incorrect)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copyToClipboard(oldCode, "old")}
                  >
                    {copiedCode === "old" ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="rounded-lg border border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
                  <pre className="overflow-x-auto p-3">
                    <code className="text-xs font-mono text-stone-900 dark:text-stone-100">{oldCode}</code>
                  </pre>
                </div>
              </div>

              {/* New Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                    After (Correct)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => copyToClipboard(newCode, "new")}
                  >
                    {copiedCode === "new" ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20">
                  <pre className="overflow-x-auto p-3">
                    <code className="text-xs font-mono text-stone-900 dark:text-stone-100">{newCode}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {steps && steps.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">Fix Steps:</div>
            <ol className="space-y-2 pl-5">
              {steps.map((step, index) => (
                <li key={index} className="list-decimal text-sm text-stone-700 dark:text-stone-300">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
