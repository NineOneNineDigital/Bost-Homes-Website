import { ChevronLeft, ChevronRight, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { getTestimonials } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start your custom home project with Bost Custom Homes. Contact us at (919) 460-1983 or visit us at 8255 Chapel Hill Road, Cary, NC 27513.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const testimonials = await getTestimonials();

  const testimonial = testimonials[0];

  return (
    <main className="pt-20">
      {/* Header Section */}
      <section className="bg-white px-6 pt-16 pb-10 md:px-12 md:pt-24 md:pb-12 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl lg:text-[3.5rem]">
            Ready to build your dream?
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground leading-relaxed">
            Let&apos;s begin crafting the home of your dreams! Whether you
            already have land and architectural plans or are starting with a
            blank canvas, we are here to be your dream home construction
            consultants.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white px-6 pb-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-bost-olive px-6 pt-16 pb-10 md:px-12 md:pt-20 md:pb-12 lg:px-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Address Card */}
          <div className="flex items-start gap-4 rounded-xl bg-bost-mint p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bost-olive">
              <MapPin className="size-5 text-white" />
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
          <div className="flex items-start gap-4 rounded-xl bg-bost-mint p-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bost-olive">
              <Phone className="size-5 text-white" />
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
        <section className="bg-bost-olive px-6 pt-10 pb-16 md:px-12 md:pt-12 md:pb-20 lg:px-24">
          <div className="relative mx-auto max-w-3xl text-center">
            {/* Decorative quotation mark */}
            <div className="mb-6 flex justify-center">
              <svg
                aria-hidden="true"
                className="size-14 text-white/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.162 11 15c0 1.933-1.567 3.5-3.5 3.5-1.298 0-2.44-.671-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.162 21 15c0 1.933-1.567 3.5-3.5 3.5-1.298 0-2.44-.671-2.917-1.179z" />
              </svg>
            </div>

            {/* Quote text */}
            <blockquote className="mb-6 text-lg text-white italic leading-relaxed md:text-xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <p className="font-medium text-sm text-white/70 tracking-wide">
              {testimonial.author}
            </p>

            {/* Carousel arrows + dot pagination */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                aria-label="Previous testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                type="button"
              >
                <ChevronLeft className="size-5" />
              </button>

              {testimonials.length > 1 && (
                <div className="flex items-center gap-2">
                  {testimonials.map((t, i) => (
                    <span
                      className={`rounded-full transition-all ${
                        i === 0 ? "size-2.5 bg-white" : "size-2 bg-white/30"
                      }`}
                      key={t.id}
                    />
                  ))}
                </div>
              )}

              <button
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/50 hover:text-white"
                type="button"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Design Invitation — Floor Plan */}
      <section className="bg-bost-olive px-6 pb-24 md:px-12 md:pb-32 lg:px-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="order-2 md:order-1">
            <p className="mb-3 font-semibold text-bost-yellow text-xs uppercase tracking-[0.25em]">
              Your Blueprint
            </p>
            <h2 className="font-bold text-3xl text-white leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">
              Every home begins with a vision.
            </h2>
            <p className="mt-5 max-w-md text-base text-white/70 leading-relaxed">
              From the first sketch to the final walkthrough, we guide every
              line, every material, every decision. Reach out and let&apos;s
              start drawing yours.
            </p>
            <div className="mt-8 h-px w-16 bg-bost-yellow" />
          </div>
          <div className="relative order-1 overflow-hidden rounded-lg border border-white/10 bg-bost-cream p-3 shadow-2xl md:order-2 md:p-5">
            <Image
              alt="Architectural floor plan sketch for a custom Bost home"
              className="h-auto w-full"
              height={724}
              sizes="(min-width: 768px) 50vw, 100vw"
              src="/images/process/hero-architectural.png"
              width={1086}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
