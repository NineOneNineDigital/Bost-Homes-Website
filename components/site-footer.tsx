import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { BostLogo } from "@/components/bost-logo";

const footerNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/our-process", label: "Our Process" },
  { href: "/featured-neighborhoods", label: "Neighborhoods" },
  { href: "/media", label: "Media Hub" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  { href: "https://x.com", label: "X (Twitter)", icon: Twitter },
];

function SiteFooter() {
  return (
    <footer className="bg-bost-olive text-white">
      {/* Main row */}
      <div className="mx-auto max-w-7xl px-6 py-10 xl:px-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Logo + tagline */}
          <div className="shrink-0">
            <BostLogo className="mb-2" variant="light" />
            <p className="text-sm text-white/50">
              Custom homes in the Triangle since 1986.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-sm text-white/70 transition-colors hover:text-white"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic text-sm text-white/50">
            <p>8255 Chapel Hill Rd. Cary, NC 27513</p>
            <p>
              <a
                className="transition-colors hover:text-white"
                href="tel:+19194601983"
              >
                (919) 460-1983
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row xl:px-0">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Bost Custom Homes. All rights
            reserved.
            <span className="mx-1.5">&middot;</span>
            <span className="cursor-pointer transition-colors hover:text-white/60">
              Terms
            </span>
            <span className="mx-1.5">&middot;</span>
            <span className="cursor-pointer transition-colors hover:text-white/60">
              Privacy
            </span>
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                className="text-white/40 transition-colors hover:text-white"
                href={social.href}
                key={social.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
