/** Served copies. Source files stay in repo-root `images/`. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const CRATE_GRAPHIC = {
  src: `${basePath}/images/box.jpeg`,
  width: 738,
  height: 577,
  alt: "Zarbagh kraft crate: Bhalwal’s finest premium fruits",
} as const;

export const HERO_GROVE = {
  src: `${basePath}/images/bagh.jpeg`,
} as const;
