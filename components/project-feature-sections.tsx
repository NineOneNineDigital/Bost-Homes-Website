import { Quote } from "lucide-react";
import { CmsImage } from "@/components/cms-image";
import type { Asset } from "@/lib/types/hygraph";

export function ProjectTestimonial({
  quote,
  author,
}: {
  quote?: string;
  author?: string;
}) {
  if (!quote) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl text-center">
      <Quote
        aria-hidden
        className="mx-auto mb-6 size-7 text-bost-yellow/70 md:size-8"
      />
      <blockquote className="text-bost-olive/85 text-lg italic leading-relaxed md:text-xl lg:text-2xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {author && (
        <p className="mt-6 font-black text-bost-brick text-sm uppercase tracking-[0.25em]">
          — {author}
        </p>
      )}
    </div>
  );
}

/**
 * `sizes` has to describe the *rendered slot*, not the viewport share.
 *
 * This grid sits in a `max-w-6xl` (1152px) container with `lg:px-24`, so past
 * a 1344px viewport it stops growing and each of the three columns is a fixed
 * 368px. Declaring `33vw` claimed 475px at 1440px and made the browser pick the
 * 640w candidate for a 368px slot — 1.74x linear, ~3x the pixels.
 *
 * The vw values below are deliberate slight over-estimates of each breakpoint's
 * true slot (never under-serve), and they must stay in sync with the grid and
 * the section's padding in app/portfolio/[slug]/page.tsx. Keeping a vw unit in
 * the string also matters mechanically: Next derives the srcset candidates from
 * the smallest vw it can find, and a `calc()` built on `100vw` would read as
 * 100 and drop the small widths from the srcset entirely.
 */
const FEATURED_SIZES =
  "(min-width: 1344px) 368px, (min-width: 1024px) 27vw, (min-width: 640px) 47vw, 90vw";

export function ProjectFeaturedGallery({
  images,
  projectName,
}: {
  images: Asset[];
  projectName: string;
}) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {images.map((img, i) => (
        <div
          className="relative aspect-[4/3] overflow-hidden bg-muted"
          key={img.url}
        >
          <CmsImage
            alt={img.alt ?? `${projectName} — featured detail ${i + 1}`}
            className="object-cover"
            fill
            sizes={FEATURED_SIZES}
            src={img.url}
          />
        </div>
      ))}
    </div>
  );
}
