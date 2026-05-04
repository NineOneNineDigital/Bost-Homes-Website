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
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Portfolio
          </p>
          <h1 className="mb-6 max-w-4xl font-bold text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            A Collection of Projects That Reflect Our Standard of Excellence
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            Browse our portfolio of custom homes across the Triangle area, each
            one uniquely crafted to match our clients&apos; vision and
            lifestyle.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-6 pb-20 md:px-12 md:pb-28 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => {
              const cardImage = project.mainImage ?? project.images?.[0];
              return (
                <Link
                  className="group relative block overflow-hidden"
                  href={`/portfolio/${project.slug}`}
                  key={project.id}
                >
                  <div className="relative aspect-[4/5] w-full bg-muted">
                    {cardImage && (
                      <Image
                        alt={project.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        src={cardImage.url}
                      />
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
