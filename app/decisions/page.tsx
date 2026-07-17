import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDecisions, type DecisionStatus } from "@/lib/collections";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Decision Journal",
  description:
    "Difficult tradeoffs, failed hypotheses, and what changed my mind — documented with the same rigor as the wins.",
  path: "/decisions",
});

/** Monochrome status semantics: filled, dashed, outline. */
const statusStyles: Record<DecisionStatus, { label: string; classes: string }> = {
  validated: { label: "✓ validated", classes: "border-accent bg-accent text-surface-raised" },
  invalidated: { label: "✕ invalidated — I was wrong", classes: "border-accent border-dashed text-accent" },
  "changed-my-mind": { label: "↺ changed my mind", classes: "border-line text-ink-muted" },
};

export default function DecisionsPage() {
  const decisions = getDecisions();

  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="microlabel">journal · {decisions.length} entries</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tightest sm:text-4xl">
            Decision Journal
          </h1>
          <p className="mt-3 text-ink-muted">
            Hard calls, documented before hindsight could edit them: hypothesis,
            evidence, result, and what I&apos;d do differently. The failures are the
            point — anyone can journal their wins.
          </p>
        </Reveal>

        <div className="mt-12 space-y-12">
          {decisions.map((d, i) => {
            const status = statusStyles[d.frontmatter.status];
            return (
              <Reveal key={d.slug} delay={Math.min(i * 0.05, 0.2)}>
                <article
                  aria-labelledby={`decision-${d.slug}`}
                  className="border-t border-accent/30 pt-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
                        status.classes
                      )}
                    >
                      {status.label}
                    </span>
                    <time className="microlabel" dateTime={d.frontmatter.date}>
                      {new Date(d.frontmatter.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </time>
                  </div>
                  <h2
                    id={`decision-${d.slug}`}
                    className="mt-4 text-xl font-semibold tracking-tightest sm:text-2xl"
                  >
                    {d.frontmatter.title}
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">{d.frontmatter.tldr}</p>
                  <div className="prose-custom mt-4 [&_h2]:mt-8 [&_h2]:text-base">
                    <MDXRemote
                      source={d.content}
                      components={mdxComponents}
                      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
