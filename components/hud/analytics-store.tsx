"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

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

/** Scroll depth (0-100) for the active page. 0 when the page doesn't scroll. */
function currentScrollDepth(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
}

/** Tracks the visitor like a product would: scroll, clicks, rage, dwell. */
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<VisitorStats>(initialStats);
  const clickTimes = useRef<number[]>([]);
  const pathname = usePathname();

  // Reset per-page scroll depth on route change so the previous page's max
  // never carries over into the next one. Deferred a frame so the new page's
  // height is what gets measured.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setStats((s) => ({ ...s, scrollDepth: currentScrollDepth() }));
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const depth = currentScrollDepth();
      // Deepest point reached on THIS page; navigation resets it above.
      setStats((s) => (depth > s.scrollDepth ? { ...s, scrollDepth: depth } : s));
    };
    const onScrollOrResize = () => {
      if (!frame) frame = requestAnimationFrame(measure);
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

    // Only accrue dwell time while the tab is actually visible.
    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setStats((s) => {
        const next = { ...s, seconds: s.seconds + 1 };
        next.score = computeScore(next);
        next.history = [...s.history.slice(-29), next.score];
        return next;
      });
    }, 1000);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("click", onClick);
    return () => {
      window.clearInterval(tick);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const recordDecision = () =>
    setStats((s) => {
      const next = { ...s, decisions: s.decisions + 1 };
      next.score = computeScore(next);
      return next;
    });
  const recordConversion = () =>
    setStats((s) => {
      const next = { ...s, conversions: s.conversions + 1 };
      next.score = computeScore(next);
      return next;
    });

  return (
    <AnalyticsContext.Provider value={{ stats, recordDecision, recordConversion }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
