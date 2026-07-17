"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useVisitorAnalytics } from "@/components/hud/analytics-store";
import { useMode } from "@/components/mode/mode-store";
import { useModKey } from "@/hooks/useModKey";
import { siteConfig } from "@/config/site";

type Variant = "A" | "B";

const headlines: Record<Variant, string> = {
  A: "I build AI products for enterprises by day, and ship my own at night.",
  B: "Enterprise PM who builds like a founder: four AI products shipped solo, end to end.",
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/** Hero that A/B tests itself on the visitor — with a public experiment brief. */
export function AbHero() {
  const reduce = useReducedMotion();
  const { recruiter, mounted } = useMode();
  const { recordConversion, stats } = useVisitorAnalytics();
  const mod = useModKey();
  const [variant, setVariant] = useState<Variant>("A");
  const [assigned, setAssigned] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pm-variant") as Variant | null;
    const v: Variant = stored ?? (Math.random() < 0.5 ? "A" : "B");
    sessionStorage.setItem("pm-variant", v);
    setVariant(v);
    setAssigned(true);
  }, []);

  // Recruiter mode always gets the sincere headline, no experiment.
  const headline = headlines[mounted && recruiter ? "A" : variant];

  return (
    <section className="border-b border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <motion.div
          custom={0}
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={item}
          className="flex flex-wrap items-center gap-4"
        >
          <p className="microlabel">{siteConfig.role} · {siteConfig.location}</p>
          {!(mounted && recruiter) && (
            <button
              type="button"
              onClick={() => setBriefOpen(true)}
              className="microlabel rounded-sm border border-line px-2 py-0.5 transition-colors hover:border-accent/50 hover:text-ink"
            >
              exp 42 · variant {assigned ? variant : "—"}
            </button>
          )}
        </motion.div>

        <motion.h1
          custom={1}
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={item}
          className="mt-7 max-w-[17ch] text-4xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-6xl"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={headline}
              initial={assigned && !reduce ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline"
            >
              {headline}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p
          custom={2}
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={item}
          className="mt-7 max-w-[52ch] text-base leading-relaxed text-ink-muted"
        >
          {siteConfig.description}
          {!(mounted && recruiter) && (
            <>
              {" "}Press{" "}
              <kbd className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[11px] text-ink">
                {mod} K
              </kbd>{" "}
              — this site runs on commands.
            </>
          )}
        </motion.p>

        <motion.div
          custom={3}
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={item}
          className="mt-10 flex flex-wrap gap-3"
        >
          <span onClickCapture={recordConversion}>
            <ButtonLink href="/projects">View case studies</ButtonLink>
          </span>
          {mounted && recruiter ? (
            <ButtonLink href="/resume.pdf" variant="ghost" external>
              Resume (PDF)
            </ButtonLink>
          ) : (
            <ButtonLink href="/about" variant="ghost">
              git log --career
            </ButtonLink>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {briefOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/20 p-4"
            onClick={() => setBriefOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Experiment brief"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass p-6"
            >
              <div className="flex items-start justify-between">
                <p className="microlabel">experiment_brief_042.md</p>
                <button
                  type="button"
                  onClick={() => setBriefOpen(false)}
                  aria-label="Close experiment brief"
                  className="rounded-sm p-1 text-ink-faint hover:text-ink"
                >
                  <X size={14} />
                </button>
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tightest">Hero Headline Test</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="microlabel">hypothesis</dt>
                  <dd className="mt-0.5 text-ink-muted">
                    Visitors convert better when the headline admits what PMs actually do.
                  </dd>
                </div>
                <div>
                  <dt className="microlabel">your assignment</dt>
                  <dd className="mt-0.5 text-ink-muted">
                    Variant {variant} — {variant === "A" ? "the sincere one" : "the honest one"}.
                    Reassignment requires clearing session storage, which we both know you won&apos;t do.
                  </dd>
                </div>
                <div>
                  <dt className="microlabel">live results (n = you)</dt>
                  <dd className="mt-0.5 font-mono text-xs text-ink-muted">
                    conversions {stats.conversions} · engagement {stats.score} · significance: vibes
                  </dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
