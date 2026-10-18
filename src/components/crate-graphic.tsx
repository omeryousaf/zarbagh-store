import Image from "next/image";

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
    <Image
      src={CRATE_GRAPHIC.src}
      alt={CRATE_GRAPHIC.alt}
      width={CRATE_GRAPHIC.width}
      height={CRATE_GRAPHIC.height}
      preload={preload}
      sizes={sizes}
      className={cn("h-auto w-full", className)}
    />
  );
}
