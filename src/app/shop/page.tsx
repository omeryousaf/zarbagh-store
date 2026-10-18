import { Storefront } from "@/components/storefront";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop kinnow — Zarbagh",
  description:
    "Browse Zarbagh kinnow crates and loose fruit, add quantities, and confirm a delivery order on-screen.",
};

export default function ShopPage() {
  return <Storefront products={products} />;
}
