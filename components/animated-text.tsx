
"use client";
import { motion } from "framer-motion";

export default function AnimatedText({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <motion.span initial="hidden" animate="show" className="inline-block">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { delay: i * 0.03 } } }}
          className="inline-block"
        >
          {l === " " ? " " : l}
        </motion.span>
      ))}
    </motion.span>
  );
}
