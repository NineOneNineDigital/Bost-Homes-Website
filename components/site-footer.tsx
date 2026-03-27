import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { BostLogo } from "@/components/bost-logo";

const footerNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/our-process", label: "Our Process" },
  { href: "/featured-neighborhoods", label: "Featured Neighborhoods" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Start a Project" },
];

const socialLinks = [
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://x.com",
    label: "X (Twitter)",
    icon: Twitter,
  },
];

function SiteFooter() {
  return (
    <footer className="bg-bost-gray-lightest text-bost-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 xl:px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr]">
          {/* Brand column — logo top, social bottom */}
          <div className="flex flex-col justify-between gap-12">
            <BostLogo className="self-start" />

            <div>
              <p className="mb-3 font-bold text-sm">Follow us on:</p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-md bg-bost-black text-white transition-opacity hover:opacity-80"
                    href={social.href}
                    key={social.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <social.icon className="size-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation column — large links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-5">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-2xl text-bost-black transition-colors hover:text-bost-brick lg:text-[32px] lg:leading-tight"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Legal column */}
          <div className="flex flex-col justify-between gap-12">
            {/* Contact info */}
            <div>
              <h3 className="mb-2 font-bold text-base">Bost Homes Office</h3>
              <address className="flex flex-col gap-0.5 not-italic text-sm text-bost-black/50">
                <p>8255 Chapel Hill Rd. Cary, NC 27513</p>
                <p>
                  T:{" "}
                  <a
                    className="underline transition-colors hover:text-bost-black"
                    href="tel:+19194601983"
                  >
                    (919) 460-1983
                  </a>
                </p>
                <p>
                  F:{" "}
                  <a
                    className="underline transition-colors hover:text-bost-black"
                    href="tel:+19194601986"
                  >
                    (919) 460-1986
                  </a>
                </p>
              </address>
            </div>

            {/* Legal */}
            <div className="text-bost-black/50 text-xs">
              <p className="mb-1">
                <span>Terms</span>
                <span className="mx-1.5">&bull;</span>
                <span>Privacy policy</span>
                <span className="mx-1.5">&bull;</span>
                <span>Security</span>
              </p>
              <p>&copy; {new Date().getFullYear()} Bost Custom Homes. All rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
