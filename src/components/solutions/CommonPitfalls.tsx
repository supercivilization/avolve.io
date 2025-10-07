import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

/**
 * Warning cards with symptom, cause, prevention, and related support link.
 * Helps users avoid common mistakes and issues.
 * Uses slate color scheme for Solutions layer.
 */
interface Pitfall {
  /** Unique identifier */
  id: string
  /** Title of the pitfall */
  title: string
  /** Severity level */
  severity: "high" | "medium" | "low"
  /** Observable symptom */
  symptom: string
  /** Root cause explanation */
  cause: string
  /** How to prevent this issue */
  prevention: string
  /** Optional link to related support article */
  supportLink?: {
    text: string
    href: string
  }
}

interface CommonPitfallsProps {
  /** List of pitfalls to display */
  pitfalls: Pitfall[]
  /** Optional description */
  description?: string
  className?: string
}

export function CommonPitfalls({
  pitfalls,
  description,
  className
}: CommonPitfallsProps) {
  const getSeverityStyles = (severity: Pitfall["severity"]) => {
    switch (severity) {
      case "high":
        return {
          badge: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900",
          border: "border-red-200 dark:border-red-900",
          bg: "bg-red-50/50 dark:bg-red-950/20"
        }
      case "medium":
        return {
          badge: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900",
          border: "border-yellow-200 dark:border-yellow-900",
          bg: "bg-yellow-50/50 dark:bg-yellow-950/20"
        }
      case "low":
        return {
          badge: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
          border: "border-blue-200 dark:border-blue-900",
          bg: "bg-blue-50/50 dark:bg-blue-950/20"
        }
    }
  }

  const getSeverityLabel = (severity: Pitfall["severity"]) => {
    switch (severity) {
      case "high":
        return "High Risk"
      case "medium":
        return "Medium Risk"
      case "low":
        return "Low Risk"
    }
  }

  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <AlertTriangle className="h-5 w-5" />
          Common Pitfalls
        </CardTitle>
        {description && (
          <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {pitfalls.map((pitfall) => {
          const styles = getSeverityStyles(pitfall.severity)

          return (
            <div
              key={pitfall.id}
              className={cn(
                "rounded-lg border p-4 space-y-3",
                styles.border,
                styles.bg
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">{pitfall.title}</h3>
                <Badge variant="outline" className={styles.badge}>
                  {getSeverityLabel(pitfall.severity)}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Symptom: </span>
                  <span className="text-slate-600 dark:text-slate-400">{pitfall.symptom}</span>
                </div>

                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Cause: </span>
                  <span className="text-slate-600 dark:text-slate-400">{pitfall.cause}</span>
                </div>

                <div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Prevention: </span>
                  <span className="text-slate-600 dark:text-slate-400">{pitfall.prevention}</span>
                </div>
              </div>

              {pitfall.supportLink && (
                <div className="pt-2">
                  <Link
                    href={pitfall.supportLink.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
                  >
                    {pitfall.supportLink.text}
                    <svg
                      className="h-4 w-4"
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
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
