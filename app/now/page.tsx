import type { Metadata } from "next";
import { Hammer, BookOpen, GraduationCap, PackageCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { nowSections, nowUpdated } from "@/config/now";

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description: "What I'm building, learning, and reading right now — updated monthly.",
  path: "/now",
});

const icons = {
  building: Hammer,
  learning: GraduationCap,
  reading: BookOpen,
  shipped: PackageCheck,
} as const;

export default function NowPage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs text-ink-muted">
            /now · last updated{" "}
            <time dateTime={nowUpdated}>
              {new Date(nowUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">Now</h1>
          <p className="mt-3 text-ink-muted">
            Current focus, in public. If this page is more than two months stale,
            call me out on it.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {nowSections.map((section, i) => {
            const Icon = icons[section.id as keyof typeof icons] ?? Hammer;
            return (
              <Reveal key={section.id} delay={Math.min(i * 0.06, 0.2)}>
                <section
                  aria-labelledby={`now-${section.id}`}
                  className="glass h-full rounded-2xl p-6"
                >
                  <h2
                    id={`now-${section.id}`}
                    className="flex items-center gap-2 font-mono text-xs text-ink-muted"
                  >
                    <Icon size={15} aria-hidden /> {section.heading}
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-medium text-ink">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.note}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
