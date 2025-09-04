"use client";
import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          setIsVisible(true);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Only show cursor on desktop
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Magnetic cursor dot */}
      <div className="w-2 h-2 bg-white rounded-full shadow-lg" />

      {/* Magnetic influence ring */}
      <div
        className="absolute inset-0 w-16 h-16 border border-white/20 rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "all 0.1s ease-out",
        }}
      />
    </div>
  );
}
