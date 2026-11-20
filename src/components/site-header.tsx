"use client";

import { cn } from "cn";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState, type ReactNode } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#", label: "Our Story" },
  { href: "/shop", label: "Shop" },
  { href: "#", label: "Recipes" },
  { href: "#", label: "Shipping & Returns" },
  { href: "#", label: "Contact Us" },
] as const;

type SiteHeaderProps = {
  cartCount?: number;
};

function isCurrentPath(href: string, pathname: string) {
  if (href === "#") {
    return false;
  }
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname === `${href}/`;
}

export function SiteHeader({ cartCount = 0 }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-leaf/40 bg-peach text-orchard">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 flex-1">
          <Link
            href="/"
            className="flex min-w-0 flex-col gap-0.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchard"
            onClick={closeMenu}
          >
            <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[0.22em] text-orchard sm:text-[1.55rem]">
              ZARBAGH
            </span>
            <span className="text-[0.62rem] leading-none font-medium tracking-[0.34em] text-leaf uppercase">
              Since 1980 · Bhalwal
            </span>
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <NavAnchor
                  href={link.href}
                  current={isCurrentPath(link.href, pathname)}
                >
                  {link.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <Link
            href="/shop#order"
            className="rounded-sm text-sm font-medium tracking-wide whitespace-nowrap text-orchard transition-colors hover:text-kinnow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchard"
            onClick={closeMenu}
          >
            Cart ({cartCount})
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm text-orchard transition-colors hover:bg-orchard/10 hover:text-kinnow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchard lg:hidden"
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Mobile"
        hidden={!menuOpen}
        className="border-t border-leaf/30 bg-peach lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavAnchor
                href={link.href}
                current={isCurrentPath(link.href, pathname)}
                className="block py-3"
                onClick={closeMenu}
              >
                {link.label}
              </NavAnchor>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function NavAnchor({
  href,
  current,
  className,
  onClick,
  children,
}: {
  href: string;
  current: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const classes = cn(
    "text-sm tracking-wide text-orchard transition-colors hover:text-kinnow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orchard",
    current ? "font-semibold" : "font-medium",
    className,
  );

  if (href === "#") {
    return (
      <a href="#" className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      aria-current={current ? "page" : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
