"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Visual representation of solution architecture with clickable links to systems/software/services.
 * Uses slate color scheme for Solutions layer.
 */
interface ArchitectureNode {
  /** Unique identifier for the node */
  id: string
  /** Display label for the node */
  label: string
  /** Type of component (determines color coding) */
  type: "system" | "software" | "service"
  /** Link to detailed page */
  href: string
  /** Optional description shown on hover */
  description?: string
}

interface ArchitectureDiagramProps {
  /** Title of the architecture diagram */
  title?: string
  /** Optional description */
  description?: string
  /** List of architecture nodes to display */
  nodes: ArchitectureNode[]
  /** Optional custom layout (defaults to grid) */
  layout?: "grid" | "flow"
  className?: string
}

export function ArchitectureDiagram({
  title = "Architecture Overview",
  description,
  nodes,
  layout = "grid",
  className
}: ArchitectureDiagramProps) {
  const getNodeStyles = (type: ArchitectureNode["type"]) => {
    switch (type) {
      case "system":
        return "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
      case "software":
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
      case "service":
        return "border-neutral-300 bg-neutral-50 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
    }
  }

  const getTypeLabel = (type: ArchitectureNode["type"]) => {
    switch (type) {
      case "system":
        return "System"
      case "software":
        return "Software"
      case "service":
        return "Service"
    }
  }

  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">{title}</CardTitle>
        {description && (
          <CardDescription className="text-slate-600 dark:text-slate-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn(
          layout === "grid"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-wrap gap-4"
        )}>
          {nodes.map((node) => (
            <Link
              key={node.id}
              href={node.href}
              className={cn(
                "group relative rounded-lg border p-4 transition-all hover:shadow-md",
                getNodeStyles(node.type)
              )}
              title={node.description}
            >
              <div className="space-y-2">
                <div className="text-xs font-medium uppercase tracking-wide opacity-60">
                  {getTypeLabel(node.type)}
                </div>
                <div className="font-semibold">{node.label}</div>
                {node.description && (
                  <div className="text-sm opacity-75">{node.description}</div>
                )}
              </div>
              <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
