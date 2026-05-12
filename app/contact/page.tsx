import { MapPin, Phone, Plus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Start your custom home project with Bost Custom Homes. Contact us at (919) 460-1983 or visit us at 8255 Chapel Hill Road, Cary, NC 27513.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  {
    question: "Do you have a minimum budget amount to take on a project?",
    answer:
      "Not in budgetary terms, but we do have a minimum quality of craftsmanship and process that often provides the most value for a luxury-oriented project. We can hit smaller budgets if the goal is quality over quantity.",
  },
  {
    question: "What is your geographic service area?",
    answer:
      "Our team can easily handle projects across Wake, Eastern Chatham, and Southern Durham counties. Projects in Chapel Hill, North Durham, Southern Wake, Pittsboro, and farther communities are considered on a case-by-case basis.",
  },
  {
    question: "We're ready to engage your services — what is the next step?",
    answer:
      "After an introductory call or meeting to determine mutual fit, we will engage in a Professional Services Agreement and Deposit Request. This preconstruction agreement funds us to act as your custom home building consultant. With that we'll begin diving into the project planning objectives with you.",
  },
];

export default function ContactPage() {
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

      {/* FAQ Section */}
      <section className="bg-bost-cream px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 font-semibold text-bost-brick text-xs uppercase tracking-[0.25em]">
              Frequently Asked
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Answers before you reach out
            </h2>
          </div>
          <ul className="space-y-3">
            {faqs.map((faq) => (
              <li key={faq.question}>
                <details className="group rounded-xl border border-bost-olive/10 bg-white px-5 py-4 transition-colors open:border-bost-olive/20 md:px-6 md:py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-base text-bost-olive md:text-lg [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <Plus
                      aria-hidden="true"
                      className="size-5 shrink-0 text-bost-brick transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-bost-olive px-6 py-16 md:px-12 md:py-20 lg:px-24">
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
              alt="Hand-drawn floor plan sketch of a custom Bost home with dining, scullery, mud, and study areas"
              className="h-auto w-full"
              height={786}
              sizes="(min-width: 768px) 50vw, 100vw"
              src="/images/house-sketch.png"
              width={802}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
