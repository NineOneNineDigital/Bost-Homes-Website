import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { getPageContent } from "@/lib/fetchers";

const SLUG = "masonry-framing";

export const metadata: Metadata = {
  title: "Masonry Framing",
  description:
    "Bost Custom Homes has been a leader in residential concrete masonry construction since pioneering the technique in the Triangle Area in 1999.",
  alternates: { canonical: `/our-process/${SLUG}` },
};

export default async function MasonryFramingPage() {
  const page = await getPageContent(SLUG);

  if (!page) {
    return notFound();
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      {page.hero &&
        (page.hero.backgroundImage ? (
          <section className="relative h-[480px] w-full overflow-hidden md:h-[560px] lg:h-[620px]">
            <Image
              alt={page.hero.backgroundImage.alt ?? page.hero.heading}
              className="object-cover [object-position:center_75%]"
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
                        href="/our-process"
                      >
                        Our Process
                      </Link>
                    </li>
                    <li>
                      <span className="mx-1">&gt;</span>
                    </li>
                    <li className="text-white">Masonry Framing</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="absolute inset-0 flex items-end px-6 pb-14 md:items-center md:px-12 md:pb-0 lg:px-24">
              <div className="mx-auto w-full max-w-7xl">
                <div className="max-w-2xl">
                  <p className="mb-4 font-medium text-bost-yellow text-xs uppercase tracking-[0.25em]">
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
          <section className="px-6 pt-8 pb-16 md:px-12 md:pt-10 md:pb-20 lg:px-24">
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
                  <li className="text-foreground">Masonry Framing</li>
                </ol>
              </nav>
              <p className="mb-4 font-medium text-bost-brick text-xs uppercase tracking-[0.2em]">
                Our Process
              </p>
              <h1 className="mb-6 font-bold text-3xl text-bost-olive leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                {page.hero.heading}
              </h1>
              {page.hero.subheading && (
                <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
                  {page.hero.subheading}
                </p>
              )}
            </div>
          </section>
        ))}

      {/* Sections */}
      {page.sections.map((section, index) => {
        const isAlt = index % 2 === 1;
        return (
          <section
            className={`px-6 py-16 md:px-12 md:py-20 lg:px-24 ${
              isAlt ? "bg-bost-gray-lightest" : ""
            }`}
            key={section.heading}
          >
            <div className="mx-auto max-w-7xl">
              {section.image ? (
                <div
                  className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
                    section.imagePosition === "left" ? "" : ""
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted ${
                      section.imagePosition === "left"
                        ? "md:order-1"
                        : "md:order-2"
                    }`}
                  >
                    <Image
                      alt={section.image.alt ?? section.heading}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={section.image.url}
                    />
                  </div>
                  <div
                    className={
                      section.imagePosition === "left"
                        ? "md:order-2"
                        : "md:order-1"
                    }
                  >
                    <h2 className="mb-5 font-bold text-2xl text-bost-olive leading-snug tracking-tight md:text-3xl">
                      {section.heading}
                    </h2>
                    {section.body?.html && (
                      <div
                        className="blog-body [&_li+li]:!mt-1"
                        dangerouslySetInnerHTML={{ __html: section.body.html }}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16 lg:gap-20">
                  <h2 className="font-bold text-2xl text-bost-olive leading-snug tracking-tight md:text-3xl lg:text-4xl">
                    {section.heading}
                  </h2>
                  {section.body?.html && (
                    <div
                      className="blog-body [&_li+li]:!mt-1"
                      dangerouslySetInnerHTML={{ __html: section.body.html }}
                    />
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <CtaSection />
    </main>
  );
}
