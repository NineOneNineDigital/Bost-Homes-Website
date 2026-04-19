import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/cta-section";
import { LeadershipCard } from "@/components/leadership-card";
import { getAwards, getTeamMembers } from "@/lib/fetchers";
import type { TeamMember } from "@/lib/types/hygraph";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Bost Custom Homes — a family-owned luxury home builder in the Triangle area since 1986. Meet our team, our values, and our commitment to craftsmanship.",
  alternates: { canonical: "/about" },
};

const leadership = [
  {
    id: "rex-bost",
    name: "Rex Bost",
    title: "President",
    image: "/images/about/leadership-rex-bost.jpg",
    bio: "Rex founded Bost Custom Homes in 1986 with a singular vision: to build homes that families would love for generations. With over four decades of experience in the Raleigh/Cary market, he has cultivated a team and a process centered on transparency, craftsmanship, and client partnership. His hands-on approach and relentless pursuit of quality remain the cornerstone of everything Bost builds today.",
  },
  {
    id: "lori-ozaki",
    name: "Lori Ozaki",
    title: "Controller",
    image: "/images/about/leadership-lori-ozaki.png",
    bio: "Lori brings meticulous financial oversight and operational clarity to every project. As Controller, she ensures that budgets are managed with integrity and that clients always have a transparent view of their investment. Her systems and processes are a key reason Bost projects are delivered on time and on budget.",
  },
  {
    id: "eric",
    name: "Eric Lorem",
    title: "VP of Operations",
    image: "/images/about/leadership-eric.jpg",
    bio: "Eric oversees the day-to-day execution of every Bost build, coordinating trade partners, timelines, and quality checkpoints with precision. His background in construction management and his commitment to clear communication means clients are never left wondering where their project stands.",
  },
  {
    id: "evan-bost",
    name: "Evan Bost",
    title: "Director of Sales & Marketing",
    image: "/images/about/leadership-evan-bost.jpg",
    bio: "Evan leads client engagement and guides prospective homeowners through the early stages of their custom home journey. He combines a deep knowledge of the Bost process with a genuine passion for design, helping clients translate their aspirations into a clear, achievable vision before a single blueprint is drawn.",
  },
];

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

const staticTeam: TeamMember[] = [
  {
    id: "t1",
    name: "Team Member",
    title: "Project Manager",
    image: { url: "/images/about/team-1.jpg", width: 400, height: 400 },
  },
  {
    id: "t2",
    name: "Team Member",
    title: "Design Coordinator",
    image: { url: "/images/about/team-2.jpg", width: 400, height: 400 },
  },
  {
    id: "t3",
    name: "Team Member",
    title: "Site Superintendent",
    image: { url: "/images/about/team-3.jpg", width: 400, height: 400 },
  },
  {
    id: "t4",
    name: "Team Member",
    title: "Estimator",
    image: { url: "/images/about/team-4.jpg", width: 400, height: 400 },
  },
  {
    id: "t5",
    name: "Team Member",
    title: "Project Manager",
    image: { url: "/images/about/team-5.jpg", width: 400, height: 400 },
  },
  {
    id: "t6",
    name: "Team Member",
    title: "Client Relations",
    image: { url: "/images/about/team-6.jpg", width: 400, height: 400 },
  },
  {
    id: "t7",
    name: "Team Member",
    title: "Lead Carpenter",
    image: { url: "/images/about/team-7.jpg", width: 400, height: 400 },
  },
];

