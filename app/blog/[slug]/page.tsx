import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta-section";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/fetchers";

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt.slice(0, 155),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.url,
              width: post.featuredImage.width,
              height: post.featuredImage.height,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: "Bost Custom Homes" },
    publisher: {
      "@type": "Organization",
      name: "Bost Custom Homes",
      url: "https://www.bostcustomhomes.com",
    },
    image: post.featuredImage?.url,
  };

  return (
    <main className="pt-20">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      {/* Breadcrumb */}
      <section className="px-6 pt-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <Link
            className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/blog"
          >
            <ArrowLeft className="size-4" />
            Back to Media Hub
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className="px-6 pt-6 pb-8 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full bg-bost-brick px-3 py-1 font-semibold text-white text-xs">
            {post.category}
          </span>
          <h1 className="mb-6 font-bold text-3xl leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {post.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="px-6 pb-10 md:px-12 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                alt={post.title}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 896px, (min-width: 768px) 80vw, 100vw"
                src={post.featuredImage.url}
              />
            </div>
          </div>
        </section>
      )}

      {/* Body Content */}
      <section className="px-6 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          {post.body?.html ? (
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-bost-brick prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.body.html }}
            />
          ) : (
            <p className="text-base text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </main>
  );
}
