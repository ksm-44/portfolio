import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/content";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

/** Types that aren't shipped work get a visible label so nothing reads as more than it is. */
const NON_SHIPPED = new Set(["Concept", "Analysis", "Strategy", "Redesign", "Teardown"]);

export function ProjectCard({ project }: { project: Project }) {
  const showType = project.type && NON_SHIPPED.has(project.type);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full glass p-6 transition-colors duration-150 hover:border-accent/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="microlabel flex items-center gap-2">
            <span>
              {project.company} · {formatDate(project.date)}
            </span>
            {showType && (
              <span className="rounded-sm border border-accent/40 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.08em] text-accent">
                {project.type} study
              </span>
            )}
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
