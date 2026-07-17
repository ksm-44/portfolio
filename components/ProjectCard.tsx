import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full glass p-6 transition-colors duration-150 hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="microlabel">
            {project.company} · {formatDate(project.date)}
          </p>
          <h3 className="mt-2.5 text-lg font-semibold leading-snug tracking-tightest text-ink">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          size={16}
          aria-hidden
          className="mt-1 shrink-0 text-ink-faint transition-colors group-hover:text-accent"
        />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
        {project.summary}
      </p>
      {project.metrics[0] && (
        <p className="mt-4 font-mono text-sm text-ink">
          {project.metrics[0].value}{" "}
          <span className="text-ink-faint">{project.metrics[0].label}</span>
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
    </Link>
  );
}
