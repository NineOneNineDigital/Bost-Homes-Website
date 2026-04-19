"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface LeadershipCardProps {
  bio?: string;
  image: string;
  name: string;
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
  bio,
  size = "md",
}: LeadershipCardProps) {
  const [open, setOpen] = useState(false);
  const s = sizeClasses[size];

  return (
    <>
      <div className={`${s.card} text-center`}>
        <div className="group relative mx-auto mb-4 aspect-[3/4] w-full overflow-hidden">
          <Image
            alt={name}
            className="object-cover object-top"
            fill
            sizes={s.imgSize}
            src={image}
          />
          {bio && (
            <button
              className="absolute right-2 bottom-2 rounded bg-bost-olive/70 px-3 py-1.5 font-medium text-white text-xs uppercase tracking-wider backdrop-blur-sm transition-all hover:bg-bost-olive/90"
              onClick={() => setOpen(true)}
              type="button"
            >
              Bio
            </button>
          )}
        </div>
        <h3 className={`font-bold tracking-tight ${s.heading}`}>{name}</h3>
        <p className="font-medium text-bost-brick text-xs uppercase tracking-[0.15em]">
          {title}
        </p>
      </div>

      {bio && (
        <Dialog.Root onOpenChange={setOpen} open={open}>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-0 shadow-2xl transition-all duration-300 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-lg md:aspect-[3/4] md:w-56 md:rounded-t-none md:rounded-l-lg lg:w-64">
                  <Image
                    alt={name}
                    className="object-cover object-top"
                    fill
                    sizes="256px"
                    src={image}
                  />
                </div>
                <div className="flex-1 p-6 md:p-8">
                  <Dialog.Title className="mb-1 font-bold text-xl tracking-tight">
                    {name}
                  </Dialog.Title>
                  <p className="mb-4 font-medium text-bost-brick text-xs uppercase tracking-[0.15em]">
                    {title}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>
              <Dialog.Close className="absolute top-3 right-3 rounded-full bg-black/10 p-1.5 transition-colors hover:bg-black/20">
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
