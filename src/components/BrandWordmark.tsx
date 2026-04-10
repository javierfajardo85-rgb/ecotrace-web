import { cn } from "@/lib/utils";
import { outfit } from "@/lib/fonts";

type BrandWordmarkProps = {
  className?: string;
};

export function BrandWordmark({ className }: BrandWordmarkProps) {
  return (
    <span
      className={cn(
        outfit.className,
        "inline-flex items-baseline tracking-tight",
        className,
      )}
      aria-label="EcoTrace"
    >
      <span className="font-extralight">Eco</span>
      <span className="font-normal">Trace</span>
    </span>
  );
}

