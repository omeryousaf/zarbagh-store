"use client";

import { ShoppingBasket, Trash2 } from "lucide-react";

import { QtyStepper } from "@/components/qty-stepper";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPkr, formatQty } from "@/lib/format";
import type { CartLine } from "@/lib/order";
import { getProduct } from "@/lib/products";

type CartPanelProps = {
  lines: CartLine[];
  onQtyChange: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
};

export function CartPanel({ lines, onQtyChange, onRemove }: CartPanelProps) {
  const resolved = lines.flatMap((line) => {
    const product = getProduct(line.productId);
    if (!product) {
      return [];
    }
    return [{ ...line, product, lineTotal: product.pricePkr * line.qty }];
  });
  const total = resolved.reduce((sum, line) => sum + line.lineTotal, 0);

  if (resolved.length === 0) {
    return (
      <Alert>
        <ShoppingBasket />
        <AlertTitle>Your crate is empty</AlertTitle>
        <AlertDescription>
          Add loose fruit or a crate from the catalogue. Quantity is set on each
          pack, then you can change it here before checkout.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {resolved.map((line) => (
          <li key={line.productId} className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{line.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  {line.product.grade} · {formatPkr(line.product.pricePkr)} /{" "}
                  {line.product.unitLabel}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${line.product.name}`}
                onClick={() => onRemove(line.productId)}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="flex items-end justify-between gap-3">
              <QtyStepper
                id={`cart-qty-${line.productId}`}
                label="Qty"
                value={line.qty}
                onChange={(qty) => onQtyChange(line.productId, qty)}
              />
              <p className="text-sm font-medium">
                {formatQty(line.qty, line.product.unitLabel)} ·{" "}
                {formatPkr(line.lineTotal)}
              </p>
            </div>
            <Separator />
          </li>
        ))}
      </ul>
      <p className="flex items-baseline justify-between text-base font-semibold">
        <span>Total</span>
        <span className="text-primary">{formatPkr(total)}</span>
      </p>
    </div>
  );
}
