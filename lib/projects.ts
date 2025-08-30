
export type Project = {
  slug: string;
  title: string;
  category: "AI" | "Web" | "Tools";
  summary: string;
  tech: string[];
  highlights: string[];
  links?: { demo?: string | null; repo?: string | null };
};

export const projects: Project[] = [
  {
    slug: "onboarding-checklist-accelerator",
    title: "Onboarding Checklist Accelerator",
    category: "Web",
    summary: "Self‑serve digital onboarding flow reducing setup time by ~50%.",
    tech: ["Next.js", "TypeScript", "React Hook Form", "Jest"],
    highlights: ["Schema‑driven forms", "Edge cached pages", "a11y score 100"],
    links: {}
  },
  {
    slug: "ui-library-standardization",
    title: "UI Library Standardization (\"Snowflakes\")",
    category: "Tools",
    summary: "Refactored internal design system; eliminated 50+ inconsistencies.",
    tech: ["React", "Storybook", "shadcn/ui"],
    highlights: ["Theming tokens", "Variants API", "Automated visual tests"],
    links: {}
  },
  {
    slug: "herobot-ai-console",
    title: "HeroBot AI Console",
    category: "AI",
    summary: "AI‑assisted ops dashboard with prompt orchestration & evals.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Zod"],
    highlights: ["Semantic search", "Operator handoff", "Audit trails"],
    links: {}
  }
];
