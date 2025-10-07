import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Shows pattern category, abstraction level, alternatives, and complements.
 * Helps users understand what type of system pattern they're looking at.
 * Uses gray color scheme for Systems layer.
 */
interface PatternIdentityProps {
  /** Pattern category (e.g., "Authentication", "State Management", "Data Storage") */
  category: string
  /** Abstraction level indicator */
  abstractionLevel: "low" | "medium" | "high"
  /** Description of abstraction level */
  abstractionDescription?: string
  /** Alternative patterns that solve similar problems */
  alternatives?: Array<{
    name: string
    href: string
    description: string
  }>
  /** Complementary patterns that work well together */
  complements?: Array<{
    name: string
    href: string
    description: string
  }>
  /** Pattern tags for quick identification */
  tags?: string[]
  className?: string
}

export function PatternIdentity({
  category,
  abstractionLevel,
  abstractionDescription,
  alternatives = [],
  complements = [],
  tags = [],
  className
}: PatternIdentityProps) {
  const getAbstractionStyles = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return {
          label: "Low Abstraction",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
          description: abstractionDescription || "Direct control, more complexity"
        }
      case "medium":
        return {
          label: "Medium Abstraction",
          color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900",
          description: abstractionDescription || "Balanced control and convenience"
        }
      case "high":
        return {
          label: "High Abstraction",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900",
          description: abstractionDescription || "Simplified interface, less control"
        }
    }
  }

  const abstraction = getAbstractionStyles(abstractionLevel)

  return (
    <Card className={cn("border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Pattern Identity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category and Abstraction */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</div>
            <Badge variant="outline" className="border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-300">
              {category}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Abstraction Level</div>
            <div className="space-y-1">
              <Badge variant="outline" className={abstraction.color}>
                {abstraction.label}
              </Badge>
              <p className="text-xs text-gray-600 dark:text-gray-400">{abstraction.description}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags</div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Alternative Patterns
            </h3>
            <div className="space-y-2">
              {alternatives.map((alt) => (
                <Link
                  key={alt.href}
                  href={alt.href}
                  className="group block rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{alt.name}</div>
                      <div className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{alt.description}</div>
                    </div>
                    <svg
                      className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
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

        {/* Complements */}
        {complements.length > 0 && (
          <div className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Complementary Patterns
            </h3>
            <div className="space-y-2">
              {complements.map((comp) => (
                <Link
                  key={comp.href}
                  href={comp.href}
                  className="group block rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{comp.name}</div>
                      <div className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{comp.description}</div>
                    </div>
                    <svg
                      className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
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
