import type { ProjectMetric } from "@/types/content";

/** Column count adapts to the number of metrics so rows always fill evenly. */
const colClass: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

/**
 * Highlighted stat row for case study pages. Uses a gap-px hairline grid so the
 * dividers stay aligned no matter how many metrics wrap onto a second row
 * (the old divide-x + first:pl-0 approach broke with 4+ metrics).
 */
export function MetricGrid({ metrics }: { metrics: ProjectMetric[] }) {
  if (!metrics?.length) return null;
  const cols = colClass[metrics.length] ?? "sm:grid-cols-3";

  return (
    <dl
      className={`my-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line ${cols}`}
    >
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface px-5 py-5">
          <dd className="font-mono text-2xl font-medium leading-tight tracking-tight text-accent">
            {m.value}
          </dd>
          <dt className="microlabel mt-1.5 normal-case">{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}
