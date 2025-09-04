"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import { ChevronDown, Code2, Sparkles, Zap } from "lucide-react";

import { AnimatedText, GradientBg, Particles } from "@/components";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/useTranslations";


export default function Hero() {
  const { t } = useTranslations();

  const floatingShapes = [
    { icon: Sparkles, delay: 0, duration: 6 },
    { icon: Zap, delay: 2, duration: 8 },
    { icon: Code2, delay: 4, duration: 7 },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <GradientBg />
      <Particles />

      {/* Floating 3D shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl text-gray-400/40 dark:text-white/10"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            delay: shape.delay,
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 20}%`,
          }}
        >
          <shape.icon />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="container relative z-10 text-center"
      >
        {/* Main title with staggered animation */}
        <motion.h1
          className="text-6xl font-black leading-tight tracking-tight md:text-8xl lg:text-9xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="gradient-text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            {t("hero.name")}
          </motion.span>
        </motion.h1>

        {/* Role and tagline with staggered motion */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl text-gray-700 md:text-2xl dark:text-gray-300">
            <AnimatedText text={t("hero.title")} />
          </p>
        </motion.div>

        {/* Subtitle with animated highlights */}
        <motion.p
          className="mt-4 text-lg text-gray-600 md:text-xl dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {t("hero.subtitle")}{" "}
          <span className="text-cyan-500 dark:text-cyan-400 text-blue-600">
            {t("hero.immersive")}
          </span>
          {" with "}
          <span className="text-purple-500 dark:text-purple-400 text-purple-600">
            {t("hero.motion")}
          </span>
          {" and "}
          <span className="text-pink-500 dark:text-pink-400 text-pink-600">{t("hero.modern")}</span>
        </motion.p>

        {/* CTA buttons with staggered animation */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 dark:from-cyan-500 dark:to-purple-500 from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-purple-500/25 transition-all duration-200"
            >
              <Link href="#projects" className="flex items-center gap-2">
                <span>{t("hero.viewProjects")}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/20 dark:to-purple-500/20 from-blue-500/20 to-purple-500/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:border-white/40 transition-all duration-200"
            >
              <Link href="/resume" className="flex items-center gap-2">
                <span>{t("hero.resume")}</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with enhanced animation */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span>{t("hero.scrollToExplore")}</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>

          {/* Animated dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="h-1 w-1 rounded-full bg-current"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-3xl dark:from-cyan-500/20 dark:to-purple-500/20 from-blue-500/20 to-purple-500/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-20 -bottom-20 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl dark:from-pink-500/20 dark:to-purple-500/20 from-pink-500/20 to-purple-500/20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
