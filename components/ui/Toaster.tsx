"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { on } from "@/lib/bus";

interface ToastItem {
  id: number;
  message: string;
}

/** Listens for `toast` bus events and renders stacked notifications. */
export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    let counter = 0;
    return on("toast", (detail) => {
      const id = ++counter;
      setToasts((t) => [...t, { id, message: String(detail) }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
    });
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="w-full rounded border border-line bg-ink px-4 py-2.5 text-center font-mono text-xs text-surface"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
