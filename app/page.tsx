import { ChevronDown, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getFeaturedProjects,
  getNeighborhoods,
  getTestimonials,
} from "@/lib/fetchers";

export default async function Page() {
  const [projects, neighborhoods, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getNeighborhoods(),
    getTestimonials(),
  ]);

  const testimonial = testimonials[0];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex min-h-svh items-center justify-center">
        <div className="absolute inset-0 bg-gray-400">
          <div className="flex h-full w-full items-center justify-center text-gray-500 text-sm">
            Hero background image placeholder
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-light text-4xl text-white leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Designed for Distinction.
            <br />
            Built for the Art of Living.
          </h1>
        </div>
        <div className="absolute bottom-8 left-8 z-10 flex flex-col items-center gap-1 text-white/70">
          <ChevronDown className="size-5 animate-bounce" />
          <ChevronDown className="-mt-3 size-5 animate-bounce" />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-light text-gray-700 text-lg leading-relaxed md:text-xl lg:text-2xl">
            We are a team of Planners and Executors. Dreamers and Pragmatists.
            We believe the enjoyment and transparency of the process is equally
            important as the end result.
          </p>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex aspect-[4/3] items-center justify-center bg-gray-300 text-gray-500 text-sm">
            Team photo placeholder
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-gray-400 text-gray-500 text-sm">
            Project image placeholder
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-light text-gray-500 text-sm uppercase tracking-[0.3em]">
            Featured Projects
          </h2>
          <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-3">
            {projects.map((project, index) => {
              const spans = [
                "col-span-1 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-2",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
              ];
              const span = spans[index % spans.length];
              return (
                <div
                  className={`group relative flex cursor-pointer items-end overflow-hidden bg-gray-300 p-6 transition-shadow hover:shadow-lg ${span}`}
                  key={project.id}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    Project image placeholder
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="font-light text-sm text-white tracking-wide">
                      {project.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonial && (
        <section className="bg-gray-50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto mb-8 size-12 text-bost-yellow" />
            <blockquote className="mb-8">
              <p className="font-light text-gray-700 text-lg italic leading-relaxed md:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
            <cite className="block font-medium text-gray-900 text-sm not-italic tracking-wide">
              {testimonial.author}
            </cite>
            {testimonials.length > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {testimonials.map((t, i) => (
                  <span
                    className={`size-2 rounded-full ${i === 0 ? "bg-bost-yellow" : "bg-gray-300"}`}
                    key={t.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Neighborhoods CTA */}
      <section className="bg-bost-olive px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-light text-2xl text-white leading-snug md:text-3xl lg:text-4xl">
            House-Ready Lots in Raleigh/Cary&apos;s
            <br />
            Featured Neighborhoods
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((neighborhood) => (
              <div
                className="group relative cursor-pointer overflow-hidden"
                key={neighborhood.id}
              >
                <div className="flex aspect-[3/2] items-center justify-center bg-gray-500 text-gray-300 text-sm">
                  Neighborhood image placeholder
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="font-medium text-base text-white">
                    {neighborhood.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Build CTA */}
      <section className="bg-bost-olive px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 font-light text-3xl text-white md:text-4xl lg:text-5xl">
            Ready to Build Your Dream Home?
          </h2>
          <Button className="bg-bost-brick px-8 py-3 text-base text-white hover:bg-bost-brick/90">
            Start a Project
          </Button>
        </div>
      </section>
    </main>
  );
}
