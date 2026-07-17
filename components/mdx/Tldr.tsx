interface TldrProps {
  problem: string;
  outcome: string;
}

/** Two-line summary for skimmers, placed at the top of case studies. */
export function Tldr({ problem, outcome }: TldrProps) {
  return (
    <aside aria-label="TL;DR" className="my-9 border-y border-accent/30 py-5">
      <dl className="space-y-2 text-sm">
        <div className="flex gap-4">
          <dt className="microlabel w-24 shrink-0 pt-0.5">Problem</dt>
          <dd className="text-ink-muted">{problem}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="microlabel w-24 shrink-0 pt-0.5">Outcome</dt>
          <dd className="font-medium text-ink">{outcome}</dd>
        </div>
      </dl>
    </aside>
  );
}

/** Anchor navigation across the five sections every case study shares. */
export function CaseToc() {
  const sections = ["Problem", "Constraints", "Decision", "Outcome", "Learning"];
  return (
    <nav aria-label="Case study sections" className="my-6">
      <ol className="flex flex-wrap gap-x-5 gap-y-2">
        {sections.map((s, i) => (
          <li key={s}>
            <a
              href={`#${s.toLowerCase()}`}
              className="microlabel transition-colors hover:text-ink"
            >
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> {s}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
