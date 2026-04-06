import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogFilter } from "@/components/blog-filter";
import { CtaSection } from "@/components/cta-section";
import { getBlogPosts } from "@/lib/fetchers";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 6;
  const category = params.category || undefined;

  const { posts, total } = await getBlogPosts({
    first: pageSize + 1,
    skip: (currentPage - 1) * pageSize,
    category,
  });

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1, pageSize + 1);
  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 font-semibold text-bost-brick text-xs uppercase tracking-widest">
            Media Hub
          </p>
          <h1 className="mb-4 font-bold text-3xl tracking-tight md:text-4xl lg:text-5xl">
            Welcome to the Bost Custom Homes Media Hub
          </h1>
        </div>
      </section>

      {/* Search / Filter */}
      <section className="border-border/50 border-b px-6 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <BlogFilter />
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-6 py-10 md:px-12 md:py-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <Link
              className="group block overflow-hidden rounded-lg border border-border/50"
              href={`/blog/${featuredPost.slug}`}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[16/10] bg-muted md:aspect-auto md:min-h-[320px]">
                  {featuredPost.featuredImage && (
                    <Image
                      alt={featuredPost.title}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={featuredPost.featuredImage.url}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <span className="mb-3 inline-block w-fit rounded-full bg-bost-brick px-3 py-1 font-semibold text-white text-xs">
                    {featuredPost.category}
                  </span>
                  <h2 className="mb-3 font-bold text-xl tracking-tight transition-colors group-hover:text-bost-brick md:text-2xl lg:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="px-6 pb-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {gridPosts.map((post) => (
              <Link
                className="group overflow-hidden rounded-lg border border-border/50"
                href={`/blog/${post.slug}`}
                key={post.id}
              >
                <div className="relative aspect-[16/10] bg-muted">
                  {post.featuredImage && (
                    <Image
                      alt={post.title}
                      className="object-cover"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={post.featuredImage.url}
                    />
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <span className="mb-3 inline-block rounded-full bg-bost-brick px-3 py-1 font-semibold text-white text-xs">
                    {post.category}
                  </span>
                  <h3 className="mb-3 font-semibold text-lg transition-colors group-hover:text-bost-brick">
                    {post.title}
                  </h3>
                  <span className="font-medium text-bost-brick text-sm">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Blog pagination"
              className="mt-12 flex items-center justify-center gap-2"
            >
              <button
                aria-label="Previous page"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
                type="button"
              >
                <ChevronLeft className="size-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    className={
                      page === currentPage
                        ? "size-10 rounded-md bg-bost-olive font-medium text-sm text-white"
                        : "size-10 rounded-md font-medium text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
                    }
                    key={page}
                    type="button"
                  >
                    {page}
                  </button>
                )
              )}
              <button
                aria-label="Next page"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
                type="button"
              >
                <ChevronRight className="size-5" />
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
