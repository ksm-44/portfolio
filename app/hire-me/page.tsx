import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RiceCalculator } from "@/components/rice/RiceCalculator";

export const metadata: Metadata = buildMetadata({
  title: "Should you hire me?",
  description: "A rigorous, unbiased RICE prioritization of exactly one initiative: hiring me.",
  path: "/hire-me",
});

export default function HireMePage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <p className="font-mono text-xs text-ink-muted">prioritization framework: RICE</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">
            Should you hire me?
          </h1>
          <p className="mt-3 text-ink-muted">
            Don&apos;t trust your gut. Trust a framework I built, scored, and audited myself.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <RiceCalculator />
        </Reveal>
      </div>
    </Container>
  );
}
