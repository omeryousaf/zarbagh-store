import { clampQty, type CartLine } from "@/lib/order";
import { getProduct } from "@/lib/products";

const STORAGE_KEY = "zarbagh-cart";

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const line = value as Partial<CartLine>;
  return typeof line.productId === "string" && typeof line.qty === "number";
}

export function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.flatMap((item) => {
      if (!isCartLine(item) || !getProduct(item.productId)) {
        return [];
      }
      return [{ productId: item.productId, qty: clampQty(item.qty) }];
    });
  } catch {
    return [];
  }
}

export function writeStoredCart(lines: CartLine[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

export function addStoredCartLine(productId: string, qty = 1): CartLine[] {
  if (!getProduct(productId)) {
    return readStoredCart();
  }

  const current = readStoredCart();
  const existing = current.find((line) => line.productId === productId);
  const next = existing
    ? current.map((line) =>
        line.productId === productId
          ? { ...line, qty: clampQty(line.qty + qty) }
          : line,
      )
    : [...current, { productId, qty: clampQty(qty) }];

  writeStoredCart(next);
  return next;
}
