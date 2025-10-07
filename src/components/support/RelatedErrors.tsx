import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link2 } from "lucide-react"

/**
 * Links to commonly co-occurring errors.
 * Helps users discover related issues and solutions.
 * Uses stone color scheme for Support layer.
 */
interface RelatedError {
  /** Unique identifier */
  id: string
  /** Error title */
  title: string
  /** Link to error page */
  href: string
  /** Brief description */
  description: string
  /** Relationship to current error */
  relationship: "causes" | "caused-by" | "occurs-with" | "similar-to"
  /** Frequency of co-occurrence */
  frequency?: "common" | "occasional" | "rare"
}

interface RelatedErrorsProps {
  /** List of related errors */
  errors: RelatedError[]
  /** Optional description */
  description?: string
  className?: string
}

export function RelatedErrors({
  errors,
  description,
  className
}: RelatedErrorsProps) {
  const getRelationshipInfo = (rel: RelatedError["relationship"]) => {
    switch (rel) {
      case "causes":
        return {
          label: "Causes",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900",
          icon: "→"
        }
      case "caused-by":
        return {
          label: "Caused By",
          color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900",
          icon: "←"
        }
      case "occurs-with":
        return {
          label: "Occurs With",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
          icon: "⇄"
        }
      case "similar-to":
        return {
          label: "Similar To",
          color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900",
          icon: "≈"
        }
    }
  }

  const getFrequencyIndicator = (freq?: "common" | "occasional" | "rare") => {
    if (!freq) return null
    switch (freq) {
      case "common":
        return "🔴"
      case "occasional":
        return "🟡"
      case "rare":
        return "🟢"
    }
  }

  // Group errors by relationship
  const groupedErrors = React.useMemo(() => {
    const groups = new Map<RelatedError["relationship"], RelatedError[]>()
    errors.forEach(error => {
      if (!groups.has(error.relationship)) {
        groups.set(error.relationship, [])
      }
      groups.get(error.relationship)?.push(error)
    })
    return groups
  }, [errors])

  return (
    <Card className={cn("border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
          <Link2 className="h-5 w-5" />
          Related Errors
        </CardTitle>
        {description && (
          <CardDescription className="text-stone-600 dark:text-stone-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from(groupedErrors.entries()).map(([relationship, relationshipErrors]) => {
          const relInfo = getRelationshipInfo(relationship)

          return (
            <div key={relationship} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={relInfo.color}>
                  {relInfo.icon} {relInfo.label}
                </Badge>
              </div>

              <div className="space-y-2">
                {relationshipErrors.map((error) => (
                  <Link
                    key={error.id}
                    href={error.href}
                    className="group block rounded-lg border border-stone-200 bg-white p-4 transition-all hover:border-stone-300 hover:shadow-md dark:border-stone-800 dark:bg-stone-950 dark:hover:border-stone-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
                            {error.title}
                          </h4>
                          {error.frequency && (
                            <span className="text-sm" title={`${error.frequency} co-occurrence`}>
                              {getFrequencyIndicator(error.frequency)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-stone-600 dark:text-stone-400">{error.description}</p>
                      </div>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-stone-400 opacity-0 transition-opacity group-hover:opacity-100"
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
          )
        })}

        <div className="rounded-lg border border-stone-200 bg-stone-100/50 p-3 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-400">
          <span className="font-semibold">Tip:</span> Understanding related errors can help you identify root causes
          and prevent cascading issues.
        </div>
      </CardContent>
    </Card>
  )
}
