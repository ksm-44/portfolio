import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { changelog } from "@/config/changelog";

export const metadata: Metadata = buildMetadata({
  title: "Changelog",
  description: "This site versions itself. Breaking changes included removing all norms.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <p className="font-mono text-xs text-ink-muted">$ cat CHANGELOG.md</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">Changelog</h1>
          <p className="mt-3 text-ink-muted">
            Sites are products. Products have versions. Versions have regrets.
          </p>
        </Reveal>
        <div className="mt-10 space-y-8">
          {changelog.map((entry, i) => (
            <Reveal key={entry.version} delay={i * 0.05}>
              <section aria-labelledby={`v-${entry.version}`} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <h2 id={`v-${entry.version}`} className="font-mono text-lg font-semibold text-accent">
                    v{entry.version}
                  </h2>
                  <Badge>{entry.type}</Badge>
                  <span className="ml-auto font-mono text-xs text-ink-faint">{entry.date}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {entry.changes.map((change) => (
                    <li key={change} className="flex gap-2 text-sm text-ink-muted">
                      <span className="text-accent" aria-hidden>▸</span>
                      <span className={change.startsWith("BREAKING") ? "text-ink" : undefined}>
                        {change}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
