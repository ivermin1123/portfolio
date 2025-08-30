
import Section from "@/components/section";
import Timeline from "@/components/timeline";

export default function ExperiencePage() {
  return (
    <Section title="Career Timeline" subtitle="Key milestones with impact and recognition.">
      <Timeline
        items={[
          {
            company: "Employment Hero",
            role: "Software Engineer",
            start: "Jun 2022",
            bullets: [
              "Led FE architecture and mentorship for a 4‑dev squad",
              "Engineered digital onboarding checklist (−50% setup time)",
              "Optimized testing & CI to reduce runtime and cost",
              "Standardized design system components (50+ inconsistencies resolved)"
            ],
            tech: ["React", "Next.js", "TypeScript", "Redux", "Jest", "React Hook Form", "React Query"]
          },
          {
            company: "FPT Software",
            role: "Software Developer",
            start: "Nov 2021",
            end: "Jun 2022",
            bullets: [
              "Defined acceptance criteria; stakeholder alignment",
              "Mentored a 4‑member dev team; unit tests & A/B tests"
            ],
            tech: ["React", "TypeScript", "Redux", "Google OAuth", "Jest"]
          },
          {
            company: "Favie Tech",
            role: "Software Developer",
            start: "Mar 2021",
            end: "Nov 2021",
            bullets: ["Coordinated stand‑ups; QA collaboration", "Library evaluation vs. budget/performance"],
            tech: ["Angular 12", "Node.js", "NestJS", "RxJS", "Firebase"]
          },
          {
            company: "Designveloper",
            role: "Software Developer",
            start: "Dec 2020",
            end: "Mar 2021",
            bullets: ["API integrations, AWS deployment automation", "Finalized customer requirements"],
            tech: ["React", "Next.js", "NestJS", "MongoDB", "SCSS", "Redux", "AWS", "TypeScript", "RxJS"]
          },
          {
            company: "Trixgo",
            role: "Software Developer",
            start: "Sep 2020",
            end: "Dec 2020",
            bullets: ["DB schema design, chat UI, feedback systems (+20% satisfaction)"],
            tech: ["Node.js", "MongoDB", "AWS", "HTML", "CSS", "jQuery"]
          }
        ]}
      />
    </Section>
  );
}
