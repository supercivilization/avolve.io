"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy, Check, Terminal } from "lucide-react"

/**
 * Quick setup commands with copy buttons.
 * Provides easy-to-follow installation steps.
 * Uses zinc color scheme for Software layer.
 */
interface InstallStep {
  /** Step number */
  step: number
  /** Step title */
  title: string
  /** Optional description */
  description?: string
  /** Command to execute */
  command?: string
  /** Package manager (npm, yarn, pnpm, bun) */
  packageManager?: "npm" | "yarn" | "pnpm" | "bun"
  /** Notes or warnings */
  notes?: string
}

interface InstallationInstructionsProps {
  /** Package name */
  packageName: string
  /** Installation steps */
  steps: InstallStep[]
  /** Optional description */
  description?: string
  /** Optional prerequisites */
  prerequisites?: string[]
  className?: string
}

export function InstallationInstructions({
  packageName,
  steps,
  description,
  prerequisites = [],
  className
}: InstallationInstructionsProps) {
  const [copiedStep, setCopiedStep] = React.useState<number | null>(null)

  const copyToClipboard = async (command: string, stepNumber: number) => {
    await navigator.clipboard.writeText(command)
    setCopiedStep(stepNumber)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const getPackageManagerBadge = (pm: InstallStep["packageManager"]) => {
    const colors = {
      npm: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900",
      yarn: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-900",
      pnpm: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-900",
      bun: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-900"
    }
    return pm ? colors[pm] : ""
  }

  return (
    <Card className={cn("border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <Terminal className="h-5 w-5" />
          Installation
        </CardTitle>
        {description && (
          <CardDescription className="text-zinc-600 dark:text-zinc-400">{description}</CardDescription>
        )}
        <div className="mt-2 rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <code className="font-mono text-sm text-zinc-700 dark:text-zinc-300">{packageName}</code>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {prerequisites.length > 0 && (
          <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
            <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Prerequisites</h3>
            <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
              {prerequisites.map((prereq, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-zinc-400">•</span>
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4">
          {steps.map((stepInfo) => (
            <div
              key={stepInfo.step}
              className="space-y-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
                  {stepInfo.step}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{stepInfo.title}</h4>
                    {stepInfo.packageManager && (
                      <Badge variant="outline" className={getPackageManagerBadge(stepInfo.packageManager)}>
                        {stepInfo.packageManager}
                      </Badge>
                    )}
                  </div>

                  {stepInfo.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{stepInfo.description}</p>
                  )}

                  {stepInfo.command && (
                    <div className="relative group">
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                        <pre className="overflow-x-auto p-3">
                          <code className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                            {stepInfo.command}
                          </code>
                        </pre>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() => copyToClipboard(stepInfo.command!, stepInfo.step)}
                      >
                        {copiedStep === stepInfo.step ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="sr-only">Copy command</span>
                      </Button>
                    </div>
                  )}

                  {stepInfo.notes && (
                    <div className="rounded-md border border-zinc-200 bg-zinc-100/50 p-2 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                      <span className="font-semibold">Note:</span> {stepInfo.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
