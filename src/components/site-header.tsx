import { cn } from "cn";
import { Citrus, ShoppingBasket } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  tone?: "paper" | "grove";
  cartCount?: number;
};

export function SiteHeader({
  tone = "paper",
  cartCount,
}: SiteHeaderProps) {
  const grove = tone === "grove";
  const ghost = grove
    ? "text-white hover:bg-white/10 hover:text-white"
    : undefined;

  return (
    <header
      className={
        grove
          ? "sticky top-0 z-30 border-b border-white/15 bg-[#1c2410]/80 text-white backdrop-blur-md"
          : "sticky top-0 z-30 border-b bg-background/90 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Citrus className="size-4" aria-hidden />
          </span>
          <span>Zarbagh</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn("hidden sm:inline-flex", ghost)}
            asChild
          >
            <Link href="/#story">Our groves</Link>
          </Button>
          {cartCount === undefined ? (
            <Button size="sm" asChild>
              <Link href="/shop">Shop kinnow</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className={ghost} asChild>
                <Link href="/shop">Shop</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/shop#order">
                  <ShoppingBasket data-icon="inline-start" />
                  Cart
                  <Badge variant="secondary">{cartCount}</Badge>
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
