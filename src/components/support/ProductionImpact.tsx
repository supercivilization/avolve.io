import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Activity, Clock, Eye } from "lucide-react"

/**
 * Severity rating, estimated fix time, and monitoring advice.
 * Helps assess production impact and plan response.
 * Uses stone color scheme for Support layer.
 */
interface ProductionImpactProps {
  /** Severity rating */
  severity: "critical" | "high" | "medium" | "low"
  /** Estimated time to fix */
  estimatedFixTime: string
  /** Impact description */
  impactDescription: string
  /** User impact details */
  userImpact?: Array<{
    aspect: string
    description: string
  }>
  /** Monitoring recommendations */
  monitoring: Array<{
    metric: string
    recommendation: string
  }>
  /** Rollback considerations */
  rollback?: string
  className?: string
}

export function ProductionImpact({
  severity,
  estimatedFixTime,
  impactDescription,
  userImpact = [],
  monitoring,
  rollback,
  className
}: ProductionImpactProps) {
  const getSeverityInfo = (sev: "critical" | "high" | "medium" | "low") => {
    switch (sev) {
      case "critical":
        return {
          label: "Critical",
          description: "Immediate action required",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900",
          bgColor: "bg-red-50/50 dark:bg-red-950/20",
          borderColor: "border-red-200 dark:border-red-900"
        }
      case "high":
        return {
          label: "High",
          description: "Urgent attention needed",
          color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900",
          bgColor: "bg-orange-50/50 dark:bg-orange-950/20",
          borderColor: "border-orange-200 dark:border-orange-900"
        }
      case "medium":
        return {
          label: "Medium",
          description: "Plan for resolution",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900",
          bgColor: "bg-yellow-50/50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-200 dark:border-yellow-900"
        }
      case "low":
        return {
          label: "Low",
          description: "Minor inconvenience",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
          bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
          borderColor: "border-blue-200 dark:border-blue-900"
        }
    }
  }

  const sevInfo = getSeverityInfo(severity)

  return (
    <Card className={cn("border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
              <CardTitle className="text-stone-900 dark:text-stone-100">Production Impact</CardTitle>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={sevInfo.color}>
              {sevInfo.label}
            </Badge>
            <Badge variant="outline" className="border-stone-200 text-stone-700 dark:border-stone-700 dark:text-stone-300">
              <Clock className="mr-1 h-3 w-3" />
              {estimatedFixTime}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={cn("rounded-lg border p-4", sevInfo.borderColor, sevInfo.bgColor)}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-700 dark:text-stone-300">
            Impact Assessment
          </div>
          <p className="text-sm text-stone-900 dark:text-stone-100">{impactDescription}</p>
          <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">{sevInfo.description}</p>
        </div>

        {userImpact.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">User Impact</h3>
            <div className="space-y-2">
              {userImpact.map((impact, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950"
                >
                  <div className="font-medium text-stone-900 dark:text-stone-100">{impact.aspect}</div>
                  <div className="mt-1 text-sm text-stone-700 dark:text-stone-300">{impact.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-stone-600 dark:text-stone-400" />
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">Monitoring Recommendations</h3>
          </div>
          <div className="space-y-2">
            {monitoring.map((mon, index) => (
              <div
                key={index}
                className="rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900 dark:bg-blue-950/20"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-stone-900 dark:text-stone-100">{mon.metric}</div>
                    <div className="mt-1 text-sm text-stone-700 dark:text-stone-300">{mon.recommendation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {rollback && (
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
            <h4 className="mb-2 text-sm font-semibold text-stone-900 dark:text-stone-100">Rollback Considerations</h4>
            <p className="text-sm text-stone-700 dark:text-stone-300">{rollback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
