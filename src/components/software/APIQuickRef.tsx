"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"

/**
 * Copy-paste ready code examples with context comments.
 * Provides quick reference for common API patterns.
 * Uses zinc color scheme for Software layer.
 */
interface APIExample {
  /** Unique identifier */
  id: string
  /** Example title */
  title: string
  /** Brief description */
  description: string
  /** Programming language */
  language: string
  /** Code example with context comments */
  code: string
  /** Optional tags for categorization */
  tags?: string[]
}

interface APIQuickRefProps {
  /** List of API examples */
  examples: APIExample[]
  /** Optional description */
  description?: string
  className?: string
}

export function APIQuickRef({
  examples,
  description,
  className
}: APIQuickRefProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Card className={cn("border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-950/50", className)}>
      <CardHeader>
        <CardTitle className="text-zinc-900 dark:text-zinc-100">API Quick Reference</CardTitle>
        {description && (
          <CardDescription className="text-zinc-600 dark:text-zinc-400">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {examples.map((example) => (
          <div
            key={example.id}
            className="group space-y-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{example.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{example.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                  {example.language}
                </Badge>
              </div>
            </div>

            {example.tags && example.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {example.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="relative">
              <div className="rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <pre className="overflow-x-auto p-4">
                  <code className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                    {example.code}
                  </code>
                </pre>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => copyToClipboard(example.code, example.id)}
              >
                {copiedId === example.id ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-zinc-200 bg-zinc-100/50 p-3 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
          <span className="font-semibold">Tip:</span> Context comments in code examples help you understand what each
          part does. Hover over code blocks to reveal the copy button.
        </div>
      </CardContent>
    </Card>
  )
}
