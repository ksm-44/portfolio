export const siteConfig = {
  name: "Krishna Mundra",
  title: "Krishna Mundra — Product Manager",
  role: "Product Manager · AI & Platform Products",
  description:
    "I build AI products for enterprise B2B — document intelligence at Perfios, infrastructure orchestration at Facets before that. Nights and weekends, I ship my own: a chat-native finance tracker, a World Cup content engine, an interview-prep copilot, and a household OS.",
  // REPLACE when a domain is purchased (e.g. "https://krishnamundra.com").
  // Until then this drives canonical URLs/sitemap; swap for your *.vercel.app URL after first deploy.
  url: "https://krishnamundra.vercel.app",
  locale: "en_IN",
  availability:
    "Passively exploring PM roles in fintech and healthtech, with a bias toward AI-heavy products.",
  location: "Bangalore, India",
  author: {
    name: "Krishna Mundra",
    email: "krishnamundra222@gmail.com",
    twitter: "",
    linkedin: "https://www.linkedin.com/in/krishnamundra4/",
    github: "https://github.com/ksm-44",
    calendly: "https://calendar.app.google/Ya2RvR9YepMz6WEp8",
  },
  nav: [
    { label: "Work", href: "/projects" },
    { label: "Decisions", href: "/decisions" },
    { label: "Teardowns", href: "/teardowns" },
    { label: "Now", href: "/now" },
    { label: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
