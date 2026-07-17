"use client";

import Link from "next/link";
import { RecruiterOnly } from "@/components/mode/mode-store";
import { siteConfig } from "@/config/site";

/** The 5-minute recruiter path: resume, contact, no detours. */
export function RecruiterPath() {
  return (
    <RecruiterOnly>
      <section aria-labelledby="recruiter-path" className="pb-4 pt-14">
        <div className="rounded border border-ink p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="recruiter-path" className="text-lg font-semibold tracking-tightest">
              The fast path
            </h2>
            <p className="microlabel">~5 minute read, start to decision</p>
          </div>
          <ol className="mt-5 grid gap-2.5 text-sm text-ink-muted sm:grid-cols-2">
            <li>1. Outcomes below — every number links to evidence.</li>
            <li>
              2. Read the top case study:{" "}
              <Link href="/projects/finbot" className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent">
                FinBot
              </Link>{" "}
              (4 min).
            </li>
            <li>
              3. Skim{" "}
              <Link href="/impact" className="text-accent underline decoration-accent/40 underline-offset-[3px] hover:decoration-accent">
                career metrics
              </Link>{" "}
              — with counting methodology.
            </li>
            <li>4. Reach out below. {siteConfig.availability}</li>
          </ol>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              className="inline-flex items-center rounded bg-ink px-4 py-2.5 text-sm font-medium text-surface transition-colors hover:shadow-glow"
            >
              Resume (PDF)
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex items-center rounded border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent/50"
            >
              {siteConfig.author.email}
            </a>
            <a
              href={siteConfig.author.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent/50"
            >
              Book 20 minutes
            </a>
          </div>
        </div>
      </section>
    </RecruiterOnly>
  );
}
