"use client";

import { useEffect, useState } from "react";

export function useCountdown(hoursFromNow = 9) {
  const duration = hoursFromNow * 60 * 60 * 1000;
  const [target] = useState(() => Date.now() + duration);
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const total = Math.floor(remaining / 1000);
  return {
    hours: String(Math.floor(total / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
    seconds: String(total % 60).padStart(2, "0")
  };
}
