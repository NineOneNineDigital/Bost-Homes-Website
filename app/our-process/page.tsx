import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { ProcessAccordion } from "@/components/process-accordion";
import { ProcessCarousel } from "@/components/process-carousel";
import { Button } from "@/components/ui/button";
import { getProcessSteps } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Discover how Bost Custom Homes builds your dream home — from first conversation to final walkthrough. A true partnership built on transparency and craftsmanship.",
  alternates: { canonical: "/our-process" },
};

export default async function OurProcessPage() {
  const steps = await getProcessSteps();

  return (
    <main className="pt-20">
      {/* Hero Section — Blueprint background */}
      <section className="relative flex min-h-[70vh] items-center">
        <div className="absolute inset-0 bg-bost-olive">
          <Image
            alt="Architectural drawings and blueprints"
            className="object-cover opacity-50"
            fill
            priority
            sizes="100vw"
            src="/images/plan_sketch.png"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
          <p className="mb-4 font-medium text-bost-yellow text-xs uppercase tracking-[0.2em]">
            Our Process
          </p>
          <h1 className="mb-6 font-bold text-3xl text-white leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            A True Partnership From First
            <span className="hidden md:inline">
              <br />
            </span>{" "}
            Conversation to Final Walkthrough
          </h1>
          <p className="max-w-2xl text-base text-white/70 leading-relaxed md:text-lg">
            Building a custom home is one of life&apos;s most significant
            endeavors. We ensure the journey is as rewarding as the destination.
          </p>
        </div>
      </section>

      {/* What to Expect Section — dark olive, CMS carousel */}
      <section className="overflow-hidden bg-bost-olive px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ProcessCarousel steps={steps} />
        </div>
      </section>

      {/* Masonry Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                alt="Masonry construction detail"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/process/masonry-section.jpg"
              />
            </div>
            <div>
              <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                Masonry
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Built with integrity,
                <br />
                from the ground up
              </h2>
              <p className="mb-8 text-base text-muted-foreground leading-relaxed">
                We hold ourselves to the highest standards of construction
                quality. From foundations to finish work, every element is
                executed with precision and care by our trusted team of
                craftsmen and trade partners.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/our-process/sustainability" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section — reversed layout */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                Sustainability
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Crafted for today, but designed
                <br />
                for tomorrow
              </h2>
              <p className="mb-8 text-base text-muted-foreground leading-relaxed">
                Our homes are designed to stand the test of time — both in
                durability and in style. We incorporate sustainable building
                practices and forward-thinking design so your home remains as
                relevant and efficient decades from now as it is on move-in day.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/our-process/sustainability" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
            <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted md:order-2">
              <Image
                alt="Sustainable custom home by Bost Homes"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/about/photo-strip-4.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products & Expertise Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          {/* Two-column header */}
          <div className="mb-12 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                Products &amp; Expertise
              </p>
            </div>
            <div>
              <h2 className="mb-4 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Materials That Matter, Expertise
                <br />
                That Elevates
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We source premium materials and partner with specialized
                artisans to deliver a level of quality you can see and feel.
                From hand-selected hardwoods to custom millwork, every material
                is chosen with intention and installed with expertise.
              </p>
            </div>
          </div>

          {/* Accordion FAQ */}
          <ProcessAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
