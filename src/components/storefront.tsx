"use client";

import { useMemo, useState, type FormEvent } from "react";

import {
  CheckoutForm,
  type CheckoutErrors,
  type CheckoutValues,
} from "@/components/checkout-form";
import { CartPanel } from "@/components/cart-panel";
import { OrderSuccess } from "@/components/order-success";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPkr } from "@/lib/format";
import {
  cartTotal,
  clampQty,
  isValidAddress,
  isValidName,
  isValidPkMobile,
  makeOrderId,
  type CartLine,
  type PlacedOrder,
} from "@/lib/order";
import { getProduct, type Product } from "@/lib/products";

const emptyForm: CheckoutValues = {
  name: "",
  phone: "",
  address: "",
};

type StorefrontProps = {
  products: Product[];
};

export function Storefront({ products }: StorefrontProps) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [form, setForm] = useState<CheckoutValues>(emptyForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = useMemo(() => cartTotal(lines), [lines]);

  function addToCart(productId: string, qty: number) {
    setOrder(null);
    setErrors({});
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (!existing) {
        return [...current, { productId, qty: clampQty(qty) }];
      }
      return current.map((line) =>
        line.productId === productId
          ? { ...line, qty: clampQty(line.qty + qty) }
          : line,
      );
    });
  }

  function setLineQty(productId: string, qty: number) {
    setLines((current) =>
      current.map((line) =>
        line.productId === productId ? { ...line, qty: clampQty(qty) } : line,
      ),
    );
  }

  function removeLine(productId: string) {
    setLines((current) =>
      current.filter((line) => line.productId !== productId),
    );
  }

  function validate(): CheckoutErrors {
    const next: CheckoutErrors = {};
    if (lines.length === 0) {
      next.cart = "Add at least one pack before placing an order.";
    }
    if (!isValidName(form.name)) {
      next.name = "Enter a full name using letters.";
    }
    if (!isValidPkMobile(form.phone)) {
      next.phone = "Use a Pakistani mobile number such as 03001234567.";
    }
    if (!isValidAddress(form.address)) {
      next.address = "Add a fuller address (house, street, and city).";
    }
    return next;
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const items = lines.flatMap((line) => {
      const product = getProduct(line.productId);
      if (!product) {
        return [];
      }
      return [
        {
          product,
          qty: line.qty,
          lineTotal: product.pricePkr * line.qty,
        },
      ];
    });

    setOrder({
      id: makeOrderId(),
      name: form.name.trim(),
      phone: form.phone.replace(/[\s-]/g, ""),
      address: form.address.trim(),
      items,
      totalPkr: cartTotal(lines),
      placedAt: new Date().toISOString(),
    });
    setLines([]);
    setForm(emptyForm);
  }

  function shopAgain() {
    setOrder(null);
    setErrors({});
    setForm(emptyForm);
    setLines([]);
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader cartCount={itemCount} />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <p className="text-sm font-medium text-primary">Catalogue</p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Shop kinnow crates and kilos.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Prices in Pakistani rupees. Set a quantity on each pack, then
              confirm name, phone, and a delivery address. This slice keeps the
              order in the browser.
            </p>
          </section>

          <section id="catalog" className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </section>
        </div>

        <aside id="order" className="flex flex-col gap-4 lg:sticky lg:top-20">
          <Card>
            <CardHeader>
              <CardTitle>Your cart</CardTitle>
              <CardDescription>
                {itemCount === 0
                  ? "Nothing packed yet."
                  : `${itemCount} item${itemCount === 1 ? "" : "s"} · ${formatPkr(total)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {order ? null : (
                <CartPanel
                  lines={lines}
                  onQtyChange={setLineQty}
                  onRemove={removeLine}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{order ? "Order received" : "Checkout"}</CardTitle>
              <CardDescription>
                {order
                  ? "Keep this confirmation — it is only on this device."
                  : "Name, phone, delivery address, and the quantities in your cart."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {order ? (
                <OrderSuccess order={order} onShopAgain={shopAgain} />
              ) : (
                <CheckoutForm
                  values={form}
                  errors={errors}
                  cartEmpty={lines.length === 0}
                  lines={lines}
                  onChange={(field, value) => {
                    setForm((current) => ({ ...current, [field]: value }));
                    setErrors((current) => {
                      const next = { ...current };
                      delete next[field];
                      if (field !== "cart") {
                        delete next.cart;
                      }
                      return next;
                    });
                  }}
                  onSubmit={placeOrder}
                />
              )}
            </CardContent>
          </Card>
        </aside>
      </main>

      <SiteFooter />

      {itemCount > 0 && !order ? (
        <div className="sticky bottom-0 z-20 border-t bg-background/95 p-3 backdrop-blur-md lg:hidden">
          <Button className="w-full" size="lg" asChild>
            <a href="#order">
              Checkout · {itemCount} · {formatPkr(total)}
            </a>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
