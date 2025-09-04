"use client";
import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

interface LoadingAnimationProps {
  onComplete: () => void;
}

export default function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const mountedRef = useRef(true);
  const animationFrameRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep the ref updated with the latest onComplete callback
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Start loading animation
  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const startTime = Date.now();

    // Fallback timeout to ensure completion
    const fallbackTimeout = setTimeout(() => {
      if (mountedRef.current) {
        setLoadingProgress(100);
        setIsComplete(true);
        setTimeout(() => {
          if (mountedRef.current) {
            onCompleteRef.current();
          }
        }, 500);
      }
    }, duration + 1000); // 4 seconds total (3s + 1s buffer)

    const updateProgress = () => {
      if (!mountedRef.current) return;

      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min(elapsed / duration, 1);

      // Simple easing function for more realistic progress
      // Ease out cubic for natural loading feel
      const easedProgress = 1 - Math.pow(1 - timeProgress, 3);
      let progress = easedProgress * 100;

      // Add some deterministic variation to make it feel more realistic
      const variation = Math.sin(elapsed * 0.01) * 0.5; // Deterministic variation
      progress = Math.max(0, Math.min(100, progress + variation));

      setLoadingProgress(progress);

      if (timeProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      } else {
        // Ensure we end at exactly 100%
        setLoadingProgress(100);
        // Small delay before completing
        setTimeout(() => {
          if (mountedRef.current) {
            setIsComplete(true);
            setTimeout(() => {
              if (mountedRef.current) {
                onCompleteRef.current();
              }
            }, 500);
          }
        }, 200);
      }
    };

    // Start the animation immediately
    updateProgress();
    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(fallbackTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Remove handleComplete dependency to prevent re-runs

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

          {/* HL Text */}
          <motion.div
            className="relative z-10 mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                HL
              </span>
            </h1>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 blur-xl -z-10" />
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            className="w-80 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Progress bar container */}
            <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              {/* Progress bar */}
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full"
                style={{
                  width: `${loadingProgress}%`,
                  boxShadow: "0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(147, 51, 234, 0.3)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute top-0 h-full w-6 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
                animate={{
                  x: ["-24px", "320px"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.5,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
