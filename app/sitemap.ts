import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProjects } from "@/lib/content";
import { getTeardowns } from "@/lib/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/projects", "/about", "/now", "/decisions", "/teardowns", "/impact", "/features", "/status", "/changelog", "/hire-me"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectPages = getAllProjects().map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const teardownPages = getTeardowns().map((t) => ({
    url: `${siteConfig.url}/teardowns/${t.slug}`,
    lastModified: new Date(t.frontmatter.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...teardownPages];
}
