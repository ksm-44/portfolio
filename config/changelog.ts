export interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "6.0.0",
    date: "2026-07",
    type: "major",
    changes: [
      "content: replaced the sample persona with the real one. hello, I'm Krishna",
      "feat: four real case studies — FinBot, FIFA Mania, Prep Copilot, FamilyOS",
      "feat: real decision journal, including the IPL pipeline I shouldn't have built",
      "feat: career git log now starts at IIT Bhubaneswar and includes the dropped MBA",
      "note: every number on this site is either sourced or labelled as a team outcome",
    ],
  },
  {
    version: "5.0.0",
    date: "2026-07",
    type: "major",
    changes: [
      "design: Aether semantic system — retro-futurist dark, dot-matrix field, Chakra Petch + Fira Code",
      "feat: /features — every widget documented like a product, with live triggers",
      "fix: boot sequence now replays after 30 idle minutes, works under reduced motion, and can be rebooted from the palette",
      "feat: shortcut labels are platform-aware (⌘K on macOS, Ctrl+K elsewhere)",
      "removed: founder mode. the board voted",
    ],
  },
  {
    version: "4.0.0",
    date: "2026-07",
    type: "major",
    changes: [
      "BREAKING: removed everything that was trying to be impressive",
      "design: monochrome editorial system — one accent, hairlines, flat surfaces",
      "design: the clever interactions stay; the visual noise around them doesn't",
      "fix: boot sequence render bug (state updates during render)",
      "removed: glassmorphism, glows, gradients, floating blobs. they had a good run",
    ],
  },
  {
    version: "3.0.0",
    date: "2026-07",
    type: "major",
    changes: [
      "BREAKING: jokes now required to carry information. PRD confetti deprecated with honors",
      "feat: recruiter mode — one toggle, zero gimmicks, ~5 minute path to a decision",
      "feat: decision journal, including the entries where I was wrong",
      "feat: product teardowns — Spotify, Duolingo, Uber, Notion AI. opinionated",
      "feat: /now page and /impact dashboard with counting methodology",
      "refactor: case studies restructured around Problem → Constraints → Decision → Outcome → Learning",
    ],
  },
  {
    version: "2.3.1",
    date: "2026-07",
    type: "major",
    changes: [
      "BREAKING: removed all portfolio norms",
      "feat: site now product-manages its own visitors (HUD, experiments, cohorts)",
      "feat: case studies are playable — make the call, then see mine",
      "feat: command palette replaces navigation. mice are legacy",
      "fix: boring",
    ],
  },
  {
    version: "2.0.0",
    date: "2026-07",
    type: "major",
    changes: [
      "BREAKING: deprecated the traditional about page in favor of `git log --career`",
      "feat: 404 page is now a playable sprint",
      "feat: status page for my career. current uptime: acceptable",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-07",
    type: "minor",
    changes: [
      "init: a perfectly respectable portfolio",
      "docs: three case studies with actual numbers",
      "note: this version was reviewed as 'shitty'. feedback is a gift",
    ],
  },
];
