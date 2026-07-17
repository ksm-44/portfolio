"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div aria-hidden className="h-7 w-7" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-sm border border-line text-ink-muted transition-colors hover:border-accent/50 hover:text-ink"
    >
      {isDark ? <Sun size={13} /> : <Moon size={13} />}
    </button>
  );
}
