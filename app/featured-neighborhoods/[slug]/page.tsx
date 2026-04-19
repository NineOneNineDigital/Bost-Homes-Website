import { ArrowRight, Check, MapPin, Ruler, TreePine } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getNeighborhoodBySlug, getNeighborhoods } from "@/lib/fetchers";
import type { Lot } from "@/lib/types/hygraph";

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Available",
  UNDER_CONTRACT: "Under Contract",
  SOLD: "Sold",
  COMING_SOON: "Coming Soon",
};

const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: "bg-emerald-100 text-emerald-800",
  UNDER_CONTRACT: "bg-amber-100 text-amber-800",
  SOLD: "bg-red-100 text-red-800",
  COMING_SOON: "bg-blue-100 text-blue-800",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateStaticParams() {
  const neighborhoods = await getNeighborhoods();
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return { title: "Neighborhood Not Found" };
  }

  return {
    title: neighborhood.name,
    description:
      neighborhood.description.slice(0, 155) ||
      `Explore available homesites in ${neighborhood.name} — a featured neighborhood by Bost Custom Homes.`,
    alternates: { canonical: `/featured-neighborhoods/${slug}` },
  };
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = await getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return notFound();
  }

  const availableLots = neighborhood.lots.filter(
    (l) => l.lotStatus === "AVAILABLE"
  );

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative bg-bost-olive px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-widest">
              <li>
                <Link
                  className="hover:text-white/80"
                  href="/featured-neighborhoods"
                >
                  Neighborhoods
                </Link>
              </li>
              <li>
                <span className="mx-1">&gt;</span>
              </li>
              <li className="text-white">{neighborhood.name}</li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="mb-6 font-bold text-4xl text-white leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
                {neighborhood.name}
              </h1>
              <p className="mb-8 text-base text-white/70 leading-relaxed md:text-lg">
                {neighborhood.description}
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="mb-1 font-semibold text-bost-blue text-xs uppercase tracking-widest">
                    Available Lots
                  </p>
                  <p className="font-bold text-2xl text-white">
                    {availableLots.length}
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-semibold text-bost-blue text-xs uppercase tracking-widest">
                    Total Lots
                  </p>
                  <p className="font-bold text-2xl text-white">
                    {neighborhood.lots.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              {neighborhood.image ? (
                <Image
                  alt={neighborhood.name}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  src={neighborhood.image.url}
                />
              ) : (
                <div className="h-full w-full bg-white/5" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lot Listings */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 font-medium text-bost-brick text-xs uppercase tracking-[0.2em]">
              Available Homesites
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Explore Our Lots
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {neighborhood.lots.map((lot) => (
              <LotCard key={lot.id} lot={lot} slug={slug} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}

function LotCard({ lot, slug }: { lot: Lot; slug: string }) {
  const isSold = lot.lotStatus === "SOLD";

  return (
    <div
      className={`flex flex-col rounded-lg border border-border bg-white p-6 transition-shadow hover:shadow-lg ${isSold ? "opacity-60" : ""}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{lot.lotNumber}</h3>
          {lot.address && (
            <p className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="size-3" />
              {lot.address}
            </p>
          )}
        </div>
        <span
          className={`rounded-full px-2.5 py-1 font-medium text-xs ${STATUS_COLORS[lot.lotStatus] ?? ""}`}
        >
          {STATUS_LABELS[lot.lotStatus] ?? lot.lotStatus}
        </span>
      </div>

      {/* Stats */}
      <div className="mb-4 flex gap-4">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <TreePine className="size-4" />
          {lot.acreage} acres
        </div>
        {lot.dimensions && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Ruler className="size-4" />
            {lot.dimensions}
          </div>
        )}
      </div>

      {/* Description */}
      {lot.description && (
        <p className="mb-4 flex-1 text-muted-foreground text-sm leading-relaxed">
          {lot.description}
        </p>
      )}

      {/* Features */}
      {lot.features.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {lot.features.map((feature) => (
            <span
              className="flex items-center gap-1 rounded-full bg-bost-mint px-2.5 py-0.5 text-xs"
              key={feature}
            >
              <Check className="size-3 text-bost-olive" />
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* Price & CTA */}
      <div className="mt-auto flex items-center justify-between border-border border-t pt-4">
        {lot.price ? (
          <p className="font-bold text-bost-olive text-lg">
            {formatPrice(lot.price)}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">Contact for pricing</p>
        )}
        {!isSold && (
          <Button
            className="bg-bost-brick text-white hover:bg-bost-brick/90"
            render={<Link href="/contact" />}
            size="sm"
          >
            Inquire
            <ArrowRight className="ml-1 size-3" />
          </Button>
        )}
      </div>
    </div>
  );
}
