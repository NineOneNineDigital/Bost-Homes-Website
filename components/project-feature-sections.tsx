import { Quote } from "lucide-react";
import Image from "next/image";
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
        <p className="mt-6 font-medium text-[12px] text-bost-brick uppercase tracking-[0.25em]">
          — {author}
        </p>
      )}
    </div>
  );
}

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

  // Magazine-style: first three images use an asymmetric hero + stacked-pair
  // layout; any remaining images flow into a uniform 3-col grid beneath.
  const heroTrio = images.slice(0, 3);
  const remaining = images.slice(3);

  return (
    <div className="space-y-4 md:space-y-6">
      {heroTrio.length === 3 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr] md:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              alt={heroTrio[0].alt ?? `${projectName} — featured detail 1`}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              src={heroTrio[0].url}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {heroTrio.slice(1).map((img, i) => (
              <div
                className="relative aspect-[4/3] overflow-hidden bg-muted"
                key={img.url}
              >
                <Image
                  alt={img.alt ?? `${projectName} — featured detail ${i + 2}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={img.url}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-4 md:gap-6 ${heroTrio.length === 2 ? "md:grid-cols-2" : ""}`}
        >
          {heroTrio.map((img, i) => (
            <div
              className={`relative overflow-hidden bg-muted ${heroTrio.length === 1 ? "aspect-[16/10]" : "aspect-[4/3]"}`}
              key={img.url}
            >
              <Image
                alt={img.alt ?? `${projectName} — featured detail ${i + 1}`}
                className="object-cover"
                fill
                sizes={
                  heroTrio.length === 1
                    ? "(min-width: 1280px) 1152px, 100vw"
                    : "(min-width: 768px) 50vw, 100vw"
                }
                src={img.url}
              />
            </div>
          ))}
        </div>
      )}

      {remaining.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {remaining.map((img, i) => (
            <div
              className="relative aspect-[4/3] overflow-hidden bg-muted"
              key={img.url}
            >
              <Image
                alt={img.alt ?? `${projectName} — featured detail ${i + 4}`}
                className="object-cover"
                fill
                loading="lazy"
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                src={img.url}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
