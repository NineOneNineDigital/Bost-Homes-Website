import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProjects,
  getNeighborhoods,
  getTestimonials,
} from "@/lib/fetchers";

export default async function Page() {
  const [projects, neighborhoods, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getNeighborhoods(),
    getTestimonials(),
  ]);

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
      <section className="relative flex min-h-svh flex-col">
        {/* Background video */}
        <div className="absolute inset-0 bg-bost-olive">
          <video
            autoPlay
            className="h-full w-full object-cover"
            loop
            muted
            playsInline
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Content — lower-left in translucent olive shape */}
        <div className="relative z-10 mt-auto px-6 pb-24 md:px-12 lg:px-24">
          <div className="max-w-3xl bg-bost-olive/75 px-10 py-10 backdrop-blur-sm md:px-12 md:py-12 lg:max-w-4xl">
            <p className="mb-4 font-medium text-sm text-white/80 uppercase tracking-[0.3em]">
              Welcome
            </p>
            <h1 className="mb-6 font-bold text-4xl text-white leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
              Designed for Distinction.
              <br />
              Built for the Art of Living.
            </h1>
            <p className="max-w-xl text-sm text-white/75 leading-relaxed md:text-base">
              Your vision defines our process. We&apos;ll guide you through a
              collaborative partnership, translating your passion into a truly
              custom home or estate, built with calculated execution and timeless
              craftsmanship.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-0">
          <ChevronDown className="size-5 animate-bounce text-white/60" />
          <ChevronDown className="-mt-3 size-5 animate-bounce text-white/60" />
        </div>
      </section>

      {/* ── 2. WHO WE ARE ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-8 py-20 md:px-16 md:py-28 lg:px-24">
          {/* Top row: eyebrow left, bold statement right */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <p className="font-medium text-bost-black/50 text-xs uppercase tracking-[0.2em]">
              Who We Are
            </p>
            <p className="font-bold text-2xl text-bost-black leading-snug md:text-3xl lg:text-[42px] lg:leading-[1.5]">
              We are a team of Planners and Executors. Dreamers and
              Pragmatists. We believe the enjoyment and transparency of the
              process is equally important as the end result.
            </p>
          </div>

          {/* Bottom row: description + button left, team image right */}
          <div className="mt-12 grid grid-cols-1 items-end gap-12 lg:mt-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Left column — body text + button */}
            <div>
              <div className="mb-6 h-px w-48 bg-bost-gray-light" />
              <p className="mb-8 text-sm text-bost-black/65 leading-relaxed">
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
                alt="Bost Custom Homes luxury interior"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                src="/images/home/who-we-are.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FEATURED PROJECTS ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bost-olive py-20 md:py-28">
        {/* Decorative pattern overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/shared/decorative-pattern.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-8 md:px-16 lg:px-24">
          {/* Section header */}
          <p className="mb-10 font-medium text-bost-gray-lightest text-xs uppercase tracking-[0.3em]">
            Featured Projects
          </p>

          {/* Project grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {/* Row 1: large left + smaller right stack */}
              {projects[0] && (
                <Link
                  className="group relative overflow-hidden bg-bost-olive/40 md:row-span-2"
                  href={`/portfolio/${projects[0].slug || projects[0].id}`}
                >
                  <div className="relative h-72 md:h-full md:min-h-[480px]">
                    {projects[0].images?.[0] ? (
                      <Image
                        alt={projects[0].name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        src={projects[0].images[0].url}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                      <p className="font-medium text-sm text-white tracking-wide">
                        {projects[0].name}
                      </p>
                      {projects[0].location && (
                        <p className="mt-0.5 text-white/60 text-xs">
                          {projects[0].location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )}

              {[projects[1], projects[2]].filter(Boolean).map((project) => (
                <Link
                  className="group relative overflow-hidden bg-bost-olive/40"
                  href={`/portfolio/${project.slug || project.id}`}
                  key={project.id}
                >
                  <div className="relative h-56 md:h-[234px]">
                    {project.images?.[0] ? (
                      <Image
                        alt={project.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        src={project.images[0].url}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="font-medium text-sm text-white tracking-wide">
                        {project.name}
                      </p>
                      {project.location && (
                        <p className="mt-0.5 text-white/60 text-xs">
                          {project.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}

              {/* Row 2: two equal-width cells */}
              {[projects[3], projects[4]].filter(Boolean).map((project) => (
                <Link
                  className="group relative overflow-hidden bg-bost-olive/40"
                  href={`/portfolio/${project.slug || project.id}`}
                  key={project.id}
                >
                  <div className="relative h-56 md:h-[220px]">
                    {project.images?.[0] ? (
                      <Image
                        alt={project.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        src={project.images[0].url}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="font-medium text-sm text-white tracking-wide">
                        {project.name}
                      </p>
                      {project.location && (
                        <p className="mt-0.5 text-white/60 text-xs">
                          {project.location}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
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
      {testimonial && (
        <section className="relative bg-bost-gray-lightest px-8 py-20 md:px-16 md:py-28">
          {/* Top divider */}
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="h-px w-full max-w-3xl bg-bost-gray-light" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Quote icon */}
            <svg
              aria-hidden="true"
              className="mx-auto mb-8 size-12 text-bost-blue"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.162 11 15c0 1.933-1.567 3.5-3.5 3.5-1.298 0-2.44-.671-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.162 21 15c0 1.933-1.567 3.5-3.5 3.5-1.298 0-2.44-.671-2.917-1.179z" />
            </svg>

            {/* Left arrow */}
            <button
              aria-label="Previous testimonial"
              className="absolute top-1/2 left-0 flex size-10 -translate-x-full -translate-y-1/2 items-center justify-center rounded-full border border-bost-gray-light text-bost-black/40 transition-colors hover:border-bost-olive hover:text-bost-olive md:-translate-x-16"
              type="button"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Right arrow */}
            <button
              aria-label="Next testimonial"
              className="absolute top-1/2 right-0 flex size-10 -translate-y-1/2 translate-x-full items-center justify-center rounded-full border border-bost-gray-light text-bost-black/40 transition-colors hover:border-bost-olive hover:text-bost-olive md:translate-x-16"
              type="button"
            >
              <ChevronRight className="size-5" />
            </button>

            <blockquote className="mb-8">
              <p className="text-bost-black/65 text-lg italic leading-relaxed md:text-xl">
                {testimonial.quote}
              </p>
            </blockquote>
            <cite className="block font-semibold text-bost-black text-sm not-italic">
              {testimonial.author}
            </cite>

            {/* Dots */}
            {allTestimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {allTestimonials.map((t, i) => (
                  <span
                    className={`rounded-full transition-all ${
                      i === 0
                        ? "size-2.5 bg-bost-olive"
                        : "size-2 bg-bost-gray-light"
                    }`}
                    key={t.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 5. FEATURED NEIGHBORHOODS ─────────────────────────────────── */}
      <section className="px-8 py-20 md:px-16 md:py-28 lg:px-24">
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

            {/* Right: mosaic image grid — 3 cols, 2 rows */}
            <div className="grid grid-cols-3 grid-rows-2 gap-0.5">
              {[
                "/images/about/photo-strip-1.jpg",
                "/images/about/photo-strip-3.jpg",
                "/images/about/photo-strip-4.jpg",
                "/images/about/photo-strip-2.jpg",
                "/images/process/masonry-section.jpg",
                "/images/home/who-we-are.jpg",
              ].map((src, i) => (
                <Link
                  className="group relative overflow-hidden bg-bost-gray-lighter"
                  href="/featured-neighborhoods"
                  key={src}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      alt={`Neighborhood ${i + 1}`}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 20vw, 33vw"
                      src={src}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────────────── */}
      <CtaSection />
    </main>
  );
}
