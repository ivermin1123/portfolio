
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: form
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input name="name" placeholder="Your name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Textarea name="message" placeholder="Tell me about your project…" required />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </Button>
      {status === "sent" && <p className="text-sm text-green-600">Thanks! Your message was sent 🎉</p>}
      {status === "error" && <p className="text-sm text-red-500">Oops, something went wrong.</p>}
    </form>
  );
}
