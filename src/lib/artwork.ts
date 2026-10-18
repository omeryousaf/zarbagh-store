/** Served copies. Source files stay in repo-root `images/`. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const CRATE_GRAPHIC = {
  src: `${basePath}/images/box-side-graphic.jpeg`,
  width: 792,
  height: 766,
  alt: "Zarbagh crate side graphic: citrus mark, finest premium fruits, Bhalwal, since 1980",
} as const;

export const HERO_GROVE = {
  src: `${basePath}/images/bagh.jpeg`,
} as const;
