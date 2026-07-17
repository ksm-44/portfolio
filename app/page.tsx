import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/content";
import { AbHero } from "@/components/home/AbHero";
import { FeaturedOutcomes } from "@/components/home/FeaturedOutcomes";
import { RecruiterPath } from "@/components/home/RecruiterPath";
import { ProjectCard } from "@/components/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGrid } from "@/components/motion/StaggerGrid";
import { ButtonLink } from "@/components/ui/Button";
import { PlayfulOnly } from "@/components/mode/mode-store";

const corners = [
  { href: "/now", label: "/now", desc: "building, learning, reading — live" },
  { href: "/decisions", label: "Decision journal", desc: "incl. the ones that failed" },
  { href: "/teardowns", label: "Teardowns", desc: "opinionated, 3 min each" },
  { href: "/impact", label: "Impact", desc: "metrics + how they're counted" },
  { href: "/features", label: "Features", desc: "every widget, documented" },
];

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <AbHero />
      <Container>
        <RecruiterPath />
        <FeaturedOutcomes />

        <section aria-labelledby="featured-heading" className="border-t border-line pb-8 pt-14">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 id="featured-heading" className="text-2xl font-semibold tracking-tightest">
                Case studies
              </h2>
              <ButtonLink href="/projects" variant="ghost" className="hidden sm:inline-flex">
                All projects <ArrowRight size={14} aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
          <StaggerGrid className="mt-8 grid gap-5 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </StaggerGrid>
          <div className="mt-8 sm:hidden">
            <ButtonLink href="/projects" variant="ghost">
              All projects <ArrowRight size={14} aria-hidden />
            </ButtonLink>
          </div>
        </section>

        <section aria-label="More of this site" className="border-t border-line pb-8 pt-10">
          <Reveal>
            <PlayfulOnly>
              <p className="microlabel">
                // for the mouse-only users who won&apos;t press ⌘K
              </p>
            </PlayfulOnly>
            <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-5">
              {corners.map((l) => (
                <Link key={l.href} href={l.href} className="group">
                  <p className="font-mono text-[13px] text-ink transition-colors group-hover:text-accent">
                    {l.label} →
                  </p>
                  <p className="mt-1 text-xs text-ink-faint">{l.desc}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      </Container>
    </>
  );
}
