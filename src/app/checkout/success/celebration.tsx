"use client";

import { useEffect } from "react";
import { Confetti, fireCelebration } from "@/components/ui/confetti";

export function SuccessCelebration() {
  useEffect(() => {
    // Fire celebration confetti on mount
    fireCelebration();
  }, []);

  return (
    <Confetti
      className="pointer-events-none fixed inset-0 z-50"
      options={{
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      }}
      manualstart
    />
  );
}
