import { Check, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CtaSection } from "@/components/cta-section";
import { getGreenFeatures, getPageContent } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Green Building & Sustainability",
  description:
    "Bost Custom Homes has pioneered green building in NC for over 20 years. Learn about our HERS-rated energy efficient homes and sustainable construction practices.",
  alternates: { canonical: "/approach/sustainability" },
};

export default async function SustainabilityPage() {
  const [features, page] = await Promise.all([
    getGreenFeatures(),
    getPageContent("sustainability"),
  ]);
  const featured = features.filter((f) => f.standard === true);
  const additional = features.filter((f) => f.standard !== true);
  const hersSection = page?.sections[0];

  return (
    <main className="pt-20">
      {/* Hero */}
      {page?.hero?.backgroundImage ? (
        <section className="relative h-[480px] w-full overflow-hidden md:h-[560px] lg:h-[620px]">
          <Image
            alt={page.hero.backgroundImage.alt ?? page.hero.heading}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={page.hero.backgroundImage.url}
          />
          <div className="absolute inset-0 bg-bost-olive/70" />
          <div className="absolute top-0 right-0 left-0 z-10 px-6 pt-6 md:px-12 md:pt-8 lg:px-24">
            <div className="mx-auto max-w-7xl">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-widest">
                  <li>
                    <Link
                      className="transition-colors hover:text-white"
                      href="/approach"
                    >
                      Our Process
                    </Link>
                  </li>
                  <li>
                    <span className="mx-1">&gt;</span>
                  </li>
                  <li className="text-white">Sustainability</li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="absolute inset-0 flex items-end px-6 pb-14 md:items-center md:px-12 md:pb-0 lg:px-24">
            <div className="mx-auto w-full max-w-7xl">
              <div className="max-w-2xl">
                <p className="mb-4 font-black text-bost-yellow text-sm uppercase tracking-[0.25em]">
                  Our Process
                </p>
                <h1 className="mb-6 font-bold text-3xl text-white leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                  {page.hero.heading}
                </h1>
                {page.hero.subheading && (
                  <p className="text-base text-white/75 leading-relaxed md:text-lg">
                    {page.hero.subheading}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-6 pt-8 pb-16 md:px-12 md:pt-10 md:pb-24 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest">
                <li>
                  <Link className="hover:text-foreground" href="/approach">
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
              {page?.hero?.heading ?? "High Performance Homes"}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
              {page?.hero?.subheading ??
                "We understand the importance of building a home that is healthy for you and your family, resource efficient, low maintenance, and comfortable."}
            </p>
          </div>
        </section>
      )}

      {/* HERS Score Section */}
      <section className="bg-bost-olive px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-3 font-black text-bost-blue text-sm uppercase tracking-[0.2em]">
                Third-Party Verified
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                {hersSection?.heading ?? "Every Home Receives a HERS Score"}
              </h2>
              {hersSection?.body?.html ? (
                <div
                  className="hers-body text-white/80"
                  dangerouslySetInnerHTML={{ __html: hersSection.body.html }}
                />
              ) : (
                <p className="text-base text-white/80 leading-relaxed">
                  The HERS Index is the industry-standard scoring system for
                  measuring a home&apos;s energy efficiency — similar to MPG
                  ratings for vehicles.
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="flex size-52 flex-col items-center justify-center rounded-full border-4 border-bost-blue md:size-64">
                <p className="font-bold text-5xl text-white md:text-6xl">16</p>
                <p className="mt-1 font-black text-bost-blue text-sm uppercase tracking-widest">
                  HERS Score
                </p>
                <p className="mt-1 text-white/50 text-xs">2026 Bost Model</p>
              </div>
              <p className="max-w-sm text-center text-base text-white/70 leading-relaxed">
                Score of the 2026 Bost Model Home, achieved through a systematic
                combination of tight air barrier, premium windows, passive solar
                design, SPF insulation, high efficiency HVAC, photovoltaic
                production, and active battery usage overnight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Green Building Techniques */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 font-black text-bost-brick text-sm uppercase tracking-[0.2em]">
              Products &amp; Techniques
            </p>
            <h2 className="mb-4 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
              Building the Home as a System
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Standard and optional high-performance specifications listed
              below. Don&apos;t see something you&apos;d like to include in your
              home? Let&apos;s add it to the list.
            </p>
          </div>
          {featured.length > 0 && (
            <>
              <p className="mb-6 font-black text-bost-olive text-sm uppercase tracking-[0.2em]">
                Standard
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((feature) => (
                  <div
                    className="group rounded-lg border border-border bg-white p-8 transition-shadow hover:shadow-lg"
                    key={feature.id}
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-bost-mint">
                      <Leaf className="size-5 text-bost-olive" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground text-lg leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {additional.length > 0 && (
            <div className="mt-16">
              <p className="mb-6 font-black text-bost-olive text-sm uppercase tracking-[0.2em]">
                Optional
              </p>
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {additional.map((feature) => (
                  <div className="flex items-start gap-3" key={feature.id}>
                    <Check className="mt-0.5 size-4 shrink-0 text-bost-brick" />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {feature.title}
                      </p>
                      <p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
