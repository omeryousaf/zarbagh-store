import { getProduct, type Product } from "@/lib/products";

export type CartLine = {
  productId: string;
  qty: number;
};

export type PlacedOrder = {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: Array<{
    product: Product;
    qty: number;
    lineTotal: number;
  }>;
  totalPkr: number;
  placedAt: string;
};

export const MIN_QTY = 1;
export const MAX_QTY = 40;

export function clampQty(value: number): number {
  if (!Number.isFinite(value)) {
    return MIN_QTY;
  }
  return Math.min(MAX_QTY, Math.max(MIN_QTY, Math.trunc(value)));
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const product = getProduct(line.productId);
    if (!product) {
      return sum;
    }
    return sum + product.pricePkr * line.qty;
  }, 0);
}

export function isValidPkMobile(raw: string): boolean {
  const compact = raw.replace(/[\s-]/g, "");
  return /^(?:\+92|0)3\d{9}$/.test(compact);
}

export function isValidName(raw: string): boolean {
  const name = raw.trim();
  return name.length >= 2 && /^[\p{L} .'-]+$/u.test(name);
}

export function isValidAddress(raw: string): boolean {
  return raw.trim().length >= 12;
}

export function makeOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZBG-${stamp}-${rand}`;
}
