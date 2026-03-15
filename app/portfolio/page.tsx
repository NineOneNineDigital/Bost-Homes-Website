import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { PortfolioFilter } from "@/components/portfolio-filter";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/lib/fetchers";

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-bost-olive px-6 py-20 text-white md:px-12 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
            A Collection of Projects That Reflect Our Standard of Excellence
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Browse our portfolio of custom homes across the Triangle area, each
            one uniquely crafted to match our clients&apos; vision and
            lifestyle.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <PortfolioFilter />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                className="group relative overflow-hidden rounded-lg"
                href={`/portfolio/${project.slug}`}
                key={project.id}
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] w-full bg-muted transition-transform duration-300 group-hover:scale-105" />
                {/* Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="font-medium text-white/70 text-xs uppercase tracking-wider">
                    {project.location}
                  </p>
                  <h3 className="font-semibold text-lg text-white">
                    {project.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy CTA */}
      <section className="relative px-6 py-24 md:px-12 lg:px-24">
        <div className="absolute inset-0 bg-bost-olive/95" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-bold text-3xl text-white tracking-tight md:text-4xl">
            Explore a Legacy of Fine Custom Homes
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
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
