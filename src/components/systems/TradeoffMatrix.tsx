import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Comparison table across patterns (cost, setup time, customization, etc).
 * Helps users compare multiple patterns side-by-side.
 * Uses gray color scheme for Systems layer.
 */
interface Pattern {
  /** Pattern name */
  name: string
  /** Link to pattern page */
  href: string
  /** Rating/value for each criterion */
  ratings: Record<string, string | number>
}

interface Criterion {
  /** Criterion key (must match keys in Pattern.ratings) */
  key: string
  /** Display label for criterion */
  label: string
  /** Optional description or tooltip text */
  description?: string
  /** Optional format hint (e.g., "currency", "time", "rating") */
  format?: "currency" | "time" | "rating" | "text"
}

interface TradeoffMatrixProps {
  /** Title of the comparison */
  title?: string
  /** Optional description */
  description?: string
  /** List of criteria to compare */
  criteria: Criterion[]
  /** List of patterns to compare */
  patterns: Pattern[]
  /** Optional notes about the comparison */
  notes?: string
  className?: string
}

export function TradeoffMatrix({
  title = "Pattern Comparison",
  description,
  criteria,
  patterns,
  notes,
  className
}: TradeoffMatrixProps) {
  const formatValue = (value: string | number, format?: Criterion["format"]) => {
    if (format === "rating" && typeof value === "number") {
      // Convert numeric rating to visual representation
      const filled = "●".repeat(value)
      const empty = "○".repeat(5 - value)
      return (
        <span className="font-mono text-sm" title={`${value}/5`}>
          <span className="text-gray-900 dark:text-gray-100">{filled}</span>
          <span className="text-gray-300 dark:text-gray-700">{empty}</span>
        </span>
      )
    }
    return value
  }

  return (
    <Card className={cn("border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">{title}</CardTitle>
        {description && (
          <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-800">
                <th className="p-3 text-left align-top">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Criterion</div>
                </th>
                {patterns.map((pattern) => (
                  <th key={pattern.name} className="p-3 text-left align-top">
                    <Link
                      href={pattern.href}
                      className="font-semibold text-gray-900 hover:underline dark:text-gray-100"
                    >
                      {pattern.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => (
                <tr
                  key={criterion.key}
                  className={cn(
                    "border-b border-gray-200 dark:border-gray-800",
                    index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50/50 dark:bg-gray-900/50"
                  )}
                >
                  <td className="p-3 align-top">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {criterion.label}
                      </div>
                      {criterion.description && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {criterion.description}
                        </div>
                      )}
                    </div>
                  </td>
                  {patterns.map((pattern) => (
                    <td key={`${pattern.name}-${criterion.key}`} className="p-3 align-top text-sm">
                      <div className="text-gray-900 dark:text-gray-100">
                        {formatValue(pattern.ratings[criterion.key] || "N/A", criterion.format)}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {notes && (
          <div className="rounded-lg border border-gray-200 bg-gray-100/50 p-3 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
            <span className="font-semibold">Note:</span> {notes}
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-500">
          Click on pattern names to view detailed information
        </div>
      </CardContent>
    </Card>
  )
}
