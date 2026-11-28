"use client";

import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPkr, formatQty } from "@/lib/format";
import {
  orderWhatsAppUrl,
  settleOption,
  type PlacedOrder,
} from "@/lib/order";

type OrderSuccessProps = {
  order: PlacedOrder;
  onShopAgain: () => void;
};

export function OrderSuccess({ order, onShopAgain }: OrderSuccessProps) {
  const placed = new Date(order.placedAt).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const whatsappUrl = orderWhatsAppUrl(order);
  const settle = settleOption(order.settle);

  return (
    <div className="flex flex-col gap-4">
      <Alert>
        <CircleCheck />
        <AlertTitle>Order confirmed</AlertTitle>
        <AlertDescription>
          Zarbagh has this on your screen. Send it on WhatsApp so the packing
          table sees it. No payment is taken on this site.
        </AlertDescription>
      </Alert>
      <div className="rounded-xl bg-secondary/60 p-4">
        <p className="text-xs text-muted-foreground">Order {order.id}</p>
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
          {order.email ? (
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium">{order.email}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-muted-foreground">City</dt>
            <dd className="font-medium">{order.city}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Delivery address</dt>
            <dd className="font-medium">{order.address}</dd>
          </div>
          {order.note ? (
            <div>
              <dt className="text-muted-foreground">Note for the rider</dt>
              <dd className="font-medium">{order.note}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-muted-foreground">Settle</dt>
            <dd className="font-medium">{settle?.sentence ?? order.settle}</dd>
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
          <span className="text-primary">{formatPkr(order.totalPkr)}</span>
        </p>
      </div>
      {whatsappUrl ? (
        <Button size="lg" className="w-full" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Send to Zarbagh on WhatsApp
          </a>
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          Ask Zarbagh to set the shop WhatsApp number so this order can be sent.
        </p>
      )}
      <Button type="button" variant="outline" size="lg" onClick={onShopAgain}>
        Shop again
      </Button>
    </div>
  );
}
