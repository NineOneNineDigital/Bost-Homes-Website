"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CmsImage } from "@/components/cms-image";
import { useSwipeNav } from "@/hooks/use-swipe-nav";
import { cn } from "@/lib/utils";

interface CardImage {
  height?: number;
  url: string;
  width?: number;
}

interface LeadershipCardProps {
  bio?: string;
  image: CardImage;
  name: string;
  /** Candid/alternate shot from Hygraph, shown alongside the headshot. */
  secondaryImage?: CardImage;
  size?: "lg" | "md" | "sm";
  title: string;
}

const sizeClasses = {
  lg: {
    card: "w-full max-w-80 md:max-w-88",
    imgSize: "352px",
    heading: "text-lg",
  },
  md: {
    card: "w-full max-w-64 md:max-w-72",
    imgSize: "288px",
    heading: "text-base",
  },
  sm: {
    card: "w-full max-w-52 md:max-w-60",
    imgSize: "240px",
    heading: "text-sm",
  },
};

export function LeadershipCard({
  name,
  title,
  image,
  secondaryImage,
  bio,
  size = "md",
}: LeadershipCardProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const s = sizeClasses[size];

  // Headshot first, then any candid. Hygraph editors sometimes point both
  // fields at the same asset, which would otherwise render a two-slide
  // carousel of identical photos.
  const photos = [image, secondaryImage].filter(
    (p, i, all): p is CardImage =>
      Boolean(p?.url) && all.findIndex((o) => o?.url === p?.url) === i
  );
  const count = photos.length;
  const photo = photos[index] ?? photos[0];

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const { onTouchStart, onTouchEnd } = useSwipeNav(prev, next);

  // Reopening should start from the headshot rather than wherever the last
  // visit left off.
  useEffect(() => {
    if (!open) {
      setIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!(open && count > 1)) {
      return;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, prev, next]);

  return (
    <>
      <div className={`${s.card} text-center`}>
        <div className="group relative mx-auto mb-4 aspect-[3/4] w-full overflow-hidden">
          <CmsImage
            alt={name}
            className="object-cover object-top"
            fill
            sizes={s.imgSize}
            src={image.url}
          />
          {bio && (
            <button
              className="absolute right-2 bottom-2 cursor-pointer rounded bg-bost-olive/70 px-3 py-1.5 font-medium text-white text-xs uppercase tracking-wider backdrop-blur-sm transition-all hover:bg-bost-olive/90"
              onClick={() => setOpen(true)}
              type="button"
            >
              Bio
            </button>
          )}
        </div>
        <h3 className={`font-bold tracking-tight ${s.heading}`}>{name}</h3>
        <p className="font-black text-bost-brick text-sm uppercase tracking-[0.15em]">
          {title}
        </p>
      </div>

      {bio && (
        <Dialog.Root onOpenChange={setOpen} open={open}>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90dvh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white p-0 shadow-2xl transition-all duration-300 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
              <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain">
                {/* Photos range from 9:16 to 4:3, so the band is a fixed height
                    with object-contain: nothing is cropped, and slides don't
                    resize the dialog as you swipe between them. */}
                <div
                  className="group relative h-[38dvh] w-full shrink-0 bg-bost-gray-lightest md:h-[46dvh]"
                  onTouchEnd={onTouchEnd}
                  onTouchStart={onTouchStart}
                >
                  <CmsImage
                    alt={
                      count > 1
                        ? `${name} — photo ${index + 1} of ${count}`
                        : name
                    }
                    className="object-contain"
                    fill
                    sizes="(min-width: 768px) 672px, 90vw"
                    src={photo.url}
                  />

                  {count > 1 && (
                    <>
                      <button
                        aria-label="Previous photo"
                        className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 opacity-0 shadow transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 md:opacity-70"
                        onClick={prev}
                        type="button"
                      >
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        aria-label="Next photo"
                        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 p-2 opacity-0 shadow transition-opacity hover:bg-white focus-visible:opacity-100 group-hover:opacity-100 md:opacity-70"
                        onClick={next}
                        type="button"
                      >
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                </div>

                {count > 1 && (
                  <div className="flex shrink-0 justify-center gap-2 bg-white pt-4">
                    {photos.map((p, i) => (
                      <button
                        aria-current={i === index}
                        aria-label={`Show photo ${i + 1}`}
                        className={cn(
                          "size-2 cursor-pointer rounded-full transition-colors",
                          i === index
                            ? "bg-bost-olive"
                            : "bg-bost-olive/30 hover:bg-bost-olive/60"
                        )}
                        key={p.url}
                        onClick={() => goTo(i)}
                        type="button"
                      />
                    ))}
                  </div>
                )}

                <div className="flex-1 p-6 md:p-8">
                  <Dialog.Title className="mb-1 font-bold text-xl tracking-tight">
                    {name}
                  </Dialog.Title>
                  <p className="mb-4 font-black text-bost-brick text-sm uppercase tracking-[0.15em]">
                    {title}
                  </p>
                  <p className="whitespace-pre-line text-base text-muted-foreground leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>
              <Dialog.Close className="absolute top-3 right-3 z-10 cursor-pointer rounded-full bg-black/10 p-1.5 transition-colors hover:bg-black/20">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </>
  );
}
