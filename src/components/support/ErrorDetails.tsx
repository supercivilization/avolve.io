import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

/**
 * Frequency (🔴🟡🟢), timing, location, severity indicators.
 * Provides comprehensive error context information.
 * Uses stone color scheme for Support layer.
 */
interface ErrorDetailsProps {
  /** Error title/name */
  errorName: string
  /** Error message text */
  errorMessage: string
  /** Frequency of occurrence */
  frequency: "common" | "occasional" | "rare"
  /** When this error typically occurs */
  timing: string
  /** Where in the codebase/system this occurs */
  location: string
  /** Severity level */
  severity: "critical" | "high" | "medium" | "low"
  /** Affected versions or conditions */
  affects?: string[]
  /** Error code if applicable */
  errorCode?: string
  className?: string
}

export function ErrorDetails({
  errorName,
  errorMessage,
  frequency,
  timing,
  location,
  severity,
  affects = [],
  errorCode,
  className
}: ErrorDetailsProps) {
  const getFrequencyInfo = (freq: "common" | "occasional" | "rare") => {
    switch (freq) {
      case "common":
        return {
          icon: "🔴",
          label: "Common",
          description: "Frequently reported",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
      case "occasional":
        return {
          icon: "🟡",
          label: "Occasional",
          description: "Sometimes reported",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
      case "rare":
        return {
          icon: "🟢",
          label: "Rare",
          description: "Rarely reported",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
        }
    }
  }

  const getSeverityInfo = (sev: "critical" | "high" | "medium" | "low") => {
    switch (sev) {
      case "critical":
        return {
          label: "Critical",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
      case "high":
        return {
          label: "High",
          color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900"
        }
      case "medium":
        return {
          label: "Medium",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
      case "low":
        return {
          label: "Low",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
    }
  }

  const freqInfo = getFrequencyInfo(frequency)
  const sevInfo = getSeverityInfo(severity)

  return (
    <Card className={cn("border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <CardTitle className="text-stone-900 dark:text-stone-100">Error Details</CardTitle>
            </div>
            {errorCode && (
              <code className="mt-1 text-xs font-mono text-stone-600 dark:text-stone-400">Error Code: {errorCode}</code>
            )}
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={freqInfo.color}>
              {freqInfo.icon} {freqInfo.label}
            </Badge>
            <Badge variant="outline" className={sevInfo.color}>
              {sevInfo.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">{errorName}</h3>
          <div className="rounded-lg border border-stone-200 bg-stone-100/50 p-3 dark:border-stone-800 dark:bg-stone-900/50">
            <code className="text-sm font-mono text-stone-900 dark:text-stone-100">{errorMessage}</code>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Timing
            </div>
            <div className="text-sm text-stone-900 dark:text-stone-100">{timing}</div>
          </div>

          <div className="space-y-1 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950">
            <div className="text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
              Location
            </div>
            <div className="text-sm text-stone-900 dark:text-stone-100">{location}</div>
          </div>
        </div>

        {affects.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">Affects:</div>
            <div className="flex flex-wrap gap-2">
              {affects.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-stone-200 text-stone-700 dark:border-stone-700 dark:text-stone-300"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-stone-200 bg-stone-100/50 p-3 text-xs text-stone-600 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-400">
          <span className="font-semibold">Frequency:</span> {freqInfo.description}
        </div>
      </CardContent>
    </Card>
  )
}
