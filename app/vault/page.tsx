import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/cta-section";
import { getArchivedProjects } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "The Vault",
  description:
    "Explore the Bost Custom Homes archive — decades of luxury custom home projects across the Triangle, each a testament to enduring craftsmanship and design.",
  alternates: { canonical: "/vault" },
};

const heightMap = {
  0: "aspect-[3/4]",
  1: "aspect-[4/3]",
  2: "aspect-[3/4]",
} as const;

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

      {/* Masonry Gallery */}
      <section className="px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-7xl columns-2 gap-3 space-y-3 lg:columns-3">
          {projects.map((project, index) => (
            <div
              className={`${heightMap[(index % 3) as keyof typeof heightMap]} relative w-full break-inside-avoid overflow-hidden bg-muted`}
              key={project.id}
            >
              {project.images?.[0] && (
                <Image
                  alt={project.name}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  src={project.images[0].url}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
