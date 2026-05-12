import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import {
  ProjectFeaturedGallery,
  ProjectTestimonial,
} from "@/components/project-feature-sections";
import { ProjectGalleryCarousel } from "@/components/project-gallery-carousel";
import {
  getFeaturedProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/fetchers";

const PARAGRAPH_BREAK = /\n\s*\n/;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  const description = project.description?.text
    ? project.description.text.slice(0, 155)
    : `${project.name} — a luxury custom home built by Bost Custom Homes in ${project.location}.`;
  return {
    title: project.name,
    description,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, featuredProjects] = await Promise.all([
    getProjectBySlug(slug),
    getFeaturedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const images = project.images ?? [];
  const featuredImages = project.featuredImages ?? [];

  const descriptionParagraphs =
    project.description?.text
      ?.split(PARAGRAPH_BREAK)
      .map((p) => p.trim())
      .filter(Boolean) ?? [];

  const related = featuredProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <section className="px-6 pt-10 md:px-12 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]"
          >
            <Link
              className="hover:text-foreground"
              href={project.archived ? "/vault" : "/portfolio"}
            >
              {project.archived ? "Vault" : "Portfolio"}
            </Link>
            <span className="mx-2 text-muted-foreground/50">/</span>
            <span className="text-foreground">{project.name}</span>
          </nav>
        </div>
      </section>

      {/* Title + metadata */}
      <section className="px-6 pt-6 pb-10 md:px-12 md:pt-10 md:pb-14 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
            {project.archived ? "Vault" : "Portfolio"}
          </p>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
            <h1 className="font-bold text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {project.name}
            </h1>
            {(project.location || project.year) && (
              <div className="flex flex-row gap-x-12 md:shrink-0 md:pb-2">
                {project.location && (
                  <div>
                    <p className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                      Location
                    </p>
                    <p className="font-medium text-base text-foreground md:text-lg">
                      {project.location}
                    </p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                      Completion
                    </p>
                    <p className="font-medium text-base text-foreground md:text-lg">
                      {project.year}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero (mainImage) */}
      {project.mainImage && (
        <section className="px-6 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted md:aspect-video">
              <Image
                alt={project.mainImage.alt ?? project.name}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1280px) 1152px, 100vw"
                src={project.mainImage.url}
              />
            </div>
          </div>
        </section>
      )}

      {/* Overview + Highlights */}
      {!project.archived && (
        <section className="px-6 py-14 md:px-12 md:py-20 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
              {/* Left: highlights */}
              {project.highlights?.html && (
                <div className="md:col-span-4">
                  <p className="mb-6 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                    Highlights
                  </p>
                  <div
                    className="space-y-3 text-base text-foreground leading-relaxed [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:top-[0.6em] [&_li]:before:left-0 [&_li]:before:h-px [&_li]:before:w-3 [&_li]:before:bg-bost-brick [&_ol]:space-y-3 [&_p]:text-muted-foreground [&_strong]:text-foreground [&_ul]:space-y-3"
                    dangerouslySetInnerHTML={{
                      __html: project.highlights.html,
                    }}
                  />
                </div>
              )}

              {/* Right: description */}
              <div
                className={
                  project.highlights?.html ? "md:col-span-8" : "md:col-span-12"
                }
              >
                <p className="mb-6 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Project Overview
                </p>
                {descriptionParagraphs.length > 0 && (
                  <div className="space-y-5 text-base text-foreground/80 leading-[1.75] md:text-lg">
                    {descriptionParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 60)}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonial — its own quiet beat */}
      {!project.archived && project.testimonialQuote && (
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <ProjectTestimonial
              author={project.testimonialAuthor}
              quote={project.testimonialQuote}
            />
          </div>
        </section>
      )}

      {/* Featured images — asymmetric editorial gallery */}
      {!project.archived && featuredImages.length > 0 && (
        <section className="px-6 pb-14 md:px-12 md:pb-20 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <ProjectFeaturedGallery
              images={featuredImages}
              projectName={project.name}
            />
          </div>
        </section>
      )}

      {/* Gallery carousel */}
      {images.length > 0 && (
        <section className="px-6 py-20 md:px-12 md:py-28 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
              <div>
                <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Project Gallery
                </p>
                <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
                  Every Angle
                </h2>
                <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
                  Browse {images.length}{" "}
                  {images.length === 1 ? "photograph" : "photographs"} from this
                  project. Tap any image to view full-screen.
                </p>
              </div>
            </div>
            <ProjectGalleryCarousel
              images={images}
              projectName={project.name}
            />
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {!project.archived && related.length > 0 && (
        <section className="bg-bost-gray-lightest px-6 py-20 md:px-12 md:py-28 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
              <div>
                <p className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
                  Explore More
                </p>
                <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
                  Featured Projects
                </h2>
              </div>
              <Link
                className="group hidden items-center gap-2 font-medium text-sm hover:text-bost-brick md:inline-flex"
                href="/portfolio"
              >
                View All
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <Link
                  className="group relative overflow-hidden"
                  href={`/portfolio/${rp.slug}`}
                  key={rp.id}
                >
                  <div className="relative aspect-[4/3] w-full bg-muted">
                    {rp.images?.[0] ? (
                      <Image
                        alt={rp.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        src={rp.images[0].url}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/5" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    {rp.location && (
                      <p className="mb-1 font-medium text-[11px] text-white/70 uppercase tracking-[0.2em]">
                        {rp.location}
                      </p>
                    )}
                    <h3 className="font-semibold text-lg text-white leading-tight tracking-tight">
                      {rp.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
