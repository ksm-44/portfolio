"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

interface SliderProps {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

function Slider({ id, label, hint, value, min, max, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span className="font-mono text-xs text-ink-muted">{value}</span>
      </div>
      <p className="text-xs text-ink-faint">{hint}</p>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[rgb(var(--accent))]"
      />
    </div>
  );
}

function justification(score: number): string {
  if (score >= 500) return "The math is unambiguous. Legal has pre-approved the offer.";
  if (score >= 100) return "Comfortably above the hiring bar. The bar has been notified.";
  if (score >= 20) return "Solid ROI. Most PMs can't even calculate their own RICE score.";
  return "Even at your most skeptical inputs, the model says yes. Models don't lie.";
}

/** RICE prioritization for exactly one initiative: hiring me. Always P0. */
export function RiceCalculator() {
  const [reach, setReach] = useState(80);
  const [impact, setImpact] = useState(3);
  const [confidence, setConfidence] = useState(80);
  const [effort, setEffort] = useState(2);

  const score = useMemo(
    () => Math.round((reach * impact * (confidence / 100)) / Math.max(effort, 1)),
    [reach, impact, confidence, effort]
  );

  return (
    <div className="glass p-6 sm:p-8">
      <p className="microlabel">initiative: hire_me.prd</p>
      <div className="mt-6 space-y-6">
        <Slider
          id="reach"
          label="Reach"
          hint="Teams my work would touch per quarter"
          value={reach}
          min={1}
          max={100}
          onChange={setReach}
        />
        <Slider
          id="impact"
          label="Impact"
          hint="1 = minimal, 5 = changes the trajectory"
          value={impact}
          min={1}
          max={5}
          onChange={setImpact}
        />
        <Slider
          id="confidence"
          label="Confidence"
          hint="Your confidence in me, % (be honest, it won't matter)"
          value={confidence}
          min={10}
          max={100}
          onChange={setConfidence}
        />
        <Slider
          id="effort"
          label="Effort"
          hint="Person-months to onboard me (I write my own docs)"
          value={effort}
          min={1}
          max={12}
          onChange={setEffort}
        />
      </div>

      <motion.div
        key={score}
        initial={{ scale: 0.97, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        aria-live="polite"
        className="mt-8 glass border-accent/40 p-5 text-center shadow-glow-sm"
      >
        <p className="font-mono text-sm text-ink-muted">
          RICE score: <span className="text-2xl font-semibold text-ink">{score}</span>
        </p>
        <p className="mt-1 text-lg font-semibold text-ink">
          Priority: P0 — schedule intro call
        </p>
        <p className="mt-1 text-sm text-ink-muted">{justification(score)}</p>

        {/* The joke ends here. The information doesn't. */}
        <dl className="mx-auto mt-4 max-w-sm space-y-1.5 border-t border-line pt-4 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Availability</dt>
            <dd className="text-right text-ink">{siteConfig.availability}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Email</dt>
            <dd>
              <a href={`mailto:${siteConfig.author.email}`} className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent">
                {siteConfig.author.email}
              </a>
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Calendar</dt>
            <dd>
              <a href={siteConfig.author.calendly} target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent">
                Book 20 minutes
              </a>
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint">Resume</dt>
            <dd>
              <a href="/resume.pdf" className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent" download>
                Download PDF
              </a>
            </dd>
          </div>
        </dl>
        <ButtonLink
          href={`mailto:${siteConfig.author.email}?subject=P0%3A%20intro%20call`}
          external
          className="mt-5"
        >
          Execute the P0
        </ButtonLink>
      </motion.div>
      <p className="mt-4 text-center font-mono text-[11px] text-ink-faint">
        * calculator independently audited by me. no combination of inputs produces P1.
      </p>
    </div>
  );
}
