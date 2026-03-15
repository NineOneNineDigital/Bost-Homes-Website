import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { BostLogo } from "@/components/bost-logo";

const footerNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/neighborhoods", label: "Featured Neighborhoods" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Start a Project" },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: Facebook,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://x.com",
    label: "X (Twitter)",
    icon: Twitter,
  },
];

const legalLinks = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/sitemap", label: "Sitemap" },
];

function SiteFooter() {
  return (
    <footer className="bg-bost-olive text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <BostLogo variant="light" />
            <div>
              <p className="mb-3 text-sm text-white/60">Follow us on:</p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    aria-label={social.label}
                    className="text-white/60 transition-colors hover:text-white"
                    href={social.href}
                    key={social.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-white/60 transition-colors hover:text-white"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 font-semibold text-sm uppercase tracking-wider">
              Bost Homes Office
            </h3>
            <address className="flex flex-col gap-2 text-sm text-white/60 not-italic">
              <p>8255 Chapel Hill Road</p>
              <p>Cary, NC 27513</p>
              <p className="mt-2">
                <span className="text-white/40">Phone: </span>
                <a
                  className="transition-colors hover:text-white"
                  href="tel:+19194578050"
                >
                  (919) 457-8050
                </a>
              </p>
              <p>
                <span className="text-white/40">Fax: </span>
                <a
                  className="transition-colors hover:text-white"
                  href="tel:+19194579988"
                >
                  (919) 457-9988
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-white/10 border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-white/40 text-xs sm:flex-row">
          <div className="flex items-center gap-2">
            {legalLinks.map((link, index) => (
              <span className="flex items-center gap-2" key={link.href}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/20">
                    &middot;
                  </span>
                )}
                <Link
                  className="transition-colors hover:text-white/60"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
          <p>&copy; 2024 Bost Custom Homes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
