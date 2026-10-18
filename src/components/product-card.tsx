"use client";

import { useState } from "react";

import { QtyStepper } from "@/components/qty-stepper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPkr } from "@/lib/format";
import { MIN_QTY } from "@/lib/order";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  onAdd: (productId: string, qty: number) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [qty, setQty] = useState(MIN_QTY);

  return (
    <Card className="h-full">
      <CardHeader>
        <p className="text-sm text-muted-foreground">
          {product.grade} · {product.pack}
        </p>
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          Best for {product.bestFor.toLowerCase()}.
        </p>
        <p className="text-2xl font-semibold tracking-tight text-primary">
          {formatPkr(product.pricePkr)}
          <span className="ml-1 text-sm font-normal text-muted-foreground">
            / {product.unitLabel}
          </span>
        </p>
        <QtyStepper
          id={`qty-${product.id}`}
          label="Quantity"
          value={qty}
          onChange={setQty}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          onClick={() => onAdd(product.id, qty)}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
