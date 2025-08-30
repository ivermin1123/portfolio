
"use client";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animated-text";
import GradientBg from "@/components/gradient-bg";
import Particles from "@/components/particles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden">
      <GradientBg />
      <Particles />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container text-center"
      >
        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
          <span className="gradient-text">Hoang Le</span>
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          <AnimatedText text="Senior Frontend Engineer — React, Next.js, TypeScript" />
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild><Link href="#projects">View Projects</Link></Button>
          <Button asChild variant="outline"><Link href="/resume">Resume</Link></Button>
        </div>
        <div className="mt-12 animate-bounce text-sm text-muted-foreground">Scroll to explore ↓</div>
      </motion.div>
    </div>
  );
}
