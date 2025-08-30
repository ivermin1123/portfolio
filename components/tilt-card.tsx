
"use client";
import { useRef } from "react";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.transform = `rotateX(${(0.5 - py) * 8}deg) rotateY(${(px - 0.5) * 8}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };
  return (
    <div ref={ref} onPointerMove={onPointerMove} onPointerLeave={onLeave} className="transition-transform will-change-transform">
      {children}
    </div>
  );
}
