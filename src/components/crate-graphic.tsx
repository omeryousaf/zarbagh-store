import { cn } from "@/lib/utils";
import { CRATE_GRAPHIC } from "@/lib/artwork";

type CrateGraphicProps = {
  className?: string;
  preload?: boolean;
  sizes?: string;
};

export function CrateGraphic({
  className,
  preload = false,
  sizes,
}: CrateGraphicProps) {
  return (
    <img
      src={CRATE_GRAPHIC.src}
      alt={CRATE_GRAPHIC.alt}
      width={CRATE_GRAPHIC.width}
      height={CRATE_GRAPHIC.height}
      sizes={sizes}
      decoding="async"
      fetchPriority={preload ? "high" : "auto"}
      className={cn("block h-auto w-full", className)}
    />
  );
}
