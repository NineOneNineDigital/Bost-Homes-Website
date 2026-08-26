import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CtaSection } from "@/components/cta-section";
import { ProcessAccordion } from "@/components/process-accordion";
import { ProcessCarousel } from "@/components/process-carousel";
import { Button } from "@/components/ui/button";
import { getProcessSteps } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Discover how Bost Custom Homes builds your dream home — from first conversation to final walkthrough. A true partnership built on transparency and craftsmanship.",
  alternates: { canonical: "/approach" },
};

export default async function ApproachPage() {
  const steps = await getProcessSteps();

  return (
    <main>
      {/* Hero Section — Blueprint background */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-white">
          <Image
            alt="Architectural drawings and blueprints"
            className="translate-x-[25%] translate-y-[20%] object-cover"
            fill
            priority
            sizes="100vw"
            src="/images/plan_sketch.png"
          />
          <div className="absolute inset-0 bg-bost-cream/70" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-36 pb-20 md:pt-44 md:pb-24">
          <div className="max-w-xl">
            <p className="mb-4 font-black text-bost-brick text-sm uppercase tracking-[0.2em]">
              Approach
            </p>
            <h1 className="mb-6 font-bold text-3xl text-bost-olive leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
              A Transparent Partnership from First Conversation through Final
              Walkthrough
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
              Commissioning a custom home is a most significant endeavor. We
              want the journey to be as rewarding as the destination.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section — dark olive, CMS carousel */}
      <section className="overflow-hidden bg-bost-olive px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ProcessCarousel steps={steps} />
        </div>
      </section>

      {/* Products & Expertise Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-black text-muted-foreground text-sm uppercase tracking-[0.2em]">
            Your Builder For Life
          </p>
          <h2 className="mb-4 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
            Deploying our Expertise,
            <br />
            Meeting You Where You Are
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Lean on us during due diligence, through design, construction, move
            in, and for whatever comes next. From urban infill flats to
            agricultural homesteads spanning dozens of acres, from contemporary
            innovations to revived classics, we&apos;ve guided our diverse
            clients to their unique dream homes — sharing their vision and
            forging their path together.
          </p>
        </div>
      </section>

      {/* High Performance Homes Section — reversed layout */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <p className="mb-3 font-black text-muted-foreground text-sm uppercase tracking-[0.2em]">
                Uncompromising Standards
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                We believe custom homes
                <br />
                are high performance homes
              </h2>
              <p className="mb-8 text-base text-muted-foreground leading-relaxed">
                Explore our standard specs and upgrades for energy efficiency,
                power generation, water conservation, healthy air and water, and
                indoor comfort. Viewing the home as a complete system, we help
                clients achieve their desired sustainability, self-reliance, and
                healthy indoor environment.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/approach/high-performance-homes" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
            <div className="relative order-1 aspect-[4/3] w-full overflow-hidden bg-muted md:order-2">
              <Image
                alt="Modern Bost custom home with solar panels and pool"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/bos201015_292.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                alt="Concrete masonry framing under construction at a Bost custom home"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/Sequence 04.00_01_35_00.Still003.jpg"
              />
            </div>
            <div>
              <p className="mb-3 font-black text-muted-foreground text-sm uppercase tracking-[0.2em]">
                Masonry Framing
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Big bad wolf
                <br />
                not welcome here
              </h2>
              <p className="mb-8 text-base text-muted-foreground leading-relaxed">
                Masonry framed homes offer uncompromising strength, efficiency,
                and protection. Built like castles that have stood for
                centuries, our masonry framed homes offer peace of mind for
                discerning clients and generations to come.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/approach/masonry-framing" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ProcessAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
