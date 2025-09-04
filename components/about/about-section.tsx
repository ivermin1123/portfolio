"use client";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { Code, Coffee, Heart, Music, Palette, Rocket, Sparkles, Star, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/lib/useTranslations";


export default function AboutSection() {
  const { t } = useTranslations();

  const interests = [
    { icon: Coffee, label: t("about.interests.coffee"), color: "from-orange-500 to-red-500" },
    { icon: Music, label: t("about.interests.music"), color: "from-purple-500 to-pink-500" },
    { icon: Code, label: t("about.interests.opensource"), color: "from-green-500 to-emerald-500" },
    { icon: Palette, label: t("about.interests.design"), color: "from-blue-500 to-cyan-500" },
    {
      icon: Rocket,
      label: t("about.interests.technology"),
      color: "from-indigo-500 to-purple-500",
    },
    { icon: Heart, label: t("about.interests.ux"), color: "from-pink-500 to-rose-500" },
  ];

  const funFacts = [
    t("about.funFacts.debugging"),
    t("about.funFacts.codeStyle"),
    t("about.funFacts.problemSolving"),
    t("about.funFacts.react"),
    t("about.funFacts.languages"),
  ];

  return (
    <div className="space-y-16">
      {/* Main content */}
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Animated portrait */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-gray-200 shadow-lg dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 dark:border-white/20">
            {/* Real avatar image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/avatar.jpg"
                  alt="Hoang Le - Senior Frontend Developer"
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
              </motion.div>
            </div>

            {/* Floating elements around portrait */}
            {[0, 1, 2, 3].map(i => {
              const IconComponent = [Sparkles, Zap, Star, Heart][i];
              return (
                <motion.div
                  key={i}
                  className="absolute text-2xl text-gray-500 dark:text-white/80"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${30 + i * 20}%`,
                  }}
                >
                  {IconComponent && <IconComponent />}
                </motion.div>
              );
            })}

            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-pink-500/20"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -right-4 -top-4"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white shadow-lg px-4 py-2 text-sm font-bold dark:from-cyan-500 dark:to-purple-500 dark:shadow-cyan-500/25">
              {t("about.availableForHire")}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white"
            >
              {t("about.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 leading-relaxed dark:text-gray-300"
            >
              {t("about.description1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-700 leading-relaxed dark:text-gray-300"
            >
              {t("about.description2")}
            </motion.p>
          </div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 py-6 px-6 bg-gradient-to-r from-gray-50 via-white to-gray-100 rounded-2xl border border-gray-200 shadow-sm dark:bg-gradient-to-r dark:from-slate-800/80 dark:via-slate-700/80 dark:to-slate-800/80 dark:border-white/20 dark:shadow-purple-500/10"
          >
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                viewport={{ once: true }}
              >
                {t("about.stats.yearsExperience")}
              </motion.div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {t("about.stats.yearsLabel")}
              </p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                viewport={{ once: true }}
              >
                {t("about.stats.projectsShipped")}
              </motion.div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {t("about.stats.projectsLabel")}
              </p>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-200 hover:shadow-blue-500/25 hover:scale-105 px-8 py-3 text-base font-semibold dark:from-cyan-500 dark:to-purple-500 dark:hover:shadow-purple-500/25"
            >
              <Link href="/contact">{t("about.cta.workTogether")}</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 px-8 py-3 text-base font-semibold dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:border-white/40"
            >
              <Link href="/resume">{t("about.cta.viewResume")}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Interests grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <h3 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("about.interestsTitle")}
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Card className="relative overflow-hidden border-0 bg-white border-2 border-gray-100 p-6 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 hover:border-gray-200 dark:bg-slate-900/80 dark:border-white/20 dark:hover:border-white/30 dark:hover:shadow-purple-500/20">
                <CardContent className="p-0 text-center">
                  <motion.div
                    className={`mx-auto mb-4 rounded-xl bg-gradient-to-r ${interest.color} p-3 text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <interest.icon className="h-6 w-6" />
                  </motion.div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {interest.label}
                  </p>
                </CardContent>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 dark:from-cyan-500/5 dark:via-purple-500/5 dark:to-pink-500/5"
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fun facts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-100 border-2 border-gray-200 p-10 shadow-lg dark:bg-gradient-to-br dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 dark:border-white/20 dark:shadow-purple-500/10"
      >
        <h3 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("about.funFactsTitle")}
        </h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {funFacts.map((fact, index) => (
            <motion.div
              key={fact}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm border border-gray-100 dark:bg-white/10 dark:border-white/20 dark:shadow-purple-500/10"
            >
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-400 dark:to-purple-400" />
              <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{fact}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
