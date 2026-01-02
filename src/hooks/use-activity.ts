"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface ActivityEvent {
  id: string;
  event_type: string;
  city: string | null;
  country_code: string | null;
  plan: string;
  created_at: string;
}

interface UseActivityReturn {
  events: ActivityEvent[];
  loading: boolean;
  /** Latest event for animation triggers */
  latestEvent: ActivityEvent | null;
}

export function useActivity(limit: number = 5): UseActivityReturn {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestEvent, setLatestEvent] = useState<ActivityEvent | null>(null);

  // Fetch recent activity
  const fetchActivity = useCallback(async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("avolve_activity")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (!error && data) {
      setEvents(data);
    }

    setLoading(false);
  }, [limit]);

  // Subscribe to new activity
  useEffect(() => {
    fetchActivity();

    const supabase = createClient();

    const channel = supabase
      .channel("activity-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "avolve_activity",
        },
        (payload: RealtimePostgresChangesPayload<ActivityEvent>) => {
          const newEvent = payload.new as ActivityEvent;

          setEvents((prev) => [newEvent, ...prev].slice(0, limit));
          setLatestEvent(newEvent);

          // Clear latest after animation duration
          setTimeout(() => setLatestEvent(null), 5000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchActivity, limit]);

  return {
    events,
    loading,
    latestEvent,
  };
}

/**
 * Format activity event for display
 */
export function formatActivityMessage(event: ActivityEvent): string {
  const planLabel = event.plan === "yearly" ? "annual" : "monthly";

  if (event.city && event.country_code) {
    return `Someone from ${event.city} just joined (${planLabel})`;
  }

  if (event.country_code) {
    return `Someone just secured their spot (${planLabel})`;
  }

  return `Someone just joined the journey (${planLabel})`;
}

/**
 * Get relative time string
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);

  if (diffSecs < 60) {
    return "just now";
  }

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }

  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours}h ago`;
}
