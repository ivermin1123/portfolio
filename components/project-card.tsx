
"use client";
import { useState } from "react";
import TiltCard from "@/components/tilt-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectCard({
  project
}: {
  project: { slug: string; title: string; category: string; summary: string; tech: string[]; highlights: string[] };
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TiltCard>
        <Card className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-background to-background/80 p-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-2">
              {project.title}
              <Badge className="border-primary/40 text-primary">{project.category}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t} className="border-muted-foreground/20">{t}</Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setOpen(true)} variant="secondary">Quick Look</Button>
              <Button asChild variant="outline"><Link href={`/projects/${project.slug}`}>Details</Link></Button>
            </div>
          </CardContent>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" aria-hidden
            style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.25), transparent 40%)" }}/>
        </Card>
      </TiltCard>

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.summary}</p>
          <ul className="list-inside list-disc">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </Dialog>
    </>
  );
}
