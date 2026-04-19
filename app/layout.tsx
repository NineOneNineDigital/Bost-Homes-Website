import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";

import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bostcustomhomes.com"
  ),
  title: {
    default: "Bost Custom Homes | Luxury Custom Home Builder in Cary, NC",
    template: "%s | Bost Custom Homes",
  },
  description:
    "Bost Custom Homes has been crafting luxury custom homes in Raleigh, Cary, and the Triangle area since 1986. Designed for distinction, built for the art of living.",
  keywords: [
    "custom home builder",
    "luxury homes",
    "Cary NC",
    "Raleigh NC",
    "Triangle area",
    "custom homes",
    "home builder",
    "Bost Custom Homes",
  ],
  authors: [{ name: "Bost Custom Homes" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bost Custom Homes",
    title: "Bost Custom Homes | Luxury Custom Home Builder in Cary, NC",
    description:
      "Crafting luxury custom homes in the Triangle area since 1986. Designed for distinction, built for the art of living.",
    images: [
      {
        url: "/images/shared/cta-background.jpg",
        width: 1200,
        height: 630,
        alt: "Bost Custom Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bost Custom Homes | Luxury Custom Home Builder in Cary, NC",
    description:
      "Crafting luxury custom homes in the Triangle area since 1986. Designed for distinction, built for the art of living.",
    images: ["/images/shared/cta-background.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeBuilder",
  name: "Bost Custom Homes",
  description:
    "Luxury custom home builder in the Raleigh, Cary, and Triangle area since 1986.",
  url: "https://www.bostcustomhomes.com",
  telephone: "+1-919-460-1983",
  faxNumber: "+1-919-460-1986",
  foundingDate: "1986",
  founder: {
    "@type": "Person",
    name: "Rex Bost",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "8255 Chapel Hill Road",
    addressLocality: "Cary",
    addressRegion: "NC",
    postalCode: "27513",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7915,
    longitude: -78.7811,
  },
  areaServed: [
    { "@type": "City", name: "Cary, NC" },
    { "@type": "City", name: "Raleigh, NC" },
    { "@type": "City", name: "Durham, NC" },
    { "@type": "City", name: "Chapel Hill, NC" },
    { "@type": "City", name: "Apex, NC" },
    { "@type": "City", name: "Wake Forest, NC" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/bost-custom-homes",
    "https://www.instagram.com/bostcustomhomes",
    "https://www.youtube.com/@bostcustomhomes",
  ],
  image: "https://www.bostcustomhomes.com/images/shared/cta-background.jpg",
  priceRange: "$500,000 - $2,000,000+",
  slogan: "Designed for Distinction. Built for the Art of Living.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        archivo.variable
      )}
      lang="en"
    >
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <SiteHeader />
        <div>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
