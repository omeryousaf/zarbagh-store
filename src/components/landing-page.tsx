import {
  BadgeCheck,
  Droplets,
  Leaf,
  MapPin,
  SunMedium,
} from "lucide-react";
import Link from "next/link";

import { GroveScene } from "@/components/grove-scene";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPkr } from "@/lib/format";
import { featuredProducts } from "@/lib/products";

const values = [
  {
    title: "Packed the same week",
    body: "Fruit is washed, graded, and crated within days of the pick — not held for a late-season dump.",
    icon: SunMedium,
  },
  {
    title: "Honest grades",
    body: "Grade A for the bowl. Juice crates for the press. We label the difference instead of mixing it.",
    icon: BadgeCheck,
  },
  {
    title: "Canal-belt groves",
    body: "Kinnow from the Sargodha, Bhalwal, and Kot Momin orchards — Punjab’s winter mandarin country.",
    icon: Leaf,
  },
  {
    title: "Dropped at the gate",
    body: "Routes across Punjab and into Islamabad / Rawalpindi. You confirm address in the shop; this slice does not charge.",
    icon: MapPin,
  },
];

export function LandingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader tone="grove" />

      <section className="relative flex min-h-[calc(100svh-3.6rem)] items-end overflow-hidden sm:items-center">
        <GroveScene />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 text-white sm:px-6 sm:py-20">
          <p className="text-sm font-medium tracking-wide text-orange-100/90 uppercase">
            Winter kinnow · Sargodha belt
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Kinnow worth putting in a bowl.
          </h1>
          <p className="max-w-xl text-base leading-7 text-orange-50/90 sm:text-lg">
            Zarbagh packs Grade A table fruit and juice crates the same week
            they leave the grove. Thin peel, heavy juice, a sweet-tart bite —
            the King × Willow Leaf mandarin Punjab waits for each December.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 px-6 text-base"
              asChild
            >
              <Link href="/shop">Shop kinnow</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-white/40 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="#story">Read the grove story</Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="story"
        className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-primary">Our groves</p>
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
        <aside className="rounded-2xl bg-secondary p-6 ring-1 ring-foreground/10 sm:p-8">
          <Droplets className="mb-4 size-8 text-primary" aria-hidden />
          <p className="text-lg font-medium tracking-tight">
            High juice, thin peel, a clean pull of the skin.
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Kinnow is a mandarin hybrid, not a sweet orange. Households in
            Punjab press it at breakfast and peel it after dinner. A 10 kg
            family crate is about a week for a house that actually eats fruit.
          </p>
        </aside>
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Featured packs</p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Start with a crate.
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/shop">See every pack</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="h-full">
                <CardHeader>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{product.grade}</Badge>
                    <Badge variant="outline">{product.pack}</Badge>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold tracking-tight">
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

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {values.map((value) => (
          <div key={value.title} className="flex flex-col gap-3">
            <value.icon className="size-6 text-primary" aria-hidden />
            <h3 className="font-medium">{value.title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {value.body}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-primary px-4 py-14 text-primary-foreground sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              The crate is the product.
            </h2>
            <p className="mt-2 text-sm leading-6 text-primary-foreground/85">
              Open the shop to set quantities, add a delivery address, and
              confirm the order on-screen. Nothing is charged in this slice.
            </p>
          </div>
          <Button
            size="lg"
            className="h-12 bg-background px-6 text-base text-foreground hover:bg-background/90"
            asChild
          >
            <Link href="/shop">Shop the catalogue</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
