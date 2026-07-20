export interface Principle {
  title: string;
  body: string;
  receipt: string;
  receiptHref: string;
}

/** Each principle links to the work that proves it — principles without receipts are posters. */
export const principles: Principle[] = [
  {
    title: "Start with the user's journey, not their feature request.",
    body: "Users describe solutions more often than problems. Sitting through the day-to-day of how people actually worked — rather than taking the feature ask at face value — is what surfaced the root causes they couldn't put into words, and it consistently led to higher-impact work than building the request.",
    receipt: "Facets",
    receiptHref: "/projects/facets",
  },
  {
    title: "Great product decisions balance user value with business value.",
    body: "I started out optimizing almost entirely for user needs. Over time the pattern became clear: the work that lands is the work where user outcomes line up with the company's vision, revenue, and strategy. Every real decision turned into a trade-off across user impact, business goals, technical feasibility, and market reality — not just customer feedback.",
    receipt: "Facets · Perfios",
    receiptHref: "/projects/perfios",
  },
  {
    title: "Validation beats assumptions, and adoption beats shipping.",
    body: "My process moved from 'identify a problem → build → ship' to a full loop: validate the problem with a diverse set of users, weigh several solutions, prioritize on impact and business goals, ship in phases, measure adoption, iterate. Shipping a feature is only halfway; sustained adoption is the actual finish line.",
    receipt: "FIFA Mania",
    receiptHref: "/projects/fifa-mania",
  },
  {
    title: "The technically best solution isn't always the right product solution.",
    body: "Elegant architectures and feature-rich builds don't automatically translate into adoption. The winning option is usually the one that's simplest to learn and easiest to adopt, even when it's not the most sophisticated thing you could build.",
    receipt: "Facets · Prep Copilot",
    receiptHref: "/projects/prep-copilot",
  },
  {
    title: "Every market has its own rules — context matters more than frameworks.",
    body: "Fintech taught me product principles aren't universal. Financial institutions prioritize security, accuracy, compliance, and stability over speed or novelty, and they adopt new technology — AI especially — far more cautiously than startups. Trust and reliability become the core design constraints, not afterthoughts.",
    receipt: "Perfios",
    receiptHref: "/projects/perfios",
  },
];
