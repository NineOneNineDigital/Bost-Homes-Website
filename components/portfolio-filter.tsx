"use client";

import { Grid3X3, List } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const locations = [
  "All",
  "Cary",
  "Raleigh",
  "Chapel Hill",
  "Wake Forest",
  "North Raleigh",
];

export type ViewMode = "grid" | "list";

interface PortfolioFilterProps {
  onFilterChange?: (location: string) => void;
  onViewChange?: (view: ViewMode) => void;
}

export function PortfolioFilter({
  onFilterChange,
  onViewChange,
}: PortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  function handleFilterClick(location: string) {
    setActiveFilter(location);
    onFilterChange?.(location);
  }

  function handleViewChange(view: ViewMode) {
    setViewMode(view);
    onViewChange?.(view);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-border border-b pb-4">
      <div className="flex flex-wrap gap-2">
        {locations.map((location) => (
          <button
            className={cn(
              "rounded-full px-4 py-2 font-medium text-sm transition-colors",
              activeFilter === location
                ? "bg-bost-olive text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
            key={location}
            onClick={() => handleFilterClick(location)}
            type="button"
          >
            {location}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <button
          aria-label="Grid view"
          className={cn(
            "rounded-md p-2 transition-colors",
            viewMode === "grid"
              ? "bg-bost-olive text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => handleViewChange("grid")}
          type="button"
        >
          <Grid3X3 className="size-5" />
        </button>
        <button
          aria-label="List view"
          className={cn(
            "rounded-md p-2 transition-colors",
            viewMode === "list"
              ? "bg-bost-olive text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => handleViewChange("list")}
          type="button"
        >
          <List className="size-5" />
        </button>
      </div>
    </div>
  );
}
