import Image from "next/image";
import Link from "next/link";
import { Check, Leaf } from "lucide-react";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getGreenFeatures } from "@/lib/fetchers";

export default async function SustainabilityPage() {
  const features = await getGreenFeatures();
  const featured = features.filter((f) => f.category === "FEATURED");
  const additional = features.filter((f) => f.category === "ADDITIONAL");

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest">
              <li>
                <Link className="hover:text-foreground" href="/our-process">
                  Our Process
                </Link>
              </li>
              <li>
                <span className="mx-1">&gt;</span>
              </li>
              <li className="text-foreground">Sustainability</li>
            </ol>
          </nav>
          <h1 className="mb-6 font-bold text-3xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Green Building
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            We understand the importance of building a home that is not only
            healthy for you and your family, but for the environment as well.
            Innovating green home building in NC for over 20 years.
          </p>
        </div>
      </section>

      {/* Full-Width Image */}
      <section className="relative">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            alt="Sustainable building practices at Bost Custom Homes"
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src="/images/about/photo-strip-4.jpg"
          />
        </div>
      </section>

      {/* HERS Score Section */}
      <section className="bg-bost-olive px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-3 font-medium text-bost-blue text-xs uppercase tracking-[0.2em]">
                Third-Party Verified
              </p>
              <h2 className="mb-6 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
                Every Home Receives
                <br />a HERS Score
              </h2>
              <p className="mb-4 text-base text-white/80 leading-relaxed">
                The HERS Index is the industry-standard scoring system for
                measuring a home&apos;s energy efficiency — similar to MPG
                ratings for vehicles.
              </p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-bost-blue" />
                  Standard code-built homes score 100
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-bost-blue" />
                  Scores below 100 indicate above-average efficiency
                </li>
                <li className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-bost-blue" />A
                  score of 0 represents a Net Zero home
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex size-52 flex-col items-center justify-center rounded-full border-4 border-bost-blue md:size-64">
                <p className="font-bold text-5xl text-white md:text-6xl">0</p>
                <p className="mt-1 text-bost-blue text-sm uppercase tracking-widest">
                  Net Zero
                </p>
                <p className="mt-1 text-white/50 text-xs">HERS Index Goal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Green Building Techniques */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 font-medium text-bost-brick text-xs uppercase tracking-[0.2em]">
              Products &amp; Techniques
            </p>
            <h2 className="mb-4 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
              Holistic Sustainable Construction
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our building standards ensure low environmental impact while
              creating safe, healthy indoor environments for your family.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((feature) => (
              <div
                className="group rounded-lg border border-border bg-white p-8 transition-shadow hover:shadow-lg"
                key={feature.id}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-full bg-bost-mint">
                    <Leaf className="size-5 text-bost-olive" />
                  </div>
                  {feature.pioneeredLocally && (
                    <span className="rounded-full bg-bost-yellow/20 px-2.5 py-0.5 font-medium text-bost-olive text-xs">
                      Pioneered Locally
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-semibold text-foreground text-lg leading-snug">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Green Features Checklist */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 font-medium text-bost-brick text-xs uppercase tracking-[0.2em]">
              Additional Features
            </p>
            <h2 className="mb-4 font-bold text-2xl leading-snug tracking-tight md:text-3xl lg:text-4xl">
              Every Detail Counts
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Beyond our signature techniques, we incorporate dozens of
              sustainable practices into every home we build.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {additional.map((feature) => (
              <div className="flex items-start gap-3" key={feature.id}>
                <Check className="mt-0.5 size-4 shrink-0 text-bost-brick" />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
