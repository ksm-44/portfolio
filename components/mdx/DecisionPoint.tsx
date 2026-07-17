"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useVisitorAnalytics } from "@/components/hud/analytics-store";
import { cn } from "@/lib/utils";

interface DecisionPointProps {
  question: string;
  options: string[];
  /** Index of the option I actually chose. */
  actual: number;
  children: ReactNode;
}

/** Pauses a case study and asks the reader to make the call before revealing mine. */
export function DecisionPoint({ question, options, actual, children }: DecisionPointProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const { recordDecision } = useVisitorAnalytics();

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    recordDecision();
  };

  return (
    <div className="my-10 border-y border-accent/30 py-7">
      <p className="microlabel">decision point — your call</p>
      <p className="mt-3 font-semibold text-ink">{question}</p>
      <div className="mt-5 flex flex-col gap-2" role="group" aria-label="Decision options">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const isActual = picked !== null && i === actual;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              disabled={picked !== null}
              className={cn(
                "rounded-sm border px-4 py-3 text-left text-sm transition-colors",
                picked === null &&
                  "border-line text-ink-muted hover:border-accent/60 hover:text-ink",
                isActual && "border-accent bg-accent text-surface-raised",
                isPicked && !isActual && "border-ink/60 border-dashed text-ink",
                picked !== null && !isPicked && !isActual && "border-line/60 text-ink-faint"
              )}
            >
              <span className="font-mono text-xs opacity-60">
                {String.fromCharCode(65 + i)}.
              </span>{" "}
              {opt}
              {isActual && (
                <span className="ml-2 font-mono text-[11px] opacity-80">← what I did</span>
              )}
              {isPicked && !isActual && (
                <span className="ml-2 font-mono text-[11px] text-ink-muted">← your call</span>
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-muted [&>p:last-child]:mb-0">
              <p className="microlabel mb-2">
                {picked === actual
                  ? "same call — we should work together"
                  : "interesting — here's why I went differently"}
              </p>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
