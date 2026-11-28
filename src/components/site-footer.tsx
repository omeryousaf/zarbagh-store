import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-6 py-8 text-sm text-muted-foreground sm:px-8">
        <p>
          Zarbagh ·{" "}
          <Link href="/" className="underline-offset-4 hover:underline">
            Home
          </Link>{" "}
          ·{" "}
          <Link href="/shop" className="underline-offset-4 hover:underline">
            Shop
          </Link>
        </p>
        <p>
          No payment on this site. Seasonal kinnow from Bhalwal — confirm by
          WhatsApp or phone.
        </p>
      </div>
    </footer>
  );
}
