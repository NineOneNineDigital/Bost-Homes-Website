import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";

export default function SustainabilityPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest">
              <li>
                <Link className="hover:text-foreground" href="/our-process">
                  Our Process
                </Link>
              </li>
              <li>
                <span className="mx-1">&gt;</span>
              </li>
              <li className="text-foreground">Sustainability</li>
            </ol>
          </nav>
          <h1 className="mb-6 font-bold text-3xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            A True Partnership From First
            <br />
            Conversation to Final Walkthrough
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            We believe in building homes that are kind to the environment and
            designed to perform efficiently for generations to come.
          </p>
        </div>
      </section>

      {/* Full-Width Image Section */}
      <section className="relative">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            alt="Sustainable building practices at Bost Custom Homes"
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src="/images/about/photo-strip-4.jpg"
          />
        </div>
      </section>

      {/* Content Section 1 — Image Left, Text Right */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt="Green building practices"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/process/masonry-section.jpg"
              />
            </div>
            <div>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Built with integrity,
                <br />
                from the ground up
              </h2>
              <p className="mb-8 text-base text-muted-foreground leading-relaxed">
                Sustainability starts at the foundation. We employ advanced
                building science to maximize energy efficiency, using tightly
                sealed building envelopes, high-performance insulation, and
                energy-recovery ventilation systems that dramatically reduce
                your home&apos;s environmental footprint without sacrificing
                comfort.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/contact" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 2 — Text Left, Image Right */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Crafted for today,
                <br />
                but designed for tomorrow
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Every Bost home is designed with longevity in mind. We
                incorporate renewable materials, low-VOC finishes, and
                water-conserving fixtures as standard. Our forward-thinking
                approach includes pre-wiring for solar, EV-ready garages, and
                smart-home systems that help you manage energy consumption
                effortlessly.
              </p>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden md:order-2">
              <Image
                alt="Energy-efficient home features"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/about/photo-strip-1.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-square overflow-hidden">
              <Image
                alt="Sustainable materials showcase"
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src="/images/about/photo-strip-3.jpg"
              />
            </div>
            <div>
              <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                Process &amp; Expertise
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Materials That Matter,
                <br />
                Expertise That Elevates
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                We partner with suppliers who share our commitment to
                responsibility. From FSC-certified lumber and recycled-content
                countertops to locally sourced stone and reclaimed wood accents,
                every material is vetted for both quality and environmental
                impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
