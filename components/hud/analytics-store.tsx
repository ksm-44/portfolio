"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface VisitorStats {
  seconds: number;
  scrollDepth: number;
  clicks: number;
  rageClicks: number;
  decisions: number;
  conversions: number;
  /** Rolling engagement score history for the sparkline. */
  history: number[];
  score: number;
}

const initialStats: VisitorStats = {
  seconds: 0,
  scrollDepth: 0,
  clicks: 0,
  rageClicks: 0,
  decisions: 0,
  conversions: 0,
  history: [],
  score: 0,
};

interface AnalyticsContextValue {
  stats: VisitorStats;
  recordDecision: () => void;
  recordConversion: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue>({
  stats: initialStats,
  recordDecision: () => undefined,
  recordConversion: () => undefined,
});

export function useVisitorAnalytics(): AnalyticsContextValue {
  return useContext(AnalyticsContext);
}

function computeScore(s: VisitorStats): number {
  const raw =
    Math.min(s.seconds, 120) * 0.3 +
    s.scrollDepth * 0.35 +
    Math.min(s.clicks, 30) * 1.2 +
    s.decisions * 8 +
    s.conversions * 12 -
    s.rageClicks * 4;
  return Math.max(1, Math.min(99, Math.round(raw)));
}

/** Tracks the visitor like a product would: scroll, clicks, rage, dwell. */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<VisitorStats>(initialStats);
  const clickTimes = useRef<number[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const depth = max > 0 ? Math.round((window.scrollY / max) * 100) : 100;
      setStats((s) =>
        depth > s.scrollDepth ? { ...s, scrollDepth: depth } : s
      );
    };

    const onClick = () => {
      const now = Date.now();
      clickTimes.current = [...clickTimes.current.filter((t) => now - t < 600), now];
      const rage = clickTimes.current.length >= 3;
      if (rage) clickTimes.current = [];
      setStats((s) => ({
        ...s,
        clicks: s.clicks + 1,
        rageClicks: s.rageClicks + (rage ? 1 : 0),
      }));
    };

    const tick = window.setInterval(() => {
      setStats((s) => {
        const next = { ...s, seconds: s.seconds + 1 };
        next.score = computeScore(next);
        next.history = [...s.history.slice(-29), next.score];
        return next;
      });
    }, 1000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    return () => {
      window.clearInterval(tick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const recordDecision = () =>
    setStats((s) => ({ ...s, decisions: s.decisions + 1 }));
  const recordConversion = () =>
    setStats((s) => ({ ...s, conversions: s.conversions + 1 }));

  return (
    <AnalyticsContext.Provider value={{ stats, recordDecision, recordConversion }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
