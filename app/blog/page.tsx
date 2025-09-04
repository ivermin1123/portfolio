"use client";
import { Section } from "@/components";
import { useTranslations } from "@/lib/useTranslations";

export default function BlogPage() {
  const { t } = useTranslations();

  return (
    <Section title={t("blog.title")} subtitle={t("blog.subtitle")}>
      <div className="text-center py-20">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
            {t("blog.comingSoon")}
          </h3>
          <p className="text-muted-foreground">{t("blog.description")}</p>
        </div>
      </div>
    </Section>
  );
}
