
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Dialog({
  open,
  onOpenChange,
  children
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => onOpenChange(false)}
        >
          <div
            className={cn("w-full max-w-3xl rounded-2xl border bg-background p-4 shadow-xl")}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
