"use client";

import { useSpots } from "@/hooks/use-spots";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SpotsMeterProps {
  className?: string;
  showLabels?: boolean;
}

export function SpotsMeter({ className, showLabels = true }: SpotsMeterProps) {
  const { remaining, total, taken, justUpdated } = useSpots();
  const percentageTaken = (taken / total) * 100;
  const percentageRemaining = 100 - percentageTaken;

  // Urgency thresholds
  const isUrgent = remaining < 50;
  const isCritical = remaining < 20;

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {taken} spots claimed
          </span>
          <span
            className={cn(
              "font-medium",
              isCritical
                ? "text-red-500"
                : isUrgent
                  ? "text-amber-500"
                  : "text-green-500"
            )}
          >
            {remaining} remaining
          </span>
        </div>
      )}

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        {/* Taken portion */}
        <motion.div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full",
            isCritical
              ? "bg-gradient-to-r from-red-500 to-red-400"
              : isUrgent
                ? "bg-gradient-to-r from-amber-500 to-amber-400"
                : "bg-gradient-to-r from-primary to-primary/80"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentageTaken}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Pulse effect when spot is taken */}
        {justUpdated && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/30"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Remaining portion indicator */}
        <motion.div
          className={cn(
            "absolute right-0 top-0 h-full",
            isUrgent && "animate-pulse"
          )}
          style={{ width: `${percentageRemaining}%` }}
        />
      </div>

      {/* Urgency message */}
      {isUrgent && (
        <motion.p
          className={cn(
            "mt-2 text-center text-xs font-medium",
            isCritical ? "text-red-500" : "text-amber-500"
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCritical
            ? "🔥 Almost sold out!"
            : "⚡ Filling up fast!"}
        </motion.p>
      )}
    </div>
  );
}
