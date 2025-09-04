"use client";
import { useState } from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/lib/projects";
import { useTranslations } from "@/lib/useTranslations";


interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslations();
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI":
        return "from-emerald-500 to-teal-500";
      case "Web":
        return "from-blue-500 to-cyan-500";
      case "Tools":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  return (
    <motion.div
      className="group magnetic"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:from-slate-900/50 dark:to-slate-800/50 dark:border-slate-700/50 dark:shadow-slate-900/20 from-white to-gray-50 border-gray-200/60 shadow-sm hover:shadow-lg hover:shadow-gray-200/50">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-pink-500/20 from-blue-500/15 via-purple-500/15 to-pink-500/15" />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-500/10 dark:via-purple-500/10 dark:to-pink-500/10 from-blue-500/8 via-purple-500/8 to-pink-500/8"
          animate={{
            opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 dark:text-white text-gray-900 group-hover:from-blue-600 group-hover:to-purple-600">
                  {t(`projects.${project.title}.title`)}
                </CardTitle>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Badge
                  className={`bg-gradient-to-r ${getCategoryColor(project.category)} border-0 text-white shadow-lg`}
                >
                  {project.category}
                </Badge>
              </motion.div>
            </div>

            {/* Floating action button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <Link href={`/projects/${project.slug}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground leading-relaxed dark:text-muted-foreground text-gray-700"
          >
            {t(`projects.${project.title}.summary`)}
          </motion.p>

          {/* Tech stack with animated icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 dark:text-muted-foreground/60 text-gray-600 font-medium">
              {t("skills.tools")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge className="border-white/20 bg-white/5 text-xs text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30 dark:border-white/20 dark:bg-white/5 dark:text-white/80 border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border-gray-300">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 dark:text-muted-foreground/60 text-gray-600 font-medium">
              {t("common.highlights")}
            </h4>
            <ul className="space-y-1">
              {t(`projects.${project.title}.highlights`).map((highlight: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground text-gray-700"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-400 dark:to-purple-400 from-blue-500 to-purple-500" />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-2 pt-2"
          >
            <Button
              asChild
              size="sm"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg transition-all duration-200 hover:shadow-purple-500/25 hover:scale-105 dark:from-cyan-500 dark:to-purple-500 from-blue-600 to-purple-600 hover:shadow-blue-500/25"
            >
              <Link href={`/projects/${project.slug}`}>{t("common.viewMore")}</Link>
            </Button>

            {project.links?.demo && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 dark:border-white/20 dark:bg-white/5 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}

            {project.links?.repo && (
              <Button
                asChild
                size="sm"
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 dark:border-white/20 dark:bg-white/5 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </motion.div>
        </CardContent>

        {/* Hover overlay effect */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 dark:from-cyan-500/5 dark:via-purple-500/5 dark:to-pink-500/5 from-blue-500/8 via-purple-500/8 to-pink-500/8"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </Card>
    </motion.div>
  );
}
