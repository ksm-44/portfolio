import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getTeardowns, getTeardownBySlug, type TeardownVerdict } from "@/lib/collections";
import { buildMetadata } from "@/lib/seo";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const verdictStyles: Record<TeardownVerdict, string> = {
  "steal this": "border-accent bg-accent text-surface-raised",
  "needs work": "border-accent border-dashed text-accent",
  "genius, with caveats": "border-line text-ink-muted",
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getTeardowns().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const teardown = getTeardownBySlug(slug);
  if (!teardown) return {};
  return buildMetadata({
    title: teardown.frontmatter.title,
    description: teardown.frontmatter.take,
    path: `/teardowns/${slug}`,
  });
}

export default async function TeardownPage({ params }: PageProps) {
  const { slug } = await params;
  const teardown = getTeardownBySlug(slug);
  if (!teardown) notFound();
  const fm = teardown.frontmatter;

  return (
    <Container className="pt-16 sm:pt-24">
      <article className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/teardowns"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden /> All teardowns
          </Link>
          <header className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-sm text-ink-faint">
                {fm.product} · {fm.readMinutes} min read
              </p>
              <span
                className={cn(
                  "rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
                  verdictStyles[fm.verdict]
                )}
              >
                verdict: {fm.verdict}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {fm.title}
            </h1>
            <p className="mt-4 border-l-2 border-accent pl-4 text-lg italic leading-relaxed text-ink-muted">
              &ldquo;{fm.take}&rdquo;
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {fm.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </header>
        </Reveal>
        <div className="prose-custom mt-8">
          <MDXRemote
            source={teardown.content}
            components={mdxComponents}
            options={{
              mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
            }}
          />
        </div>
      </article>
    </Container>
  );
}
