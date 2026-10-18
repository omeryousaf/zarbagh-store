import Link from "next/link";

import { CrateGraphic } from "@/components/crate-graphic";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HERO_GROVE } from "@/lib/artwork";
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

      <section
        className="hero-grove relative flex min-h-[calc(100svh-3.75rem)] items-end overflow-hidden sm:items-center"
        style={{ backgroundImage: `url(${HERO_GROVE.src})` }}
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.90_0.038_82_/_0.90)_0%,oklch(0.90_0.038_82_/_0.74)_42%,oklch(0.90_0.038_82_/_0.42)_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-16 sm:px-8 sm:py-24">
          <p className="text-sm text-muted-foreground">
            Winter kinnow · Sargodha belt
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Kinnow worth putting in a bowl.
          </h1>
          <p className="max-w-xl text-base leading-7 text-foreground/80 sm:text-lg">
            Zarbagh packs Grade A table fruit and juice crates the same week
            they leave the grove. Thin peel, heavy juice, a sweet-tart bite —
            the King × Willow Leaf mandarin Punjab waits for each December.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="h-12 px-6 text-base" asChild>
              <Link href="/shop">Shop kinnow</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base"
              asChild
            >
              <Link href="#story">Read the grove story</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="story" className="bg-grove-wash">
        <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Our groves</p>
            <h2 className="text-3xl font-semibold tracking-tight">
              A packing table at the edge of the kinnow belt.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Zarbagh buys from growers along the canal-fed orchards of Sargodha
              district. Kinnow only tastes like itself for a short winter:
              mid-December through February, when the rind thins and the juice
              runs. We grade by hand — even fruit for the table, smaller or
              marked fruit for the press — and crate for kitchens, not for a
              cold-store that sits until March.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              The work is ordinary on purpose: wash, sort, weigh, nail the crate.
              What we will not do is sell “mixed” as Grade A, or stretch the
              season with fruit that has gone puffy. When the flush ends, we
              stop.
            </p>
          </div>
          <aside className="rounded-xl bg-paper p-6 sm:p-8">
            <p className="text-lg font-medium tracking-tight">
              High juice, thin peel, a clean pull of the skin.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Kinnow is a mandarin hybrid, not a sweet orange. Households in
              Punjab press it at breakfast and peel it after dinner. A 10 kg
              family crate is about a week for a house that actually eats fruit.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-20 sm:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Featured packs</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Start with a crate.
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/shop">See every pack</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="h-full bg-background pt-0">
                <CrateGraphic
                  className="border-b border-border/70 bg-background"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <CardHeader>
                  <p className="text-sm text-muted-foreground">
                    {product.grade} · {product.pack}
                  </p>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold tracking-tight text-primary">
                    {formatPkr(product.pricePkr)}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      / {product.unitLabel}
                    </span>
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/shop">Shop this pack</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
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

      <section className="bg-citrus-wash px-6 py-16 sm:px-8">
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
