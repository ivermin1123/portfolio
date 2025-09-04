"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/lib/useTranslations";

export default function ContactForm() {
  const { t } = useTranslations();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: form,
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input name="name" placeholder={t("contact.form.name")} required />
      <Input name="email" type="email" placeholder={t("contact.form.email")} required />
      <Textarea name="message" placeholder={t("contact.form.message")} required />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
      </Button>
      {status === "sent" && <p className="text-sm text-green-600">{t("contact.form.success")}</p>}
      {status === "error" && <p className="text-sm text-red-500">{t("contact.form.error")}</p>}
    </form>
  );
}
