import type { Metadata } from "next";
import Link from "next/link";
import { getTeardowns, type TeardownVerdict } from "@/lib/collections";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid } from "@/components/motion/StaggerGrid";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Product Teardowns",
  description: "Short, visual, opinionated teardowns of well-known products: Spotify, Duolingo, Uber, Notion AI.",
  path: "/teardowns",
});

const verdictStyles: Record<TeardownVerdict, string> = {
  "steal this": "border-accent bg-accent text-surface-raised",
  "needs work": "border-accent border-dashed text-accent",
  "genius, with caveats": "border-line text-ink-muted",
};

export default function TeardownsPage() {
  const teardowns = getTeardowns();

  return (
    <Container className="pt-16 sm:pt-24">
      <Reveal>
        <p className="font-mono text-xs text-ink-muted">teardowns · {teardowns.length} products</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">
          Product Teardowns
        </h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          Product thinking doesn&apos;t clock out at 6pm. Short, visual, opinionated
          reviews — each one ends with what I&apos;d test next.
        </p>
      </Reveal>
      <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2">
        {teardowns.map((t) => (
          <Link
            key={t.slug}
            href={`/teardowns/${t.slug}`}
            className="group glass block h-full rounded-2xl p-6 transition-colors duration-150 hover:border-accent/50"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-ink-faint">
                {t.frontmatter.product} · {t.frontmatter.readMinutes} min
              </p>
              <span
                className={cn(
                  "rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
                  verdictStyles[t.frontmatter.verdict]
                )}
              >
                {t.frontmatter.verdict}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-semibold tracking-tightest text-ink transition-colors group-hover:text-accent">
              {t.frontmatter.title}
            </h2>
            <p className="mt-3 border-l-2 border-accent pl-3 text-sm italic leading-relaxed text-ink-muted">
              &ldquo;{t.frontmatter.take}&rdquo;
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.frontmatter.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Link>
        ))}
      </StaggerGrid>
    </Container>
  );
}
