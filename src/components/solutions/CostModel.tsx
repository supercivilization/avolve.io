import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Table showing MVP/Growth/Scale phases with realistic cost breakdowns.
 * Helps users understand how costs evolve across project lifecycle.
 * Uses slate color scheme for Solutions layer.
 */
interface CostPhase {
  /** Phase name (e.g., "MVP", "Growth", "Scale") */
  phase: string
  /** Total monthly cost for this phase */
  totalCost: string
  /** Breakdown of costs by category */
  breakdown: {
    category: string
    cost: string
    notes?: string
  }[]
  /** Key assumptions or notes about this phase */
  assumptions?: string[]
}

interface CostModelProps {
  /** List of cost phases to display */
  phases: CostPhase[]
  /** Optional description of cost model methodology */
  description?: string
  /** Optional disclaimer or notes */
  disclaimer?: string
  className?: string
}

export function CostModel({
  phases,
  description,
  disclaimer,
  className
}: CostModelProps) {
  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">Cost Model</CardTitle>
        {description && (
          <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="p-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Phase</th>
                <th className="p-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Category</th>
                <th className="p-3 text-right text-sm font-semibold text-slate-700 dark:text-slate-300">Cost</th>
                <th className="p-3 text-left text-sm font-semibold text-slate-700 dark:text-slate-300">Notes</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((phase, phaseIndex) => (
                <React.Fragment key={phase.phase}>
                  {phase.breakdown.map((item, itemIndex) => (
                    <tr
                      key={`${phase.phase}-${item.category}`}
                      className="border-b border-slate-100 dark:border-slate-900"
                    >
                      {itemIndex === 0 && (
                        <td
                          rowSpan={phase.breakdown.length}
                          className="p-3 align-top font-medium text-slate-900 dark:text-slate-100"
                        >
                          <div className="space-y-1">
                            <div>{phase.phase}</div>
                            <Badge variant="outline" className="border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                              {phase.totalCost}/mo
                            </Badge>
                          </div>
                        </td>
                      )}
                      <td className="p-3 text-sm text-slate-700 dark:text-slate-300">{item.category}</td>
                      <td className="p-3 text-right text-sm font-mono text-slate-900 dark:text-slate-100">
                        {item.cost}
                      </td>
                      <td className="p-3 text-sm text-slate-600 dark:text-slate-400">{item.notes || "-"}</td>
                    </tr>
                  ))}
                  {phase.assumptions && phase.assumptions.length > 0 && (
                    <tr className="bg-slate-100/50 dark:bg-slate-900/50">
                      <td colSpan={4} className="p-3">
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          <div className="font-medium mb-1">Assumptions:</div>
                          <ul className="list-disc list-inside space-y-0.5">
                            {phase.assumptions.map((assumption, i) => (
                              <li key={i}>{assumption}</li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {disclaimer && (
          <div className="rounded-lg border border-slate-200 bg-slate-100/50 p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
            <span className="font-semibold">Note:</span> {disclaimer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
