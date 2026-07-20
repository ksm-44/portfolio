export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  role: string;
  company: string;
  tags: string[];
  metrics: ProjectMetric[];
  featured: boolean;
  /** Optional classifier: "Shipped" (default), "Concept", "Analysis", "Strategy", "Redesign", "Teardown". */
  type?: string;
  cover?: string;
  draft?: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}
