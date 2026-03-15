"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BostLogo } from "@/components/bost-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mobileNavLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About Us" },
  { href: "/process", label: "Our Process" },
  { href: "/neighborhoods", label: "Featured Neighborhoods" },
  { href: "/resources", label: "Resources" },
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
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" onClick={close}>
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
        <nav className="flex flex-1 flex-col gap-1 px-6 pt-8">
          {mobileNavLinks.map((link) => (
            <Link
              className="border-border border-b py-4 font-medium text-foreground text-lg transition-colors hover:text-bost-brick"
              href={link.href}
              key={link.href}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-8">
            <Button
              className="w-full bg-bost-brick text-white hover:bg-bost-brick/90"
              onClick={close}
              render={<Link href="/contact" />}
              size="lg"
            >
              Start a Project
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}

export { MobileNav };
