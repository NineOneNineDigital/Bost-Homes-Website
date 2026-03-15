import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { BostLogo } from "@/components/bost-logo";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Our Process" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources", hasDropdown: true },
];

function SiteHeader() {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-border/50 border-b bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link className="shrink-0" href="/">
          <BostLogo />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              className="inline-flex items-center gap-1 font-medium text-foreground/80 text-sm transition-colors hover:text-foreground"
              href={link.href}
              key={link.href}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown aria-hidden="true" className="size-4" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-4">
          <Button
            className="hidden bg-bost-brick text-white hover:bg-bost-brick/90 lg:inline-flex"
            render={<Link href="/contact" />}
            size="lg"
          >
            Start a Project
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
