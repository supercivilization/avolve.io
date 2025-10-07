import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, Circle, Settings } from "lucide-react"

/**
 * Setup checklist with configuration examples.
 * Helps users understand and complete service integration.
 * Uses neutral color scheme for Services layer.
 */
interface SetupStep {
  /** Unique identifier */
  id: string
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Whether this step is required or optional */
  required: boolean
  /** Configuration example code */
  configExample?: string
  /** Related documentation links */
  docs?: Array<{
    text: string
    href: string
  }>
  /** Estimated time to complete */
  estimatedTime?: string
}

interface IntegrationRequirementsProps {
  /** Service name */
  serviceName: string
  /** List of setup steps */
  steps: SetupStep[]
  /** Optional description */
  description?: string
  /** Optional prerequisites */
  prerequisites?: string[]
  className?: string
}

export function IntegrationRequirements({
  serviceName,
  steps,
  description,
  prerequisites = [],
  className
}: IntegrationRequirementsProps) {
  return (
    <Card className={cn("border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-950/50", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
          <Settings className="h-5 w-5" />
          Integration Requirements - {serviceName}
        </CardTitle>
        {description && (
          <CardDescription className="text-neutral-600 dark:text-neutral-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {prerequisites.length > 0 && (
          <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
            <h3 className="mb-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">Prerequisites</h3>
            <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
              {prerequisites.map((prereq, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950">
                  {step.required ? (
                    <CheckCircle2 className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                  ) : (
                    <Circle className="h-4 w-4 text-neutral-400 dark:text-neutral-600" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{step.title}</h4>
                        {step.required ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-900">
                            Required
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-neutral-200 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
                            Optional
                          </Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                    </div>
                    {step.estimatedTime && (
                      <Badge variant="outline" className="border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
                        ~{step.estimatedTime}
                      </Badge>
                    )}
                  </div>

                  {step.configExample && (
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                      <div className="border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
                        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
                          Configuration Example
                        </span>
                      </div>
                      <pre className="overflow-x-auto p-3">
                        <code className="text-xs font-mono text-neutral-900 dark:text-neutral-100">
                          {step.configExample}
                        </code>
                      </pre>
                    </div>
                  )}

                  {step.docs && step.docs.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-neutral-600 dark:text-neutral-400">Related docs:</span>
                      {step.docs.map((doc, docIndex) => (
                        <a
                          key={docIndex}
                          href={doc.href}
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {doc.text}
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-100/50 p-3 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-400">
          <span className="font-semibold">Note:</span> Complete all required steps for basic functionality. Optional
          steps enhance features and performance.
        </div>
      </CardContent>
    </Card>
  )
}
