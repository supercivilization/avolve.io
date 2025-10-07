import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Cards showing related/alternative patterns.
 * Helps users discover pattern variations and alternatives.
 * Uses gray color scheme for Systems layer.
 */
interface PatternVariation {
  /** Unique identifier */
  id: string
  /** Pattern name */
  name: string
  /** Link to pattern page */
  href: string
  /** Relationship to current pattern */
  relationship: "alternative" | "extension" | "complement" | "subset" | "superset"
  /** Brief description */
  description: string
  /** Key differences or use cases */
  keyDifferences?: string[]
  /** Optional tags */
  tags?: string[]
}

interface PatternVariationsProps {
  /** List of pattern variations to display */
  variations: PatternVariation[]
  /** Optional description */
  description?: string
  className?: string
}

export function PatternVariations({
  variations,
  description,
  className
}: PatternVariationsProps) {
  const getRelationshipBadge = (relationship: PatternVariation["relationship"]) => {
    switch (relationship) {
      case "alternative":
        return {
          label: "Alternative",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
      case "extension":
        return {
          label: "Extension",
          color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900"
        }
      case "complement":
        return {
          label: "Complement",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
        }
      case "subset":
        return {
          label: "Subset",
          color: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-900"
        }
      case "superset":
        return {
          label: "Superset",
          color: "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-950 dark:text-pink-200 dark:border-pink-900"
        }
    }
  }

  // Group variations by relationship type
  const groupedVariations = React.useMemo(() => {
    const groups = new Map<PatternVariation["relationship"], PatternVariation[]>()
    variations.forEach(variation => {
      if (!groups.has(variation.relationship)) {
        groups.set(variation.relationship, [])
      }
      groups.get(variation.relationship)?.push(variation)
    })
    return groups
  }, [variations])

  return (
    <Card className={cn("border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Pattern Variations</CardTitle>
        {description && (
          <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from(groupedVariations.entries()).map(([relationship, relationshipVariations]) => (
          <div key={relationship} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              {getRelationshipBadge(relationship).label}s
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {relationshipVariations.map((variation) => {
                const badge = getRelationshipBadge(variation.relationship)

                return (
                  <Link
                    key={variation.id}
                    href={variation.href}
                    className="group block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:underline">
                          {variation.name}
                        </h4>
                        <Badge variant="outline" className={badge.color}>
                          {badge.label}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">{variation.description}</p>

                      {variation.keyDifferences && variation.keyDifferences.length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          <div className="font-medium mb-1">Key Differences:</div>
                          <ul className="space-y-0.5 pl-4">
                            {variation.keyDifferences.map((diff, index) => (
                              <li key={index} className="list-disc">
                                {diff}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {variation.tags && variation.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {variation.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                        <span>View details</span>
                        <svg
                          className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
