import { Briefcase, Clock, Heart, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getJobOpenings } from "@/lib/fetchers";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    icon: TrendingUp,
    title: "Growth & Development",
    description:
      "Ongoing training, mentorship, and opportunities to advance your career in custom home building.",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description:
      "Paid time off, flexible scheduling, and a culture that respects your time outside of work.",
  },
  {
    icon: Briefcase,
    title: "Competitive Compensation",
    description:
      "Industry-leading pay, performance bonuses, and a 401(k) retirement plan with company match.",
  },
];


const values = [
  {
    number: "01",
    title: "Craftsmanship",
    description:
      "We take pride in every detail. If you care deeply about doing excellent work, you'll fit right in.",
  },
  {
    number: "02",
    title: "Integrity",
    description:
      "We do what we say and say what we mean. Honesty and transparency are non-negotiable.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "Great homes are built by great teams. We value open communication, mutual respect, and shared accountability.",
  },
  {
    number: "04",
    title: "Growth",
    description:
      "We invest in our people. Whether you're early in your career or a seasoned professional, there's always room to learn and lead.",
  },
];

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
};

export default async function CareersPage() {
  const openings = await getJobOpenings();
  return (
    <main className="pt-20">
      {/* Header */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Careers
          </p>
          <h1 className="mb-6 max-w-3xl font-bold text-4xl leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Build Your Career with Bost Custom Homes
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            We're always looking for talented, passionate people who share our
            commitment to craftsmanship, integrity, and delivering an
            exceptional experience for every client.
          </p>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="relative h-[480px] w-full overflow-hidden md:h-[580px] lg:h-[640px]">
        <Image
          alt="Bost Custom Homes team on a job site"
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
              Join a team where your work matters—where every project is a
              testament to the care, skill, and dedication of the people who
              built it.
            </p>
            <p className="text-base text-white/70 leading-relaxed">
              At Bost Custom Homes, you're not just filling a role. You're
              becoming part of a family that has been building exceptional homes
              in the Triangle for over three decades.
            </p>
          </div>
        </div>
      </section>

      {/* What We Value */}
      <section className="bg-bost-olive px-6 py-20 text-white md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-medium text-white/60 text-xs uppercase tracking-[0.2em]">
            What We Value
          </p>
          <h2 className="mb-16 max-w-xl font-bold text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
            The Kind of People We Look For
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.number}>
                <span className="mb-4 block font-bold text-2xl text-bost-blue">
                  {value.number}
                </span>
                <h3 className="mb-3 font-semibold text-lg text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 h-px w-full bg-white/20">
            <div className="h-px w-24 bg-bost-yellow" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Benefits
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Why People Love Working Here
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                className="rounded-xl bg-bost-mint p-6"
                key={benefit.title}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-bost-olive">
                  <benefit.icon className="size-5 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-base">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-bost-gray-lightest px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Open Positions
            </p>
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Current Openings
            </h2>
          </div>
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                className="rounded-lg border border-border/50 bg-white p-6 transition-shadow hover:shadow-md md:p-8"
                key={job.id}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-lg tracking-tight md:text-xl">
                      {job.title}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
                      {job.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-bost-mint px-3 py-1 font-medium text-xs">
                        <Briefcase className="size-3" />
                        {JOB_TYPE_LABELS[job.jobType] ?? job.jobType}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-bost-mint px-3 py-1 font-medium text-xs">
                        <MapPin className="size-3" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Button
                      className="bg-bost-brick text-white hover:bg-bost-brick/90"
                      render={<Link href={`/careers/${job.slug}`} />}
                      size="lg"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            Don&apos;t See Your Role?
          </p>
          <h2 className="mb-6 font-bold text-3xl tracking-tight md:text-4xl">
            We&apos;d Still Love to Hear From You
          </h2>
          <p className="mb-8 text-base text-muted-foreground leading-relaxed md:text-lg">
            We&apos;re always interested in meeting talented people who are
            passionate about custom home building. Send us your resume and
            tell us what drives you.
          </p>
          <Button
            className="bg-bost-olive text-white hover:bg-bost-olive/90"
            render={<Link href="/contact" />}
            size="lg"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
