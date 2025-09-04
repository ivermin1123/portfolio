"use client";

import { useEffect, useState } from "react";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { AnalyticsScript } from "./analytics-script";

export function VercelAnalytics() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render analytics on client side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <>
      <AnalyticsScript />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
