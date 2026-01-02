"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface UsePresenceReturn {
  viewerCount: number;
  loading: boolean;
}

// Generate a stable session ID for this browser tab
function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("avolve_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("avolve_session_id", sessionId);
  }
  return sessionId;
}

export function usePresence(page: string = "/"): UsePresenceReturn {
  const [viewerCount, setViewerCount] = useState(1); // Start with 1 (self)
  const [loading, setLoading] = useState(true);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string>("");

  // Register presence and fetch count
  const updatePresence = useCallback(async () => {
    const supabase = createClient();
    const sessionId = sessionIdRef.current;

    if (!sessionId) return;

    try {
      // Upsert our presence (insert or update last_seen_at)
      await supabase.from("avolve_presence").upsert(
        {
          session_id: sessionId,
          page,
          last_seen_at: new Date().toISOString(),
        },
        {
          onConflict: "session_id,page",
        }
      );

      // Get count of active viewers
      const { count, error } = await supabase
        .from("avolve_presence")
        .select("*", { count: "exact", head: true })
        .eq("page", page)
        .gte(
          "last_seen_at",
          new Date(Date.now() - 5 * 60 * 1000).toISOString()
        );

      if (!error && count !== null) {
        setViewerCount(Math.max(1, count));
      }
    } catch {
      // Silently fail - presence is non-critical
    }

    setLoading(false);
  }, [page]);

  // Cleanup presence on unmount
  const removePresence = useCallback(async () => {
    const supabase = createClient();
    const sessionId = sessionIdRef.current;

    if (!sessionId) return;

    try {
      await supabase
        .from("avolve_presence")
        .delete()
        .eq("session_id", sessionId)
        .eq("page", page);
    } catch {
      // Silently fail
    }
  }, [page]);

  useEffect(() => {
    // Get session ID on mount
    sessionIdRef.current = getSessionId();

    // Initial presence update
    updatePresence();

    // Heartbeat every 30 seconds
    heartbeatRef.current = setInterval(updatePresence, 30000);

    // Cleanup on unmount or page change
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      removePresence();
    };
  }, [updatePresence, removePresence]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        updatePresence();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [updatePresence]);

  return {
    viewerCount,
    loading,
  };
}
