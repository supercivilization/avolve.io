import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Task list with time estimates and dependency indicators.
 * Helps users understand project timeline and task relationships.
 * Uses slate color scheme for Solutions layer.
 */
interface Task {
  /** Unique task identifier */
  id: string
  /** Task name */
  name: string
  /** Time estimate (e.g., "2-4 hours", "1 week") */
  estimate: string
  /** Optional task description */
  description?: string
  /** IDs of tasks that must be completed first */
  dependencies?: string[]
  /** Task category or phase */
  category?: string
}

interface TimeEstimateProps {
  /** List of tasks with estimates */
  tasks: Task[]
  /** Total estimated time */
  totalEstimate?: string
  /** Optional description */
  description?: string
  /** Show dependency arrows */
  showDependencies?: boolean
  className?: string
}

export function TimeEstimate({
  tasks,
  totalEstimate,
  description,
  showDependencies = true,
  className
}: TimeEstimateProps) {
  // Group tasks by category if provided
  const groupedTasks = React.useMemo(() => {
    const groups = new Map<string, Task[]>()

    tasks.forEach(task => {
      const category = task.category || "General"
      if (!groups.has(category)) {
        groups.set(category, [])
      }
      groups.get(category)?.push(task)
    })

    return groups
  }, [tasks])

  // Helper to find task names from IDs
  const getTaskName = (taskId: string) => {
    return tasks.find(t => t.id === taskId)?.name || taskId
  }

  return (
    <Card className={cn("border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-slate-900 dark:text-slate-100">Time Estimate</CardTitle>
            {description && (
              <CardDescription className="mt-1.5 text-slate-600 dark:text-slate-400">
                {description}
              </CardDescription>
            )}
          </div>
          {totalEstimate && (
            <Badge className="bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900">
              Total: {totalEstimate}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from(groupedTasks.entries()).map(([category, categoryTasks]) => (
          <div key={category} className="space-y-3">
            {groupedTasks.size > 1 && (
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                {category}
              </h3>
            )}

            <div className="space-y-2">
              {categoryTasks.map((task) => (
                <div
                  key={task.id}
                  className="group rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">{task.name}</h4>
                      </div>
                      {task.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">{task.description}</p>
                      )}
                      {showDependencies && task.dependencies && task.dependencies.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                          <span className="font-medium">Depends on:</span>
                          {task.dependencies.map((depId) => (
                            <Badge
                              key={depId}
                              variant="outline"
                              className="border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400"
                            >
                              {getTaskName(depId)}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      {task.estimate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
