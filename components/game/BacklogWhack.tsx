"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TICKETS = [
  "add AI to it",
  "quick win?",
  "CEO pet feature",
  "one more field",
  "make logo bigger",
  "urgent: not urgent",
  "scope++",
  "just a toggle",
  "v2 can wait",
];

const SPRINT_SECONDS = 30;

interface ActiveTicket {
  slot: number;
  label: string;
  id: number;
}

/** Whack-a-mole, but the moles are scope creep and the mallet is your resolve. */
export function BacklogWhack() {
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SPRINT_SECONDS);
  const [tickets, setTickets] = useState<ActiveTicket[]>([]);
  const [best, setBest] = useState(0);
  const nextId = useRef(0);

  useEffect(() => {
    setBest(Number(localStorage.getItem("pm-whack-best") ?? 0));
  }, []);

  const start = useCallback(() => {
    setScore(0);
    setMissed(0);
    setTimeLeft(SPRINT_SECONDS);
    setTickets([]);
    setPhase("playing");
  }, []);

  // Countdown.
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      setPhase("over");
      setTickets([]);
      setBest((b) => {
        const nb = Math.max(b, score);
        localStorage.setItem("pm-whack-best", String(nb));
        return nb;
      });
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, timeLeft, score]);

  // Spawner: tickets appear in random empty slots and expire if unwhacked.
  useEffect(() => {
    if (phase !== "playing") return;
    const spawn = window.setInterval(() => {
      setTickets((current) => {
        if (current.length >= 4) return current;
        const empty = Array.from({ length: 9 }, (_, i) => i).filter(
          (slot) => !current.some((t) => t.slot === slot)
        );
        const slot = empty[Math.floor(Math.random() * empty.length)];
        if (slot === undefined) return current;
        const id = ++nextId.current;
        const label = TICKETS[Math.floor(Math.random() * TICKETS.length)] as string;
        window.setTimeout(() => {
          setTickets((ts) => {
            const still = ts.some((t) => t.id === id);
            if (still) setMissed((m) => m + 1);
            return ts.filter((t) => t.id !== id);
          });
        }, 1400);
        return [...current, { slot, label, id }];
      });
    }, 550);
    return () => window.clearInterval(spawn);
  }, [phase]);

  const whack = (id: number) => {
    setTickets((ts) => ts.filter((t) => t.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="w-full max-w-md glass p-6">
      <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
        <span>
          smashed: <span className="text-ink">{score}</span> · leaked:{" "}
          <span className="text-ink">{missed}</span>
        </span>
        <span>
          {phase === "playing" ? `sprint ends: ${timeLeft}s` : `best: ${best}`}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Scope creep tickets">
        {Array.from({ length: 9 }, (_, slot) => {
          const ticket = tickets.find((t) => t.slot === slot);
          return (
            <div key={slot} className="aspect-square">
              <AnimatePresence>
                {ticket && (
                  <motion.button
                    key={ticket.id}
                    type="button"
                    onClick={() => whack(ticket.id)}
                    initial={{ scale: 0, rotate: -6 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-accent/60 bg-surface-overlay p-1 text-center text-[11px] font-medium leading-tight text-ink hover:border-accent"
                  >
                    {ticket.label}
                  </motion.button>
                )}
              </AnimatePresence>
              {!ticket && (
                <div aria-hidden className="h-full w-full rounded-sm border border-line/60" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 text-center">
        {phase === "idle" && (
          <button
            type="button"
            onClick={start}
            className="rounded bg-accent px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-label text-surface-raised transition-all hover:shadow-glow"
          >
            Start the sprint
          </button>
        )}
        {phase === "playing" && (
          <p className="font-mono text-xs text-ink-faint">
            smash the scope creep before it ships itself
          </p>
        )}
        {phase === "over" && (
          <div aria-live="polite">
            <p className="font-semibold text-ink">
              Sprint over. {score} tickets deflected, {missed} leaked into the roadmap.
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {missed === 0
                ? "A perfect sprint. This has never happened in recorded history."
                : "The leaked ones are now 'commitments'. Classic."}
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-3 rounded border border-line px-5 py-2 text-sm text-ink transition-colors hover:border-accent/50"
            >
              Run another sprint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
