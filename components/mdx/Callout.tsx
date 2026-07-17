import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

type CalloutType = "info" | "insight" | "warning";

const icons: Record<CalloutType, typeof Info> = {
  info: Info,
  insight: Lightbulb,
  warning: TriangleAlert,
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

/** Monochrome aside: the icon and label differentiate, not color. */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];
  return (
    <aside className="my-7 rounded border border-line bg-surface-overlay/60 p-5">
      <div className="flex items-center gap-2 text-ink">
        <Icon size={14} aria-hidden className="text-ink-muted" />
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
          {type}
        </p>
        {title && <p className="text-sm font-semibold">{title}</p>}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink-muted [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
