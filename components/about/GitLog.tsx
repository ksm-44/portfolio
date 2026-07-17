"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { careerLog } from "@/config/career";
import { cn } from "@/lib/utils";

/** Career history rendered as an interactive git log. */
export function GitLog() {
  const [openHash, setOpenHash] = useState<string | null>(careerLog[0]?.hash ?? null);

  return (
    <div className="overflow-hidden glass">
      <div className="border-b border-line px-4 py-2.5">
        <p className="font-mono text-xs text-ink-muted">
          ~/career <span className="text-accent">$</span> git log --oneline --graph
        </p>
      </div>
      <ol className="p-2">
        {careerLog.map((commit, i) => {
          const open = openHash === commit.hash;
          return (
            <li key={commit.hash} className="relative">
              {i < careerLog.length - 1 && (
                <span aria-hidden className="absolute left-[1.15rem] top-8 h-full w-px bg-line" />
              )}
              <button
                type="button"
                onClick={() => setOpenHash(open ? null : commit.hash)}
                aria-expanded={open}
                className="relative flex w-full items-baseline gap-3 rounded-sm px-3 py-2.5 text-left font-mono text-[13px] transition-colors hover:bg-surface-overlay"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 inline-block h-[7px] w-[7px] shrink-0 self-center rounded-full border",
                    open ? "border-accent bg-accent" : "border-ink-faint bg-surface-raised"
                  )}
                />
                <span className="shrink-0 text-ink-faint">{commit.hash}</span>
                <span className="min-w-0 flex-1 truncate text-ink">{commit.message}</span>
                <span className="hidden shrink-0 text-xs text-ink-faint sm:inline">
                  {commit.date}
                </span>
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="ml-10 mr-4 border-l border-line py-2 pl-4 text-sm leading-relaxed text-ink-muted">
                      {commit.details}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
