import { cn } from "cn";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  cartCount?: number;
};

export function SiteHeader({ cartCount }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-6 py-3.5 sm:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          Zarbagh
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shop">Shop</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/shop#order">
                  Cart
                  <Badge
                    variant="secondary"
                    className={cn(
                      "h-5 min-w-5 rounded-full px-1.5 font-medium",
                    )}
                  >
                    {cartCount}
                  </Badge>
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
