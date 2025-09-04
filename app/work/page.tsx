import { ProjectCard, Section } from "@/components";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <Section title="Work" subtitle="Projects and case studies">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
