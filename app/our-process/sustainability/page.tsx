import { CtaSection } from "@/components/cta-section";

export default function SustainabilityPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center">
        <div className="absolute inset-0 bg-gray-300">
          <div className="flex h-full w-full items-center justify-center text-gray-500 text-sm">
            Sustainable home exterior image placeholder
          </div>
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 font-light text-sm text-white/60">
              <li>
                <a className="hover:text-white/90" href="/our-process">
                  Our Process
                </a>
              </li>
              <li>
                <span className="mx-1">&gt;</span>
              </li>
              <li className="text-white">Sustainability</li>
            </ol>
          </nav>
          <h1 className="mb-6 font-light text-3xl text-white leading-tight tracking-tight md:text-5xl lg:text-6xl">
            A True Partnership From First
            <br />
            Conversation to Final Walkthrough
          </h1>
          <p className="mx-auto max-w-2xl font-light text-lg text-white/80 md:text-xl">
            We believe in building homes that are kind to the environment and
            designed to perform efficiently for generations to come.
          </p>
        </div>
      </section>

      {/* Full-Width Image Section */}
      <section className="relative">
        <div className="flex aspect-[21/9] w-full items-center justify-center bg-gray-300 text-gray-500 text-sm">
          Large sustainability feature image placeholder
        </div>
      </section>

      {/* Content Section 1 — Image Left, Text Right */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm">
              Green building practices image placeholder
            </div>
            <div>
              <h2 className="mb-6 font-light text-3xl text-gray-900 leading-snug md:text-4xl">
                Built with integrity,
                <br />
                from the ground up
              </h2>
              <p className="font-light text-base text-gray-600 leading-relaxed md:text-lg">
                Sustainability starts at the foundation. We employ advanced
                building science to maximize energy efficiency, using tightly
                sealed building envelopes, high-performance insulation, and
                energy-recovery ventilation systems that dramatically reduce
                your home&apos;s environmental footprint without sacrificing
                comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section 2 — Text Left, Image Right */}
      <section className="bg-gray-50 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 font-light text-3xl text-gray-900 leading-snug md:text-4xl">
                Crafted for today,
                <br />
                but designed for tomorrow
              </h2>
              <p className="font-light text-base text-gray-600 leading-relaxed md:text-lg">
                Every Bost home is designed with longevity in mind. We
                incorporate renewable materials, low-VOC finishes, and
                water-conserving fixtures as standard. Our forward-thinking
                approach includes pre-wiring for solar, EV-ready garages, and
                smart-home systems that help you manage energy consumption
                effortlessly.
              </p>
            </div>
            <div className="order-1 flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm md:order-2">
              Energy-efficient home features image placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm">
              Sustainable materials image placeholder
            </div>
            <div>
              <h2 className="mb-6 font-light text-3xl text-gray-900 leading-snug md:text-4xl">
                Materials That Matter,
                <br />
                Expertise That Elevates
              </h2>
              <p className="font-light text-base text-gray-600 leading-relaxed md:text-lg">
                We partner with suppliers who share our commitment to
                responsibility. From FSC-certified lumber and recycled-content
                countertops to locally sourced stone and reclaimed wood accents,
                every material is vetted for both quality and environmental
                impact.
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
