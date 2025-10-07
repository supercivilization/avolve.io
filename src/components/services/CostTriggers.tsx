import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TrendingUp, AlertCircle } from "lucide-react"

/**
 * Scenario cards showing when you need to upgrade.
 * Helps users understand cost triggers and plan for scaling.
 * Uses neutral color scheme for Services layer.
 */
interface CostTrigger {
  /** Unique identifier */
  id: string
  /** Trigger title */
  title: string
  /** Current tier */
  currentTier: string
  /** Recommended upgrade tier */
  upgradeTo: string
  /** Description of the trigger scenario */
  scenario: string
  /** Specific metrics that trigger the upgrade */
  metrics: Array<{
    name: string
    threshold: string
  }>
  /** Estimated cost increase */
  costIncrease?: string
  /** Urgency level */
  urgency: "high" | "medium" | "low"
}

interface CostTriggersProps {
  /** Service name */
  serviceName: string
  /** List of cost triggers */
  triggers: CostTrigger[]
  /** Optional description */
  description?: string
  className?: string
}

export function CostTriggers({
  serviceName,
  triggers,
  description,
  className
}: CostTriggersProps) {
  const getUrgencyBadge = (urgency: CostTrigger["urgency"]) => {
    switch (urgency) {
      case "high":
        return {
          label: "Action Required",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
      case "medium":
        return {
          label: "Plan Ahead",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
      case "low":
        return {
          label: "Consider Upgrade",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
    }
  }

  return (
    <Card className={cn("border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <TrendingUp className="h-5 w-5" />
          Cost Triggers - {serviceName}
        </CardTitle>
        {description && (
          <CardDescription className="text-neutral-600 dark:text-neutral-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {triggers.map((trigger) => {
          const urgency = getUrgencyBadge(trigger.urgency)

          return (
            <div
              key={trigger.id}
              className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{trigger.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{trigger.scenario}</p>
                </div>
                <Badge variant="outline" className={urgency.color}>
                  {urgency.label}
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                    Current Tier
                  </div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">{trigger.currentTier}</div>
                </div>

                <div className="space-y-1 rounded-lg border border-blue-200 bg-blue-50/50 p-3 dark:border-blue-900 dark:bg-blue-950/20">
                  <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                    Upgrade To
                  </div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">{trigger.upgradeTo}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Trigger Metrics:</div>
                <div className="space-y-1">
                  {trigger.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded border border-neutral-200 bg-neutral-50/50 px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900/50"
                    >
                      <span className="text-neutral-700 dark:text-neutral-300">{metric.name}</span>
                      <code className="font-mono text-xs text-neutral-900 dark:text-neutral-100">{metric.threshold}</code>
                    </div>
                  ))}
                </div>
              </div>

              {trigger.costIncrease && (
                <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900 dark:bg-amber-950/20">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">Estimated Cost Increase:</span>{" "}
                    <span className="text-neutral-700 dark:text-neutral-300">{trigger.costIncrease}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
