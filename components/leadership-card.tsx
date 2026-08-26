"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { CmsImage } from "@/components/cms-image";
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
  /** Candid/alternate shot from Hygraph, shown in the bio dialog when set. */
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
  const s = sizeClasses[size];

  // Headshots are uniformly 3:4, so the grid crops nothing. Secondary shots are
  // candids of any orientation (9:16 through 4:3), which a fixed frame would
  // gut — up to 62% of one. So the dialog sizes every photo from its real
  // dimensions: always stacked above the bio, never cropped, with the height
  // clamped per orientation so the name and opening lines stay above the fold.
  const photo = secondaryImage ?? image;
  const hasDimensions = Boolean(photo.width && photo.height);
  const isLandscape =
    hasDimensions && (photo.width ?? 0) >= (photo.height ?? 0);

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
            <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90dvh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white p-0 shadow-2xl transition-all duration-300 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
              <div className="flex min-h-0 flex-col overflow-y-auto overscroll-contain">
                <div className="flex shrink-0 items-center justify-center bg-bost-gray-lightest">
                  {hasDimensions ? (
                    <CmsImage
                      alt={name}
                      className={cn(
                        // h-auto/w-auto keep the natural ratio; the max-*
                        // clamps bound the image without ever cropping it.
                        "mx-auto h-auto w-auto max-w-full object-contain",
                        isLandscape
                          ? "max-h-[38dvh] md:max-h-[42dvh]"
                          : "max-h-[50dvh] md:max-h-[52dvh]"
                      )}
                      height={photo.height ?? 0}
                      sizes="(min-width: 448px) 448px, 90vw"
                      src={photo.url}
                      width={photo.width ?? 0}
                    />
                  ) : (
                    <div className="relative aspect-[3/4] w-full">
                      <CmsImage
                        alt={name}
                        className="object-cover object-top"
                        fill
                        sizes="(min-width: 448px) 448px, 90vw"
                        src={photo.url}
                      />
                    </div>
                  )}
                </div>
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
