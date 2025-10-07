import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react"

/**
 * Timestamp badge showing when content was last verified.
 * Provides visual freshness indicator for documentation.
 * Universal component used across all documentation layers.
 */
interface LastVerifiedProps {
  /** Last verification date */
  date: string
  /** Optional verifier name/source */
  verifiedBy?: string
  /** Show freshness indicator (how recent the verification is) */
  showFreshness?: boolean
  /** Variant style */
  variant?: "default" | "compact" | "detailed"
  className?: string
}

export function LastVerified({
  date,
  verifiedBy,
  showFreshness = true,
  variant = "default",
  className
}: LastVerifiedProps) {
  const verifiedDate = new Date(date)
  const now = new Date()
  const daysSinceVerified = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24))

  const getFreshnessInfo = () => {
    if (daysSinceVerified <= 30) {
      return {
        status: "fresh",
        label: "Recently verified",
        icon: CheckCircle2,
        color: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-900"
      }
    } else if (daysSinceVerified <= 90) {
      return {
        status: "moderate",
        label: "Verified within 3 months",
        icon: CheckCircle2,
        color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900"
      }
    } else if (daysSinceVerified <= 180) {
      return {
        status: "aging",
        label: "May need review",
        icon: Calendar,
        color: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900"
      }
    } else {
      return {
        status: "stale",
        label: "Needs verification",
        icon: AlertCircle,
        color: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-900"
      }
    }
  }

  const freshness = getFreshnessInfo()
  const FreshnessIcon = freshness.icon

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  if (variant === "compact") {
    return (
      <Badge
        variant="outline"
        className={cn(
          showFreshness ? freshness.color : "border-muted-foreground/20",
          "inline-flex items-center gap-1",
          className
        )}
      >
        {showFreshness && <FreshnessIcon className="h-3 w-3" />}
        <Calendar className="h-3 w-3" />
        <span className="text-xs">{formatDate(verifiedDate)}</span>
      </Badge>
    )
  }

  if (variant === "detailed") {
    return (
      <div className={cn("rounded-lg border bg-card p-3 text-sm", className)}>
        <div className="flex items-start gap-2">
          {showFreshness && <FreshnessIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Last Verified:</span>
              <time dateTime={date}>{formatDate(verifiedDate)}</time>
              {showFreshness && (
                <Badge variant="outline" className={cn("text-xs", freshness.color)}>
                  {freshness.label}
                </Badge>
              )}
            </div>
            {verifiedBy && (
              <div className="text-xs text-muted-foreground">Verified by: {verifiedBy}</div>
            )}
            <div className="text-xs text-muted-foreground">
              {daysSinceVerified === 0
                ? "Today"
                : daysSinceVerified === 1
                ? "Yesterday"
                : `${daysSinceVerified} days ago`}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("inline-flex items-center gap-2 text-sm", className)}>
      {showFreshness && <FreshnessIcon className="h-4 w-4" />}
      <span className="text-muted-foreground">Last verified:</span>
      <time dateTime={date} className="font-medium">
        {formatDate(verifiedDate)}
      </time>
      {showFreshness && (
        <Badge variant="outline" className={cn("text-xs", freshness.color)}>
          {freshness.label}
        </Badge>
      )}
    </div>
  )
}
