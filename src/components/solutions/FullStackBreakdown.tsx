import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Organized lists linking to Systems, Software, Services, Support pages.
 * Provides comprehensive breakdown of solution components.
 * Uses slate color scheme for Solutions layer.
 */
interface BreakdownItem {
  /** Display name of the component */
  name: string
  /** Link to detailed page */
  href: string
  /** Optional brief description */
  description?: string
}

interface FullStackBreakdownProps {
  /** Systems used in this solution */
  systems?: BreakdownItem[]
  /** Software packages/libraries */
  software?: BreakdownItem[]
  /** External services/APIs */
  services?: BreakdownItem[]
  /** Related support articles */
  support?: BreakdownItem[]
  className?: string
}

export function FullStackBreakdown({
  systems = [],
  software = [],
  services = [],
  support = [],
  className
}: FullStackBreakdownProps) {
  const sections = [
    {
      title: "Systems",
      items: systems,
      color: "text-gray-700 dark:text-gray-300",
      hoverColor: "hover:text-gray-900 dark:hover:text-gray-100"
    },
    {
      title: "Software",
      items: software,
      color: "text-zinc-700 dark:text-zinc-300",
      hoverColor: "hover:text-zinc-900 dark:hover:text-zinc-100"
    },
    {
      title: "Services",
      items: services,
      color: "text-neutral-700 dark:text-neutral-300",
      hoverColor: "hover:text-neutral-900 dark:hover:text-neutral-100"
    },
    {
      title: "Support",
      items: support,
      color: "text-stone-700 dark:text-stone-300",
      hoverColor: "hover:text-stone-900 dark:hover:text-stone-100"
    }
  ]

  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-slate-100">Full Stack Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {sections.map((section) => (
            section.items.length > 0 && (
              <div key={section.title} className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group block rounded-md p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-900",
                          section.color,
                          section.hoverColor
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            {item.description && (
                              <div className="mt-0.5 text-xs opacity-75">{item.description}</div>
                            )}
                          </div>
                          <svg
                            className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
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
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
