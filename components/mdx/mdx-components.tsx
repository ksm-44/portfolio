import type { MDXComponents } from "mdx/types";
import { Callout } from "./Callout";
import { DecisionPoint } from "./DecisionPoint";
import { MetricGrid } from "./MetricGrid";
import { MdxImage } from "./MdxImage";
import { Figma, Loom, PDF, Video, YouTube } from "./Embeds";
import { CaseToc, Tldr } from "./Tldr";
import { InterviewNotes, JourneyMap, OpportunityTree } from "./ResearchArtifacts";
import { Flow } from "./TeardownFlow";

/** Components made available to every MDX case study. */
export const mdxComponents: MDXComponents = {
  Callout,
  CaseToc,
  DecisionPoint,
  Flow,
  InterviewNotes,
  JourneyMap,
  MetricGrid,
  OpportunityTree,
  Tldr,
  Image: MdxImage,
  YouTube,
  Loom,
  Figma,
  PDF,
  Video,
};
