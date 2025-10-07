import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Check, X, AlertCircle } from "lucide-react"

/**
 * Table showing compatible package versions.
 * Helps developers ensure version compatibility across dependencies.
 * Uses zinc color scheme for Software layer.
 */
interface CompatibilityEntry {
  /** Package name */
  package: string
  /** Compatible version range */
  version: string
  /** Compatibility status */
  status: "compatible" | "incompatible" | "warning"
  /** Optional notes about compatibility */
  notes?: string
}

interface CompatibilityMatrixProps {
  /** Main package name and version this matrix is for */
  mainPackage: {
    name: string
    version: string
  }
  /** List of compatibility entries */
  compatibilities: CompatibilityEntry[]
  /** Optional description */
  description?: string
  /** Optional last updated timestamp */
  lastUpdated?: string
  className?: string
}

export function CompatibilityMatrix({
  mainPackage,
  compatibilities,
  description,
  lastUpdated,
  className
}: CompatibilityMatrixProps) {
  const getStatusIcon = (status: CompatibilityEntry["status"]) => {
    switch (status) {
      case "compatible":
        return <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
      case "incompatible":
        return <X className="h-4 w-4 text-red-600 dark:text-red-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
    }
  }

  const getStatusBadge = (status: CompatibilityEntry["status"]) => {
    switch (status) {
      case "compatible":
        return {
          label: "Compatible",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
        }
      case "incompatible":
        return {
          label: "Incompatible",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
      case "warning":
        return {
          label: "Caution",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
    }
  }

  return (
    <Card className={cn("border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-zinc-900 dark:text-zinc-100">Compatibility Matrix</CardTitle>
            {description && (
              <CardDescription className="mt-1.5 text-zinc-600 dark:text-zinc-400">
                {description}
              </CardDescription>
            )}
          </div>
          {lastUpdated && (
            <div className="text-xs text-zinc-500 dark:text-zinc-500">
              Updated: {new Date(lastUpdated).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="mt-3 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {mainPackage.name}
            </span>
            <code className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
              v{mainPackage.version}
            </code>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-zinc-200 dark:border-zinc-800">
                <th className="p-3 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Package
                </th>
                <th className="p-3 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Version
                </th>
                <th className="p-3 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Status
                </th>
                <th className="p-3 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {compatibilities.map((entry, index) => {
                const badge = getStatusBadge(entry.status)

                return (
                  <tr
                    key={`${entry.package}-${index}`}
                    className={cn(
                      "border-b border-zinc-200 dark:border-zinc-800",
                      index % 2 === 0 ? "bg-white dark:bg-zinc-950" : "bg-zinc-50/50 dark:bg-zinc-900/50"
                    )}
                  >
                    <td className="p-3 font-medium text-zinc-900 dark:text-zinc-100">
                      {entry.package}
                    </td>
                    <td className="p-3">
                      <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
                        {entry.version}
                      </code>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getStatusIcon(entry.status)}
                        <Badge variant="outline" className={cn("hidden sm:inline-flex", badge.color)}>
                          {badge.label}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {entry.notes || "-"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-100/50 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>
            Always test compatibility in your specific environment. Version constraints shown are based on official
            documentation and community testing.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
