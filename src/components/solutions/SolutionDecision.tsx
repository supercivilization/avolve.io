import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

/**
 * Decision tree showing "Choose this if" vs "Choose alternative if" with links to alternatives.
 * Helps users make informed technology choices.
 * Uses slate color scheme for Solutions layer.
 */
interface DecisionCriteria {
  /** Criterion text */
  text: string
  /** Optional explanation or context */
  detail?: string
}

interface Alternative {
  /** Name of alternative solution */
  name: string
  /** Link to alternative solution page */
  href: string
  /** Brief description of when to use this instead */
  whenToUse: string
}

interface SolutionDecisionProps {
  /** Criteria for choosing this solution */
  chooseThisIf: DecisionCriteria[]
  /** Criteria for choosing an alternative */
  chooseAlternativeIf: DecisionCriteria[]
  /** List of alternative solutions */
  alternatives?: Alternative[]
  /** Optional description */
  description?: string
  className?: string
}

export function SolutionDecision({
  chooseThisIf,
  chooseAlternativeIf,
  alternatives = [],
  description,
  className
}: SolutionDecisionProps) {
  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">Decision Guide</CardTitle>
        {description && (
          <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Choose This If */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1 dark:bg-green-950">
                <Check className="h-4 w-4 text-green-700 dark:text-green-300" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Choose this solution if:</h3>
            </div>

            <ul className="space-y-2">
              {chooseThisIf.map((criteria, index) => (
                <li
                  key={index}
                  className="rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-900 dark:bg-green-950/20"
                >
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {criteria.text}
                  </div>
                  {criteria.detail && (
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      {criteria.detail}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Choose Alternative If */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-1 dark:bg-amber-950">
                <X className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Consider alternatives if:</h3>
            </div>

            <ul className="space-y-2">
              {chooseAlternativeIf.map((criteria, index) => (
                <li
                  key={index}
                  className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900 dark:bg-amber-950/20"
                >
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {criteria.text}
                  </div>
                  {criteria.detail && (
                    <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      {criteria.detail}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternatives Section */}
        {alternatives.length > 0 && (
          <div className="space-y-3 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
              Alternative Solutions
            </h3>

            <div className="space-y-2">
              {alternatives.map((alt) => (
                <Link
                  key={alt.href}
                  href={alt.href}
                  className="group block rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">{alt.name}</h4>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{alt.whenToUse}</p>
                    </div>
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
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
