
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Section from "@/components/section";
import Link from "next/link";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();
  return (
    <Section title={project.title} subtitle={project.summary}>
      <div className="prose prose-invert max-w-none">
        <p><strong>Category:</strong> {project.category}</p>
        <p><strong>Tech:</strong> {project.tech.join(", ")}</p>
        <h3>Highlights</h3>
        <ul>{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        <p className="mt-6"><Link href="/" className="underline">← Back</Link></p>
      </div>
    </Section>
  );
}
