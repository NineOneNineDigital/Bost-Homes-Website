"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "@/lib/types/hygraph";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 8000;

function TestimonialCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const goTo = useCallback((index: number, dir: "left" | "right") => {
    setDirection(dir);
    setActive(index);
  }, []);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length, "right");
  }, [active, testimonials.length, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length, "left");
  }, [active, testimonials.length, goTo]);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  const current = testimonials[active];

  return (
    <section className="bg-white px-8 py-20 md:px-16 md:py-28">
      <div className="mx-auto max-w-4xl">
        {/* Accent line */}
        <div className="mx-auto mb-8 h-px w-16 bg-bost-brick" />

        <p className="mb-6 text-center font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
          What Our Clients Say
        </p>

        {/* Quote area with arrows */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Left arrow */}
          <button
            aria-label="Previous testimonial"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-bost-gray-light text-bost-black/40 transition-colors hover:border-bost-olive hover:text-bost-olive"
            onClick={prev}
            type="button"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Quote content */}
          <div className="min-h-[140px] flex-1 text-center md:min-h-[120px]">
            <blockquote
              className={cn(
                "mb-6 transition-opacity duration-500",
                direction === "right" ? "animate-fade-in" : "animate-fade-in"
              )}
              key={current.id}
            >
              <p className="text-bost-black/70 text-lg italic leading-relaxed md:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mx-auto mb-4 h-px w-10 bg-bost-gray-light" />

            <cite className="block font-semibold text-bost-black text-sm not-italic tracking-wide">
              {current.author}
            </cite>
          </div>

          {/* Right arrow */}
          <button
            aria-label="Next testimonial"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-bost-gray-light text-bost-black/40 transition-colors hover:border-bost-olive hover:text-bost-olive"
            onClick={next}
            type="button"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "flex items-center justify-center rounded-full p-2 transition-all",
                  i === active ? "bg-bost-olive" : "bg-transparent"
                )}
                key={t.id}
                onClick={() => goTo(i, i > active ? "right" : "left")}
                type="button"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all",
                    i === active
                      ? "size-2.5 bg-white"
                      : "size-2 bg-bost-gray-light hover:bg-bost-black/20"
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { TestimonialCarousel };
