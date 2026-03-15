"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Design",
  "Construction",
  "Inspiration",
  "Community",
  "News",
];

interface BlogFilterProps {
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (query: string) => void;
}

export function BlogFilter({
  onCategoryChange,
  onSearchChange,
}: BlogFilterProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  function handleCategoryClick(category: string) {
    setActiveCategory(category);
    onCategoryChange?.(category);
  }

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
    onSearchChange?.(e.target.value);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          className="w-full rounded-lg border border-border bg-background py-3 pr-4 pl-10 text-sm placeholder:text-muted-foreground focus:border-bost-yellow focus:outline-none focus:ring-2 focus:ring-bost-yellow/20"
          onChange={handleSearchInput}
          placeholder="Search articles..."
          type="search"
          value={searchQuery}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            className={cn(
              "rounded-full px-4 py-2 font-medium text-sm transition-colors",
              activeCategory === category
                ? "bg-bost-olive text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
            key={category}
            onClick={() => handleCategoryClick(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
