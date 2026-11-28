import { Storefront } from "@/components/storefront";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop kinnow — Zarbagh",
  description:
    "Browse Zarbagh kinnow crates and loose fruit, add quantities, and send a delivery order on WhatsApp.",
};

export default function ShopPage() {
  return <Storefront products={products} />;
}
