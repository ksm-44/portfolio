import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllSlugs, getProjectBySlug } from "@/lib/content";
import { buildMetadata, projectJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { MetricGrid } from "@/components/mdx/MetricGrid";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Container className="pt-16 sm:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <article className="mx-auto max-w-3xl">
        <Reveal>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden /> All projects
          </Link>
          <header className="mt-6">
            <p className="font-mono text-sm text-ink-faint">
              {project.company} · {project.role} · {formatDate(project.date)} ·{" "}
              {project.readingTime} min read
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </header>
          <MetricGrid metrics={project.metrics} />
        </Reveal>
        <div className="prose-custom">
          <MDXRemote
            source={project.content}
            components={mdxComponents}
            options={{
              // Trusted, first-party content — allow JS expressions in MDX
              // (component props like options={[...]}). v6 blocks these by default.
              blockJS: false,
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>
      </article>
    </Container>
  );
}
