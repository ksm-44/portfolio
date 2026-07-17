import { cn } from "@/lib/utils";

interface FlowStep {
  label: string;
  note: string;
  good?: boolean;
}

/** Annotated product-flow diagram. Solid = works, dashed = doesn't. */
export function Flow({ title, steps }: { title: string; steps: FlowStep[] }) {
  return (
    <figure className="my-9">
      <figcaption className="microlabel">flow · {title}</figcaption>
      <ol className="mt-3 flex flex-col gap-0 sm:flex-row sm:items-stretch">
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-1 flex-col sm:flex-row sm:items-stretch">
            <div
              className={cn(
                "flex-1 rounded-sm border bg-surface-raised p-3.5",
                step.good === false ? "border-dashed border-accent/60" : "border-line"
              )}
            >
              <p className="text-sm font-medium text-ink">{step.label}</p>
              <p className="mt-1.5 text-xs leading-snug text-ink-muted">
                {step.good === false && <span className="font-mono">✕ </span>}
                {step.good === true && <span className="font-mono">✓ </span>}
                {step.note}
              </p>
            </div>
            {i < steps.length - 1 && (
              <span aria-hidden className="mx-auto my-1 text-ink-faint sm:mx-1.5 sm:self-center">
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
