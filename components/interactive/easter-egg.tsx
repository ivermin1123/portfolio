"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

export default function EasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [_sequence, setSequence] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [_clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // Use ref to store stable particle data that never changes
  const particleDataRef = useRef<
    Array<{
      id: string;
      x: number;
      y: number;
      duration: number;
      delay: number;
      left: string;
      fontSize: string;
      char: string;
      opacity: number;
      color: string;
    }>
  >([]);

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

  // Secret click pattern (10 clicks within 2 seconds)
  const secretClickPattern = 10;
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

  // Generate cyberpunk particle data (binary rain, glitch effects) - only once
  const cyberpunkParticleData = useMemo(() => {
    if (particleDataRef.current.length === 0) {
      // Use deterministic positioning to avoid hydration issues
      const seededRandom = (seed: number) => {
        // Simple deterministic pseudo-random using modulo
        return ((seed * 9301 + 49297) % 233280) / 233280;
      };

      let currentSeed = 12345;
      particleDataRef.current = Array.from({ length: 80 }, (_, index) => {
        currentSeed++;
        return {
          id: `cyber-particle-${index}`, // Simple, stable ID
          x: seededRandom(currentSeed++) * 100,
          y: seededRandom(currentSeed++) * 100,
          duration: 2 + seededRandom(currentSeed++) * 3,
          delay: seededRandom(currentSeed++) * 2,
          left: `${seededRandom(currentSeed++) * 100}%`,
          fontSize: `${10 + seededRandom(currentSeed++) * 16}px`,
          char:
            seededRandom(currentSeed++) > 0.5
              ? String.fromCharCode(0x0030 + Math.floor(seededRandom(currentSeed++) * 2)) // 0 or 1
              : String.fromCharCode(0x0041 + Math.floor(seededRandom(currentSeed++) * 26)), // A-Z
          opacity: 0.3 + seededRandom(currentSeed++) * 0.7,
          color: seededRandom(currentSeed++) > 0.7 ? "#00ff41" : "#00ffff", // Green or cyan
        };
      });
    }
    return particleDataRef.current;
  }, []);

  // Initialize client-side data
  useEffect(() => {
    setIsClient(true);
    setWindowHeight(window.innerHeight);
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
      {/* Cyberpunk Hacker Terminal */}
      <motion.div
        key="cyberpunk-terminal-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black overflow-hidden"
        style={{
          background: "linear-gradient(45deg, #000000 0%, #001122 50%, #000000 100%)",
          fontFamily: "JetBrains Mono, Consolas, monospace",
        }}
      >
        {/* Cyberpunk scanlines effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-pulse"></div>
        </div>

        {/* Binary rain and glitch effects */}
        <div className="absolute inset-0 overflow-hidden">
          {isClient &&
            cyberpunkParticleData &&
            cyberpunkParticleData.length > 0 &&
            cyberpunkParticleData.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute font-mono font-bold"
                initial={{ y: -100, x: particle.x, opacity: 0 }}
                animate={{
                  y: windowHeight + 100,
                  opacity: [0, particle.opacity, 0],
                  scale: [0.8, 1.2, 0.8],
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
                  color: particle.color,
                  textShadow: `0 0 10px ${particle.color}`,
                }}
              >
                {particle.char}
              </motion.div>
            ))}
        </div>

        {/* Glitch overlay effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0, 0.1, 0],
            x: [0, -2, 2, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20"></div>
        </motion.div>

        {/* Cyberpunk Terminal Interface */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Hacker Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-4 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <span className="text-cyan-400 font-bold text-lg ml-4">NEURAL_INTERFACE.exe</span>
            </div>
            <div className="text-cyan-300 text-sm">[SYSTEM] HACKER MODE ACTIVATED</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex-1"
          >
            {/* Terminal Commands */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="text-red-400 font-bold mr-2">root@cyberpunk:~$</span>
                <span className="text-white">./neural_interface --activate</span>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-2 text-green-400 ml-4"
              >
                <div>⚡ NEURAL LINK ESTABLISHED</div>
                <div>🔓 SECURITY PROTOCOLS BYPASSED</div>
                <div>🌐 ACCESSING DARK WEB...</div>
                <div>💀 WELCOME TO THE MATRIX</div>
              </motion.div>
            </div>

            {/* Hacking Simulation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="bg-black/50 border border-cyan-500/30 rounded-lg p-4 mb-6"
            >
              <div className="text-cyan-400 font-bold mb-3">[HACKING SIMULATION]</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-red-400 w-32">TARGET:</span>
                  <span className="text-white">corporate_mainframe.exe</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 w-32">STATUS:</span>
                  <span className="text-green-400">BREACHING...</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-400 w-32">PROGRESS:</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-2 ml-2">
                    <motion.div
                      className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, delay: 2 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Available Commands */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="space-y-2 text-white/70"
            >
              <div className="text-cyan-400 font-bold">Available Commands:</div>
              <div className="ml-4 space-y-1">
                <div>
                  • <span className="text-red-400">konami_code</span> -- Classic sequence
                </div>
                <div>
                  • <span className="text-yellow-400">click_pattern</span> -- Secret combination
                </div>
                <div>
                  • <span className="text-green-400">neural_boost</span> -- Enhance performance
                </div>
                <div>
                  • <span className="text-blue-400">exit</span> -- Return to reality
                </div>
              </div>
            </motion.div>

            {/* Terminal Prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-8 flex items-center"
            >
              <span className="text-red-400 font-bold">root@cyberpunk:~$</span>
              <motion.span
                className="ml-2 text-white"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Cyberpunk Hologram Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Hologram Grid */}
              <div className="grid grid-cols-8 gap-1 p-4 border border-cyan-500/50 rounded-lg bg-black/30">
                {Array.from({ length: 64 }, (_, i) => i).map(i => (
                  <motion.div
                    key={`hologram-${i}`}
                    className="w-3 h-3"
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [0.8, 1.3, 0.8],
                      boxShadow: [
                        "0 0 5px #00ffff",
                        "0 0 20px #00ffff, 0 0 30px #00ffff",
                        "0 0 5px #00ffff",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.05,
                      ease: "easeInOut",
                    }}
                    style={{
                      background: i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#ff0080" : "#00ff41",
                    }}
                  />
                ))}
              </div>

              {/* Hologram Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-400 text-xs font-mono"
              >
                NEURAL_MATRIX.exe
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Cyberpunk Exit Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setIsActive(false)}
          className="absolute top-4 right-4 px-6 py-3 bg-black/80 border border-red-500 text-red-400 font-mono font-bold rounded-lg hover:bg-red-500/20 hover:border-red-400 hover:text-red-300 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
          style={{
            boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)",
          }}
        >
          <span className="flex items-center space-x-2">
            <span>EXIT</span>
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.span>
          </span>
        </motion.button>
      </motion.div>

      {/* Cyberpunk Success Message */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] bg-black/95 text-white p-8 rounded-xl border-2 border-cyan-500 text-center font-mono shadow-2xl"
          style={{
            boxShadow: "0 0 50px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl mb-4"
          >
            ⚡
          </motion.div>
          <div className="text-xl font-bold mb-3 text-cyan-400">NEURAL LINK ESTABLISHED</div>
          <div className="text-sm text-green-400 mb-2">HACKER MODE ACTIVATED</div>
          <div className="text-xs text-white/70">Welcome to the cyberpunk matrix</div>

          {/* Glitch effect overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.1, 0],
              x: [0, -1, 1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
