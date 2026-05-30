import { hygraph, isHygraphConfigured } from "@/lib/hygraph";
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_SLUGS_QUERY,
  BLOG_POSTS_QUERY,
} from "@/lib/queries/blog";
import {
  NEIGHBORHOOD_BY_SLUG_QUERY,
  NEIGHBORHOODS_QUERY,
} from "@/lib/queries/neighborhoods";
import {
  AWARDS_QUERY,
  GREEN_FEATURES_QUERY,
  JOB_OPENINGS_QUERY,
  PAGE_CONTENT_QUERY,
  PROCESS_STEPS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/lib/queries/pages";
import {
  ALL_PROJECTS_QUERY,
  ARCHIVED_PROJECTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/lib/queries/projects";
import { TEAM_MEMBERS_QUERY } from "@/lib/queries/team";
import type {
  Award,
  BlogPost,
  GreenFeature,
  JobOpening,
  Neighborhood,
  PageContent,
  ProcessStep,
  Project,
  TeamMember,
  Testimonial,
} from "@/lib/types/hygraph";

/**
 * Safe wrapper around hygraph.request that returns a fallback value
 * when the query fails (e.g. model not yet created in Hygraph).
 *
 * During a production build a query failure is rethrown rather than swallowed:
 * silently baking an empty page into the static prerender hides real failures
 * (a transient CDN hiccup once froze empty /portfolio and /vault grids into the
 * deploy). Failing the build loudly surfaces that. At request time we keep the
 * graceful fallback so a momentary outage degrades a single render instead of
 * throwing a 500 at visitors. When Hygraph is intentionally not configured
 * (e.g. a preview/CI build without secrets) we always fall back, since the
 * documented behavior is to build with empty content rather than fail.
 */
const FAIL_BUILD_ON_ERROR =
  process.env.NEXT_PHASE === "phase-production-build" && isHygraphConfigured;

async function safeRequest<T>(
  query: string,
  variables: Record<string, unknown> | undefined,
  fallback: T
): Promise<T> {
  try {
    return await hygraph.request<T>(query, variables);
  } catch (error) {
    if (FAIL_BUILD_ON_ERROR) {
      throw error;
    }
    console.warn("[Hygraph] Query failed, using fallback:", error);
    return fallback;
  }
}

// --- Projects ---

export async function getFeaturedProjects(): Promise<Project[]> {
  const { completed_Project } = await safeRequest<{
    completed_Project: Project[];
  }>(FEATURED_PROJECTS_QUERY, undefined, { completed_Project: [] });
  return completed_Project;
}

export async function getAllProjects(): Promise<Project[]> {
  const { completed_Project } = await safeRequest<{
    completed_Project: Project[];
  }>(ALL_PROJECTS_QUERY, undefined, { completed_Project: [] });
  return completed_Project;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { completedProject } = await safeRequest<{
    completedProject: Project | null;
  }>(PROJECT_BY_SLUG_QUERY, { slug }, { completedProject: null });
  return completedProject;
}

export async function getProjectSlugs(): Promise<string[]> {
  const { completed_Project } = await safeRequest<{
    completed_Project: { slug: string }[];
  }>(PROJECT_SLUGS_QUERY, undefined, { completed_Project: [] });
  return completed_Project.map((p) => p.slug);
}

export async function getArchivedProjects(): Promise<Project[]> {
  const { completed_Project } = await safeRequest<{
    completed_Project: Project[];
  }>(ARCHIVED_PROJECTS_QUERY, undefined, { completed_Project: [] });
  return completed_Project;
}

// --- Blog ---

export async function getBlogPosts(options?: {
  first?: number;
  skip?: number;
  category?: BlogPost["category"];
  search?: string;
}): Promise<{ posts: BlogPost[]; total: number }> {
  const where: Record<string, unknown> = {};
  if (options?.category) {
    where.category = options.category;
  }
  const trimmedSearch = options?.search?.trim();
  if (trimmedSearch) {
    where._search = trimmedSearch;
  }

  const { blogPosts, blogPostsConnection } = await safeRequest<{
    blogPosts: BlogPost[];
    blogPostsConnection: { aggregate: { count: number } };
  }>(
    BLOG_POSTS_QUERY,
    {
      first: options?.first ?? 10,
      skip: options?.skip ?? 0,
      where: Object.keys(where).length > 0 ? where : undefined,
    },
    {
      blogPosts: [],
      blogPostsConnection: { aggregate: { count: 0 } },
    }
  );
  return { posts: blogPosts, total: blogPostsConnection.aggregate.count };
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const { blogPosts } = await safeRequest<{ blogPosts: { slug: string }[] }>(
    BLOG_POST_SLUGS_QUERY,
    undefined,
    { blogPosts: [] }
  );
  return blogPosts.map((p) => p.slug);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const { blogPost } = await safeRequest<{ blogPost: BlogPost | null }>(
    BLOG_POST_BY_SLUG_QUERY,
    { slug },
    { blogPost: null }
  );
  return blogPost;
}

// --- Neighborhoods ---

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  const { neighborhoods } = await safeRequest<{
    neighborhoods: Neighborhood[];
  }>(NEIGHBORHOODS_QUERY, undefined, { neighborhoods: [] });
  return neighborhoods;
}

export async function getNeighborhoodBySlug(
  slug: string
): Promise<Neighborhood | null> {
  const { neighborhood } = await safeRequest<{
    neighborhood: Neighborhood | null;
  }>(NEIGHBORHOOD_BY_SLUG_QUERY, { slug }, { neighborhood: null });
  return neighborhood;
}

// --- Team ---

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { teamMembers } = await safeRequest<{ teamMembers: TeamMember[] }>(
    TEAM_MEMBERS_QUERY,
    undefined,
    { teamMembers: [] }
  );
  return teamMembers;
}

// --- Page Content ---

export async function getPageContent(
  slug: string
): Promise<PageContent | null> {
  const { pageContent } = await safeRequest<{
    pageContent: PageContent | null;
  }>(PAGE_CONTENT_QUERY, { slug }, { pageContent: null });
  return pageContent;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { testimonials } = await safeRequest<{ testimonials: Testimonial[] }>(
    TESTIMONIALS_QUERY,
    undefined,
    { testimonials: [] }
  );
  return testimonials;
}

export async function getAwards(): Promise<Award[]> {
  const { awards } = await safeRequest<{ awards: Award[] }>(
    AWARDS_QUERY,
    undefined,
    { awards: [] }
  );
  return awards;
}

export async function getJobOpenings(): Promise<JobOpening[]> {
  const { jobOpenings } = await safeRequest<{
    jobOpenings: JobOpening[];
  }>(JOB_OPENINGS_QUERY, undefined, { jobOpenings: [] });
  return jobOpenings;
}

export async function getGreenFeatures(): Promise<GreenFeature[]> {
  const { greenFeatures } = await safeRequest<{
    greenFeatures: GreenFeature[];
  }>(GREEN_FEATURES_QUERY, undefined, { greenFeatures: [] });
  return greenFeatures;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const { processSteps } = await safeRequest<{
    processSteps: ProcessStep[];
  }>(PROCESS_STEPS_QUERY, undefined, { processSteps: [] });
  return processSteps;
}
