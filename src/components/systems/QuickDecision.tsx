import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, ArrowRight } from "lucide-react"

/**
 * "Use this when" checklist vs "Use alternative when" with links.
 * Quick decision-making aid for pattern selection.
 * Uses gray color scheme for Systems layer.
 */
interface DecisionCriterion {
  /** Criterion text */
  text: string
  /** Optional additional context */
  context?: string
}

interface AlternativeOption {
  /** Name of alternative pattern */
  name: string
  /** Link to alternative pattern page */
  href: string
  /** Brief reason to use this alternative */
  reason: string
}

interface QuickDecisionProps {
  /** When to use this pattern */
  useThisWhen: DecisionCriterion[]
  /** When to use an alternative */
  useAlternativeWhen: DecisionCriterion[]
  /** List of alternative patterns with links */
  alternatives?: AlternativeOption[]
  /** Optional description */
  description?: string
  className?: string
}

export function QuickDecision({
  useThisWhen,
  useAlternativeWhen,
  alternatives = [],
  description,
  className
}: QuickDecisionProps) {
  return (
    <Card className={cn("border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Quick Decision Guide</CardTitle>
        {description && (
          <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Use This When */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1 dark:bg-green-950">
                <Check className="h-4 w-4 text-green-700 dark:text-green-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Use this pattern when:</h3>
            </div>

            <ul className="space-y-2">
              {useThisWhen.map((criterion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-900 dark:bg-green-950/20"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{criterion.text}</div>
                    {criterion.context && (
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{criterion.context}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Alternative When */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-950">
                <ArrowRight className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Consider alternatives when:</h3>
            </div>

            <ul className="space-y-2">
              {useAlternativeWhen.map((criterion, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900 dark:bg-amber-950/20"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{criterion.text}</div>
                    {criterion.context && (
                      <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">{criterion.context}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternatives Section */}
        {alternatives.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 pt-6 dark:border-gray-800">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Alternative Patterns
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {alternatives.map((alt) => (
                <Link
                  key={alt.href}
                  href={alt.href}
                  className="group block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{alt.name}</h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{alt.reason}</p>
                    </div>
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
