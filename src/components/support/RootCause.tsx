import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GitBranch } from "lucide-react"

/**
 * Clear explanation of why error occurs.
 * Provides root cause analysis for support issues.
 * Uses stone color scheme for Support layer.
 */
interface RootCauseProps {
  /** Title of the root cause section */
  title?: string
  /** Main explanation of why the error occurs */
  explanation: string
  /** Technical details */
  technicalDetails?: string
  /** Contributing factors */
  contributingFactors?: string[]
  /** Related concepts or patterns */
  relatedConcepts?: Array<{
    name: string
    description: string
  }>
  className?: string
}

export function RootCause({
  title = "Root Cause",
  explanation,
  technicalDetails,
  contributingFactors = [],
  relatedConcepts = [],
  className
}: RootCauseProps) {
  return (
    <Card className={cn("border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
          <GitBranch className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950">
          <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">{explanation}</p>
        </div>

        {technicalDetails && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Technical Details</h3>
            <div className="rounded-lg border border-stone-200 bg-stone-100/50 p-3 dark:border-stone-800 dark:bg-stone-900/50">
              <p className="text-sm text-stone-700 dark:text-stone-300">{technicalDetails}</p>
            </div>
          </div>
        )}

        {contributingFactors.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Contributing Factors</h3>
            <ul className="space-y-2">
              {contributingFactors.map((factor, index) => (
                <li
                  key={index}
                  className="flex gap-2 rounded-lg border border-stone-200 bg-white p-3 text-sm text-stone-700 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-300"
                >
                  <span className="text-stone-400">{index + 1}.</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedConcepts.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Related Concepts</h3>
            <div className="space-y-2">
              {relatedConcepts.map((concept, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900 dark:bg-blue-950/20"
                >
                  <div className="font-medium text-stone-900 dark:text-stone-100">{concept.name}</div>
                  <div className="mt-1 text-sm text-stone-700 dark:text-stone-300">{concept.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
