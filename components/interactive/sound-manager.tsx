"use client";
import { useEffect, useRef, useState } from "react";

interface SoundManagerProps {
  stage: "anticipation" | "curtain" | "signature" | "handoff" | "done";
}

export default function SoundManager({ stage }: SoundManagerProps) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const wooshAudioRef = useRef<HTMLAudioElement | null>(null);
  const chimeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Check localStorage for sound preference
  useEffect(() => {
    try {
      const savedPreference = localStorage.getItem("portfolio-sound-enabled");
      if (savedPreference !== null) {
        setIsSoundEnabled(savedPreference === "true");
      }
    } catch (error) {
      // Silently fail for localStorage issues (privacy modes, etc.)
      if (process.env.NODE_ENV === "development") {
        console.warn("Could not access localStorage:", error);
      }
    }
  }, []);

  // Save sound preference to localStorage
  const toggleSound = () => {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    setHasInteracted(true);

    try {
      localStorage.setItem("portfolio-sound-enabled", newValue.toString());
    } catch (error) {
      // Silently fail for localStorage issues (privacy modes, quota exceeded, etc.)
      if (process.env.NODE_ENV === "development") {
        console.warn("Could not save to localStorage:", error);
      }
    }
  };

  // Create audio elements
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Create audio elements with error handling
        const createAudio = (src: string) => {
          try {
            const audio = new Audio(src);
            audio.preload = "auto";
            return audio;
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn(`Could not create audio element for ${src}:`, error);
            }
            return null;
          }
        };

        introAudioRef.current = createAudio("/intro-sound.mp3");
        wooshAudioRef.current = createAudio("/swoosh-sound.mp3");
        chimeAudioRef.current = createAudio("/success-bel.mp3");

        // Set audio properties safely
        [introAudioRef.current, wooshAudioRef.current, chimeAudioRef.current].forEach(
          (audio, index) => {
            if (audio) {
              try {
                audio.volume = index === 2 ? 0.4 : 0.3; // Chime is louder
              } catch (error) {
                if (process.env.NODE_ENV === "development") {
                  console.warn("Could not set audio volume:", error);
                }
              }
            }
          },
        );
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Could not create audio elements:", error);
        }
      }
    }

    return () => {
      // Cleanup audio elements safely
      [introAudioRef.current, wooshAudioRef.current, chimeAudioRef.current].forEach(audio => {
        if (audio) {
          try {
            audio.pause();
            audio.src = "";
          } catch (error) {
            // Silently fail during cleanup
          }
        }
      });
      introAudioRef.current = null;
      wooshAudioRef.current = null;
      chimeAudioRef.current = null;
    };
  }, []);

  // Auto-enable interaction when sound is enabled and animation starts
  useEffect(() => {
    if (isSoundEnabled && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [isSoundEnabled, hasInteracted]);

  // Also enable interaction when animation starts (for cases where sound is already enabled)
  useEffect(() => {
    if (stage === "anticipation" && isSoundEnabled && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [stage, isSoundEnabled, hasInteracted]);

  // Play sounds based on stage
  useEffect(() => {
    if (!isSoundEnabled || !hasInteracted) return;

    const playSound = async (audioRef: React.RefObject<HTMLAudioElement>, soundType: string) => {
      if (!audioRef.current) return;

      try {
        // Reset audio to beginning
        audioRef.current.currentTime = 0;
        // Play sound file
        await audioRef.current.play();
      } catch (error) {
        // Silently fail for audio playback issues (user interaction required, codec issues, etc.)
        if (process.env.NODE_ENV === "development") {
          console.warn(`Audio playback failed for ${soundType}:`, error);
        }
      }
    };

    // Stage-based sound triggers with proper timing
    if (stage === "anticipation") {
      // Play intro sound at the beginning of the animation
      setTimeout(() => playSound(introAudioRef, "intro"), 100);
    } else if (stage === "curtain") {
      // Play woosh sound when curtain stage begins (Scene B)
      setTimeout(() => playSound(wooshAudioRef, "woosh"), 100);
    } else if (stage === "signature") {
      // Play chime when HL initials appear (Scene C)
      setTimeout(() => playSound(chimeAudioRef, "chime"), 200);
    }
  }, [stage, isSoundEnabled, hasInteracted]);

  // Handle user interaction for iOS compatibility
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="absolute bottom-8 right-8 z-20">
      <button
        onClick={() => {
          toggleSound();
          handleInteraction();
        }}
        className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-white/70 hover:text-white transition-all duration-200 rounded-xl bg-slate-800/60 hover:bg-slate-700/70 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-lg hover:shadow-xl"
        aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
      >
        <div className="w-5 h-5">
          {isSoundEnabled ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          )}
        </div>
        <span className="hidden sm:inline">{isSoundEnabled ? "Sound On" : "Sound Off"}</span>
      </button>
    </div>
  );
}
