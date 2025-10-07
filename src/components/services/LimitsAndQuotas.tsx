import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertTriangle, Lock } from "lucide-react"

/**
 * Hard limits with "What this makes impossible" warnings.
 * Helps users understand service constraints and plan accordingly.
 * Uses neutral color scheme for Services layer.
 */
interface Limit {
  /** Unique identifier */
  id: string
  /** Limit name */
  name: string
  /** Tier this limit applies to */
  tier: string
  /** Limit value */
  value: string
  /** Type of limit */
  type: "hard" | "soft" | "rate"
  /** What becomes impossible when hitting this limit */
  blocksCapability: string[]
  /** Workarounds or solutions */
  workarounds?: string[]
  /** Whether this is a critical limit */
  critical?: boolean
}

interface LimitsAndQuotasProps {
  /** Service name */
  serviceName: string
  /** List of limits */
  limits: Limit[]
  /** Optional description */
  description?: string
  className?: string
}

export function LimitsAndQuotas({
  serviceName,
  limits,
  description,
  className
}: LimitsAndQuotasProps) {
  const getLimitTypeBadge = (type: Limit["type"]) => {
    switch (type) {
      case "hard":
        return {
          label: "Hard Limit",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
      case "soft":
        return {
          label: "Soft Limit",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
      case "rate":
        return {
          label: "Rate Limit",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
    }
  }

  // Group limits by tier
  const groupedLimits = React.useMemo(() => {
    const groups = new Map<string, Limit[]>()
    limits.forEach(limit => {
      if (!groups.has(limit.tier)) {
        groups.set(limit.tier, [])
      }
      groups.get(limit.tier)?.push(limit)
    })
    return groups
  }, [limits])

  return (
    <Card className={cn("border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Lock className="h-5 w-5" />
          Limits & Quotas - {serviceName}
        </CardTitle>
        {description && (
          <CardDescription className="text-neutral-600 dark:text-neutral-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from(groupedLimits.entries()).map(([tier, tierLimits]) => (
          <div key={tier} className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
              {tier} Tier
            </h3>

            <div className="space-y-3">
              {tierLimits.map((limit) => {
                const limitType = getLimitTypeBadge(limit.type)

                return (
                  <div
                    key={limit.id}
                    className={cn(
                      "space-y-3 rounded-lg border p-4",
                      limit.critical
                        ? "border-red-300 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20"
                        : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{limit.name}</h4>
                          {limit.critical && (
                            <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900">
                              Critical
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Limit:</span>
                          <code className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {limit.value}
                          </code>
                        </div>
                      </div>
                      <Badge variant="outline" className={limitType.color}>
                        {limitType.label}
                      </Badge>
                    </div>

                    <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 dark:border-red-900 dark:bg-red-950/20">
                      <div className="flex gap-2">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-600 dark:text-red-400" />
                        <div className="flex-1 space-y-1">
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            What this makes impossible:
                          </div>
                          <ul className="space-y-0.5 text-sm text-neutral-700 dark:text-neutral-300">
                            {limit.blocksCapability.map((capability, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-neutral-400">•</span>
                                <span>{capability}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {limit.workarounds && limit.workarounds.length > 0 && (
                      <div className="rounded-lg border border-green-200 bg-green-50/50 p-3 dark:border-green-900 dark:bg-green-950/20">
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            Workarounds:
                          </div>
                          <ul className="space-y-0.5 text-sm text-neutral-700 dark:text-neutral-300">
                            {limit.workarounds.map((workaround, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-neutral-400">•</span>
                                <span>{workaround}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-neutral-200 bg-neutral-100/50 p-3 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
          <span className="font-semibold">Important:</span> Hard limits cannot be exceeded without upgrading. Soft
          limits may trigger throttling or additional charges. Always plan capacity based on these constraints.
        </div>
      </CardContent>
    </Card>
  )
}
