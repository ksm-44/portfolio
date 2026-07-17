export interface CareerCommit {
  hash: string;
  type: "feat" | "fix" | "refactor" | "revert" | "merge" | "init";
  message: string;
  date: string;
  details: string;
}

/** Newest first, the way a git log reads. */
export const careerLog: CareerCommit[] = [
  {
    hash: "f4a1c92",
    type: "feat",
    message: "feat: ship four AI side projects in parallel",
    date: "2026",
    details:
      "FinBot, FIFA Mania, Prep Copilot, FamilyOS. I get bored with repetitive work; PM is the job where the problem changes daily and you operate like a founder. The plan is to become an actual one.",
  },
  {
    hash: "d83be07",
    type: "feat",
    message: "feat: move to Perfios for fintech",
    date: "2025",
    details:
      "Wanted the domain, not just the craft: financial document intelligence, LLM configuration for 20+ enterprise clients, HITL workflow design.",
  },
  {
    hash: "9c2f5a1",
    type: "merge",
    message: "merge: intern → full-time Product Manager at Facets",
    date: "2024",
    details:
      "My users were DevOps engineers and developers — the hardest audience to please. 35+ features, a 30% release velocity improvement, and an MCP server for AI-driven infra workflows.",
  },
  {
    hash: "71e0bd4",
    type: "feat",
    message: "feat: intern at Facets.cloud during final year",
    date: "2023–2024",
    details: "First real product work, shipped alongside coursework.",
  },
  {
    hash: "4b7d2e8",
    type: "revert",
    message: "revert: drop the MBA plan",
    date: "2023",
    details:
      "The default path for an engineer who likes management is an MBA. I was already mid-way through a master's I couldn't skip, and when I looked closely, the PM role was the actual job I wanted — the MBA was the expensive detour to it. Rolled back, self-studied product instead.",
  },
  {
    hash: "2a95c03",
    type: "feat",
    message: "feat: take every leadership role I could find",
    date: "2021–2023",
    details:
      "Music secretary, student guide for juniors, then General Secretary of Socio-Cultural affairs: 12 clubs and the Alma Fiesta cultural fest. This is where I learned I liked running things more than analyzing them.",
  },
  {
    hash: "0000001",
    type: "init",
    message: "init: enroll at IIT Bhubaneswar, dual-degree civil engineering",
    date: "2019",
    details:
      "Grew up around a family business, which installed first-principles thinking and an itch to build before I knew what product management was.",
  },
];
