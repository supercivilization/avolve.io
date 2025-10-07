import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertCircle } from "lucide-react"

/**
 * Common integration issues with frequency indicators (🔴🟡🟢).
 * Helps users anticipate and avoid integration problems.
 * Uses gray color scheme for Systems layer.
 */
interface Gotcha {
  /** Unique identifier */
  id: string
  /** Issue title */
  title: string
  /** Frequency of occurrence */
  frequency: "common" | "occasional" | "rare"
  /** Description of the issue */
  description: string
  /** How to identify this issue */
  symptoms: string[]
  /** How to fix or avoid this issue */
  solution: string
  /** Optional link to related support article */
  supportLink?: {
    text: string
    href: string
  }
}

interface IntegrationGotchasProps {
  /** List of gotchas to display */
  gotchas: Gotcha[]
  /** Optional description */
  description?: string
  className?: string
}

export function IntegrationGotchas({
  gotchas,
  description,
  className
}: IntegrationGotchasProps) {
  const getFrequencyIndicator = (frequency: Gotcha["frequency"]) => {
    switch (frequency) {
      case "common":
        return {
          icon: "🔴",
          label: "Common",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900",
          border: "border-red-200 dark:border-red-900",
          bg: "bg-red-50/50 dark:bg-red-950/10"
        }
      case "occasional":
        return {
          icon: "🟡",
          label: "Occasional",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900",
          border: "border-yellow-200 dark:border-yellow-900",
          bg: "bg-yellow-50/50 dark:bg-yellow-950/10"
        }
      case "rare":
        return {
          icon: "🟢",
          label: "Rare",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900",
          border: "border-green-200 dark:border-green-900",
          bg: "bg-green-50/50 dark:bg-green-950/10"
        }
    }
  }

  // Sort gotchas by frequency (common first)
  const sortedGotchas = React.useMemo(() => {
    const order = { common: 0, occasional: 1, rare: 2 }
    return [...gotchas].sort((a, b) => order[a.frequency] - order[b.frequency])
  }, [gotchas])

  return (
    <Card className={cn("border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <AlertCircle className="h-5 w-5" />
          Integration Gotchas
        </CardTitle>
        {description && (
          <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedGotchas.map((gotcha) => {
          const freq = getFrequencyIndicator(gotcha.frequency)

          return (
            <div
              key={gotcha.id}
              className={cn(
                "rounded-lg border p-4 space-y-3",
                freq.border,
                freq.bg
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{gotcha.title}</h3>
                <Badge variant="outline" className={freq.color}>
                  {freq.icon} {freq.label}
                </Badge>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">{gotcha.description}</p>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Symptoms:</span>
                  <ul className="mt-1 space-y-1 pl-5">
                    {gotcha.symptoms.map((symptom, index) => (
                      <li key={index} className="list-disc text-gray-600 dark:text-gray-400">
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-gray-200 bg-white p-3 text-sm dark:border-gray-800 dark:bg-gray-950">
                  <div className="font-medium text-gray-700 dark:text-gray-300">Solution:</div>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">{gotcha.solution}</div>
                </div>
              </div>

              {gotcha.supportLink && (
                <div className="pt-2">
                  <Link
                    href={gotcha.supportLink.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
                  >
                    {gotcha.supportLink.text}
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
