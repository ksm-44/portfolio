import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { incidents, systems, type SystemState } from "@/config/status";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Career Status",
  description: "Real-time operational status of one (1) product manager.",
  path: "/status",
});

/** Dot semantics: filled, half, outline, pulsing — no traffic-light colors. */
const stateStyles: Record<SystemState, { dot: string; label: string }> = {
  operational: { dot: "border-accent bg-accent", label: "Operational" },
  degraded: { dot: "border-accent bg-accent/40", label: "Degraded" },
  recovering: { dot: "border-accent bg-accent/40", label: "Recovering" },
  "at capacity": { dot: "border-accent bg-accent animate-pulse", label: "At capacity" },
  scheduled: { dot: "border-accent bg-transparent", label: "Scheduled" },
};

/** Deterministic pseudo-random uptime bars so SSR and client agree. */
function bars(seed: string): number[] {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 997;
  return Array.from({ length: 60 }, (_, i) => {
    h = (h * 137 + i) % 997;
    return h % 23 === 0 ? 1 : h % 41 === 0 ? 2 : 0;
  });
}

export default function StatusPage() {
  return (
    <Container className="pt-16 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="microlabel">status.career — all systems mostly operational</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tightest sm:text-4xl">
            Career status
          </h1>
          <p className="mt-4 max-w-[52ch] text-ink-muted">
            Live operational health of one (1) product manager. Refreshed whenever
            something breaks.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <ul className="divide-y divide-line border-y border-line">
            {systems.map((sys) => {
              const style = stateStyles[sys.state];
              return (
                <li key={sys.name} className="py-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn("h-2 w-2 rounded-full border", style.dot)}
                        aria-hidden
                      />
                      <p className="font-medium text-ink">{sys.name}</p>
                    </div>
                    <p className="microlabel">{style.label}</p>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-muted">{sys.note}</p>
                  <div
                    className="mt-3 flex h-5 items-end gap-[2px]"
                    aria-hidden
                  >
                    {bars(sys.name).map((b, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-full flex-1 rounded-none",
                          b === 0 && "h-full bg-accent/25",
                          b === 1 && "h-3 bg-accent/60",
                          b === 2 && "h-2 bg-accent"
                        )}
                      />
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-16 text-xl font-semibold tracking-tightest">Incident history</h2>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {incidents.map((inc) => (
              <li key={inc.title} className="py-4">
                <p className="microlabel">{inc.year}</p>
                <p className="mt-1 font-medium text-ink">{inc.title}</p>
                <p className="mt-1 text-sm text-ink-muted">{inc.postmortem}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Container>
  );
}
