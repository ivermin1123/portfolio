"use client";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";

import { Footer, LoadingAnimation, LocaleProvider, Navbar } from "@/components";

import { ErrorBoundary } from "./error-boundary";

// Lazy load heavy components for better performance
const LazyEasterEgg = lazy(() => import("@/components/interactive/easter-egg"));
const LazyFloatingLayers = lazy(() => import("@/components/effects/floating-layers"));
const LazyMagneticCursor = lazy(() => import("@/components/interactive/magnetic-cursor"));

interface ClientLayoutProps {
  children: React.ReactNode;
}

interface AppState {
  isLoading: boolean;
  hasError: boolean;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [appState, setAppState] = useState<AppState>({
    isLoading: true,
    hasError: false,
  });

  // Initialize app state
  useEffect(() => {
    const initializeApp = () => {
      try {
        // Debug logging
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log("ClientLayout: App state initialized, isLoading: true");
        }
      } catch (error) {
        // Fallback initialization
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.warn("Failed to initialize app state:", error);
        }

        setAppState(prev => ({
          ...prev,
          hasError: true,
        }));
      }
    };

    initializeApp();
  }, []);

  // Handle loading completion
  const handleLoadingComplete = useCallback(() => {
    // Save loading completion state
    try {
      const savedState = {
        lastLoadTime: Date.now(),
        version: "1.0.0",
      };
      localStorage.setItem("portfolio-app-state", JSON.stringify(savedState));
    } catch (error) {
      // Silently fail for localStorage issues
    }

    // Dispatch analytics events
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("app:loaded", {
          detail: {
            loadTime: Date.now(),
          },
        }),
      );
    }

    // Update state to hide loading
    setAppState(prev => ({
      ...prev,
      isLoading: false,
    }));
  }, []);

  // Handle errors
  const handleError = useCallback((error: Error) => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("ClientLayout error:", error);
    }

    // Dispatch error analytics
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("app:error", {
          detail: {
            error: error.message,
            stack: error.stack,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
          },
        }),
      );
    }

    setAppState(prev => ({
      ...prev,
      hasError: true,
      isLoading: false,
    }));
  }, []);

  // Cleanup event listeners
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Save final state before page unload
      try {
        const finalState = {
          lastLoadTime: Date.now(),
          version: "1.0.0",
          unloadTime: Date.now(),
        };
        localStorage.setItem("portfolio-app-state", JSON.stringify(finalState));
      } catch (error) {
        // Silently fail
      }
    };

    const handleForceRender = () => {
      // Force a re-render when animation completes
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("ClientLayout: Force render event received");
      }
      setAppState(prev => ({ ...prev }));
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("force-app-render", handleForceRender);

    return () => {
      // Remove event listeners
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("force-app-render", handleForceRender);
    };
  }, []);

  // Error boundary fallback
  if (appState.hasError) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-slate-900 text-white"
        role="alert"
        aria-live="polite"
      >
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-slate-400 mb-6">
            We encountered an error while loading the application.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Reload the page to try again"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading animation
  if (appState.isLoading) {
    return (
      <div className="fixed inset-0 z-50">
        <LoadingAnimation onComplete={handleLoadingComplete} />
      </div>
    );
  }

  // Main application layout
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("Application error:", error, errorInfo);
        }
      }}
    >
      <LocaleProvider>
        <Suspense fallback={<div className="hidden" aria-hidden="true" />}>
          <LazyFloatingLayers />
        </Suspense>
        <Suspense fallback={<div className="hidden" aria-hidden="true" />}>
          <LazyMagneticCursor />
        </Suspense>
        <Suspense fallback={<div className="hidden" aria-hidden="true" />}>
          <LazyEasterEgg />
        </Suspense>
        <Navbar />
        <main id="main-content" className="min-h-screen" role="main" aria-label="Main content">
          {children}
        </main>
        <Footer />
      </LocaleProvider>
    </ErrorBoundary>
  );
}
