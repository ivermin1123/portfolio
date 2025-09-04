"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [particleData, setParticleData] = useState<
    Array<{
      x: number;
      y: number;
      duration: number;
      delay: number;
      left: string;
      fontSize: string;
      char: string;
    }>
  >([]);
  const [windowHeight, setWindowHeight] = useState(0);

  // Konami code sequence - memoized to prevent recreation on every render
  const konamiCode = useMemo(
    () => [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ],
    [],
  );

  // Secret click pattern (5 clicks within 2 seconds)
  const secretClickPattern = 100;
  const clickTimeWindow = 2000;

  const activateEasterEgg = useCallback(() => {
    setIsActive(true);
    setShowMessage(true);

    // Show message for 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    // Deactivate after 10 seconds
    setTimeout(() => {
      setIsActive(false);
    }, 10000);
  }, []);

  // Initialize client-side data
  useEffect(() => {
    setIsClient(true);
    setWindowHeight(window.innerHeight);

    // Generate particle data only on client
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      left: `${Math.random() * 100}%`,
      fontSize: `${12 + Math.random() * 20}px`,
      char: String.fromCharCode(0x30a0 + Math.random() * 96),
    }));

    setParticleData(particles);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSequence(prev => {
        const newSequence = [...prev, e.code];

        // Keep only the last 10 keys
        if (newSequence.length > 10) {
          newSequence.shift();
        }

        // Check for Konami code
        if (newSequence.join(",") === konamiCode.join(",")) {
          activateEasterEgg();
        }

        return newSequence;
      });
    };

    const handleClick = () => {
      const now = Date.now();

      if (now - lastClickTime < clickTimeWindow) {
        setClickCount(prev => {
          const newCount = prev + 1;

          if (newCount === secretClickPattern) {
            activateEasterEgg();
            return 0;
          }

          return newCount;
        });
      } else {
        setClickCount(1);
      }

      setLastClickTime(now);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [lastClickTime, konamiCode, secretClickPattern, clickTimeWindow, activateEasterEgg]);

  // Don't render until hydrated
  if (!isClient) {
    return null;
  }

  if (!isActive) {
    return null;
  }

  return (
    <AnimatePresence>
      {/* Retro terminal overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono text-sm overflow-hidden"
        style={{ fontFamily: "Courier New, monospace" }}
      >
        {/* Matrix-style falling characters */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient &&
            particleData &&
            particleData.length > 0 &&
            particleData.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute text-green-400/30"
                initial={{ y: -100, x: particle.x }}
                animate={{
                  y: windowHeight + 100,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
                style={{
                  left: particle.left,
                  fontSize: particle.fontSize,
                }}
              >
                {particle.char}
              </motion.div>
            ))}
        </div>

        {/* Terminal content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1"
          >
            <div className="mb-4">
              <span className="text-green-400">$</span>
              <span className="ml-2 text-white">easter_egg --activate</span>
            </div>

            <div className="space-y-2 text-green-400">
              <div>🎉 Easter egg activated!</div>
              <div>🚀 Welcome to the secret terminal</div>
              <div>✨ You&apos;ve unlocked developer mode</div>
              <div>🎭 Enjoy the show for 10 seconds</div>
            </div>

            <div className="mt-8 space-y-2 text-white/60">
              <div>Available commands:</div>
              <div>• konami_code -- The classic sequence</div>
              <div>• click_pattern -- Secret click combination</div>
              <div>• exit -- Return to normal mode</div>
            </div>

            <div className="mt-8">
              <span className="text-green-400">$</span>
              <span className="ml-2 text-white animate-pulse">_</span>
            </div>
          </motion.div>

          {/* Pixel art animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 64 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-green-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Exit button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setIsActive(false)}
          className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Exit Terminal
        </motion.button>
      </motion.div>

      {/* Success message */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] bg-black/90 text-white p-6 rounded-lg border border-green-400 text-center"
        >
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-lg font-bold mb-2">Easter Egg Unlocked!</div>
          <div className="text-sm text-green-400">Welcome to developer mode</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
