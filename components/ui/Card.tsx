import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "glass p-4 transition-all duration-150 hover:border-accent/40 hover:shadow-glow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
