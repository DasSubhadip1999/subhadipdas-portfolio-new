"use client";

import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectsContent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        My Projects
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Here are some of the projects I&apos;ve worked on. Few projects are
        under NDA.
      </p>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
