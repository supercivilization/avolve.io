"use client";

import { useSpots } from "@/hooks/use-spots";
import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

interface SpotsCounterProps {
  className?: string;
  showTotal?: boolean;
}

export function SpotsCounter({
  className,
  showTotal = true,
}: SpotsCounterProps) {
  const { remaining, total, justUpdated } = useSpots();

  return (
    <span
      className={cn(
        "inline-flex items-center transition-all duration-300",
        justUpdated && "scale-110",
        className
      )}
    >
      <NumberTicker
        value={remaining}
        className={cn(
          "font-bold tabular-nums",
          justUpdated && "text-green-500"
        )}
      />
      {showTotal && (
        <span className="text-muted-foreground">/{total}</span>
      )}
    </span>
  );
}

interface SpotsRemainingBadgeProps {
  className?: string;
}

export function SpotsRemainingBadge({ className }: SpotsRemainingBadgeProps) {
  const { remaining, total, justUpdated, loading } = useSpots();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 transition-all duration-500",
        justUpdated && "border-green-500/50 bg-green-500/10 scale-105",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            justUpdated ? "bg-green-400" : "bg-amber-400"
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            justUpdated ? "bg-green-500" : "bg-amber-500"
          )}
        />
      </span>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          justUpdated
            ? "text-green-600 dark:text-green-400"
            : "text-amber-600 dark:text-amber-400"
        )}
      >
        {loading ? (
          "Loading..."
        ) : justUpdated ? (
          <>
            Spot just taken!{" "}
            <NumberTicker value={remaining} className="font-bold" /> left
          </>
        ) : (
          <>
            Only <NumberTicker value={remaining} className="font-bold" /> of{" "}
            {total} spots remaining
          </>
        )}
      </span>
    </div>
  );
}
