
import React from "react";

export function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <span className="relative inline-block group">
      {children}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}
