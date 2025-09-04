"use client";

import { useEffect } from "react";

export function AnalyticsScript() {
  useEffect(() => {
    // Check if we're in production and on Vercel
    const isProduction = process.env.NODE_ENV === "production";
    const isVercel = process.env.VERCEL === "1";

    if (isProduction && isVercel) {
      // Try to load the Vercel analytics script
      const script = document.createElement("script");
      script.src = "/_vercel/insights/script.js";
      script.async = true;
      script.onerror = () => {
        // Silently handle analytics script loading failure
        // This is expected if Web Analytics is not enabled in Vercel project settings
      };
      script.onload = () => {
        // Analytics script loaded successfully
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup script on unmount
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  return null;
}
