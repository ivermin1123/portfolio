"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Lazy load components
const MobileDrawer = dynamic(() => import("./MobileDrawer"), { ssr: false });
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [_isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [_activeSection, setActiveSection] = useState("");

  const navbarRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Scroll-aware transforms
  const navbarHeight = useTransform(scrollY, [0, 24], [64, 52]);
  const navbarBlur = useTransform(scrollY, [0, 24], [20, 12]);
  const navbarOpacity = useTransform(scrollY, [0, 24], [1, 0.95]);

  // Lateral shift transforms for spatial anchoring
  const brandShift = useTransform(scrollY, [0, 24], [0, -16]);
  const linksShift = useTransform(scrollY, [0, 24], [0, 12]);
  const ctaShift = useTransform(scrollY, [0, 24], [0, 8]);

  // Scroll direction detection with debouncing
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const threshold = 24;

    if (currentScrollY > threshold) {
      setIsScrolled(true);
      setIsScrollingDown(currentScrollY > lastScrollY);
    } else {
      setIsScrolled(false);
      setIsScrollingDown(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Active section detection
  const updateActiveSection = useCallback(() => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setActiveSection(sectionId || "");
      }
    });
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll listeners
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      handleScroll();
      updateActiveSection();
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    return () => window.removeEventListener("scroll", requestTick);
  }, [handleScroll, updateActiveSection]);

  // Progress bar
  const progressWidth = useTransform(
    scrollY,
    [0, document.body.scrollHeight - window.innerHeight],
    [0, 100],
  );

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to content
      </a>

      {/* Main Navbar */}
      <motion.header
        ref={navbarRef}
        className="sticky top-0 z-50 w-full"
        style={{
          height: navbarHeight,
          backdropFilter: `blur(${navbarBlur}px)`,
          opacity: navbarOpacity,
        }}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background with shimmer effect */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90 border-b border-border/50" />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500",
            isScrolled && "opacity-100",
          )}
        />

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
          style={{ width: `${progressWidth}%` }}
        />

        <div className="container relative flex h-full items-center justify-between">
          {/* Brand Mark - Left shift on scroll */}
          <motion.div
            className="flex items-center"
            style={{ x: brandShift }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="group relative flex items-center gap-2 font-bold text-xl">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-bold text-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                HL
              </motion.div>
              <span className="hidden sm:block gradient-text">Hoang Le</span>
            </Link>
          </motion.div>

          {/* Center Navigation Links - Right shift on scroll */}
          <motion.nav
            className="hidden lg:flex items-center gap-1"
            style={{ x: linksShift }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={pathname === link.href}
                index={index}
              />
            ))}
          </motion.nav>

          {/* Right side utilities and CTA */}
          <motion.div
            className="flex items-center gap-3"
            style={{ x: ctaShift }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Utility cluster */}
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              {/* <LocaleSwitcher /> */}
            </div>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-purple-500/25 transition-all duration-200"
              >
                <Link href="/contact">Hire Me</Link>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden h-9 w-9 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navLinks={navLinks}
            pathname={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// NavLink component with magnetic interactions
function NavLink({
  href,
  label,
  isActive,
  index,
}: {
  href: string;
  label: string;
  isActive: boolean;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.02,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        ref={linkRef}
        href={href}
        className={cn(
          "group relative px-4 py-2 text-sm font-medium transition-colors duration-200",
          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Letter stagger animation */}
        <motion.span className="inline-block">
          {label.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              animate={isHovered ? { y: -2 } : { y: 0 }}
              transition={{
                delay: letterIndex * 0.008,
                duration: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"
            layoutId="activeIndicator"
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 22,
            }}
          />
        )}

        {/* Hover spotlight effect */}
        <motion.div
          className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
}
