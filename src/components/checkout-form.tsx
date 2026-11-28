"use client";

import { CircleAlert } from "lucide-react";
import type { FormEvent } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CITIES, OTHER_CITY, SETTLE_OPTIONS } from "@/lib/order";

export type CheckoutValues = {
  name: string;
  phone: string;
  email: string;
  city: string;
  otherCity: string;
  address: string;
  note: string;
  settle: string;
};

export type CheckoutErrors = Partial<
  Record<keyof CheckoutValues | "cart", string>
>;

type CheckoutFormProps = {
  values: CheckoutValues;
  errors: CheckoutErrors;
  cartEmpty: boolean;
  onChange: (field: keyof CheckoutValues, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function CheckoutForm({
  values,
  errors,
  cartEmpty,
  onChange,
  onSubmit,
}: CheckoutFormProps) {
  const hasErrors = Object.keys(errors).length > 0;
  const showOtherCity = values.city === OTHER_CITY;

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      {hasErrors ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Check the order details</AlertTitle>
          <AlertDescription>
            {errors.cart ??
              "Name, a Pakistani mobile number, city, and a full delivery address are required before we can confirm."}
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-email">Email</Label>
        <Input
          id="order-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="optional"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          onChange={(event) => onChange("email", event.target.value)}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            We’ll use this if we need to send a copy of the order.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-city">City / area</Label>
        <select
          id="order-city"
          name="city"
          autoComplete="address-level2"
          value={values.city}
          aria-invalid={Boolean(errors.city) || undefined}
          className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm"
          onChange={(event) => onChange("city", event.target.value)}
        >
          <option value="">Select a city</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city ? (
          <p className="text-xs text-destructive">{errors.city}</p>
        ) : null}
      </div>

      {showOtherCity ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="order-other-city">City name</Label>
          <Input
            id="order-other-city"
            name="otherCity"
            autoComplete="address-level2"
            placeholder="City in Punjab"
            value={values.otherCity}
            aria-invalid={Boolean(errors.otherCity)}
            onChange={(event) => onChange("otherCity", event.target.value)}
          />
          {errors.otherCity ? (
            <p className="text-xs text-destructive">{errors.otherCity}</p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-address">Delivery address</Label>
        <Textarea
          id="order-address"
          name="address"
          autoComplete="street-address"
          placeholder="House / street, area"
          rows={3}
          value={values.address}
          aria-invalid={Boolean(errors.address)}
          onChange={(event) => onChange("address", event.target.value)}
        />
        {errors.address ? (
          <p className="text-xs text-destructive">{errors.address}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Include house number, street, and area so the crate can be dropped
            at the gate.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-note">Note for the rider</Label>
        <Textarea
          id="order-note"
          name="note"
          placeholder="Gate code, call on arrival…"
          rows={2}
          value={values.note}
          onChange={(event) => onChange("note", event.target.value)}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">How will you settle</legend>
        {SETTLE_OPTIONS.map((option) => (
          <Label
            key={option.id}
            htmlFor={`order-settle-${option.id}`}
            className="items-start font-normal"
          >
            <input
              id={`order-settle-${option.id}`}
              type="radio"
              name="settle"
              value={option.id}
              checked={values.settle === option.id}
              className="mt-0.5"
              onChange={() => onChange("settle", option.id)}
            />
            <span>{option.label}</span>
          </Label>
        ))}
        {errors.settle ? (
          <p className="text-xs text-destructive">{errors.settle}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            No payment is taken on this site. Seasonal kinnow — Zarbagh
            confirms before the crate leaves Bhalwal.
          </p>
        )}
      </fieldset>

      <Button type="submit" size="lg" className="w-full" disabled={cartEmpty}>
        Place order
      </Button>
      <p className="text-xs text-muted-foreground">
        No payment is taken here. After you place the order, send the packing
        slip on WhatsApp so the packing table sees it.
      </p>
    </form>
  );
}
