import { ArrowRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CtaSection } from "@/components/cta-section";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProjects,
  getNeighborhoods,
  getTestimonials,
} from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Bost Custom Homes | Luxury Custom Home Builder in Cary, NC",
  description:
    "Bost Custom Homes has been building luxury custom homes in Raleigh, Cary, and the Triangle area since 1986. Designed for distinction, built for the art of living.",
  alternates: { canonical: "/" },
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export default async function Page() {
  const [projects, neighborhoods, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getNeighborhoods(),
    getTestimonials(),
  ]);

  const neighborhoodSummaries = neighborhoods
    .map((n) => {
      const available = (n.lots ?? []).filter(
        (l) => l.lotStatus === "AVAILABLE"
      );
      const availableCount = available.length || (n.availableLots ?? 0);
      const prices = available
        .map((l) => l.price)
        .filter((p): p is number => typeof p === "number" && p > 0);
      const startingPrice = prices.length > 0 ? Math.min(...prices) : null;
      return {
        id: n.id,
        name: n.name,
        slug: n.slug,
        availableCount,
        startingPrice,
      };
    })
    .filter((n) => n.availableCount > 0)
    .sort((a, b) => b.availableCount - a.availableCount);

  const totalAvailable = neighborhoodSummaries.reduce(
    (sum, n) => sum + n.availableCount,
    0
  );
  const activeNeighborhoods = neighborhoodSummaries.length;
  const allStartingPrices = neighborhoodSummaries
    .map((n) => n.startingPrice)
    .filter((p): p is number => p !== null);
  const minStartingPrice =
    allStartingPrices.length > 0 ? Math.min(...allStartingPrices) : null;

  const staticTestimonials = [
    {
      id: "static-1",
      quote:
        "I'm so grateful that builders like the Bost Homes team continue to work on our home even during trying times like these. They do it because they care. They care about their clients who have invested a lot of time and money in these projects. They care about subcontractors who rely on them for their jobs. And they care about their professional reputations.",
      author: "D'ann George",
    },
  ];
  const allTestimonials =
    testimonials.length > 0 ? testimonials : staticTestimonials;
  const testimonial = allTestimonials[0];

  return (
    <main>
      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative flex flex-col md:min-h-svh">
        {/* Background image — natural aspect on mobile, fill on desktop */}
        <div className="relative aspect-[1024/683] w-full bg-bost-olive md:absolute md:inset-0 md:aspect-auto">
          <Image
            alt="Bost Custom Homes — Canyon Crest"
            className="object-cover md:object-cover"
            fill
            priority
            sizes="100vw"
            src="/images/home/hero.jpg"
          />
        </div>
        {/* Content — stacked below on mobile, overlay lower-left on desktop */}
        <div className="relative z-10 bg-bost-olive px-6 py-12 md:mt-auto md:bg-transparent md:px-12 md:py-0 md:pb-24 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div
              className="bg-bost-olive/75 px-8 py-8 backdrop-blur-sm md:max-w-xl md:px-10 md:py-10"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 60px) 0, 100% 60px, 100% 100%, 0 100%)",
              }}
            >
              <p className="mb-3 font-medium text-white/80 text-xs uppercase tracking-[0.3em]">
                Welcome
              </p>
              <h1 className="mb-4 font-bold text-2xl text-white leading-[1.1] tracking-tight md:text-3xl lg:text-4xl">
                Designed for Distinction.
                <br />
                Built for the Art of Living.
              </h1>
              <p className="max-w-md text-sm text-white/75 leading-relaxed">
                Your vision defines our process—translating your passion into a
                truly custom home, built with calculated execution and timeless
                craftsmanship.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator — desktop only */}
        <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-0 md:flex">
          <ChevronDown className="size-5 animate-bounce text-white/60" />
          <ChevronDown className="-mt-3 size-5 animate-bounce text-white/60" />
        </div>
      </section>

      {/* ── 2. WHO WE ARE ─────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {/* Top row: eyebrow left, bold statement right */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <p className="font-medium text-bost-black/50 text-xs uppercase tracking-[0.2em]">
              Who We Are
            </p>
            <p className="font-bold text-bost-black text-xl leading-snug md:text-2xl lg:text-3xl lg:leading-normal">
              We are a team of Planners and Executors. Dreamers and Pragmatists.
              We believe the enjoyment and transparency of the process is
              equally important as the end result.
            </p>
          </div>

          {/* Bottom row: description + button left, team image right */}
          <div className="mt-12 grid grid-cols-1 items-end gap-12 lg:mt-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Left column — body text + button */}
            <div>
              <div className="mb-6 h-px w-48 bg-bost-gray-light" />
              <p className="mb-8 text-bost-black/65 text-sm leading-relaxed">
                We&apos;ve been crafting custom homes rooted in artistry,
                transparency, and calculated execution for nearly four decades.
                Our work begins with listening—because a custom home should
                reflect your lifestyle, your values, and your vision for the
                future.
              </p>
              <Button
                className="bg-bost-brick px-6 text-white hover:bg-bost-brick/90"
                render={<Link href="/about" />}
                size="lg"
              >
                Our Approach
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </div>

            {/* Right column — team photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                alt="The Bost Custom Homes team"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                src="/images/team-photo.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bost-olive px-6 py-20 md:px-12 md:py-28 lg:px-24">
        {/* Decorative pattern overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/shared/decorative-pattern.svg')",
            backgroundSize: "min(100%, 800px) auto",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Section header */}
          <p className="mb-10 font-medium text-bost-gray-lightest text-xs uppercase tracking-[0.3em]">
            Featured Projects
          </p>

          {/* Project grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {projects.slice(0, 3).map((project) => {
                const cardImage = project.mainImage ?? project.images?.[0];
                return (
                  <Link
                    className="group relative block overflow-hidden"
                    href={`/portfolio/${project.slug || project.id}`}
                    key={project.id}
                  >
                    <div className="relative aspect-square w-full bg-bost-olive/40">
                      {cardImage ? (
                        <Image
                          alt={project.name}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          src={cardImage.url}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-white/5" />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        {project.location && (
                          <p className="mb-1 font-medium text-[11px] text-white/75 uppercase tracking-[0.2em]">
                            {project.location}
                          </p>
                        )}
                        <h3 className="font-semibold text-lg text-white leading-tight tracking-tight md:text-xl">
                          {project.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded border border-white/10">
              <p className="text-sm text-white/30">No projects available</p>
            </div>
          )}

          {/* CTA button */}
          <div className="mt-10 flex justify-center">
            <Button
              className="border-white/60 bg-transparent px-8 text-white hover:border-white hover:bg-white/10"
              render={<Link href="/portfolio" />}
              size="lg"
              variant="outline"
            >
              View Our Portfolio
              <ArrowRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIAL ────────────────────────────────────────────── */}
      {allTestimonials.length > 0 && (
        <TestimonialCarousel testimonials={allTestimonials} />
      )}

      {/* ── 5. FEATURED NEIGHBORHOODS ─────────────────────────────────── */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 overflow-hidden lg:grid-cols-[2fr_3fr]">
            {/* Left: dark olive card */}
            <div className="flex flex-col justify-between bg-bost-olive p-8 md:p-12">
              <div>
                <h2 className="mb-4 font-bold text-2xl text-white leading-snug md:text-3xl">
                  Shovel-Ready Lots in
                  <br />
                  Future Classic Neighborhoods
                </h2>
                <p className="mb-8 text-sm text-white/65 leading-relaxed">
                  We strategically invest in luxury estate lots and infill sites
                  throughout Raleigh, Cary, Durham, and surrounding areas. The
                  perfect address to call home may be available for reservation
                  today.
                </p>
              </div>
              <div>
                <Button
                  className="bg-bost-brick px-6 text-white hover:bg-bost-brick/90"
                  render={<Link href="/featured-neighborhoods" />}
                  size="lg"
                >
                  Available Homesites
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>

            {/* Right: live availability panel from Hygraph */}
            <div className="flex flex-col bg-bost-cream p-8 md:p-12">
              <p className="mb-6 font-medium text-bost-olive/60 text-xs uppercase tracking-[0.2em]">
                Current Availability
              </p>
              <div className="mb-8 grid grid-cols-3 gap-4 border-bost-olive/10 border-b pb-8">
                <div>
                  <p className="font-bold text-3xl text-bost-olive leading-none md:text-4xl">
                    {totalAvailable || "—"}
                  </p>
                  <p className="mt-2 text-bost-olive/60 text-xs leading-tight">
                    Homesites
                  </p>
                </div>
                <div>
                  <p className="font-bold text-3xl text-bost-olive leading-none md:text-4xl">
                    {activeNeighborhoods || "—"}
                  </p>
                  <p className="mt-2 text-bost-olive/60 text-xs leading-tight">
                    Neighborhoods
                  </p>
                </div>
                <div>
                  <p className="font-bold text-3xl text-bost-olive leading-none md:text-4xl">
                    {minStartingPrice
                      ? priceFormatter.format(minStartingPrice)
                      : "—"}
                  </p>
                  <p className="mt-2 text-bost-olive/60 text-xs leading-tight">
                    Starting From
                  </p>
                </div>
              </div>
              {neighborhoodSummaries.length > 0 ? (
                <ul className="flex flex-1 flex-col divide-y divide-bost-olive/10">
                  {neighborhoodSummaries.slice(0, 5).map((n) => (
                    <li key={n.id}>
                      <Link
                        className="group -mx-3 flex items-center justify-between gap-4 rounded-sm px-3 py-4 transition-colors hover:bg-bost-olive/5"
                        href={`/featured-neighborhoods/${n.slug}`}
                      >
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-bost-olive text-sm md:text-base">
                            {n.name}
                          </p>
                          <p className="mt-0.5 text-bost-olive/60 text-xs">
                            {n.availableCount} lot
                            {n.availableCount === 1 ? "" : "s"} available
                            {n.startingPrice
                              ? ` · from ${priceFormatter.format(n.startingPrice)}`
                              : ""}
                          </p>
                        </div>
                        <ArrowRight
                          aria-hidden
                          className="size-4 shrink-0 text-bost-olive/40 transition-transform group-hover:translate-x-0.5 group-hover:text-bost-olive"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-1 items-center justify-center py-8">
                  <p className="text-bost-olive/60 text-sm">
                    New homesites coming soon — contact us for early access.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────────────── */}
      <CtaSection />
    </main>
  );
}
