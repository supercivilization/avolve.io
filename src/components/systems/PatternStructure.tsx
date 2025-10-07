"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Visual flow diagram showing integration points and seams.
 * Helps users understand how the pattern connects to other parts of the system.
 * Uses gray color scheme for Systems layer.
 */
interface IntegrationPoint {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Type of integration point */
  type: "input" | "output" | "bidirectional"
  /** Description of what flows through this point */
  description: string
  /** Optional link to related documentation */
  href?: string
}

interface PatternStructureProps {
  /** Name of the core pattern */
  patternName: string
  /** Brief description of the pattern */
  description?: string
  /** List of integration points */
  integrationPoints: IntegrationPoint[]
  /** Optional architectural notes */
  notes?: string[]
  className?: string
}

export function PatternStructure({
  patternName,
  description,
  integrationPoints,
  notes = [],
  className
}: PatternStructureProps) {
  const getTypeIcon = (type: IntegrationPoint["type"]) => {
    switch (type) {
      case "input":
        return "→"
      case "output":
        return "←"
      case "bidirectional":
        return "↔"
    }
  }

  const getTypeColor = (type: IntegrationPoint["type"]) => {
    switch (type) {
      case "input":
        return "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20"
      case "output":
        return "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/20"
      case "bidirectional":
        return "border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/20"
    }
  }

  const getTypeBadge = (type: IntegrationPoint["type"]) => {
    switch (type) {
      case "input":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
      case "output":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
      case "bidirectional":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900"
    }
  }

  // Group integration points by type
  const groupedPoints = React.useMemo(() => {
    const groups = {
      input: integrationPoints.filter(p => p.type === "input"),
      output: integrationPoints.filter(p => p.type === "output"),
      bidirectional: integrationPoints.filter(p => p.type === "bidirectional")
    }
    return groups
  }, [integrationPoints])

  return (
    <Card className={cn("border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">Pattern Structure</CardTitle>
        {description && (
          <CardDescription className="text-gray-600 dark:text-gray-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Central Pattern Node */}
        <div className="flex justify-center">
          <div className="rounded-lg border-2 border-gray-300 bg-white px-6 py-4 text-center dark:border-gray-700 dark:bg-gray-950">
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{patternName}</div>
          </div>
        </div>

        {/* Integration Points */}
        <div className="space-y-4">
          {Object.entries(groupedPoints).map(([type, points]) => (
            points.length > 0 && (
              <div key={type} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getTypeBadge(type as IntegrationPoint["type"])}>
                    {getTypeIcon(type as IntegrationPoint["type"])} {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {points.map((point) => (
                    <div
                      key={point.id}
                      className={cn(
                        "rounded-lg border p-3 transition-colors",
                        getTypeColor(point.type)
                      )}
                    >
                      {point.href ? (
                        <Link href={point.href} className="group block">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:underline">
                                {point.name}
                              </div>
                              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {point.description}
                              </div>
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
                      ) : (
                        <>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{point.name}</div>
                          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{point.description}</div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Architectural Notes */}
        {notes.length > 0 && (
          <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Architectural Notes</h3>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              {notes.map((note, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
