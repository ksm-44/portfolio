import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, ProjectFrontmatter } from "@/types/content";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const WORDS_PER_MINUTE = 220;

function assertFrontmatter(
  data: Record<string, unknown>,
  file: string
): asserts data is Record<string, unknown> & ProjectFrontmatter {
  const required = ["title", "summary", "date", "role", "company", "tags", "metrics"];
  for (const key of required) {
    if (data[key] === undefined) {
      throw new Error(`Missing frontmatter field "${key}" in ${file}`);
    }
  }
}

function parseProject(fileName: string): Project {
  const filePath = path.join(PROJECTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  assertFrontmatter(data, fileName);

  return {
    ...data,
    featured: Boolean(data.featured),
    slug: fileName.replace(/\.mdx$/, ""),
    content,
    readingTime: Math.max(1, Math.round(content.split(/\s+/).length / WORDS_PER_MINUTE)),
  };
}

/** Non-shipped classifiers always sort after real shipped work. */
const NON_SHIPPED = new Set(["Concept", "Analysis", "Strategy", "Redesign", "Teardown"]);

/** 0 = professional shipped, 1 = personal shipped, 2 = concept/analysis. */
function tier(p: Project): number {
  if (p.type && NON_SHIPPED.has(p.type)) return 2;
  return p.company === "Personal project" ? 1 : 0;
}

/**
 * Ordering: professional case studies lead, then personal side projects, then
 * concept/analysis pieces honestly last. Newest-first within each tier.
 */
export function getAllProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map(parseProject)
    .filter((p) => !p.draft)
    .sort(
      (a, b) => tier(a) - tier(b) || +new Date(b.date) - +new Date(a.date)
    );
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
