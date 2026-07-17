import { careerMetrics } from "@/config/metrics";

/** Career totals with counting methodology — the footnotes are the point. */
export function MetricsDashboard() {
  return (
    <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {careerMetrics.map((m) => (
        <div key={m.label} className="flex flex-col border-t border-accent/30 pt-4">
          <p className="font-mono text-3xl font-medium tracking-tight text-accent">{m.value}</p>
          <p className="mt-1 text-sm font-medium text-ink">{m.label}</p>
          <p className="mt-3 text-xs leading-relaxed text-ink-faint">
            <span className="font-display uppercase tracking-label text-ink-muted">counted:</span>{" "}
            {m.methodology}
          </p>
        </div>
      ))}
    </div>
  );
}
