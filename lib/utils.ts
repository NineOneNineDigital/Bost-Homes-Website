import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BlogCategory } from "@/lib/types/hygraph";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  DESIGN: "Design",
  CONSTRUCTION: "Construction",
  INSPIRATION: "Inspiration",
  COMMUNITY: "Community",
  NEWS: "News",
};

export function formatBlogCategory(category: BlogCategory): string {
  return BLOG_CATEGORY_LABELS[category] ?? category;
}

export function formatPostDate(dateString: string): string {
  // Date-only strings (YYYY-MM-DD) parse as UTC midnight, which can shift
  // the displayed day in negative timezones — anchor to local midnight instead.
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  const date = isDateOnly
    ? new Date(`${dateString}T00:00:00`)
    : new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Returns the updated-date string only when it's meaningfully later than the
// original/publish date — within 24h is treated as the same edit window so
// brand-new posts don't get a redundant "Updated" tag.
export function getMeaningfulUpdatedDate(
  updatedAt: string | undefined,
  publishedAt: string | undefined
): string | null {
  if (!updatedAt) {
    return null;
  }
  if (!publishedAt) {
    return updatedAt;
  }
  const updated = new Date(updatedAt).getTime();
  const published = new Date(publishedAt).getTime();
  if (Number.isNaN(updated) || Number.isNaN(published)) {
    return null;
  }
  const oneDayMs = 24 * 60 * 60 * 1000;
  return updated - published > oneDayMs ? updatedAt : null;
}
