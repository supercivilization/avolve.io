import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

/**
 * Feature comparison table across tiers.
 * Helps users compare service pricing plans and features.
 * Uses neutral color scheme for Services layer.
 */
interface PricingFeature {
  /** Feature name */
  name: string
  /** Feature description */
  description?: string
  /** Availability per tier (true = included, false = not included, string = custom value) */
  tiers: {
    [tierName: string]: boolean | string
  }
}

interface PricingTier {
  /** Tier name (e.g., "Free", "Pro", "Enterprise") */
  name: string
  /** Monthly price */
  price: string
  /** Billing frequency note */
  billingNote?: string
  /** Tier highlights */
  highlights?: string[]
  /** Is this the recommended tier? */
  recommended?: boolean
}

interface PricingOverviewProps {
  /** Service name */
  serviceName: string
  /** List of pricing tiers */
  tiers: PricingTier[]
  /** List of features to compare */
  features: PricingFeature[]
  /** Optional description */
  description?: string
  className?: string
}

export function PricingOverview({
  serviceName,
  tiers,
  features,
  description,
  className
}: PricingOverviewProps) {
  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
      ) : (
        <X className="h-5 w-5 text-neutral-300 dark:text-neutral-700" />
      )
    }
    return <span className="text-sm text-neutral-700 dark:text-neutral-300">{value}</span>
  }

  return (
    <Card className={cn("border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-neutral-900 dark:text-neutral-100">
          {serviceName} Pricing
        </CardTitle>
        {description && (
          <CardDescription className="text-neutral-600 dark:text-neutral-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tier Headers */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-lg border p-4 space-y-3",
                tier.recommended
                  ? "border-blue-300 bg-blue-50 ring-2 ring-blue-200 dark:border-blue-800 dark:bg-blue-950/30 dark:ring-blue-900"
                  : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{tier.name}</h3>
                  {tier.recommended && (
                    <Badge className="bg-blue-600 text-white dark:bg-blue-400 dark:text-blue-950">
                      Recommended
                    </Badge>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{tier.price}</span>
                  {tier.billingNote && (
                    <span className="ml-1 text-sm text-neutral-600 dark:text-neutral-400">{tier.billingNote}</span>
                  )}
                </div>
              </div>

              {tier.highlights && tier.highlights.length > 0 && (
                <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {tier.highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-neutral-200 dark:border-neutral-800">
                <th className="p-3 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Feature
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    className="p-3 text-center text-sm font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={feature.name}
                  className={cn(
                    "border-b border-neutral-200 dark:border-neutral-800",
                    index % 2 === 0 ? "bg-white dark:bg-neutral-950" : "bg-neutral-50/50 dark:bg-neutral-900/50"
                  )}
                >
                  <td className="p-3">
                    <div className="space-y-0.5">
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">{feature.name}</div>
                      {feature.description && (
                        <div className="text-xs text-neutral-600 dark:text-neutral-400">{feature.description}</div>
                      )}
                    </div>
                  </td>
                  {tiers.map((tier) => (
                    <td key={tier.name} className="p-3 text-center">
                      {renderFeatureValue(feature.tiers[tier.name])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-100/50 p-3 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
          <span className="font-semibold">Note:</span> Prices are subject to change. Check the service provider's
          official website for the most current pricing information.
        </div>
      </CardContent>
    </Card>
  )
}
