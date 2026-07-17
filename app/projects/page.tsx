import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid } from "@/components/motion/StaggerGrid";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: "Product management case studies: growth, platform strategy, and 0→1 launches.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tightest sm:text-4xl">Work</h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          Selected case studies. Each one covers the problem, the process, and the measurable
          outcome.
        </p>
      </Reveal>
      <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </StaggerGrid>
    </Container>
  );
}
