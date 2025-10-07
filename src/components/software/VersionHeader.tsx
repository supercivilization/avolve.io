import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Package, Calendar, CheckCircle2, AlertTriangle } from "lucide-react"

/**
 * Current version, release date, status badge, and requirements.
 * Provides essential version information at a glance.
 * Uses zinc color scheme for Software layer.
 */
interface VersionHeaderProps {
  /** Package or software name */
  name: string
  /** Current version number */
  version: string
  /** Release date */
  releaseDate: string
  /** Version status */
  status: "stable" | "beta" | "alpha" | "deprecated" | "lts"
  /** System requirements */
  requirements?: Array<{
    name: string
    version: string
    optional?: boolean
  }>
  /** Optional additional notes */
  notes?: string
  className?: string
}

export function VersionHeader({
  name,
  version,
  releaseDate,
  status,
  requirements = [],
  notes,
  className
}: VersionHeaderProps) {
  const getStatusBadge = (status: VersionHeaderProps["status"]) => {
    switch (status) {
      case "stable":
        return {
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: "Stable",
          color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
        }
      case "lts":
        return {
          icon: <CheckCircle2 className="h-3 w-3" />,
          label: "LTS",
          color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
        }
      case "beta":
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          label: "Beta",
          color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
        }
      case "alpha":
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          label: "Alpha",
          color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900"
        }
      case "deprecated":
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          label: "Deprecated",
          color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900"
        }
    }
  }

  const statusInfo = getStatusBadge(status)

  return (
    <Card className={cn("border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-900">
              <Package className="h-6 w-6 text-zinc-700 dark:text-zinc-300" />
            </div>
            <div>
              <CardTitle className="text-zinc-900 dark:text-zinc-100">{name}</CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <code className="text-sm font-mono text-zinc-700 dark:text-zinc-300">v{version}</code>
                <Badge variant="outline" className={statusInfo.color}>
                  {statusInfo.icon}
                  <span className="ml-1">{statusInfo.label}</span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <Calendar className="h-4 w-4" />
            <time dateTime={releaseDate}>{new Date(releaseDate).toLocaleDateString()}</time>
          </div>
        </div>
      </CardHeader>

      {(requirements.length > 0 || notes) && (
        <CardContent className="space-y-4">
          {requirements.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Requirements</h3>
              <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <ul className="space-y-1.5">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {req.name}
                        {req.optional && (
                          <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-500">(optional)</span>
                        )}
                      </span>
                      <code className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{req.version}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {notes && (
            <div className="rounded-lg border border-zinc-200 bg-zinc-100/50 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              {notes}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
