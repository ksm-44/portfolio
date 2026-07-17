"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { featuredOutcomes, type Outcome } from "@/config/outcomes";

function OutcomeCard({ outcome }: { outcome: Outcome }) {
  const inner = (
    <>
      <p className="font-mono text-2xl font-medium tracking-tight text-accent sm:text-3xl">
        {outcome.value}
      </p>
      <p className="mt-2 text-sm leading-snug text-ink-muted">{outcome.label}</p>
      <p className="microlabel mt-3">
        {outcome.source}
        {outcome.href && <span className="text-accent"> →</span>}
      </p>
    </>
  );

  if (outcome.href) {
    return (
      <Link
        href={outcome.href}
        className="group border-t border-accent/30 pt-4 transition-colors hover:border-accent"
      >
        {inner}
      </Link>
    );
  }
  return <div className="border-t border-accent/30 pt-4">{inner}</div>;
}

/** Quantified outcomes; the ones with case studies link to their evidence. */
export function FeaturedOutcomes() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="outcomes-heading" className="pb-4 pt-16">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 id="outcomes-heading" className="text-2xl font-semibold tracking-tightest">
          Outcomes, not output
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Day-job numbers are team outcomes, attributed honestly. Side-project numbers link to the case study behind them.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-5 sm:grid-cols-3">
          {featuredOutcomes.map((o) => (
            <OutcomeCard key={o.label} outcome={o} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
