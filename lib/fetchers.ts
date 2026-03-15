import { hygraph } from "@/lib/hygraph";
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POSTS_QUERY } from "@/lib/queries/blog";
import { NEIGHBORHOODS_QUERY } from "@/lib/queries/neighborhoods";
import {
  AWARDS_QUERY,
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
 */
async function safeRequest<T>(
  query: string,
  variables: Record<string, unknown> | undefined,
  fallback: T
): Promise<T> {
  try {
    return await hygraph.request<T>(query, variables);
  } catch (error) {
    console.warn("[Hygraph] Query failed, using fallback:", error);
    return fallback;
  }
}

// --- Projects ---

export async function getFeaturedProjects(): Promise<Project[]> {
  const { projects } = await safeRequest<{ projects: Project[] }>(
    FEATURED_PROJECTS_QUERY,
    undefined,
    { projects: [] }
  );
  return projects;
}

export async function getAllProjects(): Promise<Project[]> {
  const { projects } = await safeRequest<{ projects: Project[] }>(
    ALL_PROJECTS_QUERY,
    undefined,
    { projects: [] }
  );
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { project } = await safeRequest<{ project: Project | null }>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
    { project: null }
  );
  return project;
}

export async function getProjectSlugs(): Promise<string[]> {
  const { projects } = await safeRequest<{ projects: { slug: string }[] }>(
    PROJECT_SLUGS_QUERY,
    undefined,
    { projects: [] }
  );
  return projects.map((p) => p.slug);
}

export async function getArchivedProjects(): Promise<Project[]> {
  const { projects } = await safeRequest<{ projects: Project[] }>(
    ARCHIVED_PROJECTS_QUERY,
    undefined,
    { projects: [] }
  );
  return projects;
}

// --- Blog ---

export async function getBlogPosts(options?: {
  first?: number;
  skip?: number;
  category?: string;
}): Promise<{ posts: BlogPost[]; total: number }> {
  const { blogPosts, blogPostsConnection } = await safeRequest<{
    blogPosts: BlogPost[];
    blogPostsConnection: { aggregate: { count: number } };
  }>(
    BLOG_POSTS_QUERY,
    {
      first: options?.first ?? 10,
      skip: options?.skip ?? 0,
      category: options?.category ?? undefined,
    },
    {
      blogPosts: [],
      blogPostsConnection: { aggregate: { count: 0 } },
    }
  );
  return { posts: blogPosts, total: blogPostsConnection.aggregate.count };
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

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const { processSteps } = await safeRequest<{
    processSteps: ProcessStep[];
  }>(PROCESS_STEPS_QUERY, undefined, { processSteps: [] });
  return processSteps;
}
