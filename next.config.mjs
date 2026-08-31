/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.graphassets.com",
      },
    ],
    // NB: no `loaderFile` here on purpose. Setting a custom loader globally
    // disables Next's /_next/image endpoint, which would 404 every /public
    // asset (including a 13MB hero). Hygraph images opt in per-call-site via
    // <CmsImage>; /public keeps using Vercel's optimizer.
    //
    // Hygraph URLs are content-addressed and our /public assets are immutable
    // per deploy, so cache aggressively to minimize re-transformation.
    minimumCacheTTL: 2_678_400,
    // 1920 dropped: 221 of 334 CMS sources are only 1024px wide, so that tier
    // was a pure upscale — extra bytes and, previously, an extra billed
    // transformation for pixels identical to the 1200 variant.
    deviceSizes: [640, 828, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // Route renames — preserve old URLs for SEO and existing links.
      { source: "/our-process", destination: "/approach", permanent: true },
      {
        source: "/our-process/:path*",
        destination: "/approach/:path*",
        permanent: true,
      },
      { source: "/about", destination: "/story", permanent: true },
      {
        source: "/approach/sustainability",
        destination: "/approach/high-performance-homes",
        permanent: true,
      },
      {
        source: "/featured-neighborhoods",
        destination: "/neighborhoods",
        permanent: true,
      },
      {
        source: "/featured-neighborhoods/:slug",
        destination: "/neighborhoods/:slug",
        permanent: true,
      },
      { source: "/blog", destination: "/media-hub", permanent: true },
      {
        source: "/blog/:slug",
        destination: "/media-hub/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
