import type { ProjectMetric } from "@/types/content";

/** Highlighted stat row used on case study pages. */
export function MetricGrid({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <dl className="my-10 grid grid-cols-2 divide-x divide-line border-y border-line sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="px-5 py-5 first:pl-0">
          <dd className="font-mono text-2xl font-medium tracking-tight text-accent">{m.value}</dd>
          <dt className="microlabel mt-1.5">{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}
