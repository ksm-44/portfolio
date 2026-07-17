import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Chakra Petch microlabel tag with an accent hairline. */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-accent/25 px-2 py-0.5 font-display text-[10px] font-semibold uppercase tracking-label text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
