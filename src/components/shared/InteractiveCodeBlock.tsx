"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Copy, Check, AlertTriangle } from "lucide-react"

/**
 * Enhanced code block with copy button, syntax highlighting context,
 * context comments highlighting, optional gotcha warnings, and language indicator.
 * Universal component used across all documentation layers.
 */
interface InteractiveCodeBlockProps {
  /** Code content */
  code: string
  /** Programming language */
  language?: string
  /** Optional filename */
  filename?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Highlighted context comment lines (1-indexed) */
  highlightedLines?: number[]
  /** Optional gotcha warnings */
  gotchas?: Array<{
    line: number
    message: string
  }>
  /** Optional title */
  title?: string
  className?: string
}

export function InteractiveCodeBlock({
  code,
  language = "typescript",
  filename,
  showLineNumbers = false,
  highlightedLines = [],
  gotchas = [],
  title,
  className
}: InteractiveCodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  const isLineHighlighted = (lineNumber: number) => highlightedLines.includes(lineNumber)
  const getLineGotcha = (lineNumber: number) => gotchas.find(g => g.line === lineNumber)

  return (
    <div className={cn("group relative", className)}>
      {/* Header */}
      {(title || filename || language) && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-border bg-muted px-4 py-2">
          <div className="flex items-center gap-3">
            {title && <span className="text-sm font-semibold">{title}</span>}
            {filename && <span className="font-mono text-sm text-muted-foreground">{filename}</span>}
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {language}
          </Badge>
        </div>
      )}

      {/* Code Container */}
      <div className="relative">
        <pre
          className={cn(
            "overflow-x-auto border border-border bg-muted p-4",
            title || filename || language ? "" : "rounded-lg"
          )}
        >
          <code className={cn("text-sm font-mono", `language-${language}`)}>
            {showLineNumbers ? (
              <div className="table">
                {lines.map((line, i) => {
                  const lineNumber = i + 1
                  const isHighlighted = isLineHighlighted(lineNumber)
                  const gotcha = getLineGotcha(lineNumber)

                  return (
                    <div key={i} className="table-row group/line">
                      <span
                        className={cn(
                          "table-cell select-none pr-4 text-right text-muted-foreground",
                          isHighlighted && "font-semibold text-primary"
                        )}
                      >
                        {lineNumber}
                      </span>
                      <span
                        className={cn(
                          "table-cell",
                          isHighlighted && "bg-primary/10 font-medium",
                          gotcha && "bg-amber-100/50 dark:bg-amber-950/20"
                        )}
                      >
                        {line}
                        {gotcha && (
                          <span className="ml-2 inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                            <AlertTriangle className="h-3 w-3" />
                            <span className="hidden group-hover/line:inline">{gotcha.message}</span>
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              code
            )}
          </code>
        </pre>

        {/* Copy Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>

      {/* Gotchas Summary */}
      {gotchas.length > 0 && !showLineNumbers && (
        <div className="space-y-1 rounded-b-lg border border-t-0 border-amber-200 bg-amber-50/50 p-3 dark:border-amber-900 dark:bg-amber-950/20">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-3 w-3" />
            Common Gotchas
          </div>
          <ul className="space-y-1 text-xs text-amber-700 dark:text-amber-300">
            {gotchas.map((gotcha, index) => (
              <li key={index}>
                Line {gotcha.line}: {gotcha.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
