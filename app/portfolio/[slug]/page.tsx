import { Quote } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CtaSection } from "@/components/cta-section";

const projects: Record<
  string,
  {
    name: string;
    location: string;
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    year: number;
    description: string;
  }
> = {
  "emberstone-estate": {
    name: "Emberstone Estate",
    location: "Cary, NC",
    sqft: 6200,
    bedrooms: 5,
    bathrooms: 4,
    year: 2023,
    description:
      "Designed and crafted for a long-time Cary resident and friend, Emberstone Estate is a stunning custom home that blends timeless stone craftsmanship with modern architectural lines. From the circular foyer entry to the flagstone-surrounded pool, every detail was designed with intentionality and care.",
  },
  "cedar-ridge-manor": {
    name: "Cedar Ridge Manor",
    location: "Raleigh, NC",
    sqft: 5400,
    bedrooms: 4,
    bathrooms: 3,
    year: 2022,
    description:
      "Cedar Ridge Manor sits on a wooded lot in North Raleigh, featuring a craftsman-inspired design with exposed timber beams, a chef's kitchen, and an expansive outdoor living area that overlooks a private pond.",
  },
};

const relatedProjects = [
  { name: "Willowbrook Residence", slug: "willowbrook-residence" },
  { name: "Ashford Place", slug: "ashford-place" },
  { name: "The Preserve at Jordan Lake", slug: "preserve-jordan-lake" },
];

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  const name = project?.name ?? "Custom Home Project";
  const location = project?.location ?? "Cary, NC";

  return {
    title: name,
    description: project?.description
      ? project.description.slice(0, 155)
      : `${name} — a luxury custom home built by Bost Custom Homes in ${location}.`,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug] ?? {
    name: "Custom Home Project",
    location: "Cary, NC",
    sqft: 5000,
    bedrooms: 4,
    bathrooms: 3,
    year: 2023,
    description:
      "A beautifully crafted custom home built with integrity and attention to every detail. This project showcases the Bost Custom Homes commitment to quality craftsmanship and thoughtful design.",
  };

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <section className="px-6 pt-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <nav className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
            <Link className="hover:text-foreground" href="/portfolio">
              Portfolio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{project.name}</span>
          </nav>
        </div>
      </section>

      {/* Title */}
      <section className="px-6 pt-4 pb-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            {project.name}
          </h1>
        </div>
      </section>

      {/* Hero Image + Thumbnails */}
      <section className="px-6 pb-10 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="aspect-[16/9] w-full bg-muted" />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div className="aspect-[4/3] bg-muted" key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Details + Description */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3 lg:gap-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
              {project.description}
            </p>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="space-y-4 bg-bost-gray-lightest p-6">
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Location
                </p>
                <p className="font-semibold">{project.location}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Square Footage
                </p>
                <p className="font-semibold">
                  {project.sqft.toLocaleString()} sq ft
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Bedrooms / Bathrooms
                </p>
                <p className="font-semibold">
                  {project.bedrooms} Bed / {project.bathrooms} Bath
                </p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                  Year Built
                </p>
                <p className="font-semibold">{project.year}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-bost-gray-lightest px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <Quote className="mx-auto mb-6 size-10 text-bost-olive" />
          <blockquote className="mb-6 text-lg italic leading-relaxed md:text-xl">
            &ldquo;It was so important to us to build a home we&apos;d love for
            decades. The Bost team made it easy to communicate our vision — the
            end result exceeds everything we dreamed.&rdquo;
          </blockquote>
          <p className="font-medium text-muted-foreground text-sm">
            — Homeowner
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <span className="size-2.5 rounded-full bg-bost-olive" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 font-bold text-2xl tracking-tight md:text-3xl">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((rp) => (
              <Link
                className="group block overflow-hidden"
                href={`/portfolio/${rp.slug}`}
                key={rp.slug}
              >
                <div className="relative aspect-[4/3] bg-muted transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="font-semibold text-sm text-white">
                      {rp.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