export default async function AboutPage() {
  const [teamMembers, awards] = await Promise.all([
    getTeamMembers(),
    getAwards(),
  ]);
  const team = teamMembers.length > 0 ? teamMembers : staticTeam;

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
            For over three decades, Bost Custom Homes has been crafting
            exceptional residences that reflect the unique vision and lifestyle
            of each homeowner. We are planners and executors, dreamers and
            pragmatists—united by an unwavering commitment to the craft.
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
              journey for our clients—turning their vision into beautifully
              designed, precisely executed custom homes.
            </p>
            <p className="text-base text-white/70 leading-relaxed">
              Every project we take on is a reflection of our values: honesty,
              craftsmanship, and a genuine care for the families who will live
              in these homes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[180px_1fr] md:gap-16 lg:grid-cols-[300px_1fr] lg:gap-20">
          <div>
            <p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Our Story
            </p>
          </div>
          <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              Rex Bost founded Bost Custom Homes in 1986 with a simple but
              powerful belief: that building a home should be one of life&apos;s
              great joys, not one of its great stresses. Starting in the
              Raleigh/Cary area, Rex built the company from the ground up on a
              foundation of integrity, personal service, and an obsessive
              attention to detail.
            </p>
            <p>
              In the early years, Rex was on every job site himself—learning the
              nuances of the land, the trades, and the clients who trusted him
              with their most important investment. That hands-on ethos never
              left. Today, every member of the Bost team operates with that same
              owner-level accountability.
            </p>
            <p>
              As Raleigh grew into one of the most dynamic housing markets in
              the country, Bost Custom Homes grew with it—never chasing volume,
              always prioritizing quality. We have built in some of the
              area&apos;s most prestigious neighborhoods and have earned a
              reputation that speaks for itself through referrals, repeat
              clients, and homes that stand as enduring testaments to the craft.
            </p>
            <p>
              Today, Bost Custom Homes remains a family business in every sense
              of the word. Rex&apos;s son Evan has joined the team, bringing a
              new generation of energy and ideas while honoring the principles
              that built the company. The mission has never changed: deliver an
              exceptional home and an exceptional experience, every single time.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Strip */}
      <section className="w-full overflow-hidden">
        <div className="flex">
          {[
            {
              src: "historic_image_1991",
              alt: "Bost Custom Homes 1991",
              position: "object-center",
            },
            {
              src: "historic_image_1992",
              alt: "Bost Custom Homes 1992",
              position: "object-top",
            },
            {
              src: "historic_image_2002",
              alt: "Bost Custom Homes 2002",
              position: "object-center",
            },
          ].map((photo) => (
            <div
              className="relative h-[280px] flex-1 md:h-[360px] lg:h-[420px]"
              key={photo.src}
            >
              <Image
                alt={photo.alt}
                className={`object-cover ${photo.position}`}
                fill
                sizes="33vw"
                src={`/images/${photo.src}.jpg`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-bost-olive px-6 py-24 md:px-12 md:py-32 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-xl">
            <p className="mb-3 font-medium text-bost-yellow text-xs uppercase tracking-[0.25em]">
              Who We Are
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              Our mission and vision serve as the foundation for all brand
              decisions. By aligning with them, we ensure every expression of
              the brand remains purposeful, consistent, and true to who we are.
            </p>
          </div>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle, i) => (
              <div
                className="group relative overflow-hidden rounded-lg border border-bost-brick/10 bg-white p-6 transition-colors hover:bg-bost-brick lg:p-8"
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

      {/* Our Team — Org Chart */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Our Team
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Meet the Minds Behind the Craft
            </h2>
          </div>

          {/* Tier 1 — President */}
          <div className="flex flex-col items-center">
            <LeadershipCard
              bio={leadership[0].bio}
              image={leadership[0].image}
              name={leadership[0].name}
              size="lg"
              title={leadership[0].title}
            />

            {/* Tier 2 — Leadership */}
            <div className="mt-14 flex flex-wrap justify-center gap-8 md:mt-16 md:gap-12">
              {leadership.slice(1).map((leader) => (
                <LeadershipCard
                  bio={leader.bio}
                  image={leader.image}
                  key={leader.id}
                  name={leader.name}
                  title={leader.title}
                />
              ))}
            </div>

            {/* Tier 3 — Team Members (two rows) */}
            {[
              team.slice(0, Math.ceil(team.length / 2)),
              team.slice(Math.ceil(team.length / 2)),
            ].map((row, rowIndex) => (
              <div
                className={rowIndex === 0 ? "mt-14 md:mt-16" : "mt-8"}
                key={rowIndex}
              >
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {row.map((member) => (
                    <LeadershipCard
                      bio={member.bio?.text}
                      image={member.image?.url ?? ""}
                      key={member.id}
                      name={member.name}
                      size="sm"
                      title={member.title}
                    />
                  ))}
                </div>
              </div>
            ))}
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {awards.map((award) => (
              <div key={award.id}>
                <p className="mb-2 font-bold text-2xl text-bost-blue md:text-3xl">
                  {award.year}
                </p>
                <h3 className="mb-1 font-semibold text-sm text-white">
                  {award.title}
                </h3>
                <p className="text-sm text-white/65">{award.description}</p>
              </div>
            ))}
          </div>
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
