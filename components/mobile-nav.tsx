"use client";

import { Menu, X } from "lucide-react";
import { Link } from "next-view-transitions";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BostLogo } from "@/components/bost-logo";
import { CmsImage } from "@/components/cms-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mobileNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/approach", label: "Approach" },
  { href: "/story", label: "Story" },
  { href: "/media-hub", label: "Media Hub" },
];

export type MobileNavProject = {
  slug: string;
  name: string;
  location: string;
  image: { url: string; width: number; height: number; alt?: string } | null;
};

function MobileNav({
  lightIcon = false,
  featuredProjects = [],
}: {
  lightIcon?: boolean;
  featuredProjects?: MobileNavProject[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && featuredProjects.length > 1) {
      setFeaturedIndex(Math.floor(Math.random() * featuredProjects.length));
    }
  }, [isOpen, featuredProjects.length]);

  const featuredProject =
    featuredProjects[featuredIndex] ?? featuredProjects[0];

  const close = useCallback(() => {
    setIsOpen(false);
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  const overlay = (
    <div
      aria-label="Navigation menu"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      role="dialog"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link aria-label="Bost Custom Homes home" href="/" onClick={close}>
          <BostLogo />
        </Link>
        <Button
          aria-label="Close navigation menu"
          onClick={close}
          ref={closeButtonRef}
          size="icon"
          variant="ghost"
        >
          <X className="size-6" />
        </Button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col overflow-y-auto px-6">
        {mobileNavLinks.map((link) => (
          <Link
            className="border-border/40 border-b py-5 font-medium text-2xl text-foreground transition-colors hover:text-bost-brick"
            href={link.href}
            key={link.href}
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
        <Link
          className="py-5 font-bold text-2xl text-bost-brick transition-colors hover:text-bost-brick/80"
          href="/contact"
          onClick={close}
        >
          Start a Project
        </Link>

        {/* Featured Project Section */}
        {featuredProject && (
          <div className="mt-auto pt-6 pb-8">
            <p className="mb-4 font-black text-muted-foreground text-sm uppercase tracking-[0.2em]">
              Featured Project
            </p>
            <Link
              className="group block overflow-hidden rounded-lg"
              href={`/portfolio/${featuredProject.slug}`}
              onClick={close}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {featuredProject.image && (
                  <CmsImage
                    alt={featuredProject.image.alt ?? featuredProject.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="100vw"
                    src={featuredProject.image.url}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute right-3 bottom-3 left-3">
                  <p className="font-semibold text-base text-white leading-tight">
                    {featuredProject.name}
                  </p>
                  <p className="mt-0.5 text-white/75 text-xs">
                    {featuredProject.location}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <>
      <Button
        aria-label="Open navigation menu"
        className={cn(
          "lg:hidden",
          lightIcon && "text-white hover:text-white/70"
        )}
        onClick={() => setIsOpen(true)}
        ref={openButtonRef}
        size="icon"
        variant="ghost"
      >
        <Menu className="size-6" />
      </Button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}

export { MobileNav };
