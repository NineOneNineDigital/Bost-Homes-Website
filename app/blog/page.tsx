import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogFilter } from "@/components/blog-filter";
import { CtaSection } from "@/components/cta-section";
import { getBlogPosts } from "@/lib/fetchers";
import type { BlogCategory } from "@/lib/types/hygraph";
import { cn, formatBlogCategory, formatPostDate } from "@/lib/utils";

const VALID_CATEGORIES: BlogCategory[] = [
  "DESIGN",
  "CONSTRUCTION",
  "INSPIRATION",
  "COMMUNITY",
  "NEWS",
];

function parseCategory(input: string | undefined): BlogCategory | undefined {
  if (!input) {
    return undefined;
  }
  const normalized = input.toUpperCase() as BlogCategory;
  return VALID_CATEGORIES.includes(normalized) ? normalized : undefined;
}

function buildHref(params: URLSearchParams, page: number): string {
  const next = new URLSearchParams(params);
  if (page <= 1) {
    next.delete("page");
  } else {
    next.set("page", String(page));
  }
  const query = next.toString();
  return query ? `/blog?${query}` : "/blog";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const pageSize = 6;
  const category = parseCategory(params.category);
  const search = params.q?.trim() || undefined;

  const { posts, total } = await getBlogPosts({
    first: pageSize + 1,
    skip: (currentPage - 1) * pageSize,
    category,
    search,
  });

  const isFirstPage = currentPage === 1;
  const featuredPost = isFirstPage ? posts[0] : undefined;
  const gridPosts = isFirstPage
    ? posts.slice(1, pageSize + 1)
    : posts.slice(0, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasResults = posts.length > 0;

  // Preserve current filter/search params in pagination links
  const queryForLinks = new URLSearchParams();
  if (category) {
    queryForLinks.set("category", category.toLowerCase());
  }
  if (search) {
    queryForLinks.set("q", search);
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-semibold text-bost-brick text-xs uppercase tracking-widest">
            Media Hub
          </p>
          <h1 className="mb-4 max-w-3xl font-bold text-3xl leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
            Stories, design ideas, and field notes from our team.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
            A look behind the craftsmanship — from the first sketch to the final
            walkthrough — and the people, places, and decisions that shape every
            Bost custom home.
          </p>
        </div>
      </section>

      {/* Search / Filter */}
      <section className="border-border/50 border-b px-6 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <BlogFilter />
        </div>
      </section>

      {!hasResults && (
        <section className="px-6 py-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 font-semibold text-xl tracking-tight md:text-2xl">
              No articles found.
            </h2>
            <p className="mb-6 text-muted-foreground">
              Try a different category or clear your search.
            </p>
            <Link
              className="inline-flex items-center font-medium text-bost-brick hover:underline"
              href="/blog"
            >
              View all articles &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-6 py-10 md:px-12 md:py-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <Link
              className="group block overflow-hidden rounded-lg border border-border/50 transition-shadow hover:shadow-lg"
              href={`/blog/${featuredPost.slug}`}
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[16/10] bg-muted md:aspect-auto md:min-h-[360px]">
                  {featuredPost.featuredImage && (
                    <Image
                      alt={featuredPost.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      fill
                      priority
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={featuredPost.featuredImage.url}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                    <span className="inline-block rounded-full bg-bost-brick px-3 py-1 font-semibold text-white uppercase tracking-wide">
                      {formatBlogCategory(featuredPost.category)}
                    </span>
                    {(featuredPost.originalDate ??
                      featuredPost.publishedAt) && (
                      <span className="text-muted-foreground">
                        {formatPostDate(
                          featuredPost.originalDate ?? featuredPost.publishedAt
                        )}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-4 font-bold text-2xl leading-tight tracking-tight transition-colors group-hover:text-bost-brick md:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 text-base text-muted-foreground leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <span className="font-semibold text-bost-brick text-sm">
                    Read article &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      {gridPosts.length > 0 && (
        <section className="px-6 pb-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
                <Link
                  className="group flex flex-col overflow-hidden rounded-lg border border-border/50 transition-shadow hover:shadow-md"
                  href={`/blog/${post.slug}`}
                  key={post.id}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {post.featuredImage && (
                      <Image
                        alt={post.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        src={post.featuredImage.url}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="inline-block rounded-full bg-bost-mint px-3 py-1 font-semibold text-bost-olive uppercase tracking-wide">
                        {formatBlogCategory(post.category)}
                      </span>
                      {(post.originalDate ?? post.publishedAt) && (
                        <span className="text-muted-foreground">
                          {formatPostDate(
                            post.originalDate ?? post.publishedAt
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 font-semibold text-lg leading-snug tracking-tight transition-colors group-hover:text-bost-brick">
                      {post.title}
                    </h3>
                    <p className="mb-5 line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto font-medium text-bost-brick text-sm">
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
                className="mt-14 flex items-center justify-center gap-2"
              >
                {currentPage > 1 ? (
                  <Link
                    aria-label="Previous page"
                    className="flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    href={buildHref(queryForLinks, currentPage - 1)}
                  >
                    <ChevronLeft className="size-5" />
                  </Link>
                ) : (
                  <span
                    aria-disabled
                    className="flex size-10 items-center justify-center rounded-md text-muted-foreground/40"
                  >
                    <ChevronLeft className="size-5" />
                  </span>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      aria-current={page === currentPage ? "page" : undefined}
                      className={cn(
                        "flex size-10 items-center justify-center rounded-md font-medium text-sm transition-colors",
                        page === currentPage
                          ? "bg-bost-olive text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      href={buildHref(queryForLinks, page)}
                      key={page}
                    >
                      {page}
                    </Link>
                  )
                )}
                {currentPage < totalPages ? (
                  <Link
                    aria-label="Next page"
                    className="flex size-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    href={buildHref(queryForLinks, currentPage + 1)}
                  >
                    <ChevronRight className="size-5" />
                  </Link>
                ) : (
                  <span
                    aria-disabled
                    className="flex size-10 items-center justify-center rounded-md text-muted-foreground/40"
                  >
                    <ChevronRight className="size-5" />
                  </span>
                )}
              </nav>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
