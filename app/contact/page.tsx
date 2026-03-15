import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { CtaSection } from "@/components/cta-section";
import { getAwards, getTestimonials } from "@/lib/fetchers";

export default async function ContactPage() {
  const [testimonials, awards] = await Promise.all([
    getTestimonials(),
    getAwards(),
  ]);

  const testimonial = testimonials[0];

  return (
    <main>
      {/* Header Section */}
      <section className="px-6 pt-16 pb-10 text-center md:px-12 md:pt-24 md:pb-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl lg:text-[3.5rem]">
            Ready to build your dream?
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            Let&apos;s begin crafting the home of your dreams! Whether you
            already have land and architectural plans or are starting with a
            blank canvas, we are here to be your dream home construction
            consultants.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Address Card */}
          <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground">
              <MapPin className="size-5 text-background" />
            </div>
            <div>
              <p className="font-semibold text-sm">Bost Custom Homes</p>
              <p className="text-muted-foreground text-sm">
                8255 Chapel Hill Road
              </p>
              <p className="text-muted-foreground text-sm">Cary, NC 27513</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="flex items-start gap-4 rounded-xl bg-muted/50 p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground">
              <Phone className="size-5 text-background" />
            </div>
            <div>
              <p className="text-sm">
                <span className="text-muted-foreground">Phone:</span>{" "}
                <a
                  className="font-medium hover:text-bost-brick"
                  href="tel:+19194601983"
                >
                  (919) 460-1983
                </a>
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Fax:</span> (919)
                460-1986
              </p>
              <p className="text-muted-foreground text-sm">License #43957</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonial && (
        <section className="border-amber-500 border-t-4 px-6 py-16 md:px-12 md:py-20 lg:px-24">
          <div className="relative mx-auto max-w-3xl">
            {/* Quote icon */}
            <div className="mb-6 flex justify-center">
              <svg
                aria-hidden="true"
                className="size-12 text-bost-yellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.162 11 15c0 1.933-1.567 3.5-3.5 3.5-1.298 0-2.44-.671-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.162 21 15c0 1.933-1.567 3.5-3.5 3.5-1.298 0-2.44-.671-2.917-1.179z" />
              </svg>
            </div>

            {/* Navigation arrows */}
            <button
              aria-label="Previous testimonial"
              className="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2 rounded-full border border-border bg-white p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-foreground md:-translate-x-12"
              type="button"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              aria-label="Next testimonial"
              className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2 rounded-full border border-border bg-white p-1.5 text-muted-foreground shadow-sm transition-colors hover:text-foreground md:translate-x-12"
              type="button"
            >
              <ChevronRight className="size-4" />
            </button>

            {/* Quote text */}
            <blockquote className="px-8 text-center text-lg italic leading-relaxed md:px-12 md:text-xl">
              {testimonial.quote}
            </blockquote>

            {/* Attribution */}
            <p className="mt-6 text-center font-medium text-muted-foreground text-sm">
              {testimonial.author}
            </p>

            {/* Dot indicators */}
            {testimonials.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((t, i) => (
                  <span
                    className={`size-2.5 rounded-full ${i === 0 ? "bg-bost-yellow" : "bg-muted-foreground/30"}`}
                    key={t.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Awards Section */}
      <section className="px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mx-auto max-w-5xl">
          {/* Awards header */}
          <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8">
            <p className="shrink-0 font-semibold text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Awards
            </p>
            <h2 className="max-w-2xl font-bold text-2xl italic leading-snug tracking-tight md:text-3xl">
              We strive for excellence in all that we do, with integrity,
              innovation, and calculated execution.
            </h2>
          </div>

          {/* Award columns */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {awards.map((award) => (
              <div key={award.id}>
                <p className="mb-2 font-bold text-3xl text-bost-brick md:text-4xl">
                  {award.year}
                </p>
                <h3 className="mb-1 font-semibold text-sm">{award.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {award.description}
                </p>
              </div>
            ))}
          </div>

          {/* Accent line */}
          <div className="mt-10 h-1 w-32 bg-bost-yellow" />
        </div>
      </section>

      {/* Footer CTA */}
      <CtaSection />
    </main>
  );
}
