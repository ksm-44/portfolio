"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { emit } from "@/lib/bus";
import { useMode } from "@/components/mode/mode-store";
import { useModKey } from "@/hooks/useModKey";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const { mounted, recruiter } = useMode();
  const mod = useModKey();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/95 backdrop-blur-[2px]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="shrink-0 font-mono text-[13px] font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          {siteConfig.name.toLowerCase().replace(" ", ".")}
          <span className="text-accent">()</span>
        </Link>
        <div className="flex min-w-0 items-center gap-4 overflow-x-auto sm:gap-5">
          {siteConfig.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap border-b py-1 text-[13px] transition-colors",
                  active
                    ? "border-accent text-ink"
                    : "border-transparent text-ink-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <span aria-hidden className="hidden h-4 w-px bg-line sm:block" />
          <button
            type="button"
            onClick={() => emit("toggle-recruiter")}
            aria-pressed={mounted ? recruiter : false}
            title={recruiter ? "Playful mode" : "Recruiter mode: no gimmicks, ~5 min read"}
            className={cn(
              "shrink-0 rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors",
              mounted && recruiter
                ? "border-accent bg-accent text-surface-raised"
                : "border-line text-ink-muted hover:border-accent/50 hover:text-ink"
            )}
          >
            {mounted && recruiter ? "recruiter · on" : "recruiter"}
          </button>
          <button
            type="button"
            onClick={() => emit("open-palette")}
            aria-label="Open command palette"
            className="shrink-0 rounded-sm border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted transition-colors hover:border-accent/50 hover:text-ink"
          >
            {mod} K
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
