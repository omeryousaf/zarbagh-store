/** Served copies. Source files stay in repo-root `images/`. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const CRATE_GRAPHIC = {
  src: `${basePath}/images/box.jpeg`,
  width: 738,
  height: 577,
  alt: "Zarbagh kraft crate: Bhalwal’s finest premium fruits",
} as const;

export const HERO_SLIDES = [
  {
    src: `${basePath}/images/hero-zarbagh-box.jpg`,
    width: 2000,
    height: 1000,
    alt: "From our orchards to your table — Zarbagh citrus crate.",
    cta: {
      left: "6.8%",
      top: "70.8%",
    },
  },
  {
    src: `${basePath}/images/hero-mixed-citrus.jpg`,
    width: 2000,
    height: 1000,
    alt: "From our orchards to your table — mixed citrus.",
    cta: {
      left: "6.8%",
      top: "65.0%",
    },
  },
] as const;
