export const nowUpdated = "2026-07-15";

export interface NowItem {
  title: string;
  note: string;
}

export const nowSections: Array<{ id: string; heading: string; items: NowItem[] }> = [
  {
    id: "building",
    heading: "Building",
    items: [
      {
        title: "FamilyOS",
        note: "The app behind the 60+ family waitlist, in progress.",
      },
      {
        title: "FinBot",
        note: "Iterating on the insights engine of my daily-use finance tracker.",
      },
    ],
  },
  {
    id: "learning",
    heading: "Learning",
    items: [
      {
        title: "Agentic AI for personal finance",
        note: "Plus embedded finance and conversational financial experiences — where my fintech day job and side projects converge.",
      },
    ],
  },
  {
    id: "reading",
    heading: "Reading",
    items: [
      {
        title: "The Coming Wave — Mustafa Suleyman",
        note: "Sober on containment where most AI books are either hype or doom.",
      },
      {
        title: "Lenny's Newsletter · FinTech Collective",
        note: "The two subscriptions that survive my inbox purges.",
      },
    ],
  },
  {
    id: "shipped",
    heading: "Recently shipped",
    items: [
      { title: "FinBot", note: "Chat-native finance tracker, in daily use." },
      { title: "FIFA Mania", note: "104-match World Cup content engine." },
      { title: "PM Prep Copilot", note: "Local-first interview coach." },
    ],
  },
];
