/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.graphassets.com",
      },
    ],
    // Hygraph URLs are content-addressed and our /public assets are immutable
    // per deploy, so cache aggressively to minimize re-transformation.
    minimumCacheTTL: 2_678_400,
    // Trimmed from the Next 16 defaults to cut variant count roughly in half
    // while still covering common breakpoints up to retina desktop.
    deviceSizes: [640, 828, 1200, 1920],
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
