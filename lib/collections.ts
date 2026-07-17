import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CollectionEntry<T> {
  slug: string;
  content: string;
  frontmatter: T;
}

/**
 * Generic MDX collection loader. Reads content/<dir>, validates required
 * frontmatter fields at build time, and returns entries newest-first by `date`.
 */
export function loadCollection<T extends { date: string }>(
  dir: string,
  requiredFields: ReadonlyArray<string>
): Array<CollectionEntry<T>> {
  const collectionDir = path.join(process.cwd(), "content", dir);
  return fs
    .readdirSync(collectionDir)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(collectionDir, fileName), "utf8");
      const { data, content } = matter(raw);
      for (const key of requiredFields) {
        if (data[key] === undefined) {
          throw new Error(`Missing frontmatter field "${key}" in ${dir}/${fileName}`);
        }
      }
      return {
        slug: fileName.replace(/\.mdx$/, ""),
        content,
        frontmatter: data as T,
      };
    })
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
}

/* ---------- Decisions ---------- */

export type DecisionStatus = "validated" | "invalidated" | "changed-my-mind";

export interface DecisionFrontmatter {
  title: string;
  date: string;
  status: DecisionStatus;
  tldr: string;
}

export function getDecisions(): Array<CollectionEntry<DecisionFrontmatter>> {
  return loadCollection<DecisionFrontmatter>("decisions", [
    "title",
    "date",
    "status",
    "tldr",
  ]);
}

/* ---------- Teardowns ---------- */

export type TeardownVerdict = "steal this" | "needs work" | "genius, with caveats";

export interface TeardownFrontmatter {
  title: string;
  product: string;
  date: string;
  verdict: TeardownVerdict;
  take: string;
  readMinutes: number;
  tags: string[];
}

export function getTeardowns(): Array<CollectionEntry<TeardownFrontmatter>> {
  return loadCollection<TeardownFrontmatter>("teardowns", [
    "title",
    "product",
    "date",
    "verdict",
    "take",
    "readMinutes",
    "tags",
  ]);
}

export function getTeardownBySlug(
  slug: string
): CollectionEntry<TeardownFrontmatter> | undefined {
  return getTeardowns().find((t) => t.slug === slug);
}
