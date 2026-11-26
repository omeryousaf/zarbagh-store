import boxJpeg from "@/assets/box.jpeg";
import heroMixedCitrus from "@/assets/hero-mixed-citrus.jpg";
import heroZarbaghBox from "@/assets/hero-zarbagh-box.jpg";
import orchardIntro from "@/assets/orchard-1200x800.jpg";
import shopKinnow48 from "@/assets/shop-kinnow-48.jpg";
import shopKinnow54 from "@/assets/shop-kinnow-54.jpg";
import shopKinnow60 from "@/assets/shop-kinnow-60.jpg";

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
  },
  {
    src: heroMixedCitrus.src,
    width: heroMixedCitrus.width,
    height: heroMixedCitrus.height,
    alt: "From our orchards to your table — mixed citrus.",
  },
] as const;

export const ORCHARD_INTRO = {
  src: orchardIntro.src,
  width: orchardIntro.width,
  height: orchardIntro.height,
  alt: "Rows of kinnow trees in a Bhalwal orchard",
} as const;

export const SHOP_BANNERS = {
  large: {
    src: shopKinnow48.src,
    width: shopKinnow48.width,
    height: shopKinnow48.height,
    alt: "Kinnow Box: Large, 48 count",
  },
  medium: {
    src: shopKinnow54.src,
    width: shopKinnow54.width,
    height: shopKinnow54.height,
    alt: "Kinnow Box: Medium, 54 count",
  },
  regular: {
    src: shopKinnow60.src,
    width: shopKinnow60.width,
    height: shopKinnow60.height,
    alt: "Kinnow Box: Regular, 60 count",
  },
} as const;
