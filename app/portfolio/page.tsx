import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our portfolio of luxury custom homes across the Raleigh, Cary, and Triangle area. Each home uniquely crafted to match our clients' vision and lifestyle.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 font-bold text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            A Collection of Projects That Reflect Our Standard of Excellence
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            Browse our portfolio of custom homes across the Triangle area, each
            one uniquely crafted to match our clients&apos; vision and
            lifestyle.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                className="group relative overflow-hidden"
                href={`/portfolio/${project.slug}`}
                key={project.id}
              >
                <div className="relative aspect-[4/3] w-full bg-muted">
                  {project.images?.[0] && (
                    <Image
                      alt={project.name}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      src={project.images[0].url}
                    />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
                  <p className="font-medium text-white/70 text-xs uppercase tracking-wider">
                    {project.location}
                  </p>
                  <h3 className="font-semibold text-sm text-white md:text-lg">
                    {project.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy CTA */}
      <section className="relative px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="absolute inset-0 bg-bost-olive" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-bold text-3xl text-white tracking-tight md:text-4xl">
            Explore a Legacy of Fine Custom Homes
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/70 leading-relaxed md:text-lg">
            Step inside The Vault to discover our full archive of past projects,
            each a testament to decades of craftsmanship and dedication.
          </p>
          <Button
            className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
            render={<Link href="/vault" />}
            size="lg"
          >
            Explore the Vault
          </Button>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
