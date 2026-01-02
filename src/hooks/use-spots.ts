"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface SpotsData {
  id: string;
  total_spots: number;
  spots_taken: number;
  updated_at: string;
}

interface UseSpotsReturn {
  total: number;
  taken: number;
  remaining: number;
  loading: boolean;
  error: Error | null;
  /** True when a real-time update just occurred (for animation triggers) */
  justUpdated: boolean;
}

export function useSpots(): UseSpotsReturn {
  const [data, setData] = useState<SpotsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [justUpdated, setJustUpdated] = useState(false);

  // Fetch initial data
  const fetchSpots = useCallback(async () => {
    const supabase = createClient();

    const { data: spots, error: fetchError } = await supabase
      .from("avolve_spots")
      .select("*")
      .single();

    if (fetchError) {
      // If table doesn't exist yet, use fallback
      if (fetchError.code === "PGRST116" || fetchError.code === "42P01") {
        setData({
          id: "fallback",
          total_spots: 365,
          spots_taken: 4,
          updated_at: new Date().toISOString(),
        });
      } else {
        setError(new Error(fetchError.message));
      }
    } else {
      setData(spots);
    }

    setLoading(false);
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    fetchSpots();

    const supabase = createClient();

    const channel = supabase
      .channel("spots-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "avolve_spots",
        },
        (payload: RealtimePostgresChangesPayload<SpotsData>) => {
          const newData = payload.new as SpotsData;
          setData(newData);

          // Trigger animation flag
          setJustUpdated(true);
          setTimeout(() => setJustUpdated(false), 2000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSpots]);

  return {
    total: data?.total_spots ?? 365,
    taken: data?.spots_taken ?? 4,
    remaining: (data?.total_spots ?? 365) - (data?.spots_taken ?? 4),
    loading,
    error,
    justUpdated,
  };
}
