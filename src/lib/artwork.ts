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
      left: "7.85%",
      top: "72.7%",
      width: "15.5%",
      height: "9.4%",
    },
  },
  {
    src: `${basePath}/images/hero-mixed-citrus.jpg`,
    width: 2000,
    height: 1000,
    alt: "From our orchards to your table — mixed citrus.",
    cta: {
      left: "7.8%",
      top: "66.9%",
      width: "13.65%",
      height: "8.2%",
    },
  },
] as const;
