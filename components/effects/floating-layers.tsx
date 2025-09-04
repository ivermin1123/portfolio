"use client";
import { useEffect, useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

export default function FloatingLayers() {
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHydrated, setIsHydrated] = useState(false);

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -600]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  useEffect(() => {
    setIsHydrated(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Don't render until hydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Geometric shapes layer 1 */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/20 rounded-full"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg"
        style={{ y: y1, rotate }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Geometric shapes layer 2 */}
      <motion.div
        className="absolute top-80 left-1/4 w-16 h-16 border border-purple-400/20 transform rotate-45"
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.35, 0.15],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-96 right-1/3 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full"
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Geometric shapes layer 3 */}
      <motion.div
        className="absolute top-[600px] left-20 w-28 h-28 border border-pink-400/20 transform rotate-12"
        style={{ y: y3 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 100 200 Q 300 150 500 200 T 900 200"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          style={{ y: y1 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M 200 400 Q 400 350 600 400 T 1000 400"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          style={{ y: y2 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.path
          d="M 150 600 Q 350 550 550 600 T 950 600"
          stroke="url(#constellationGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
          style={{ y: y3 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse-following element */}
      <motion.div
        className="absolute w-64 h-64 pointer-events-none"
        style={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full border border-cyan-400/10 rounded-full" />
        <div className="absolute inset-4 border border-purple-400/10 rounded-full" />
        <div className="absolute inset-8 border border-pink-400/10 rounded-full" />
      </motion.div>

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        style={{ y: y2 }}
        animate={{
          scale: [1.5, 1, 1.5],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-cyan-400/20 to-purple-400/20 rounded-full"
        style={{ y: y1 }}
      >
        <motion.div
          className="w-full h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"
          animate={{
            y: [0, 96, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
