import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import {
  OpenPaletteButton,
  ReplayBootButton,
  ToggleRecruiterButton,
} from "@/components/features/FeatureTriggers";
import type { ReactNode } from "react";

export const metadata: Metadata = buildMetadata({
  title: "Features",
  description: "Every widget and interaction on this site, documented like a product.",
  path: "/features",
});

interface Feature {
  name: string;
  where: string;
  how: string;
  why: string;
  href?: string;
  trigger?: ReactNode;
}

const features: Feature[] = [
  {
    name: "Boot sequence",
    where: "First arrival (and after 30 idle minutes)",
    how: "Automatic. Skippable. Replay it with the button here or `reboot pm-os` in the palette.",
    why: "Sets the thesis in three seconds: this site is a product, not a brochure.",
    trigger: <ReplayBootButton />,
  },
  {
    name: "Command palette",
    where: "Everywhere",
    how: "⌘K on macOS, Ctrl+K on Windows/Linux — or the K button in the header.",
    why: "Primary navigation as a terminal. Try `sudo hire-me`.",
    trigger: <OpenPaletteButton />,
  },
  {
    name: "Recruiter mode",
    where: "Header toggle, palette, or ?mode=recruiter in the URL",
    how: "One switch hides every gimmick and surfaces resume, top case studies, metrics, contact.",
    why: "Different users, different jobs-to-be-done. The site segments its own audience.",
    trigger: <ToggleRecruiterButton />,
  },
  {
    name: "A/B tested hero",
    where: "Homepage",
    how: "You're randomly assigned variant A or B per session. Click the experiment badge for the brief.",
    why: "The site experiments on you and publishes its methodology — n=1, significance: vibes.",
    href: "/",
  },
  {
    name: "Visitor analytics HUD",
    where: "Bottom-right pill, playful mode only",
    how: "Click 'you are being A/B tested'. Draggable panel tracks scroll, clicks, rage clicks, engagement cohort.",
    why: "Product-manages the visitor in real time. Nothing leaves your browser.",
  },
  {
    name: "Decision points",
    where: "Inside case studies",
    how: "The story pauses and asks what you'd do — then reveals what I actually did.",
    why: "Case studies you play, not skim. Your calls are tallied in the HUD.",
    href: "/projects/finbot",
  },
  {
    name: "git log --career",
    where: "About page",
    how: "Career as an interactive commit history. Click a commit to expand it, including the revert.",
    why: "A resume with honest version control.",
    href: "/about",
  },
  {
    name: "Decision journal",
    where: "/decisions",
    how: "Hypothesis → evidence → result → what I'd do differently. Statuses: validated, invalidated, changed-my-mind.",
    why: "Documented judgment, including the failures.",
    href: "/decisions",
  },
  {
    name: "Product teardowns",
    where: "/teardowns",
    how: "3-minute opinionated reviews of Spotify, Duolingo, Uber, Notion AI with annotated flows and verdicts.",
    why: "Proof that product thinking doesn't clock out.",
    href: "/teardowns",
  },
  {
    name: "Impact dashboard",
    where: "/impact",
    how: "Career totals where every metric states exactly how it was counted.",
    why: "Numbers without methodology are marketing.",
    href: "/impact",
  },
  {
    name: "RICE calculator",
    where: "/hire-me",
    how: "Score the initiative 'hire me' with sliders. Every input combination outputs P0.",
    why: "A joke with a payload: availability, email, calendar, resume.",
    href: "/hire-me",
  },
  {
    name: "Career status page",
    where: "/status",
    how: "Uptime bars and incident history for one (1) product manager.",
    why: "Transparency, styled as infrastructure.",
    href: "/status",
  },
  {
    name: "/now page",
    where: "/now",
    how: "Building, learning, reading, recently shipped — timestamped.",
    why: "Momentum, in public.",
    href: "/now",
  },
  {
    name: "Site changelog",
    where: "/changelog",
    how: "The site versions itself, breaking changes and regrets included.",
    why: "Products have versions. So does this one.",
    href: "/changelog",
  },
  {
    name: "404 sprint game",
    where: "Any wrong URL",
    how: "Whack-a-mole where the moles are scope creep. 30-second sprints, local high score.",
    why: "Even the error page has a backlog.",
    href: "/this-page-does-not-exist",
  },
  {
    name: "Typed easter eggs",
    where: "Anywhere on the site",
    how: "Type `sudo` or `ship` on your keyboard (not in an input).",
    why: "For the people who read feature lists to the end.",
  },
];

export default function FeaturesPage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-xs text-ink-muted">$ ls --features</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">
            Features
          </h1>
          <p className="mt-4 max-w-[52ch] text-ink-muted">
            Every widget on this site, documented like a product — what it does,
            where it lives, and why it exists. Live triggers included.
          </p>
        </Reveal>
        <div className="mt-10 space-y-4">
          {features.map((f, i) => (
            <Reveal key={f.name} delay={Math.min(i * 0.03, 0.15)}>
              <article className="glass p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-base font-semibold text-ink">
                    {f.href ? (
                      <Link href={f.href} className="transition-colors hover:text-accent">
                        {f.name} →
                      </Link>
                    ) : (
                      f.name
                    )}
                  </h2>
                  {f.trigger}
                </div>
                <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-[5rem_1fr]">
                  <dt className="microlabel pt-0.5">where</dt>
                  <dd className="text-ink-muted">{f.where}</dd>
                  <dt className="microlabel pt-0.5">how</dt>
                  <dd className="text-ink-muted">{f.how}</dd>
                  <dt className="microlabel pt-0.5">why</dt>
                  <dd className="text-ink-muted">{f.why}</dd>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
