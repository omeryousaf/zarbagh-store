"use client";

import { CircleAlert } from "lucide-react";
import type { FormEvent } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatQty } from "@/lib/format";
import type { CartLine } from "@/lib/order";
import { getProduct } from "@/lib/products";

export type CheckoutValues = {
  name: string;
  phone: string;
  address: string;
};

export type CheckoutErrors = Partial<
  Record<keyof CheckoutValues | "cart", string>
>;

type CheckoutFormProps = {
  values: CheckoutValues;
  errors: CheckoutErrors;
  cartEmpty: boolean;
  lines: CartLine[];
  onChange: (field: keyof CheckoutValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CheckoutForm({
  values,
  errors,
  cartEmpty,
  lines,
  onChange,
  onSubmit,
}: CheckoutFormProps) {
  const hasErrors = Object.keys(errors).length > 0;
  const qtyLines = lines.flatMap((line) => {
    const product = getProduct(line.productId);
    if (!product) {
      return [];
    }
    return [{ ...line, product }];
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      {hasErrors ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Check the order details</AlertTitle>
          <AlertDescription>
            {errors.cart ??
              "Name, a Pakistani mobile number, and a full delivery address are required before we can confirm."}
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-name">Name</Label>
        <Input
          id="order-name"
          name="name"
          autoComplete="name"
          placeholder="e.g. Ayesha Khan"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => onChange("name", event.target.value)}
        />
        {errors.name ? (
          <p className="text-xs text-destructive">{errors.name}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-phone">Phone</Label>
        <Input
          id="order-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="03xx xxxxxxx"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          onChange={(event) => onChange("phone", event.target.value)}
        />
        {errors.phone ? (
          <p className="text-xs text-destructive">{errors.phone}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Pakistani mobile: 03xxxxxxxxx or +923xxxxxxxxx
          </p>
        )}
      </div>

      {qtyLines.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium">Quantity</p>
          <ul className="rounded-lg border px-3 py-2 text-sm">
            {qtyLines.map((line) => (
              <li
                key={line.productId}
                className="flex justify-between gap-3 py-0.5"
              >
                <span>{line.product.name}</span>
                <span className="text-muted-foreground">
                  {formatQty(line.qty, line.product.unitLabel)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-address">Delivery address</Label>
        <Textarea
          id="order-address"
          name="address"
          autoComplete="street-address"
          placeholder="House / street, area, city"
          rows={3}
          value={values.address}
          aria-invalid={Boolean(errors.address)}
          onChange={(event) => onChange("address", event.target.value)}
        />
        {errors.address ? (
          <p className="text-xs text-destructive">{errors.address}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Include house number, street, and city so the crate can be dropped
            at the gate.
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={cartEmpty}>
        Place order
      </Button>
      <p className="text-xs text-muted-foreground">
        No payment is taken here. Zarbagh confirms the order on this screen
        only — quantities come from your cart.
      </p>
    </form>
  );
}
