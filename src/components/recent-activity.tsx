"use client";

import { useActivity, formatActivityMessage, getRelativeTime } from "@/hooks/use-activity";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface RecentActivityProps {
  className?: string;
  limit?: number;
}

export function RecentActivity({ className, limit = 3 }: RecentActivityProps) {
  const { events, loading, latestEvent } = useActivity(limit);

  if (loading || events.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <AnimatePresence mode="popLayout">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            layout
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
            }}
            className={cn(
              "flex items-center gap-2 rounded-lg border border-border/50 bg-background/80 px-4 py-2 text-sm backdrop-blur-sm",
              latestEvent?.id === event.id &&
                "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/20"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                latestEvent?.id === event.id
                  ? "bg-green-500/10 text-green-500"
                  : "bg-primary/10 text-primary"
              )}
            >
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="flex-1 text-foreground">
              {formatActivityMessage(event)}
            </span>
            <span className="text-xs text-muted-foreground">
              {getRelativeTime(event.created_at)}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Compact toast-style activity notification
 * Shows briefly when someone purchases
 */
export function ActivityToast() {
  const { latestEvent } = useActivity(1);

  return (
    <AnimatePresence>
      {latestEvent && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl border border-green-500/30 bg-background/95 px-4 py-3 shadow-lg backdrop-blur-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
            <Sparkles className="h-4 w-4 text-green-500" />
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">
              {formatActivityMessage(latestEvent)}
            </p>
            <p className="text-xs text-muted-foreground">
              {getRelativeTime(latestEvent.created_at)}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
