"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { addStoredCartLine } from "@/lib/cart-storage";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
};

export function AddToCartButton({
  productId,
  productName,
}: AddToCartButtonProps) {
  const router = useRouter();

  return (
    <Button
      type="button"
      size="lg"
      className="h-11 w-full rounded-full text-sm font-semibold tracking-[0.14em] uppercase"
      aria-label={`Add ${productName} to cart`}
      onClick={() => {
        addStoredCartLine(productId, 1);
        router.push("/shop");
      }}
    >
      Add to cart
    </Button>
  );
}
