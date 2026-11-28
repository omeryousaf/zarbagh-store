"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

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
import { readStoredCart, writeStoredCart } from "@/lib/cart-storage";
import { formatPkr } from "@/lib/format";
import {
  cartTotal,
  clampQty,
  isCityOption,
  isValidAddress,
  isValidEmail,
  isValidName,
  isValidPkMobile,
  makeOrderId,
  OTHER_CITY,
  settleOption,
  type CartLine,
  type PlacedOrder,
} from "@/lib/order";
import { getProduct, type Product } from "@/lib/products";

const emptyForm: CheckoutValues = {
  name: "",
  phone: "",
  email: "",
  city: "",
  otherCity: "",
  address: "",
  note: "",
  settle: "cod",
};

type StorefrontProps = {
  products: Product[];
};

export function Storefront({ products }: StorefrontProps) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [form, setForm] = useState<CheckoutValues>(emptyForm);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    setLines(readStoredCart());
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (!cartReady) {
      return;
    }
    writeStoredCart(lines);
  }, [cartReady, lines]);

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
    if (!isValidEmail(form.email)) {
      next.email = "Enter an email like name@domain, or leave this blank.";
    }
    if (!isCityOption(form.city)) {
      next.city = "Choose a city or area.";
    } else if (form.city === OTHER_CITY && form.otherCity.trim().length < 2) {
      next.otherCity = "Name the city in Punjab.";
    }
    if (!isValidAddress(form.address)) {
      next.address = "Add a fuller address (house, street, and area).";
    }
    if (!settleOption(form.settle)) {
      next.settle = "Choose how you will settle.";
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

    const email = form.email.trim();
    const note = form.note.trim();
    const city =
      form.city === OTHER_CITY ? form.otherCity.trim() : form.city;

    setOrder({
      id: makeOrderId(),
      name: form.name.trim(),
      phone: form.phone.replace(/[\s-]/g, ""),
      ...(email ? { email } : {}),
      city,
      address: form.address.trim(),
      ...(note ? { note } : {}),
      settle: form.settle as PlacedOrder["settle"],
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

      <main className="flex flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-stretch">
        <div className="bg-paper">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10 sm:px-8 lg:ml-auto lg:mr-0 lg:max-w-3xl lg:pr-8">
            <section className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">Catalogue</p>
              <h1 className="text-3xl font-semibold tracking-tight">
                Shop kinnow crates and kilos.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                Prices in Pakistani rupees. Pack a crate, add a delivery point,
                and send the packing slip on WhatsApp. No payment is taken on
                this site — Zarbagh confirms before the fruit leaves Bhalwal.
              </p>
            </section>

            <section id="catalog" className="grid gap-6 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}
            </section>
          </div>
        </div>

        <aside
          id="order"
          className="bg-background px-6 py-10 sm:px-8 lg:px-6"
        >
          <div className="flex flex-col gap-4 lg:sticky lg:top-20">
            <Card className="bg-paper">
              <CardHeader>
                <CardTitle>Your cart</CardTitle>
                <CardDescription>
                  {order
                    ? "Packed. See the slip below."
                    : itemCount === 0
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

            <Card className="bg-paper">
              <CardHeader>
                <CardTitle>{order ? "Order received" : "Checkout"}</CardTitle>
                <CardDescription>
                  {order
                    ? "Keep this packing slip, then send it on WhatsApp."
                    : "Name, phone, city, and delivery address. Quantities come from your cart."}
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
                    onChange={(field, value) => {
                      setForm((current) => ({
                        ...current,
                        [field]: value,
                        ...(field === "city" && value !== OTHER_CITY
                          ? { otherCity: "" }
                          : {}),
                      }));
                      setErrors((current) => {
                        const next = { ...current };
                        delete next[field];
                        delete next.cart;
                        if (field === "city") {
                          delete next.otherCity;
                        }
                        return next;
                      });
                    }}
                    onSubmit={placeOrder}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </aside>
      </main>

      <SiteFooter />

      {itemCount > 0 && !order ? (
        <div className="sticky bottom-0 z-20 border-t border-border/80 bg-background p-3 lg:hidden">
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
