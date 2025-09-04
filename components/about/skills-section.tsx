"use client";
import { useState } from "react";

import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  FileCode,
  GitBranch,
  Package,
  Palette,
  TestTube,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";


interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  category: "Frontend" | "Testing" | "DevOps" | "Design" | "Backend";
  description: string;
  color: string;
}

const skills: Skill[] = [
  {
    name: "React",
    icon: Code2,
    value: 95,
    category: "Frontend",
    description: "My second language 🌐",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Next.js",
    icon: FileCode,
    value: 92,
    category: "Frontend",
    description: "App router master 🚀",
    color: "from-black to-gray-700",
  },
  {
    name: "TypeScript",
    icon: GitBranch,
    value: 90,
    category: "Frontend",
    description: "Type safety first 🛡️",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "Tailwind CSS",
    icon: Code2,
    value: 88,
    category: "Frontend",
    description: "Utility-first CSS 🎨",
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Jest & Testing",
    icon: TestTube,
    value: 85,
    category: "Testing",
    description: "Quality assurance 🧪",
    color: "from-red-500 to-pink-500",
  },
  {
    name: "Git & CI/CD",
    icon: GitBranch,
    value: 88,
    category: "DevOps",
    description: "Version control pro 📝",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Docker",
    icon: Package,
    value: 75,
    category: "DevOps",
    description: "Containerization 🐳",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Figma",
    icon: Palette,
    value: 80,
    category: "Design",
    description: "Design collaboration 🎭",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Node.js",
    icon: GitBranch,
    value: 70,
    category: "Backend",
    description: "Server-side basics ⚡",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Databases",
    icon: Database,
    value: 65,
    category: "Backend",
    description: "Data persistence 💾",
    color: "from-blue-600 to-indigo-600",
  },
  {
    name: "Cloud Services",
    icon: Cloud,
    value: 70,
    category: "DevOps",
    description: "AWS & Vercel ☁️",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Performance",
    icon: Zap,
    value: 90,
    category: "Frontend",
    description: "Speed optimization ⚡",
    color: "from-yellow-400 to-orange-500",
  },
];

const categories = ["All", "Frontend", "Testing", "DevOps", "Design", "Backend"] as const;

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 dark:from-cyan-500 dark:to-purple-500 dark:shadow-purple-500/25"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:bg-white/5 dark:text-muted-foreground dark:border-white/10 dark:hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            className="group relative"
          >
            <div className="relative rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:border-gray-200 dark:bg-slate-900/50 dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-purple-500/20 dark:shadow-slate-900/20">
              {/* Skill header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`rounded-xl bg-gradient-to-r ${skill.color} p-3 text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <skill.icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg dark:text-white">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-muted-foreground font-medium">
                      {skill.category}
                    </p>
                  </div>
                </div>

                {/* Percentage badge */}
                <Badge
                  className={`bg-gradient-to-r ${skill.color} border-0 text-white font-bold text-sm px-3 py-1`}
                >
                  {skill.value}%
                </Badge>
              </div>

              {/* Progress bar */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Expertise Level
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">{skill.value}%</span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-sm`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-muted-foreground font-medium">
                {skill.description}
              </p>

              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 dark:from-cyan-500/5 dark:via-purple-500/5 dark:to-pink-500/5"
                animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-10 shadow-lg dark:bg-slate-900/50 dark:border-white/10 dark:from-slate-900/50 dark:to-slate-800/50"
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {skills.length}
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-muted-foreground font-medium">
              Technologies
            </p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {Math.round(skills.reduce((acc, skill) => acc + skill.value, 0) / skills.length)}
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-muted-foreground font-medium">
              Average Proficiency
            </p>
          </div>
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {skills.filter(skill => skill.value >= 90).length}
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-muted-foreground font-medium">
              Expert Level
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
