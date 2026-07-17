export interface Outcome {
  value: string;
  label: string;
  source: string;
  href?: string;
}

export const featuredOutcomes: Outcome[] = [
  {
    value: "30%",
    label: "release velocity improvement",
    source: "Facets.cloud platform",
  },
  {
    value: "$0.6M → $2M",
    label: "ARR growth as part of the product team",
    source: "Facets.cloud · Jun 2024 – Oct 2025",
  },
  {
    value: "60s → <10s",
    label: "time to log a transaction",
    source: "FinBot",
    href: "/projects/finbot",
  },
  {
    value: "104 / 104",
    label: "World Cup matches covered by one person",
    source: "FIFA Mania",
    href: "/projects/fifa-mania",
  },
  {
    value: "40%",
    label: "faster Terraform module setup via MCP server",
    source: "Facets.cloud",
  },
];
