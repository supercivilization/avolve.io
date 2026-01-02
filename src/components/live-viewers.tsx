"use client";

import { usePresence } from "@/hooks/use-presence";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

interface LiveViewersProps {
  className?: string;
  page?: string;
}

export function LiveViewers({ className, page = "/" }: LiveViewersProps) {
  const { viewerCount, loading } = usePresence(page);

  // Don't show if only 1 viewer (just self)
  if (loading || viewerCount <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <Eye className="h-3 w-3" />
      <span>
        {viewerCount} {viewerCount === 1 ? "person" : "people"} viewing
      </span>
    </div>
  );
}
