export type SystemState =
  | "operational"
  | "degraded"
  | "recovering"
  | "at capacity"
  | "scheduled";

export interface SystemStatus {
  name: string;
  state: SystemState;
  note: string;
}

export interface Incident {
  year: string;
  title: string;
  postmortem: string;
}

export const systems: SystemStatus[] = [
  { name: "Side-project pipeline", state: "operational", note: "4 shipped, 1 in build" },
  { name: "Repetition tolerance", state: "degraded", note: "Since 2024 · known issue, wontfix; it's why I'm a PM" },
  { name: "New-AI-tool curiosity", state: "at capacity", note: "Utilization pinned at 100%, daily" },
  { name: "Football feed", state: "recovering", note: "Elevated load during World Cup 2026 has passed" },
  { name: "Founder ambition", state: "scheduled", note: "Long-running background job · ETA: someday" },
  { name: "Coffee dependency", state: "degraded", note: "Before 9am · standard" },
];

export const incidents: Incident[] = [
  {
    year: "2023",
    title: "MBA plan deprecated",
    postmortem:
      "Root cause: the PM role was the actual goal; the MBA was the detour. Rolled back to direct path. No data lost.",
  },
  {
    year: "2026",
    title: "IPL pipeline built before demand signal",
    postmortem:
      "Postmortem: validate with 10 manual posts before automating. Action item adopted across all future projects.",
  },
  {
    year: "2026",
    title: "FamilyOS priced in dollars for a rupee market",
    postmortem:
      "Root cause: US-template business plan. Fixed in revenue-model v2.",
  },
];

export const bootLines = [
  "$ pm-os boot --user=krishna",
  "▸ loading first-principles module (family business edition)… done",
  "▸ mounting 12 socio-cultural clubs… ok",
  "▸ detecting hardest users: DevOps engineers found",
  "▸ routing sensitive data: local only",
  "▸ all 104 matches accounted for",
  "✓ command center ready. welcome, visitor.",
];
