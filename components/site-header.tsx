"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BostLogo } from "@/components/bost-logo";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const darkHeroRoutes = new Set(["/"]);

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/our-process", label: "Approach" },
  { href: "/about", label: "Story" },
  { href: "/media", label: "Media Hub" },
  { href: "/careers", label: "Careers" },
];

function SiteHeader() {
  const pathname = usePathname();
  const hasDarkHero = darkHeroRoutes.has(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const useLightText = hasDarkHero && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-40",
        mounted && "transition-all duration-300",
        scrolled
          ? "border-border/50 border-b bg-white/95 backdrop-blur-sm"
          : "bg-transparent"
      )}
      suppressHydrationWarning
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 xl:px-0">
        {/* Logo */}
        <Link className="shrink-0" href="/">
          <BostLogo variant={useLightText ? "light" : "default"} />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              className={cn(
                "inline-flex items-center gap-1 font-bold text-sm transition-colors",
                useLightText
                  ? "text-white hover:text-white/70"
                  : "text-bost-olive hover:text-bost-olive/70"
              )}
              href={link.href}
              key={link.href}
            >
              {link.label}
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
          <MobileNav lightIcon={useLightText} />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
