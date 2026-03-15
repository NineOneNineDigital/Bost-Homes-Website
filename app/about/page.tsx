import { CtaSection } from "@/components/cta-section";
import { getTeamMembers } from "@/lib/fetchers";

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="mb-6 font-bold text-4xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
              A Contagious Passion for Custom Homes
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              For over two decades, Bost Custom Homes has been crafting
              exceptional residences that reflect the unique vision and
              lifestyle of each homeowner.
            </p>
          </div>
          <div className="aspect-4/3 w-full rounded-lg bg-muted" />
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-bost-olive px-6 py-16 text-white md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-bold text-3xl tracking-tight md:text-4xl">
              Our Story
            </h2>
            <p className="mb-4 text-white/80">
              Bost Custom Homes was founded with a simple mission: to build
              homes that families love for generations. Starting in the
              Raleigh/Cary area, we quickly earned a reputation for quality
              craftsmanship and attention to detail that sets us apart.
            </p>
            <p className="text-white/80">
              Every custom home we build is a testament to our commitment to
              excellence. We work hand-in-hand with our clients from the initial
              design concept through the final walkthrough, ensuring every
              detail reflects their vision and exceeds their expectations.
            </p>
          </div>
          <div className="aspect-4/3 w-full rounded-lg bg-white/10" />
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 font-bold text-3xl tracking-tight md:text-4xl">
              Our Commitment
            </h2>
            <p className="mb-4 text-muted-foreground">
              As the Raleigh housing market grew, we&apos;ve remained committed
              to the values that built our reputation — integrity, innovation,
              and an unwavering dedication to quality. We don&apos;t just build
              houses; we build homes that stand the test of time.
            </p>
            <p className="text-muted-foreground">
              Our philosophy is rooted in collaboration. We believe the best
              homes are born from a true partnership between builder and
              homeowner. That&apos;s why we take the time to understand your
              lifestyle, preferences, and aspirations before we ever break
              ground.
            </p>
          </div>
          <div className="aspect-4/3 w-full rounded-lg bg-muted" />
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/50 px-6 py-16 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-bold text-3xl tracking-tight md:text-4xl">
            Meet The Minds Behind The Craft
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div className="text-center" key={member.id}>
                <div className="mx-auto mb-4 aspect-square w-full max-w-[280px] rounded-lg bg-muted" />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
