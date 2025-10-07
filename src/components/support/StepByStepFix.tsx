"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ListChecks, Copy, Check } from "lucide-react"

/**
 * Numbered resolution guide with code examples.
 * Provides detailed step-by-step instructions to resolve issues.
 * Uses stone color scheme for Support layer.
 */
interface FixStep {
  /** Step number */
  step: number
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Optional code example */
  code?: string
  /** Language for code syntax (if code provided) */
  language?: string
  /** Optional command to run */
  command?: string
  /** Optional warning or note */
  note?: string
}

interface StepByStepFixProps {
  /** Title of the fix guide */
  title?: string
  /** Optional description */
  description?: string
  /** List of steps to follow */
  steps: FixStep[]
  /** Optional verification steps */
  verification?: string
  className?: string
}

export function StepByStepFix({
  title = "Step-by-Step Fix",
  description,
  steps,
  verification,
  className
}: StepByStepFixProps) {
  const [copiedStep, setCopiedStep] = React.useState<number | null>(null)

  const copyToClipboard = async (text: string, stepNumber: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedStep(stepNumber)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <Card className={cn("border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
          <ListChecks className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-stone-600 dark:text-stone-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((stepInfo) => (
          <div
            key={stepInfo.step}
            className="space-y-3 rounded-lg border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white dark:bg-stone-100 dark:text-stone-900">
                {stepInfo.step}
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">{stepInfo.title}</h4>
                <p className="text-sm text-stone-700 dark:text-stone-300">{stepInfo.description}</p>

                {stepInfo.code && (
                  <div className="relative group">
                    <div className="rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900">
                      {stepInfo.language && (
                        <div className="border-b border-stone-200 px-3 py-1.5 dark:border-stone-800">
                          <span className="text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                            {stepInfo.language}
                          </span>
                        </div>
                      )}
                      <pre className="overflow-x-auto p-3">
                        <code className="text-xs font-mono text-stone-900 dark:text-stone-100">{stepInfo.code}</code>
                      </pre>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => copyToClipboard(stepInfo.code!, stepInfo.step)}
                    >
                      {copiedStep === stepInfo.step ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                )}

                {stepInfo.command && (
                  <div className="relative group">
                    <div className="rounded-lg border border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-900">
                      <div className="border-b border-stone-200 px-3 py-1.5 dark:border-stone-800">
                        <span className="text-xs font-semibold uppercase tracking-wide text-stone-600 dark:text-stone-400">
                          Command
                        </span>
                      </div>
                      <pre className="overflow-x-auto p-3">
                        <code className="text-xs font-mono text-stone-900 dark:text-stone-100">{stepInfo.command}</code>
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

                {stepInfo.note && (
                  <div className="rounded-md border border-amber-200 bg-amber-50/50 p-2 text-xs text-stone-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-stone-300">
                    <span className="font-semibold">Note:</span> {stepInfo.note}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {verification && (
          <div className="rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/20">
            <h4 className="mb-2 text-sm font-semibold text-stone-900 dark:text-stone-100">Verification</h4>
            <p className="text-sm text-stone-700 dark:text-stone-300">{verification}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
