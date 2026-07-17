export interface CareerMetric {
  value: string;
  label: string;
  methodology: string;
}

export const careerMetrics: CareerMetric[] = [
  {
    value: "150+",
    label: "user interviews",
    methodology:
      "Counted across Facets discovery cycles (NPS follow-ups, churn interviews) and Perfios client onboarding sessions.",
  },
  {
    value: "20+",
    label: "experiments shipped",
    methodology:
      "Mixpanel/Hotjar-instrumented funnel and retention experiments at Facets.",
  },
  {
    value: "$0.6M → $2M",
    label: "ARR growth",
    methodology:
      "As part of the Facets product team, Jun 2024 – Oct 2025. Team outcome, not sole attribution.",
  },
  {
    value: "35+",
    label: "features launched",
    methodology:
      "Facets release notes, from Dynamic Launch Wizard to Blue/Green deployments.",
  },
  {
    value: "20+",
    label: "enterprise clients configured",
    methodology:
      "LLM and prompt configuration at Perfios, cutting go-live setup time 30%.",
  },
  {
    value: "2",
    label: "roadmaps owned",
    methodology:
      "Facets platform roadmap (95% on-time delivery) and the FamilyOS 22-feature roadmap.",
  },
  {
    value: "4",
    label: "0→1 products shipped",
    methodology:
      "FinBot, FIFA Mania, Prep Copilot, FamilyOS (waitlist stage). Solo: product, design, build.",
  },
];
