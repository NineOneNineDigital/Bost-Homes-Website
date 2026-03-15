import { CtaSection } from "@/components/cta-section";
import { getArchivedProjects } from "@/lib/fetchers";

const heightMap = {
  0: "aspect-[2/3]",
  1: "aspect-[4/3]",
  2: "aspect-[3/4]",
} as const;

export default async function VaultPage() {
  const projects = await getArchivedProjects();

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="absolute inset-0 bg-bost-olive" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-3 font-semibold text-bost-brick text-xs uppercase tracking-widest">
            The Vault
          </p>
          <h1 className="mb-4 font-bold text-4xl text-white tracking-tight md:text-5xl lg:text-6xl">
            Where Our Past Projects Live On
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            A curated archive of Bost Custom Homes projects spanning decades of
            craftsmanship across the Triangle. Each home tells a story of
            collaboration, innovation, and unwavering quality.
          </p>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
          {projects.map((project, index) => (
            <div
              className={`${heightMap[(index % 3) as keyof typeof heightMap]} w-full break-inside-avoid rounded-lg bg-muted`}
              key={project.id}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
