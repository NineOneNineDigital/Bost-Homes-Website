import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { getProcessSteps } from "@/lib/fetchers";

export default async function OurProcessPage() {
  const steps = await getProcessSteps();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center">
        <div className="absolute inset-0 bg-gray-300">
          <div className="flex h-full w-full items-center justify-center text-gray-500 text-sm">
            Blueprint / architectural drawing background placeholder
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-6 font-light text-3xl text-white leading-tight tracking-tight md:text-5xl lg:text-6xl">
            A True Partnership From First
            <br />
            Conversation to Final Walkthrough
          </h1>
          <p className="mx-auto max-w-2xl font-light text-lg text-white/80 md:text-xl">
            Building a custom home is one of life&apos;s most significant
            endeavors. We ensure the journey is as rewarding as the destination.
          </p>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-center font-light text-gray-500 text-sm uppercase tracking-[0.3em]">
            What to Expect
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center font-light text-gray-600 text-lg">
            Our process is built around transparency, communication, and
            craftsmanship at every stage.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                className="rounded-lg border border-gray-200 p-8 transition-shadow hover:shadow-md"
                key={step.id}
              >
                <span className="mb-4 block font-light text-4xl text-bost-yellow">
                  {step.number}
                </span>
                <h3 className="mb-3 font-medium text-gray-900 text-xl">
                  {step.title}
                </h3>
                <p className="font-light text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Philosophy — Section 1 */}
      <section className="bg-gray-50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm">
              Construction detail image placeholder
            </div>
            <div>
              <h2 className="mb-6 font-light text-3xl text-gray-900 leading-snug md:text-4xl">
                Built with integrity,
                <br />
                from the ground up
              </h2>
              <p className="mb-8 font-light text-base text-gray-600 leading-relaxed md:text-lg">
                We hold ourselves to the highest standards of construction
                quality. From foundations to finish work, every element is
                executed with precision and care by our trusted team of
                craftsmen and trade partners.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/our-process/sustainability" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Build Philosophy — Section 2 */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 font-light text-3xl text-gray-900 leading-snug md:text-4xl">
                Crafted for today,
                <br />
                but designed for tomorrow
              </h2>
              <p className="mb-8 font-light text-base text-gray-600 leading-relaxed md:text-lg">
                Our homes are designed to stand the test of time—both in
                durability and in style. We incorporate sustainable building
                practices and forward-thinking design so your home remains as
                relevant and efficient decades from now as it is on move-in day.
              </p>
              <Button
                className="bg-bost-brick px-8 text-white hover:bg-bost-brick/80"
                render={<Link href="/our-process/sustainability" />}
                size="lg"
              >
                Learn More
              </Button>
            </div>
            <div className="order-1 flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm md:order-2">
              Modern home interior image placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="bg-gray-50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm">
              Materials and craftsmanship image placeholder
            </div>
            <div>
              <h2 className="mb-6 font-light text-3xl text-gray-900 leading-snug md:text-4xl">
                Materials That Matter,
                <br />
                Expertise That Elevates
              </h2>
              <p className="font-light text-base text-gray-600 leading-relaxed md:text-lg">
                We source premium materials and partner with specialized
                artisans to deliver a level of quality you can see and feel.
                From hand-selected hardwoods to custom millwork, every material
                is chosen with intention and installed with expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection />
    </main>
  );
}
