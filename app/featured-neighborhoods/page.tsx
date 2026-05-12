import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getNeighborhoods } from "@/lib/fetchers";

export const metadata: Metadata = {
  title: "Featured Neighborhoods",
  description:
    "Discover shovel-ready lots in Raleigh's most sought-after communities. Bost Custom Homes offers hand-selected homesites throughout the Triangle area.",
  alternates: { canonical: "/featured-neighborhoods" },
};

export default async function FeaturedNeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods();

  return (
    <main className="bg-bost-olive pt-20">
      {/* Hero */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-semibold text-white/75 text-xs uppercase tracking-widest">
            Featured Neighborhoods
          </p>
          <h1 className="mb-6 max-w-3xl font-bold text-4xl text-white leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Available Lots in Prestigious Neighborhoods
          </h1>
          <p className="max-w-2xl text-base text-white/65 leading-relaxed md:text-lg">
            Each neighborhood has been considered carefully and selected for its
            proximity, physical features, value, and lifestyle. Bost Homes is
            proud to be on the builder team in these future-classic
            neighborhoods.
          </p>
        </div>
      </section>

      {/* Neighborhood Listings */}
      <section className="px-6 pb-24 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-24 md:gap-32">
            {neighborhoods.map((neighborhood, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24"
                  key={neighborhood.id}
                >
                  {/* Text content */}
                  <div
                    className={`flex flex-col ${isEven ? "order-2 md:order-2" : "order-2 md:order-1"}`}
                  >
                    <h2 className="mb-5 font-bold text-3xl text-white leading-tight tracking-tight md:text-4xl lg:text-5xl">
                      {neighborhood.name}
                    </h2>
                    <p className="mb-8 text-base text-white/65 leading-relaxed">
                      {neighborhood.description}
                    </p>

                    {/* Metadata */}
                    <div className="mb-8 grid grid-cols-2 gap-6">
                      <div>
                        <p className="mb-1 font-semibold text-bost-blue text-xs uppercase tracking-widest">
                          Location
                        </p>
                        <p className="text-sm text-white/80">Raleigh, NC</p>
                      </div>
                      <div>
                        <p className="mb-1 font-semibold text-bost-blue text-xs uppercase tracking-widest">
                          Available Lots
                        </p>
                        <p className="text-sm text-white/80">
                          {neighborhood.lots
                            ? neighborhood.lots.filter(
                                (l) => l.lotStatus === "AVAILABLE"
                              ).length
                            : (neighborhood.availableLots ?? "Contact us")}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Button
                        className="group bg-bost-brick px-6 text-white hover:bg-bost-brick/80"
                        render={
                          <Link
                            href={`/featured-neighborhoods/${neighborhood.slug}`}
                          />
                        }
                        size="lg"
                      >
                        Learn More
                        <ArrowRight
                          aria-hidden
                          className="size-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] overflow-hidden ${isEven ? "order-1 md:order-1" : "order-1 md:order-2"}`}
                  >
                    {neighborhood.image ? (
                      <Image
                        alt={neighborhood.image.alt ?? neighborhood.name}
                        className="object-cover"
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        src={neighborhood.image.url}
                      />
                    ) : (
                      <div className="h-full w-full bg-white/5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
