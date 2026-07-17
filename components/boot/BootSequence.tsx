"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { on } from "@/lib/bus";
import { bootLines as BOOT_LINES } from "@/config/status";

/** Re-show the boot after this long, so it isn't a strictly one-shot gag. */
const REBOOT_AFTER_MS = 30 * 60 * 1000;

/**
 * OS-style boot overlay. Shows on arrival (again after 30 idle minutes),
 * renders a static fast variant under reduced motion instead of skipping,
 * and can be replayed via the `replay-boot` bus event (see /features).
 */
export function BootSequence() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const play = useCallback(() => {
    localStorage.setItem("pm-booted-at", String(Date.now()));
    setLineCount(reduce ? BOOT_LINES.length : 0);
    setVisible(true);
  }, [reduce]);

  // Initial boot decision.
  useEffect(() => {
    const last = Number(localStorage.getItem("pm-booted-at") ?? 0);
    if (Date.now() - last > REBOOT_AFTER_MS) play();
    return on("replay-boot", play);
  }, [play]);

  // Line-by-line reveal + auto dismiss.
  useEffect(() => {
    if (!visible) return;
    const timers: number[] = [];
    if (reduce) {
      timers.push(window.setTimeout(() => setVisible(false), 1500));
    } else {
      BOOT_LINES.forEach((_, i) => {
        timers.push(window.setTimeout(() => setLineCount(i + 1), 250 + i * 320));
      });
      timers.push(
        window.setTimeout(() => setVisible(false), 250 + BOOT_LINES.length * 320 + 700)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [visible, reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Site loading"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
        >
          <div className="w-full max-w-md px-6 font-mono text-[13px] leading-7">
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <motion.p
                key={line}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className={
                  i === BOOT_LINES.length - 1
                    ? "text-accent"
                    : line.startsWith("$")
                      ? "text-ink"
                      : "text-ink-muted"
                }
              >
                {line}
              </motion.p>
            ))}
            <span className="inline-block h-4 w-2 animate-pulse bg-accent" aria-hidden />
          </div>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="microlabel absolute bottom-6 right-6 rounded-sm border border-accent/35 px-3 py-1.5 text-accent transition-all hover:border-accent hover:shadow-glow-sm"
          >
            skip ↵
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
