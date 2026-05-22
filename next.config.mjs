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
};

export default nextConfig;
