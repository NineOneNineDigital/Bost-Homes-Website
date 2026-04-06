import Image from "next/image";
import { CtaSection } from "@/components/cta-section";
import { getAwards, getTeamMembers } from "@/lib/fetchers";
import type { TeamMember } from "@/lib/types/hygraph";

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

const values = [
  {
    number: "01",
    name: "Quality",
    description:
      "We build beautiful, durable homes with the highest standards of craftsmanship to exceed our client\u2019s expectations.",
  },
  {
    number: "02",
    name: "Teamwork",
    description:
      "We strengthen, encourage, and assist each other to better serve our clients and accomplish our goals.",
  },
  {
    number: "03",
    name: "Integrity",
    description:
      "We do the right thing always, whether it\u2019s easy or challenging; whether it\u2019s recognized or unnoticed.",
  },
  {
    number: "04",
    name: "Relationships",
    description:
      "We make effort to form positive relationships with all we encounter.",
  },
  {
    number: "05",
    name: "Stewardship",
    description:
      "We take pride in reducing the waste of resources, and we take great responsibility in managing our clients\u2019 investment.",
  },
  {
    number: "06",
    name: "Innovation",
    description:
      "We lead our industry with new innovations and pursue the future of home technology and building science.",
  },
  {
    number: "07",
    name: "Artistry",
    description:
      "We inspire our clients and the community with creative and functional design.",
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[240px_1fr] md:gap-20 lg:grid-cols-[300px_1fr]">
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
            "photo-strip-1",
            "photo-strip-2",
            "photo-strip-3",
            "photo-strip-4",
          ].map((photo) => (
            <div
              className="relative h-[280px] flex-1 md:h-[360px] lg:h-[420px]"
              key={photo}
            >
              <Image
                alt="Bost Custom Homes project"
                className="object-cover"
                fill
                sizes="25vw"
                src={`/images/about/${photo}.jpg`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-bost-olive px-6 py-20 text-white md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-medium text-bost-blue text-xs uppercase tracking-[0.2em]">
            Our Mission
          </p>
          <p className="font-light text-xl text-white leading-relaxed md:text-2xl lg:text-3xl">
            To build the highest quality custom homes possible and offer our
            clients an unparalleled positive experience.
          </p>

          <div className="mx-auto my-12 h-px w-16 bg-bost-yellow md:my-16" />

          <p className="mb-6 font-medium text-bost-blue text-xs uppercase tracking-[0.2em]">
            Our Vision
          </p>
          <p className="font-light text-xl text-white leading-relaxed md:text-2xl lg:text-3xl">
            To continually strive for excellence in all areas of our
            organization with integrity, innovation, and calculated execution.
          </p>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="bg-bost-cream px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 font-medium text-bost-brick text-xs uppercase tracking-[0.2em]">
              Our Guiding Principles
            </p>
            <h2 className="font-bold text-3xl text-bost-olive tracking-tight md:text-4xl">
              The Values That Drive Us
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {values.map((value) => (
              <div
                className="w-full border-t-2 border-bost-brick bg-white p-6 sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                key={value.number}
              >
                <span className="mb-3 block font-bold text-2xl text-bost-olive/30">
                  {value.number}
                </span>
                <h3 className="mb-2 font-semibold text-bost-olive text-lg">
                  {value.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Leadership
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Meet the Minds Behind the Craft
            </h2>
          </div>

          <div className="space-y-20 md:space-y-28">
            {leadership.map((leader, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <div
                  className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10"
                  key={leader.id}
                >
                  <div
                    className={`relative h-[380px] w-[280px] shrink-0 overflow-hidden ${imageLeft ? "md:order-1" : "md:order-2"}`}
                  >
                    <Image
                      alt={leader.name}
                      className="object-cover object-top"
                      fill
                      sizes="(min-width: 768px) 35vw, 100vw"
                      src={leader.image}
                    />
                  </div>
                  <div className={`max-w-2xl ${imageLeft ? "md:order-2" : "md:order-1"}`}>
                    <h3 className="mb-1 font-bold text-2xl tracking-tight md:text-3xl">
                      {leader.name}
                    </h3>
                    <p className="mb-4 font-medium text-bost-brick text-sm uppercase tracking-[0.15em]">
                      {leader.title}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Our Team
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              The People Who Make It Happen
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {team.map((member) => (
              <div className="w-[calc(50%-12px)] text-center lg:w-[calc(25%-18px)]" key={member.id}>
                <div className="relative mx-auto mb-4 aspect-square w-full overflow-hidden bg-muted">
                  {member.image && (
                    <Image
                      alt={member.name}
                      className="object-cover object-top"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      src={member.image.url}
                    />
                  )}
                </div>
                <h3 className="font-semibold text-base">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.title}</p>
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
