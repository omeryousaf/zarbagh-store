import boxJpeg from "@/assets/box.jpeg";
import heroMixedCitrus from "@/assets/hero-mixed-citrus.jpg";
import heroZarbaghBox from "@/assets/hero-zarbagh-box.jpg";

/** Marketing photos are statically imported from `src/assets/` so a missing file fails the build and a replacement gets a new hashed URL. Source files stay in repo-root `images/`. */

export const CRATE_GRAPHIC = {
  src: boxJpeg.src,
  width: boxJpeg.width,
  height: boxJpeg.height,
  alt: "Zarbagh kraft crate: Bhalwal’s finest premium fruits",
} as const;

export const HERO_SLIDES = [
  {
    src: heroZarbaghBox.src,
    width: heroZarbaghBox.width,
    height: heroZarbaghBox.height,
    alt: "From our orchards to your table — Zarbagh citrus crate.",
    cta: {
      left: "6.8%",
      top: "70.8%",
    },
  },
  {
    src: heroMixedCitrus.src,
    width: heroMixedCitrus.width,
    height: heroMixedCitrus.height,
    alt: "From our orchards to your table — mixed citrus.",
    cta: {
      left: "6.8%",
      top: "65.0%",
    },
  },
] as const;
