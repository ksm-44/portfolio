"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { emit, on, toast } from "@/lib/bus";
import { siteConfig } from "@/config/site";

interface Command {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      { id: "home", label: "cd ~/", hint: "Home", keywords: "home start", run: () => router.push("/") },
      { id: "work", label: "open case-studies/", hint: "Work", keywords: "work projects case studies", run: () => router.push("/projects") },
      { id: "about", label: "git log --career", hint: "About", keywords: "about me bio history", run: () => router.push("/about") },
      { id: "now", label: "cat now.md", hint: "Current focus", keywords: "now building learning reading backlog roadmap", run: () => router.push("/now") },
      { id: "decisions", label: "open decision-journal/", hint: "Incl. the failures", keywords: "decisions journal tradeoffs failures", run: () => router.push("/decisions") },
      { id: "teardowns", label: "read teardowns/", hint: "Product reviews", keywords: "teardowns spotify duolingo uber notion reviews", run: () => router.push("/teardowns") },
      { id: "impact", label: "query career.metrics", hint: "Impact dashboard", keywords: "impact metrics dashboard numbers", run: () => router.push("/impact") },
      { id: "recruiter", label: "toggle --recruiter-mode", hint: "No gimmicks, 5-min path", keywords: "recruiter mode serious fast resume", run: () => emit("toggle-recruiter") },
      { id: "resume", label: "wget resume.pdf", hint: "Download resume", keywords: "resume cv download pdf", run: () => { window.location.href = "/resume.pdf"; } },
      { id: "status", label: "curl status.me", hint: "Career status page", keywords: "status uptime incidents", run: () => router.push("/status") },
      { id: "changelog", label: "cat CHANGELOG.md", hint: "Site changelog", keywords: "changelog versions", run: () => router.push("/changelog") },
      { id: "rice", label: "run rice-calculator", hint: "Should you hire me?", keywords: "rice hire calculator score", run: () => router.push("/hire-me") },
      { id: "theme", label: "toggle --theme", hint: "Dark/light mode", keywords: "theme dark light mode", run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark") },
      { id: "email", label: "mail -s 'hello'", hint: "Copy email", keywords: "email contact copy", run: () => { void navigator.clipboard.writeText(siteConfig.author.email); toast("Email copied. Response SLA: surprisingly fast."); } },
      { id: "sudo", label: "sudo hire-me", hint: "Escalate privileges", keywords: "sudo hire root", run: () => toast("Permission granted. Offer letter compiling…") },
      { id: "404", label: "open /missing-page", hint: "Play the 404 game", keywords: "404 game whack backlog", run: () => router.push("/this-page-does-not-exist") },
      { id: "features", label: "ls --features", hint: "Every widget on this site", keywords: "features widgets list help what can this do", run: () => router.push("/features") },
      { id: "boot", label: "reboot pm-os", hint: "Replay the boot sequence", keywords: "boot reboot replay loader intro", run: () => emit("replay-boot") },
    ],
    [router, resolvedTheme, setTheme]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const off = on("open-palette", () => setOpen(true));
    return () => {
      window.removeEventListener("keydown", onKey);
      off();
    };
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const cmd = filtered[index];
      if (cmd) {
        close();
        cmd.run();
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/20"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-[14vh] w-[92%] max-w-lg overflow-hidden glass shadow-glow"
          >
            <div className="flex items-center gap-2 border-b border-line px-4">
              <Terminal size={15} className="text-accent" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="type a command…"
                aria-label="Search commands"
                className="w-full bg-transparent py-3.5 font-mono text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <kbd className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">esc</kbd>
            </div>
            <ul role="listbox" aria-label="Commands" className="max-h-[46vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-4 font-mono text-sm text-ink-faint">
                  command not found. have you tried turning the roadmap off and on again?
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.id} role="option" aria-selected={i === index}>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      cmd.run();
                    }}
                    onMouseEnter={() => setIndex(i)}
                    className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left font-mono text-[13px] transition-colors ${
                      i === index ? "bg-surface-overlay text-ink" : "text-ink-muted"
                    }`}
                  >
                    <span>
                      <span className="text-accent">❯</span> {cmd.label}
                    </span>
                    <span className="text-xs text-ink-faint">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
