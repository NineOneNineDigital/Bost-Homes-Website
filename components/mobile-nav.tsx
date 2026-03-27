"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mobileNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/our-process", label: "Our Process" },
  { href: "/featured-neighborhoods", label: "Featured Neighborhoods" },
  { href: "/blog", label: "Resources" },
];

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

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

  return (
    <>
      <Button
        aria-label="Open navigation menu"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
        ref={openButtonRef}
        size="icon"
        variant="ghost"
      >
        <Menu className="size-6" />
      </Button>

      {/* Overlay */}
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
        <div className="flex items-center justify-end px-6 py-5">
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
        <nav className="flex flex-1 flex-col px-6">
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
            className="py-5 font-medium text-2xl text-bost-brick transition-colors hover:text-bost-brick/80"
            href="/contact"
            onClick={close}
          >
            Start a Project
          </Link>

          {/* Featured Projects Section */}
          <div className="mt-auto pb-8">
            <p className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-[0.2em]">
              Featured Projects
            </p>
            <Link
              className="group block overflow-hidden rounded-lg"
              href="/portfolio"
              onClick={close}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  alt="Featured project by Bost Custom Homes"
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 0vw"
                  src="/images/about/photo-strip-1.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="font-medium text-sm text-white">Project Name</p>
                  <p className="text-white/70 text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export { MobileNav };
