"use client";

import { emit } from "@/lib/bus";
import { useModKey } from "@/hooks/useModKey";

export function OpenPaletteButton() {
  const mod = useModKey();
  return (
    <button
      type="button"
      onClick={() => emit("open-palette")}
      className="microlabel rounded-sm border border-accent/35 px-3 py-1.5 text-accent transition-all hover:border-accent hover:shadow-glow-sm"
    >
      open palette ({mod} K)
    </button>
  );
}

export function ReplayBootButton() {
  return (
    <button
      type="button"
      onClick={() => emit("replay-boot")}
      className="microlabel rounded-sm border border-accent/35 px-3 py-1.5 text-accent transition-all hover:border-accent hover:shadow-glow-sm"
    >
      replay boot
    </button>
  );
}

export function ToggleRecruiterButton() {
  return (
    <button
      type="button"
      onClick={() => emit("toggle-recruiter")}
      className="microlabel rounded-sm border border-accent/35 px-3 py-1.5 text-accent transition-all hover:border-accent hover:shadow-glow-sm"
    >
      toggle recruiter mode
    </button>
  );
}
