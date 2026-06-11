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
        <p className="mt-6 font-black text-bost-brick text-sm uppercase tracking-[0.25em]">
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {images.map((img, i) => (
        <div className="relative aspect-[4/3] overflow-hidden bg-muted" key={img.url}>
          <Image
            alt={img.alt ?? `${projectName} — featured detail ${i + 1}`}
            className="object-cover"
            fill
            loading={i < 3 ? undefined : "lazy"}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={img.url}
          />
        </div>
      ))}
    </div>
  );
}
