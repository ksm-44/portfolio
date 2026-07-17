import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { MetricsDashboard } from "@/components/impact/MetricsDashboard";

export const metadata: Metadata = buildMetadata({
  title: "Impact",
  description: "Career metrics with counting methodology: experiments, launches, interviews, revenue influenced.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <Reveal>
        <p className="font-mono text-xs text-ink-muted">dashboard: career.metrics</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tightest sm:text-4xl">Impact</h1>
        <p className="mt-3 max-w-xl text-ink-muted">
          Numbers without methodology are marketing. Each metric below says exactly
          how it was counted — including what it excludes.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <MetricsDashboard />
      </Reveal>
    </Container>
  );
}
