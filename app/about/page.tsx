import { HardHat } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AwardsCarousel } from "@/components/awards-carousel";
import { CtaSection } from "@/components/cta-section";
import { getAwards } from "@/lib/fetchers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Bost Custom Homes — a family-owned luxury home builder in the Triangle area since 1986. Meet our team, our values, and our commitment to craftsmanship.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    name: "Transparency",
    description: "We share openly and build trust through clarity.",
  },
  {
    name: "Execution",
    description:
      "We turn ideas into action, follow through on commitments, and focus on solutions.",
  },
  {
    name: "Artistry",
    description:
      "We value creativity and inspired design, even over ease and norms.",
  },
  {
    name: "Continuous Learning",
    description: "We embrace curiosity, adapt to change, and seek answers.",
  },
  {
    name: "Humility",
    description: "We remain humble and open to new perspectives. We listen.",
  },
  {
    name: "Empowerment",
    description: "We lift others up and create space for people to thrive.",
  },
  {
    name: "Shared Vision",
    description:
      "We place our clients\u2019 vision at the center of our projects and operation.",
  },
];

export default async function AboutPage() {
  const awards = await getAwards();

  return (
    <main className="pt-20">
      {/* Header Section */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            About
          </p>
          <h1 className="mb-6 max-w-3xl font-bold text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            A Contagious Passion for Custom Homes
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            For nearly four decades, Bost Custom Homes has been crafting
            executive residences that reflect the unique vision and lifestyle of
            our incredible clients. We are planners and executors, dreamers and
            pragmatists—united by an unwavering commitment to our Guiding
            Principles.
          </p>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="relative h-[480px] w-full overflow-hidden md:h-[580px] lg:h-[640px]">
        <Image
          alt="Bost Custom Homes luxury exterior"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/about/hero-banner.jpg"
        />
        <div className="absolute inset-0 bg-bost-olive/70" />
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-12 lg:px-24">
          <div className="max-w-xl text-right">
            <p className="mb-6 font-light text-lg text-white leading-relaxed md:text-xl lg:text-2xl">
              We&apos;re on a mission to create a delightful home building
              journey for our clients, turning their vision into beautifully
              designed, precisely executed custom homes.
            </p>
            <p className="text-base text-white/70 leading-relaxed">
              Every project we take on reflects our principles: Transparency,
              Artistry, and Shared Vision.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="scroll-mt-24 px-6 py-20 md:px-12 md:py-28 lg:px-24"
        id="our-story"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[180px_1fr] md:gap-16 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div>
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Our Story
            </p>
          </div>
          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Rex Bost founded Bost Custom Homes in 1986 with a simple
              conviction: building a home should be an enjoyable and creative
              process. From that first house in &rsquo;86, through the
              90&rsquo;s and early aughts, he built the company on a foundation
              of honest relationships, personal service, and an obsessive eye
              for detail.
            </p>
            <p>
              In the early days, Rex was on every job site thinking through the
              details creatively, mastering the trades, collaborating with
              clients, and executing craftsmanship. Today, that hands-on
              approach is codified in our Guiding Principles and carried out by
              every member of the team.
            </p>
            <p>
              As The Triangle continues to mature into one of the nation&apos;s
              most dynamic housing markets, Bost Custom Homes evolves—never
              chasing volume, always prioritizing artistry, honesty, and
              continuous learning. We&apos;ve built in some of the area&apos;s
              most prestigious neighborhoods and earned a reputation defined by
              referrals, repeat clients, and homes that stand as testaments to
              craftsmanship.
            </p>
            <p>
              Today, Bost Homes is an employee-owned partnership. Rex Bost, Evan
              Bost, Eric Sherman, and Lori Ozaki are at the helm with a combined
              65 years&rsquo; experience in the company. Together they bring a
              balance of skillsets and fresh ideas while staying true to the
              principles that define our legacy. The mission hasn&apos;t
              changed: deliver an exceptional, one-of-a-kind home and an
              exceptional experience for every unique client.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-6 pb-20 md:px-12 md:pb-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {[
              {
                src: "historic_image_1991.jpg",
                alt: "Bost Custom Homes 1991",
                tall: false,
              },
              {
                src: "historic_image_1992.jpg",
                alt: "Bost Custom Homes 1992",
                tall: true,
              },
              {
                src: "historic_image_2002.jpg",
                alt: "Bost Custom Homes 2002",
                tall: false,
              },
              {
                src: "bosthalfad.jpg",
                alt: "Bost Custom Homes 20th anniversary advertisement, 1986–2006",
                tall: false,
              },
              {
                src: "2016_JimmyAllen_322_HBAPOHAwards.jpg",
                alt: "Rex Bost receiving the 2016 HBA Parade of Homes Lifetime Achievement Award",
                tall: false,
              },
            ].map((photo, index) => (
              <div
                className={cn(
                  "relative overflow-hidden",
                  index > 0 && "hidden md:block",
                  photo.tall
                    ? "aspect-[3/4] md:col-start-2 md:row-span-2 md:aspect-auto"
                    : "aspect-[8/5]"
                )}
                key={photo.src}
              >
                <Image
                  alt={photo.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={`/images/${photo.src}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-bost-olive px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10 lg:p-12">
              <div className="absolute top-0 left-0 h-1 w-full bg-bost-yellow" />
              <p className="mb-6 font-medium text-bost-yellow text-xs uppercase tracking-[0.25em]">
                Our Mission
              </p>
              <p className="font-bold text-white text-xl leading-snug md:text-2xl lg:text-3xl">
                We create a delightful home building journey for our
                clients—turning their vision into beautifully designed,
                precisely executed custom homes.
              </p>
            </div>
            <div className="relative overflow-hidden border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-10 lg:p-12">
              <div className="absolute top-0 left-0 h-1 w-full bg-bost-blue" />
              <p className="mb-6 font-medium text-bost-blue text-xs uppercase tracking-[0.25em]">
                Our Vision
              </p>
              <p className="font-bold text-white text-xl leading-snug md:text-2xl lg:text-3xl">
                To cultivate an environment defined by our principles where our
                team thrives and continuously refines our client experience and
                custom home execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="bg-bost-cream px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="mb-3 font-medium text-bost-brick text-xs uppercase tracking-[0.25em]">
                Guiding Principles
              </p>
              <h2 className="font-bold text-3xl text-bost-olive tracking-tight md:text-4xl">
                What TEACHES Us
              </h2>
            </div>
            <p className="max-w-sm text-bost-olive/60 text-sm leading-relaxed">
              Our guiding principles shape every aspect of how we work—from the
              quality of our craftsmanship to the relationships we build.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {principles.map((principle, i) => (
              <div
                className="group relative flex w-full flex-col overflow-hidden rounded-lg border border-bost-brick/10 bg-white p-6 transition-colors hover:bg-bost-brick sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] lg:p-8"
                key={principle.name}
              >
                <span className="mb-4 block font-bold text-3xl text-bost-brick/20 transition-colors group-hover:text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 font-bold text-bost-olive text-lg tracking-tight transition-colors group-hover:text-white">
                  {principle.name}
                </h3>
                <p className="text-bost-olive/60 text-sm leading-relaxed transition-colors group-hover:text-white/80">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team — Coming Soon */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-medium text-bost-brick text-xs uppercase tracking-[0.25em]">
            Our Team
          </p>
          <h2 className="mb-8 font-bold text-3xl text-bost-olive tracking-tight md:text-4xl lg:text-5xl">
            Meet the Minds Behind the Craft
          </h2>

          <div className="relative mx-auto max-w-xl border border-bost-olive/10 bg-bost-cream p-10 md:p-14">
            <div className="absolute top-0 left-0 h-1 w-16 bg-bost-yellow" />
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-bost-brick/10">
              <HardHat aria-hidden className="h-6 w-6 text-bost-brick" />
            </div>
            <p className="mb-3 font-semibold text-bost-brick text-xs uppercase tracking-[0.25em]">
              Under Construction
            </p>
            <h3 className="mb-4 font-bold text-bost-olive text-xl tracking-tight md:text-2xl">
              Profiles Coming Soon
            </h3>
            <p className="text-base text-bost-olive/70 leading-relaxed">
              We&apos;re putting the finishing touches on profiles for the
              leadership and craftsmen who bring every Bost home to life. Check
              back soon to meet the team behind the work.
            </p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-bost-olive px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 font-semibold text-bost-blue text-xs uppercase tracking-[0.2em]">
              Awards &amp; Recognition
            </p>
            <h2 className="max-w-2xl font-bold text-2xl text-white italic leading-snug tracking-tight md:text-3xl">
              We strive for excellence in all that we do, with integrity,
              innovation, and calculated execution.
            </h2>
          </div>
          <AwardsCarousel awards={awards} />
          <div className="relative mt-12 h-px w-full bg-white/15">
            <div className="absolute top-0 left-0 h-px w-16 bg-bost-yellow" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
