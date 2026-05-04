"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { BlogCategory } from "@/lib/types/hygraph";
import { cn } from "@/lib/utils";

const FILTERS: { label: string; value: BlogCategory | null }[] = [
  { label: "All", value: null },
  { label: "Design", value: "DESIGN" },
  { label: "Construction", value: "CONSTRUCTION" },
  { label: "Inspiration", value: "INSPIRATION" },
  { label: "Community", value: "COMMUNITY" },
  { label: "News", value: "NEWS" },
];

export function BlogFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const initialSearch = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync local input with URL on back/forward navigation
  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function pushParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value == null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
    // Reset pagination whenever filters change
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function handleCategoryClick(value: BlogCategory | null) {
    pushParams({ category: value });
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    pushParams({ q: searchQuery.trim() || null });
  }

  return (
    <div className="space-y-4">
      <search>
        <form className="relative" onSubmit={handleSearchSubmit}>
          <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            aria-label="Search articles"
            className="w-full rounded-lg border border-border bg-background py-3 pr-4 pl-10 text-sm placeholder:text-muted-foreground focus:border-bost-yellow focus:outline-none focus:ring-2 focus:ring-bost-yellow/20"
            name="q"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            type="search"
            value={searchQuery}
          />
        </form>
      </search>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = (activeCategory ?? null) === filter.value;
          return (
            <button
              className={cn(
                "rounded-full px-4 py-2 font-medium text-sm transition-colors",
                isActive
                  ? "bg-bost-olive text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
              key={filter.label}
              onClick={() => handleCategoryClick(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
