import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components";
import { projects } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return notFound();

  return (
    <Section title={project.title} subtitle={project.summary}>
      <div className="prose prose-invert max-w-none">
        <p>
          <strong>Category:</strong> {project.category}
        </p>
        <p>
          <strong>Tech:</strong> {project.tech.join(", ")}
        </p>
        <h3>Highlights</h3>
        <ul>
          {project.highlights.map(h => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/" className="underline">
            ← Back
          </Link>
        </p>
      </div>
    </Section>
  );
}
