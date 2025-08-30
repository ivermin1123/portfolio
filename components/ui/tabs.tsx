
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Tab = { value: string; label: string };
export function Tabs({
  tabs,
  value,
  onValueChange
}: {
  tabs: Tab[];
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex w-full gap-2 rounded-lg border p-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onValueChange(t.value)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-sm transition",
              value === t.value ? "bg-primary text-primary-foreground" : "hover:bg-accent/10"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
