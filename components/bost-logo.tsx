import Image from "next/image";
import { cn } from "@/lib/utils";

interface BostLogoProps {
  className?: string;
  variant?: "default" | "light";
}

function BostLogo({ className, variant = "default" }: BostLogoProps) {
  return (
    <Image
      alt="Bost Custom Homes"
      className={cn("h-12 w-auto shrink-0", className)}
      height={50}
      src={
        variant === "light"
          ? "/images/Primary-logo-white.png"
          : "/images/Primary-logo-dark.png"
      }
      width={180}
    />
  );
}

export { BostLogo };
