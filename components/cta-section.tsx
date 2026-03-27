import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CtaSection() {
  return (
    <section className="relative flex min-h-[500px] flex-col overflow-hidden md:min-h-[580px] lg:min-h-[660px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          alt="Bost Custom Homes luxury exterior"
          className="object-cover object-center"
          fill
          sizes="100vw"
          src="/images/shared/cta-background.jpg"
        />
        {/* Gradient: transparent top, fading to black at bottom ~60% */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% via-black/60 via-75% to-black" />
      </div>

      {/* Content pinned to bottom */}
      <div className="relative mt-auto px-6 pb-12 md:px-12 md:pb-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-semibold text-5xl text-white leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            Ready to Build Your
            <br />
            Dream Home?
          </h2>
          <div className="shrink-0">
            <Button
              className="bg-bost-brick px-8 text-white hover:bg-bost-brick/90"
              render={<Link href="/contact" />}
              size="lg"
            >
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CtaSection };
