import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Project } from "@/types/content";

interface PageSeo {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = `${siteConfig.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteConfig.author.twitter ? { creator: siteConfig.author.twitter } : {}),
    },
  };
}

/** JSON-LD structured data for a case study page. */
export function projectJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.title,
    description: project.summary,
    datePublished: project.date,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/projects/${project.slug}`,
  };
}

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    jobTitle: "Product Manager",
    url: siteConfig.url,
    sameAs: [siteConfig.author.linkedin, siteConfig.author.github],
  };
}
