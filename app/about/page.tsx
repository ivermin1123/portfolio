
import Section from "@/components/section";

export default function AboutPage() {
  return (
    <Section title="About Hoang">
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/20 to-accent/20" />
        <div className="space-y-4">
          <p>
            I’m a Senior Frontend Engineer focused on crafting premium, high‑performance experiences with React and Next.js.
            I care deeply about motion design, a11y, and clean APIs.
          </p>
          <p>
            Outside of work: I tinker with animation systems, design systems, and AI‑assisted developer tools.
          </p>
        </div>
      </div>
    </Section>
  );
}
