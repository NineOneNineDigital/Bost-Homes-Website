import { cn } from "@/lib/utils";

interface BostLogoProps {
  className?: string;
  variant?: "default" | "light";
}

function BostLogo({ className, variant = "default" }: BostLogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        aria-hidden="true"
        className="size-10 shrink-0"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          fill={isLight ? "white" : "oklch(0.17 0 0)"}
          r="19"
          stroke={isLight ? "white" : "oklch(0.17 0 0)"}
          strokeWidth="1"
        />
        <text
          dominantBaseline="central"
          fill={isLight ? "oklch(0.17 0 0)" : "white"}
          fontFamily="sans-serif"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          x="20"
          y="20"
        >
          BOST
        </text>
      </svg>
      <span
        className={cn(
          "font-bold text-sm uppercase tracking-widest",
          isLight ? "text-white" : "text-bost-olive"
        )}
      >
        Bost Custom Homes
      </span>
    </div>
  );
}

export { BostLogo };
