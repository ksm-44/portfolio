import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { GitLog } from "@/components/about/GitLog";
import { principles } from "@/config/principles";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `${siteConfig.name}'s career as a git log: features shipped, bugs fixed, one honest revert.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs text-ink-muted">$ whoami</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">
            {siteConfig.description}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Every career is a repo: features, merges, and the occasional revert
            you learn the most from. Mine starts with a civil engineering degree
            and a dropped MBA plan. Click a commit.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight">My product philosophy</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Principles without receipts are posters. Each one links to the work that proves it.
          </p>
          <ul className="mt-6 space-y-3">
            {principles.map((p, i) => (
              <li key={p.title} className="glass rounded-xl p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-ink">
                    <span className="mr-2 font-mono text-xs text-ink-muted">{i + 1}.</span>
                    {p.title}
                  </h3>
                  <Link
                    href={p.receiptHref}
                    className="font-mono text-xs text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    receipt: {p.receipt} →
                  </Link>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <GitLog />
        </Reveal>
        <Reveal delay={0.15}>
          <div className="glass mt-14 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold">Open a pull request on my calendar</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Talk product, compare discovery notes, or run the{" "}
              <Link href="/hire-me" className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent">
                should-you-hire-me calculator
              </Link>{" "}
              first. Spoiler: it&apos;s a P0.
            </p>
            <ButtonLink href={`mailto:${siteConfig.author.email}`} external className="mt-5">
              <Mail size={15} aria-hidden /> Get in touch
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
