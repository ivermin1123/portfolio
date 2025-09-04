"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import { Award, Calendar, MapPin, Rocket, Star, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "@/lib/useTranslations";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  tech: string[];
  recognition: string[];
  impact: string;
  category: "Engineering" | "Leadership" | "Innovation";
}

export default function ExperienceTimeline() {
  const { t } = useTranslations();

  // Get experience data from locales
  const experiences: Experience[] = [
    t("experience.items.employmentHero"),
    t("experience.items.fptSoftware"),
    t("experience.items.favieTech"),
    t("experience.items.designveloper"),
    t("experience.items.trixgo"),
  ];

  const categories = [
    t("experience.categories.all"),
    t("experience.categories.engineering"),
    t("experience.categories.leadership"),
    t("experience.categories.innovation"),
  ] as const;

  return (
    <div className="space-y-8">
      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10 transition-all duration-200 dark:bg-white/5 dark:text-muted-foreground dark:hover:bg-white/10 dark:border-white/10 bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 h-4 w-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg" />

              {/* Content card */}
              <div className="ml-16">
                <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 dark:from-slate-900/50 dark:to-slate-800/50 dark:hover:shadow-purple-500/20 from-white to-gray-50 border-gray-200/60 hover:shadow-lg hover:shadow-gray-200/50">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-500/10 dark:via-purple-500/10 dark:to-pink-500/10 from-blue-500/8 via-purple-500/8 to-pink-500/8"
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />

                  <CardHeader className="relative z-10 pb-4">
                    <div className="space-y-3">
                      {/* Header with category badge */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            <CardTitle className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 dark:text-white text-gray-900 group-hover:from-blue-600 group-hover:to-purple-600">
                              {experience.title}
                            </CardTitle>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 text-sm text-muted-foreground dark:text-muted-foreground text-gray-600"
                          >
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {experience.company}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {experience.period}
                            </div>
                          </motion.div>
                        </div>

                        <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 border-0 text-white shadow-lg">
                          {experience.category}
                        </Badge>
                      </div>

                      {/* Duration and impact */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 text-sm"
                      >
                        <div className="flex items-center gap-1 text-cyan-400 dark:text-cyan-400 text-blue-600">
                          <Rocket className="h-4 w-4" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-1 text-purple-400 dark:text-purple-400 text-purple-600">
                          <TrendingUp className="h-4 w-4" />
                          {experience.impact}
                        </div>
                      </motion.div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-6">
                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-muted-foreground leading-relaxed dark:text-muted-foreground text-gray-700"
                    >
                      {experience.description}
                    </motion.p>

                    {/* Tech stack */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60 dark:text-muted-foreground/60 text-gray-600 font-medium">
                        {t("experience.sections.technologiesUsed")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.tech.map((tech, techIndex) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.7 + techIndex * 0.1 }}
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

                    {/* Achievements */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60 dark:text-muted-foreground/60 text-gray-600 font-medium">
                        {t("experience.sections.keyAchievements")}
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.8 + achievementIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2 text-sm text-muted-foreground dark:text-muted-foreground text-gray-700"
                          >
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 dark:from-cyan-400 dark:to-purple-400 from-blue-500 to-purple-500" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Recognition */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60 flex items-center gap-2 dark:text-muted-foreground/60 text-gray-600 font-medium">
                        <Award className="h-4 w-4" />
                        {t("experience.sections.recognitionAwards")}
                      </h4>
                      <div className="grid gap-2 md:grid-cols-2">
                        {experience.recognition.map((recognition, recognitionIndex) => (
                          <motion.div
                            key={recognitionIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 1 + recognitionIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 rounded-lg bg-white/5 p-3 backdrop-blur-sm dark:bg-white/5 bg-gray-50 border border-gray-200"
                          >
                            <Star className="h-4 w-4 text-yellow-400 dark:text-yellow-400 text-yellow-500" />
                            <span className="text-xs text-muted-foreground dark:text-muted-foreground text-gray-700">
                              {recognition}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                      viewport={{ once: true }}
                      className="flex gap-2 pt-2"
                    >
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg transition-all duration-200 hover:shadow-purple-500/25 hover:scale-105 dark:from-cyan-500 dark:to-purple-500 from-blue-600 to-purple-600 hover:shadow-blue-500/25"
                      >
                        <Link href={`/experience#${experience.id}`}>
                          {t("experience.sections.viewDetails")}
                        </Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:border-white/40 transition-all duration-200"
                      >
                        <Link href="/resume">{t("experience.sections.fullResume")}</Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
