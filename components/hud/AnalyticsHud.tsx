"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, X } from "lucide-react";
import { useVisitorAnalytics } from "./analytics-store";

function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) {
    return <div className="h-8 w-full bg-surface-overlay" aria-hidden />;
  }
  const w = 160;
  const h = 32;
  const max = Math.max(...points, 1);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * w},${h - (p / max) * h}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-full" aria-hidden>
      <path d={d} fill="none" stroke="rgb(var(--accent))" strokeWidth="1" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="font-mono text-sm font-medium text-ink">{value}</p>
      <p className="microlabel">{label}</p>
    </div>
  );
}

function cohortFor(score: number): string {
  if (score >= 70) return "retention cohort. we're keeping you.";
  if (score >= 35) return "activation cohort. almost hooked.";
  return "bounce risk. please scroll more.";
}

/** Draggable dashboard that product-manages the visitor in real time. */
export function AnalyticsHud() {
  const { stats } = useVisitorAnalytics();
  const [openHud, setOpenHud] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence mode="wait">
        {openHud ? (
          <motion.div
            key="panel"
            drag
            dragMomentum={false}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="w-64 cursor-grab glass p-4 shadow-glow active:cursor-grabbing"
          >
            <div className="flex items-center justify-between">
              <p className="microlabel text-ink-muted">visitor_analytics.live</p>
              <button
                type="button"
                onClick={() => setOpenHud(false)}
                aria-label="Close analytics HUD"
                className="rounded-sm p-1 text-ink-faint transition-colors hover:text-ink"
              >
                <X size={13} />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Stat label="seconds" value={stats.seconds} />
              <Stat label="scroll" value={`${stats.scrollDepth}%`} />
              <Stat label="clicks" value={stats.clicks} />
              <Stat label="rage" value={stats.rageClicks} />
              <Stat label="decisions" value={stats.decisions} />
              <Stat label="converts" value={stats.conversions} />
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <Sparkline points={stats.history} />
            </div>
            <p className="mt-2 font-mono text-[11px] leading-snug text-ink-muted">
              engagement <span className="text-ink">{stats.score}</span> ·{" "}
              {cohortFor(stats.score)}
            </p>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setOpenHud(true)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            aria-label="Open visitor analytics HUD"
            className="flex items-center gap-2 glass px-3.5 py-2 font-mono text-[11px] text-ink-muted shadow-glow-sm transition-colors hover:border-accent/50 hover:text-ink"
          >
            <Activity size={12} aria-hidden />
            you are being A/B tested
            <span className="text-ink">{stats.score}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
