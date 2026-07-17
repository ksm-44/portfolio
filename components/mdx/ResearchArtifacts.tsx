/** Research artifacts rendered as accessible HTML/SVG — the discovery receipts. */

interface Quote {
  quote: string;
  who: string;
}

export function InterviewNotes({ title, quotes }: { title: string; quotes: Quote[] }) {
  return (
    <figure className="my-8">
      <figcaption className="microlabel">
        research artifact · interview notes — {title}
      </figcaption>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {quotes.map((q) => (
          <blockquote key={q.quote} className="rounded-sm border border-line bg-surface-raised p-4 not-italic">
            <p className="text-sm leading-relaxed text-ink">&ldquo;{q.quote}&rdquo;</p>
            <footer className="microlabel mt-2">— {q.who}</footer>
          </blockquote>
        ))}
      </div>
    </figure>
  );
}

interface JourneyStage {
  stage: string;
  doing: string;
  feeling: string;
  opportunity: string;
}

export function JourneyMap({ title, stages }: { title: string; stages: JourneyStage[] }) {
  return (
    <figure className="my-8 overflow-x-auto">
      <figcaption className="microlabel">
        research artifact · journey map — {title}
      </figcaption>
      <table className="mt-3 w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th scope="col" className="w-24 px-3 py-2 text-left font-mono text-xs text-ink-faint" />
            {stages.map((s) => (
              <th key={s.stage} scope="col" className="border-b border-line px-3 py-2 text-left font-semibold text-ink">
                {s.stage}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="px-3 py-2 text-left font-mono text-xs text-ink-faint">doing</th>
            {stages.map((s) => (
              <td key={s.stage} className="border-b border-line/50 px-3 py-2 text-ink-muted">{s.doing}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="px-3 py-2 text-left font-mono text-xs text-ink-faint">feeling</th>
            {stages.map((s) => (
              <td key={s.stage} className="border-b border-line/50 px-3 py-2 italic text-ink-muted">{s.feeling}</td>
            ))}
          </tr>
          <tr>
            <th scope="row" className="px-3 py-2 text-left font-mono text-xs text-ink-faint">opportunity</th>
            {stages.map((s) => (
              <td key={s.stage} className="px-3 py-2 font-medium text-ink">{s.opportunity}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </figure>
  );
}

interface OstOpportunity {
  label: string;
  solutions: string[];
}

export function OpportunityTree({
  outcome,
  opportunities,
}: {
  outcome: string;
  opportunities: OstOpportunity[];
}) {
  return (
    <figure className="my-8">
      <figcaption className="microlabel">
        research artifact · opportunity solution tree
      </figcaption>
      <div className="mt-3 space-y-3">
        <p className="inline-block rounded-sm border border-accent px-4 py-2 text-sm font-semibold text-ink">
          {outcome}
        </p>
        <ul className="ml-4 space-y-3 border-l border-line pl-5">
          {opportunities.map((op) => (
            <li key={op.label}>
              <p className="text-sm font-medium text-ink">◆ {op.label}</p>
              <ul className="ml-3 mt-1.5 space-y-1 border-l border-line/60 pl-4">
                {op.solutions.map((sol) => (
                  <li key={sol} className="text-sm text-ink-muted">
                    ▹ {sol}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
