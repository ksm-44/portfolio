# PM Portfolio — "You Are The User"

A product manager portfolio that behaves like a live product actively product-managing its visitors — with a **recruiter mode** that strips the theater and delivers a 5-minute path to a hiring decision. Built with Next.js App Router, strict TypeScript, Tailwind CSS, Framer Motion, and an MDX content engine.

Central message every interaction reinforces: *sound product decisions, measurable user and business impact.*

## ⚠️ REPLACE-ME checklist (before launching)

Placeholder content that must become YOUR real data — invented metrics in a job hunt will backfire:

- `config/site.ts` — name, email, URL, socials, Calendly
- `config/outcomes.ts` — featured outcome numbers
- `config/metrics.ts` — career totals + counting methodology
- `config/career.ts`, `config/now.ts`, `config/principles.ts`, `config/status.ts`
- `content/projects/*`, `content/decisions/*`, `content/teardowns/*` — sample content in a consistent voice; rewrite with your work
- `public/resume.pdf` — placeholder PDF

## The credibility layer (v3)

- **Recruiter mode** — header toggle or `?mode=recruiter`: hides boot/HUD/experiments/easter eggs, surfaces Featured Outcomes → top case studies → metrics → resume/contact. ~5 min read (`components/mode/`)
- **Featured Outcomes** — quantified wins with count-up, each linking to its case study (`config/outcomes.ts`)
- **/impact** — metrics dashboard where every number states how it was counted (`config/metrics.ts`)
- **/decisions** — decision journal: hypothesis → evidence → result → what I'd do differently, failures included (`content/decisions/`)
- **/teardowns** — 3-minute opinionated product reviews with annotated flows and verdicts (`content/teardowns/`)
- **/now** — building / learning / reading / recently shipped, timestamped (`config/now.ts`)
- **Case studies** — restructured around Problem → Constraints → Decision → Outcome → Learning, with TL;DR card, section TOC, and research artifacts (interview notes, journey map, opportunity solution tree)
- **PM principles with receipts** — each philosophy point links to the work proving it (`config/principles.ts`)

## The weird stuff (by design)

All playful features below are suppressed in recruiter mode.

- **Boot sequence** — OS-style boot screen once per session (`components/boot/`)
- **Visitor Analytics HUD** — draggable dashboard tracking the visitor's scroll, clicks, rage clicks, and engagement cohort (`components/hud/`)
- **A/B tested hero** — visitors get variant A or B with a public experiment brief (`components/home/AbHero.tsx`)
- **⌘K command palette** — primary navigation is a terminal (`components/palette/`)
- **Playable case studies** — `<DecisionPoint>` pauses the story and asks the reader to make the call (`components/mdx/DecisionPoint.tsx`)
- **`git log --career`** — the About page is an interactive commit history (`config/career.ts`)
- **/hire-me** — a RICE calculator that always outputs P0, followed by the real info: availability, email, Calendly, resume (`components/rice/`)
- **/status** — uptime page for one (1) PM's career (`config/status.ts`)
- **/changelog** — the site versions itself (`config/changelog.ts`)
- **404** — scope-creep whack-a-mole with a 30s sprint timer (`components/game/`)
- **Easter eggs** — Konami code (founder mode), type `sudo` or `ship` anywhere

Every gimmick respects `prefers-reduced-motion`, works with a keyboard, and is lazy/client-scoped so the static pages stay fast. All data behind the jokes lives in `config/` — edit without touching components.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS · Framer Motion · next-mdx-remote + gray-matter · next-themes · Vercel Analytics

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
npm run typecheck  # strict TS check
```

Requires Node 20+.

## Project structure

```
app/                  Routes (home, /projects, /projects/[slug], /about)
  sitemap.ts          Auto-generated sitemap (includes all projects)
  robots.ts           robots.txt
components/
  ui/                 Design-system primitives (Button, Card, Badge, Container)
  layout/             Header, Footer, ThemeToggle, Providers
  motion/             Reusable Framer Motion wrappers (Reveal, StaggerGrid)
  mdx/                Custom MDX components (Callout, MetricGrid, embeds)
config/site.ts        Site name, URL, nav, socials — edit this first
content/projects/     MDX case studies (one file per project)
lib/                  Content engine (content.ts), SEO helpers (seo.ts)
types/content.ts      Typed frontmatter contract
```

## Content management

### Adding a case study

1. Copy `content/projects/_template.mdx` to `content/projects/your-slug.mdx`.
2. Fill in the frontmatter (all fields are validated at build time):

```yaml
title: "Outcome-oriented headline"
summary: "One-two sentences with the headline result."
date: "2026-01-01"        # ISO date, used for sorting
role: "Product Manager"
company: "Company"
tags: ["Growth"]
metrics:
  - { label: "conversion", value: "+12%" }
featured: true             # shows on the homepage
# draft: true              # hides from the site
```

3. Write the body in MDX. Available components:

| Component | Usage |
| --- | --- |
| `<Callout type="info\|insight\|warning" title="...">` | Highlighted asides |
| `<MetricGrid metrics={[...]} />` | Stat cards |
| `<Image src alt caption />` | Optimized images (next/image) |
| `<YouTube id />`, `<Loom id />`, `<Figma url />` | Lazy iframe embeds |
| `<PDF src title />` | Embedded PDF with download link |
| `<Video src caption />` | Native video player |

Pages are generated automatically — no code changes needed. The sitemap, project index, and homepage update on the next build.

### Media

Put images in `public/images/`, videos in `public/videos/`, PDFs in `public/docs/`, and reference them with absolute paths (`/images/foo.png`).

## Customization

- **Identity**: edit `config/site.ts` (name, URL, email, socials, nav). Set `url` to your production domain — it drives canonical URLs, Open Graph, sitemap, and JSON-LD.
- **Theme**: colors are CSS variables in `app/globals.css` (`:root` = light, `.dark` = dark). Tailwind tokens map to them in `tailwind.config.ts`.
- **Fonts**: swap `Inter`/`JetBrains_Mono` in `app/layout.tsx` (self-hosted via `next/font`).

## Accessibility & performance

- WCAG AA: semantic landmarks, skip link, focus-visible rings, `aria-current` nav, reduced-motion support (CSS + `useReducedMotion`), keyboard operable throughout.
- Performance: static generation for all pages, self-hosted fonts with `display: swap`, `next/image` (AVIF/WebP), lazy iframes, package import optimization.
- SEO: per-page metadata, canonical URLs, Open Graph + Twitter cards, JSON-LD (Person + Article), sitemap.xml, robots.txt.

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo at vercel.com → framework auto-detected.
3. Set your domain, update `config/site.ts` `url`, redeploy.

Every push to `main` deploys automatically. CI (`.github/workflows/ci.yml`) runs typecheck + build on every PR. Vercel Analytics is wired in `app/layout.tsx` and activates automatically on Vercel.
