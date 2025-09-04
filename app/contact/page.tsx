"use client";
import { ContactForm, Section } from "@/components";
import { useTranslations } from "@/lib/useTranslations";

export default function ContactPage() {
  const { t } = useTranslations();

  return (
    <Section title={t("contact.title")} subtitle={t("contact.subtitle")}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border p-6 glass">
          <ContactForm />
        </div>
        <div className="rounded-2xl border p-6">
          <h3 className="mb-2 font-semibold">{t("contact.preferEmail")}</h3>
          <p className="text-sm text-muted-foreground">ivermin1123@gmail.com</p>
          <h3 className="mb-2 mt-6 font-semibold">{t("contact.findMeOnline")}</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>GitHub: github.com/ivermin1123</li>
            <li>LinkedIn: linkedin.com/in/ivermin1123</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
