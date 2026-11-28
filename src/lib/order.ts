import { formatPkr } from "@/lib/format";
import { getProduct, type Product } from "@/lib/products";

export type CartLine = {
  productId: string;
  qty: number;
};

export const CITIES = [
  "Bhalwal",
  "Sargodha",
  "Lahore",
  "Islamabad / Rawalpindi",
  "Faisalabad",
  "Other (Punjab)",
] as const;

export type CityOption = (typeof CITIES)[number];

export const OTHER_CITY = "Other (Punjab)" satisfies CityOption;

export const SETTLE_OPTIONS = [
  {
    id: "cod",
    label: "Cash on delivery",
    sentence:
      "Cash on delivery — pay the rider in PKR when the crate arrives.",
  },
  {
    id: "bank",
    label: "Bank transfer",
    sentence:
      "Bank transfer — Zarbagh will send account details on WhatsApp before dispatch.",
  },
  {
    id: "whatsapp",
    label: "Confirm on WhatsApp",
    sentence:
      "Confirm on WhatsApp — Zarbagh will call or message this number to confirm qty, day, and payment.",
  },
] as const;

export type SettleId = (typeof SETTLE_OPTIONS)[number]["id"];

export type PlacedOrder = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  note?: string;
  settle: SettleId;
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

export function isValidEmail(raw: string): boolean {
  const email = raw.trim();
  if (email.length === 0) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isCityOption(value: string): value is CityOption {
  return (CITIES as readonly string[]).includes(value);
}

export function settleOption(id: string) {
  return SETTLE_OPTIONS.find((option) => option.id === id);
}

export function makeOrderId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZBG-${stamp}-${rand}`;
}

export function formatOrderMessage(order: PlacedOrder): string {
  const settle = settleOption(order.settle);
  const lines = [
    `Zarbagh order ${order.id}`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
  ];
  if (order.email) {
    lines.push(`Email: ${order.email}`);
  }
  lines.push(`City: ${order.city}`);
  lines.push(`Address: ${order.address}`);
  if (order.note) {
    lines.push(`Note: ${order.note}`);
  }
  lines.push(`Settle: ${settle?.sentence ?? order.settle}`);
  for (const item of order.items) {
    lines.push(
      `- ${item.qty} × ${item.product.name} — ${formatPkr(item.lineTotal)}`,
    );
  }
  lines.push(`Total: ${formatPkr(order.totalPkr)}`);
  return lines.join("\n");
}

export function shopWhatsAppDigits(): string | null {
  const raw = process.env.NEXT_PUBLIC_ZARBAGH_WHATSAPP ?? "";
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = `92${digits.slice(1)}`;
  }
  if (digits.length < 10) {
    return null;
  }
  return digits;
}

export function orderWhatsAppUrl(order: PlacedOrder): string | null {
  const digits = shopWhatsAppDigits();
  if (!digits) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(formatOrderMessage(order))}`;
}
