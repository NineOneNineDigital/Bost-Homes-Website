"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import {
  type TouchEvent as ReactTouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CmsImage } from "@/components/cms-image";
import type { Asset } from "@/lib/types/hygraph";

interface Props {
  images: Asset[];
  projectName: string;
}

const SWIPE_THRESHOLD_PX = 40;

function useSwipeNav(onPrev: () => void, onNext: () => void) {
  const startX = useRef<number | null>(null);

  const onTouchStart = useCallback((e: ReactTouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent) => {
      const start = startX.current;
      startX.current = null;
      const end = e.changedTouches[0]?.clientX;
      if (start === null || end === undefined) {
        return;
      }
      const dx = end - start;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) {
        return;
      }
      (dx < 0 ? onNext : onPrev)();
    },
    [onPrev, onNext]
  );

  return { onTouchStart, onTouchEnd };
}

export function ProjectGalleryCarousel({ images, projectName }: Props) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const count = images.length;
  const nextIndex = count > 0 ? (index + 1) % count : 0;
  const prevIndex = count > 0 ? (index - 1 + count) % count : 0;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) {
        return;
      }
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const prev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const next = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const { onTouchStart, onTouchEnd } = useSwipeNav(prev, next);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  useEffect(() => {
    if (lightboxOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [lightboxOpen]);

  // Keep the active thumbnail centered in the filmstrip without scrolling
  // the document — scrollIntoView traverses ancestors and would jump the page
  // to the carousel on initial mount when it's still below the fold.
  useEffect(() => {
    const container = thumbStripRef.current;
    if (!container) {
      return;
    }
    const active = container.querySelector<HTMLElement>(
      `[data-thumb-index="${index}"]`
    );
    if (!active) {
      return;
    }
    const target =
      active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, [index]);

  if (count === 0) {
    return null;
  }

  const current = images[index];

  return (
    <>
      <div className="relative">
        <div
          className="group relative aspect-[4/3] w-full overflow-hidden bg-bost-olive md:aspect-video"
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
        >
          <button
            aria-label="Enlarge image"
            className="absolute inset-0 z-0 cursor-zoom-in"
            onClick={() => setLightboxOpen(true)}
            type="button"
          >
            <CmsImage
              alt={current.alt ?? `${projectName} — photo ${index + 1}`}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              fill
              priority={index === 0}
              sizes="(min-width: 1280px) 1152px, 100vw"
              src={current.url}
            />
          </button>

          {/* Warm the cache for adjacent images so prev/next is instant. */}
          {count > 1 && nextIndex !== index && (
            <div aria-hidden className="hidden">
              <CmsImage
                alt=""
                height={images[nextIndex].height ?? 720}
                sizes="(min-width: 1280px) 1152px, 100vw"
                src={images[nextIndex].url}
                width={images[nextIndex].width ?? 1280}
              />
            </div>
          )}
          {count > 2 && prevIndex !== index && prevIndex !== nextIndex && (
            <div aria-hidden className="hidden">
              <CmsImage
                alt=""
                height={images[prevIndex].height ?? 720}
                sizes="(min-width: 1280px) 1152px, 100vw"
                src={images[prevIndex].url}
                width={images[prevIndex].width ?? 1280}
              />
            </div>
          )}

          <div className="pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-bost-olive/80 px-3 py-1.5 font-medium text-[11px] text-white uppercase tracking-[0.2em] backdrop-blur-sm">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="text-white/50">/</span>
            <span className="text-white/70">
              {String(count).padStart(2, "0")}
            </span>
          </div>

          <button
            aria-label="Enlarge image"
            className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-bost-olive/80 p-2 font-medium text-[11px] text-white uppercase tracking-[0.2em] backdrop-blur-sm transition hover:bg-bost-olive focus-visible:outline-2 focus-visible:outline-white sm:px-3 sm:py-1.5"
            onClick={() => setLightboxOpen(true)}
            type="button"
          >
            <Expand aria-hidden className="size-3.5" />
            <span className="hidden sm:inline">Enlarge</span>
          </button>

          {count > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute top-1/2 left-4 z-10 hidden size-12 -translate-y-1/2 items-center justify-center bg-bost-olive/80 text-white backdrop-blur-sm transition hover:bg-bost-olive focus-visible:outline-2 focus-visible:outline-white md:inline-flex"
                onClick={prev}
                type="button"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                aria-label="Next image"
                className="absolute top-1/2 right-4 z-10 hidden size-12 -translate-y-1/2 items-center justify-center bg-bost-olive/80 text-white backdrop-blur-sm transition hover:bg-bost-olive focus-visible:outline-2 focus-visible:outline-white md:inline-flex"
                onClick={next}
                type="button"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="font-black text-muted-foreground text-sm uppercase tracking-[0.2em]">
              <span className="text-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 text-muted-foreground/50">of</span>
              <span>{String(count).padStart(2, "0")}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous image"
                className="inline-flex size-11 items-center justify-center border border-bost-olive bg-background text-bost-olive transition hover:bg-bost-olive hover:text-bost-cream focus-visible:outline-2 focus-visible:outline-bost-brick"
                onClick={prev}
                type="button"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                aria-label="Next image"
                className="inline-flex size-11 items-center justify-center border border-bost-olive bg-bost-olive text-bost-cream transition hover:bg-transparent hover:text-bost-olive focus-visible:outline-2 focus-visible:outline-bost-brick"
                onClick={next}
                type="button"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        )}

        {count > 1 && (
          <div
            className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-1"
            ref={thumbStripRef}
          >
            {images.map((img, i) => (
              <button
                aria-current={i === index ? "true" : undefined}
                aria-label={`Go to image ${i + 1}`}
                className={`relative aspect-[4/3] h-16 shrink-0 overflow-hidden transition focus-visible:outline-2 focus-visible:outline-bost-brick md:h-20 ${
                  i === index
                    ? "ring-2 ring-bost-olive ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                }`}
                data-thumb-index={i}
                key={img.url}
                onClick={() => goTo(i)}
                type="button"
              >
                <CmsImage
                  alt=""
                  className="object-cover"
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 120px, 96px"
                  src={img.url}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          aria-label="Image lightbox"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95"
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          role="dialog"
        >
          <button
            aria-label="Close lightbox"
            className="absolute inset-0 h-full w-full cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
            type="button"
          />

          <div className="pointer-events-none relative flex h-full w-full items-center justify-center p-4 md:p-10">
            <div className="relative h-full w-full max-w-6xl">
              <CmsImage
                alt={current.alt ?? `${projectName} — photo ${index + 1}`}
                className="object-contain"
                fill
                sizes="100vw"
                src={current.url}
              />
            </div>
          </div>

          {/* Preload adjacent lightbox images so prev/next is instant. */}
          {count > 1 && nextIndex !== index && (
            <div aria-hidden className="hidden">
              <CmsImage
                alt=""
                height={images[nextIndex].height ?? 1080}
                sizes="100vw"
                src={images[nextIndex].url}
                width={images[nextIndex].width ?? 1920}
              />
            </div>
          )}
          {count > 2 && prevIndex !== index && prevIndex !== nextIndex && (
            <div aria-hidden className="hidden">
              <CmsImage
                alt=""
                height={images[prevIndex].height ?? 1080}
                sizes="100vw"
                src={images[prevIndex].url}
                width={images[prevIndex].width ?? 1920}
              />
            </div>
          )}

          <button
            aria-label="Close lightbox"
            className="absolute top-4 right-4 inline-flex size-11 items-center justify-center bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
            onClick={() => setLightboxOpen(false)}
            type="button"
          >
            <X aria-hidden className="size-5" />
          </button>

          {count > 1 && (
            <>
              <button
                aria-label="Previous image"
                className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white md:left-6"
                onClick={prev}
                type="button"
              >
                <ChevronLeft aria-hidden className="size-6" />
              </button>
              <button
                aria-label="Next image"
                className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white md:right-6"
                onClick={next}
                type="button"
              >
                <ChevronRight aria-hidden className="size-6" />
              </button>
            </>
          )}

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-black text-sm text-white/80 uppercase tracking-[0.2em]">
            <span className="text-white">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-white/40">/</span>
            <span>{String(count).padStart(2, "0")}</span>
          </p>
        </div>
      )}
    </>
  );
}
