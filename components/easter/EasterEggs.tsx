"use client";

import { useEffect } from "react";
import { toast } from "@/lib/bus";

/** Global typed-word easter eggs: `sudo` and `ship`. */
export function EasterEggs() {
  useEffect(() => {
    let typed = "";

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key)) {
        typed = (typed + key).slice(-12);
        if (typed.endsWith("sudo")) {
          toast("Permission granted. You now have root access to the roadmap.");
          typed = "";
        } else if (typed.endsWith("ship")) {
          toast("It's shipped. We'll fix it in the fast-follow.");
          typed = "";
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
