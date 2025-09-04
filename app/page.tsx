"use client";
import Link from "next/link";

import {
  AboutSection,
  ExperienceTimeline,
  Hero,
  ProjectCard,
  Section,
  SkillsSection,
  SocialLinks,
} from "@/components";
import { projects } from "@/lib/projects";
import { useTranslations } from "@/lib/useTranslations";

export default function Page() {
  const { t } = useTranslations();

  return (
    <>
      {/* Immersive hero */}
      <Hero />

      {/* Projects */}
      <Section
        id="projects"
        title={t("sections.projects.title")}
        subtitle={t("sections.projects.subtitle")}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section
        id="skills"
        title={t("sections.skills.title")}
        subtitle={t("sections.skills.subtitle")}
      >
        <SkillsSection />
      </Section>

      {/* Experience */}
      <Section
        id="experience"
        title={t("sections.experience.title")}
        subtitle={t("sections.experience.subtitle")}
      >
        <ExperienceTimeline />
      </Section>

      {/* About */}
      <Section id="about" title={t("sections.about.title")} subtitle={t("sections.about.subtitle")}>
        <AboutSection />
      </Section>

      {/* Contact CTA */}
      <Section
        id="contact"
        title={t("sections.contact.title")}
        subtitle={t("sections.contact.subtitle")}
      >
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl dark:from-cyan-500/10 dark:to-purple-500/10"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl dark:from-purple-500/10 dark:to-pink-500/10"></div>
          </div>

          {/* Main content */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-800/50 rounded-3xl border-2 border-gray-200 dark:border-white/10 p-12 shadow-lg dark:shadow-slate-900/20">
            <div className="text-center space-y-10 max-w-4xl mx-auto">
              {/* Description */}
              <div className="space-y-6">
                <p className="text-xl text-gray-700 dark:text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {t("contact.description1")}
                </p>

                <p className="text-lg text-gray-600 dark:text-muted-foreground/80 leading-relaxed max-w-2xl mx-auto">
                  {t("contact.description2")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/contact"
                  className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">{t("contact.getInTouch")}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/resume"
                  className="px-10 py-4 border-2 border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 text-gray-700 dark:text-white rounded-2xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/30 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                >
                  {t("contact.viewResume")}
                </Link>
              </div>

              {/* Additional info */}
              <div className="pt-8 border-t border-gray-200 dark:border-white/10">
                <p className="text-sm text-gray-500 dark:text-muted-foreground mb-6">
                  {t("contact.connectDirectly")}
                </p>
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
