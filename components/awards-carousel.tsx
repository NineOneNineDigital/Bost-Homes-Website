"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Award } from "@/lib/types/hygraph";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 6000;

function AwardsCarousel({ awards }: { awards: Award[] }) {
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
      el.querySelector<HTMLElement>(":scope > article")?.offsetWidth ?? 320;
    const gap = 24;
    const distance = cardWidth + gap;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (awards.length <= 1) {
      return;
    }
    const timer = setInterval(() => {
      const el = scrollRef.current;
      if (!el) {
        return;
      }
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scroll("right");
      }
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [awards.length, scroll]);

  return (
    <div>
      <div className="mb-10 flex items-center justify-end gap-2">
        <button
          aria-label="Previous award"
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
          aria-label="Next award"
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

      <div
        className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6"
        onScroll={updateScrollState}
        ref={scrollRef}
      >
        {awards.map((award) => (
          <article
            className="relative flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-[320px] md:w-[340px] md:p-10"
            key={award.id}
          >
            <div className="absolute top-0 left-0 h-1 w-full bg-bost-blue" />
            <p className="mb-4 font-bold text-3xl text-bost-blue md:text-4xl">
              {award.year}
            </p>
            <h3 className="mb-3 font-semibold text-base text-white leading-snug">
              {award.title}
            </h3>
            <p className="text-sm text-white/65 leading-relaxed">
              {award.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export { AwardsCarousel };
