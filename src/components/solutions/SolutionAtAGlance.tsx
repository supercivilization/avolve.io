import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Displays high-level solution overview with complexity rating, time to MVP, and cost range.
 * Uses slate color scheme for Solutions layer.
 */
interface SolutionAtAGlanceProps {
  /** Complexity level represented as emoji rating (e.g., "🟢", "🟡🟡", "🔴🔴🔴") */
  complexity: string
  /** Complexity label (e.g., "Simple", "Moderate", "Complex") */
  complexityLabel: string
  /** Time estimate to reach MVP (e.g., "2-4 weeks") */
  timeToMVP: string
  /** Monthly cost range (e.g., "$50-200") */
  monthlyCost: string
  /** Optional additional context or notes */
  notes?: string
  className?: string
}

export function SolutionAtAGlance({
  complexity,
  complexityLabel,
  timeToMVP,
  monthlyCost,
  notes,
  className
}: SolutionAtAGlanceProps) {
  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">Solution at a Glance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Complexity</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-label={complexityLabel}>{complexity}</span>
              <Badge variant="outline" className="border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                {complexityLabel}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Time to MVP</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{timeToMVP}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Monthly Cost</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{monthlyCost}</div>
          </div>
        </div>

        {notes && (
          <div className="rounded-lg border border-slate-200 bg-slate-100/50 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
            {notes}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
