import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calculator } from "lucide-react"

/**
 * Interactive or example-based cost scenarios.
 * Helps users estimate costs for their specific use case.
 * Uses neutral color scheme for Services layer.
 */
interface CostScenario {
  /** Unique identifier */
  id: string
  /** Scenario name */
  name: string
  /** Description of the scenario */
  description: string
  /** Usage metrics for this scenario */
  usage: Array<{
    metric: string
    value: string
  }>
  /** Cost breakdown */
  breakdown: Array<{
    component: string
    cost: string
    notes?: string
  }>
  /** Total monthly cost */
  totalCost: string
  /** Scenario type */
  type: "startup" | "growth" | "enterprise"
}

interface CostCalculatorProps {
  /** Service name */
  serviceName: string
  /** List of example scenarios */
  scenarios: CostScenario[]
  /** Optional description */
  description?: string
  /** Optional disclaimer */
  disclaimer?: string
  className?: string
}

export function CostCalculator({
  serviceName,
  scenarios,
  description,
  disclaimer,
  className
}: CostCalculatorProps) {
  const getScenarioTypeBadge = (type: CostScenario["type"]) => {
    switch (type) {
      case "startup":
        return {
          label: "Startup",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
        }
      case "growth":
        return {
          label: "Growth",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
      case "enterprise":
        return {
          label: "Enterprise",
          color: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900"
        }
    }
  }

  return (
    <Card className={cn("border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Calculator className="h-5 w-5" />
          Cost Calculator - {serviceName}
        </CardTitle>
        {description && (
          <CardDescription className="text-neutral-600 dark:text-neutral-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {scenarios.map((scenario) => {
          const scenarioType = getScenarioTypeBadge(scenario.type)

          return (
            <div
              key={scenario.id}
              className="space-y-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{scenario.name}</h3>
                    <Badge variant="outline" className={scenarioType.color}>
                      {scenarioType.label}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{scenario.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Total/month</div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{scenario.totalCost}</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Usage Metrics */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Usage Metrics</h4>
                  <div className="space-y-1 rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                    {scenario.usage.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-neutral-700 dark:text-neutral-300">{metric.metric}</span>
                        <code className="font-mono text-xs text-neutral-900 dark:text-neutral-100">{metric.value}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Cost Breakdown</h4>
                  <div className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 dark:border-neutral-800 dark:bg-neutral-900/50">
                    {scenario.breakdown.map((item, index) => (
                      <div key={index} className="space-y-0.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-700 dark:text-neutral-300">{item.component}</span>
                          <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {item.cost}
                          </span>
                        </div>
                        {item.notes && (
                          <div className="text-xs text-neutral-600 dark:text-neutral-400">{item.notes}</div>
                        )}
                      </div>
                    ))}
                    <div className="border-t border-neutral-200 pt-2 dark:border-neutral-800">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-sm text-neutral-900 dark:text-neutral-100">Total</span>
                        <span className="font-mono text-neutral-900 dark:text-neutral-100">{scenario.totalCost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {disclaimer && (
          <div className="rounded-lg border border-neutral-200 bg-neutral-100/50 p-3 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
            <span className="font-semibold">Disclaimer:</span> {disclaimer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
