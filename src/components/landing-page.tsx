import Link from "next/link";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { CrateGraphic } from "@/components/crate-graphic";
import { HeroSlider } from "@/components/hero-slider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ORCHARD_INTRO } from "@/lib/artwork";
import { formatPkr } from "@/lib/format";
import { featuredProducts } from "@/lib/products";

const values = [
  {
    title: "Packed the same week",
    body: "Fruit is washed, graded, and crated within days of the pick — not held for a late-season dump.",
  },
  {
    title: "Honest grades",
    body: "Grade A for the bowl. Juice crates for the press. We label the difference instead of mixing it.",
  },
  {
    title: "Canal-belt groves",
    body: "Kinnow from the Sargodha, Bhalwal, and Kot Momin orchards — Punjab’s winter mandarin country.",
  },
  {
    title: "Dropped at the gate",
    body: "Routes across Punjab and into Islamabad / Rawalpindi. You confirm address in the shop; this slice does not charge.",
  },
];

export function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />

      <HeroSlider />

      <section id="story" className="bg-paper">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-medium tracking-[0.28em] text-leaf uppercase">
              Since 1980 · Qudratabad, Bhalwal
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Bhalwal&apos;s finest, gifted beautifully
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              For more than four decades our family orchard has grown kinnows in
              the heart of Punjab&apos;s citrus belt. Picked at their best,
              graded by size and packed in boxes made to protect them and to be
              gifted.
            </p>
            <a
              href="#"
              className="w-fit text-sm font-medium text-orchard underline-offset-4 hover:text-kinnow hover:underline"
            >
              Read our story →
            </a>
          </div>
          <img
            src={ORCHARD_INTRO.src}
            alt={ORCHARD_INTRO.alt}
            width={ORCHARD_INTRO.width}
            height={ORCHARD_INTRO.height}
            decoding="async"
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Shop the season
            </h2>
            <p className="text-base text-muted-foreground">
              Three box sizes. Same Bhalwal kinnows.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="h-full bg-paper pt-0">
                <Link
                  href="/shop"
                  className="flex flex-1 flex-col rounded-t-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchard"
                >
                  {product.image ? (
                    <img
                      src={product.image.src}
                      alt={product.image.alt}
                      width={product.image.width}
                      height={product.image.height}
                      decoding="async"
                      className="aspect-square w-full object-cover"
                    />
                  ) : (
                    <CrateGraphic
                      className="border-b border-border/70 bg-paper"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-semibold tracking-tight text-primary">
                      {formatPkr(product.pricePkr)}
                    </p>
                  </CardContent>
                </Link>
                <CardFooter>
                  <AddToCartButton
                    productId={product.id}
                    productName={product.name}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col gap-2">
              <h3 className="font-medium">{value.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background px-6 py-16 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              The crate is the product.
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Open the shop to set quantities, add a delivery address, and
              confirm the order on-screen. Nothing is charged in this slice.
            </p>
          </div>
          <Button size="lg" className="h-12 px-6 text-base" asChild>
            <Link href="/shop">Shop the catalogue</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
