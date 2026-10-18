import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:px-6">
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
          First slice: local order confirmation only. No login, database, or
          payments.
        </p>
      </div>
    </footer>
  );
}
