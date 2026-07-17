"use client";

import { useEffect, useState } from "react";

/**
 * Platform-aware modifier label: "⌘" on macOS/iOS, "Ctrl" elsewhere.
 * Defaults to "Ctrl" pre-hydration (statistically the safer guess).
 */
export function useModKey(): string {
  const [mod, setMod] = useState("Ctrl");

  useEffect(() => {
    const platform =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (navigator as any).userAgentData?.platform ?? navigator.platform ?? "";
    if (/mac|iphone|ipad|ipod/i.test(platform)) setMod("⌘");
  }, []);

  return mod;
}
