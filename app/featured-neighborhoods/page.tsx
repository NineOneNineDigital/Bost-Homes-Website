import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getNeighborhoods } from "@/lib/fetchers";

export default async function FeaturedNeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center">
        <div className="absolute inset-0 bg-gray-400">
          <div className="flex h-full w-full items-center justify-center text-gray-500 text-sm">
            Neighborhood aerial image placeholder
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-6 font-light text-3xl text-white leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Featured Neighborhoods
          </h1>
          <p className="mx-auto max-w-2xl font-light text-lg text-white/80 md:text-xl">
            Explore house-ready lots in Raleigh and Cary&apos;s most
            sought-after communities. Each neighborhood has been hand-selected
            for its quality, location, and lifestyle.
          </p>
        </div>
      </section>

      {/* Lot Listings */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-16 md:gap-24">
            {neighborhoods.map((neighborhood, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  className="grid grid-cols-1 items-stretch gap-0 overflow-hidden md:grid-cols-2"
                  key={neighborhood.id}
                >
                  {/* Dark info card */}
                  <div
                    className={`flex flex-col justify-center bg-bost-olive p-10 md:p-14 ${isEven ? "order-2 md:order-2" : "order-2 md:order-1"}`}
                  >
                    <h3 className="mb-4 font-light text-2xl text-white md:text-3xl">
                      {neighborhood.name}
                    </h3>
                    <p className="mb-6 font-light text-base text-white/70 leading-relaxed">
                      {neighborhood.description}
                    </p>
                    <p className="mb-8 font-medium text-bost-yellow text-sm tracking-wide">
                      Lots available: {neighborhood.availableLots}
                    </p>
                    <div>
                      <Button
                        className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                        render={<Link href="/contact" />}
                        size="lg"
                      >
                        Request More Information
                      </Button>
                    </div>
                  </div>

                  {/* Image placeholder */}
                  <div
                    className={`flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm md:aspect-auto ${isEven ? "order-1 md:order-1" : "order-1 md:order-2"}`}
                  >
                    {neighborhood.name} image placeholder
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
