
"use client";
import { useEffect, useRef } from "react";

export default function MagneticCursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const speed = 0.18;
    const raf = () => {
      x += (tx - x) * speed;
      y += (ty - y) * speed;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(raf);
    };
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    requestAnimationFrame(raf);
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div className="pointer-events-none fixed z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60 shadow-[0_0_30px] shadow-primary/40" ref={dot} />;
}
