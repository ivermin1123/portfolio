"use client";
import { useEffect } from "react";

import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Command, Mail, Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
  pathname: string;
}

export default function MobileDrawer({ isOpen, onClose, navLinks, pathname }: MobileDrawerProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative h-full w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                <h2 className="text-lg font-semibold text-foreground">Menu</h2>
                <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="px-6 py-4">
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.06,
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`group flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                          pathname === link.href
                            ? "bg-accent/10 text-accent-foreground border border-accent/20"
                            : "text-foreground hover:bg-accent/5 hover:text-accent-foreground"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Search Section */}
              <div className="px-6 py-4 border-t border-border/50">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12 text-left"
                    onClick={() => {
                      onClose();
                      // TODO: Open command palette
                    }}
                  >
                    <Search className="h-4 w-4" />
                    <span className="text-sm">Search...</span>
                    <Badge className="ml-auto text-xs bg-cyan-500 text-white border-0">⌘K</Badge>
                  </Button>
                </motion.div>
              </div>

              {/* CTA Section */}
              <div className="px-6 py-4 border-t border-border/50">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-purple-500/25"
                  >
                    <Link href="/contact" onClick={onClose}>
                      <Mail className="h-4 w-4 mr-2" />
                      Hire Me
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-border/50">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="text-center text-xs text-muted-foreground"
                >
                  <p>Press ESC to close</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
