
import Hero from "@/components/hero";
import Section from "@/components/section";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/project-card";
import SocialLinks from "@/components/social-links";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function Page() {
  return (
    <>
      {/* Immersive hero */}
      <Hero />

      {/* Projects */}
      <Section id="projects" title="Projects" subtitle="Selected works with motion & polish.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools" subtitle="My daily toolbox and strengths.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h3 className="mb-4 font-semibold">Frontend</h3>
            <div className="space-y-3">
              <Skill name="React / Next.js" value={95} />
              <Skill name="TypeScript" value={90} />
              <Skill name="State Mgmt (Redux/Context)" value={88} />
              <Skill name="Testing (Jest/RTL)" value={85} />
            </div>
          </div>
          <div className="rounded-2xl border p-6">
            <h3 className="mb-4 font-semibold">DevOps & DX</h3>
            <div className="space-y-3">
              <Skill name="CI/CD (GitHub/CircleCI)" value={80} />
              <Skill name="Performance & a11y" value={90} />
              <Skill name="Design Systems (shadcn/ui)" value={88} />
              <Skill name="Node/Nest basics" value={70} />
            </div>
          </div>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" subtitle="Highlights across roles.">
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Software Engineer — Employment Hero</h3>
            <p className="mt-2 text-sm text-muted-foreground">Jun 2022 – Present</p>
            <ul className="mt-3 list-inside list-disc text-sm text-muted-foreground space-y-1">
              <li>Led FE architecture for a 4‑dev squad; mentorship via reviews & training</li>
              <li>Shipped digital onboarding checklist; reduced org setup time by ~50%</li>
              <li>Upgraded testing & CI; cut test time & costs</li>
            </ul>
          </li>
          <li className="rounded-2xl border p-6">
            <h3 className="text-lg font-semibold">Software Developer — FPT Software</h3>
            <p className="mt-2 text-sm text-muted-foreground">Nov 2021 – Jun 2022</p>
            <ul className="mt-3 list-inside list-disc text-sm text-muted-foreground space-y-1">
              <li>Defined acceptance criteria and led 4‑member team</li>
              <li>Unit tests & A/B tests with stakeholder alignment</li>
            </ul>
          </li>
        </ul>
        <div className="mt-6">
          <Link className="text-sm underline" href="/experience">See full timeline →</Link>
        </div>
      </Section>

      {/* About & Contact CTA */}
      <Section id="about" title="About Me" subtitle="Engineer. Motion nerd. Product thinker.">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/20 to-accent/20" />
          <div>
            <p className="text-muted-foreground">
              I craft fast, accessible interfaces with a big focus on motion, micro‑interactions, and design systems.
              I love turning ambiguous product ideas into polished experiences.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <SocialLinks />
              <Link className="text-sm underline" href="/contact">Get in touch →</Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Skill({ name, value }: { name: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
