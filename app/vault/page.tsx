import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getArchivedProjects } from "@/lib/fetchers";

// Revalidate hourly so the archive grid reflects Hygraph changes instead of
// being frozen to the build-time snapshot (an empty or failed list at build
// time would otherwise stay baked in until the next deploy).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Vault",
  description:
    "Explore the Bost Custom Homes archive — decades of luxury custom home projects across the Triangle, each a testament to enduring craftsmanship and design.",
  alternates: { canonical: "/vault" },
};

export default async function VaultPage() {
  const projects = await getArchivedProjects();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-bost-olive px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 font-semibold text-bost-brick text-xs uppercase tracking-widest">
            The Vault
          </p>
          <h1 className="mb-4 font-bold text-4xl text-white tracking-tight md:text-5xl lg:text-6xl">
            Where Our Past Projects Live On
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 leading-relaxed md:text-lg">
            A curated archive of Bost Custom Homes projects spanning decades of
            craftsmanship across the Triangle. Each home tells a story of
            collaboration, innovation, and unwavering quality.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      {projects.length > 0 ? (
        <section className="px-6 py-12 md:px-12 md:py-16 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
                          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
      ) : (
        <section className="bg-bost-cream px-6 py-24 md:px-12 md:py-32 lg:px-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-medium text-bost-brick text-xs uppercase tracking-[0.2em]">
              The Archive Is Being Curated
            </p>
            <h2 className="mb-6 font-bold text-3xl text-bost-olive leading-tight tracking-tight md:text-4xl lg:text-5xl">
              Decades of Craft, Soon to Be Unlocked
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-base text-bost-olive/70 leading-relaxed md:text-lg">
              We&apos;re carefully gathering the stories, photographs, and
              details of homes built across the Triangle over the years. Check
              back soon — or step into our active portfolio to see the work
              defining Bost Custom Homes today.
            </p>
            <Button
              className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
              render={<Link href="/portfolio" />}
              size="lg"
            >
              View the Portfolio
            </Button>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
