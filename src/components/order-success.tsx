"use client";

import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPkr, formatQty } from "@/lib/format";
import type { PlacedOrder } from "@/lib/order";

type OrderSuccessProps = {
  order: PlacedOrder;
  onShopAgain: () => void;
};

export function OrderSuccess({ order, onShopAgain }: OrderSuccessProps) {
  const placed = new Date(order.placedAt).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <CircleCheck />
        <AlertTitle>Order confirmed</AlertTitle>
        <AlertDescription>
          Zarbagh has your kinnow request. This demo keeps the order in the
          browser only — nothing was charged or emailed.
        </AlertDescription>
      </Alert>
      <div className="rounded-xl bg-card p-4 ring-1 ring-foreground/10">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          Order {order.id}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{placed}</p>
        <Separator className="my-3" />
        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">{order.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="font-medium">{order.phone}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Delivery address</dt>
            <dd className="font-medium">{order.address}</dd>
          </div>
        </dl>
        <Separator className="my-3" />
        <ul className="flex flex-col gap-2 text-sm">
          {order.items.map((item) => (
            <li
              key={item.product.id}
              className="flex items-start justify-between gap-3"
            >
              <span>
                {item.product.name}
                <span className="block text-muted-foreground">
                  {formatQty(item.qty, item.product.unitLabel)}
                </span>
              </span>
              <span className="font-medium">{formatPkr(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-baseline justify-between font-semibold">
          <span>Total</span>
          <span>{formatPkr(order.totalPkr)}</span>
        </p>
      </div>
      <Button type="button" variant="outline" size="lg" onClick={onShopAgain}>
        Shop again
      </Button>
    </div>
  );
}
