"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { ProcessStep } from "@/lib/types/hygraph";
import { cn } from "@/lib/utils";

function ProcessCarousel({ steps }: { steps: ProcessStep[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const cardWidth =
      el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 360;
    const gap = 24;
    const distance = cardWidth + gap;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <h2 className="font-bold text-3xl text-white tracking-tight md:text-4xl">
          What to expect
        </h2>
        <div className="flex items-center gap-2">
          <button
            aria-label="Previous step"
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors",
              canScrollLeft ? "hover:bg-white/10" : "cursor-default opacity-30"
            )}
            disabled={!canScrollLeft}
            onClick={() => scroll("left")}
            type="button"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            aria-label="Next step"
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors",
              canScrollRight ? "hover:bg-white/10" : "cursor-default opacity-30"
            )}
            disabled={!canScrollRight}
            onClick={() => scroll("right")}
            type="button"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6"
        onScroll={updateScrollState}
        ref={scrollRef}
      >
        {steps.map((step) => (
          <div
            className="w-[85vw] shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-lg sm:w-[340px] md:w-[380px]"
            key={step.id}
          >
            <div className="h-1.5 w-full bg-bost-blue" />
            <div className="p-8">
              <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                Step {step.number}
              </p>
              <h3 className="mb-3 font-semibold text-foreground text-lg leading-snug">
                {step.number}. {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ProcessCarousel };
