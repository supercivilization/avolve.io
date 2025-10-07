import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Layers, Box, Package, Cloud, HelpCircle } from "lucide-react"

/**
 * Smart link component that shows layer context with icon indicating layer.
 * Maintains 5S color coding and provides preview tooltip on hover.
 * Universal component used across all documentation layers.
 */
type Layer = "solutions" | "systems" | "software" | "services" | "support"

interface CrossLayerLinkProps {
  /** Destination URL */
  href: string
  /** Link text */
  children: React.ReactNode
  /** Documentation layer this link points to */
  layer: Layer
  /** Optional preview text shown on hover */
  preview?: string
  /** Optional display as inline or block */
  variant?: "inline" | "card"
  className?: string
}

export function CrossLayerLink({
  href,
  children,
  layer,
  preview,
  variant = "inline",
  className
}: CrossLayerLinkProps) {
  const getLayerConfig = (layer: Layer) => {
    switch (layer) {
      case "solutions":
        return {
          icon: Layers,
          color: "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100",
          bgColor: "bg-slate-100 dark:bg-slate-900",
          borderColor: "border-slate-200 dark:border-slate-800",
          label: "Solution"
        }
      case "systems":
        return {
          icon: Box,
          color: "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
          bgColor: "bg-gray-100 dark:bg-gray-900",
          borderColor: "border-gray-200 dark:border-gray-800",
          label: "System"
        }
      case "software":
        return {
          icon: Package,
          color: "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100",
          bgColor: "bg-zinc-100 dark:bg-zinc-900",
          borderColor: "border-zinc-200 dark:border-zinc-800",
          label: "Software"
        }
      case "services":
        return {
          icon: Cloud,
          color: "text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100",
          bgColor: "bg-neutral-100 dark:bg-neutral-900",
          borderColor: "border-neutral-200 dark:border-neutral-800",
          label: "Service"
        }
      case "support":
        return {
          icon: HelpCircle,
          color: "text-stone-700 hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100",
          bgColor: "bg-stone-100 dark:bg-stone-900",
          borderColor: "border-stone-200 dark:border-stone-800",
          label: "Support"
        }
    }
  }

  const config = getLayerConfig(layer)
  const Icon = config.icon

  if (variant === "card") {
    return (
      <Link
        href={href}
        className={cn(
          "group block rounded-lg border p-4 transition-all hover:shadow-md",
          config.borderColor,
          config.bgColor,
          className
        )}
        title={preview}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md",
              config.bgColor,
              config.color
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-semibold uppercase tracking-wide opacity-60")}>
                {config.label}
              </span>
            </div>
            <div className={cn("font-medium transition-colors", config.color)}>{children}</div>
            {preview && <div className="text-sm opacity-75">{preview}</div>}
          </div>
          <svg
            className="h-5 w-5 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-medium transition-colors underline-offset-4 hover:underline",
        config.color,
        className
      )}
      title={preview || `View ${config.label}: ${children}`}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{children}</span>
      <svg
        className="h-3 w-3 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}
