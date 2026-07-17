"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { on, toast } from "@/lib/bus";

interface ModeContextValue {
  /** True once client state is hydrated (avoids SSR mismatch). */
  mounted: boolean;
  recruiter: boolean;
  toggleRecruiter: () => void;
}

const ModeContext = createContext<ModeContextValue>({
  mounted: false,
  recruiter: false,
  toggleRecruiter: () => undefined,
});

export function useMode(): ModeContextValue {
  return useContext(ModeContext);
}

/**
 * Recruiter mode: hides playful interactions and surfaces the fast path.
 * Activated via the header toggle, `?mode=recruiter`, or the command palette.
 */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [recruiter, setRecruiter] = useState(false);
  const recruiterRef = useRef(false);
  recruiterRef.current = recruiter;

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("mode");
    const stored = localStorage.getItem("pm-mode");
    const initial = fromUrl === "recruiter" || (fromUrl === null && stored === "recruiter");
    setRecruiter(initial);
    setMounted(true);

    // Side effects live outside the state updater — updaters must stay pure.
    return on("toggle-recruiter", () => {
      const next = !recruiterRef.current;
      setRecruiter(next);
      localStorage.setItem("pm-mode", next ? "recruiter" : "playful");
      toast(
        next
          ? "Recruiter mode on. Zero gimmicks, all signal. ~5 min read."
          : "Playful mode restored."
      );
    });
  }, []);

  const toggleRecruiter = () => {
    const next = !recruiterRef.current;
    setRecruiter(next);
    localStorage.setItem("pm-mode", next ? "recruiter" : "playful");
  };

  return (
    <ModeContext.Provider value={{ mounted, recruiter, toggleRecruiter }}>
      {children}
    </ModeContext.Provider>
  );
}

/** Renders children only in playful mode (after hydration, to match SSR). */
export function PlayfulOnly({ children }: { children: ReactNode }) {
  const { mounted, recruiter } = useMode();
  if (!mounted || recruiter) return null;
  return <>{children}</>;
}

/** Renders children only in recruiter mode. */
export function RecruiterOnly({ children }: { children: ReactNode }) {
  const { mounted, recruiter } = useMode();
  if (!mounted || !recruiter) return null;
  return <>{children}</>;
}
