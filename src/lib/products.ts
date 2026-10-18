export type Grade = "Grade A" | "Grade B" | "Export";

export type Product = {
  id: string;
  name: string;
  pack: string;
  grade: Grade;
  unitLabel: "kg" | "crate";
  pricePkr: number;
  weightKg: number;
  description: string;
  bestFor: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "loose-a",
    name: "Loose Grade A kinnow",
    pack: "Sold by the kilogram",
    grade: "Grade A",
    unitLabel: "kg",
    pricePkr: 220,
    weightKg: 1,
    description:
      "Hand-sorted fruit from groves Zarbagh sources in the Sargodha belt: thin peel, heavy juice, and a sweet-tart bite. Even size with few blemishes — the kinnow you keep in a bowl.",
    bestFor: "Daily fruit and school tiffins",
  },
  {
    id: "crate-5kg",
    name: "5 kg gift crate",
    pack: "5 kg washed crate",
    grade: "Grade A",
    unitLabel: "crate",
    pricePkr: 1150,
    weightKg: 5,
    description:
      "Washed Grade A kinnow nested in a small crate. A practical gift for neighbours, offices, and winter hosts — no need to buy a full mandi box.",
    bestFor: "Gifts and small households",
    featured: true,
  },
  {
    id: "crate-10kg",
    name: "10 kg family crate",
    pack: "10 kg family crate",
    grade: "Grade A",
    unitLabel: "crate",
    pricePkr: 2150,
    weightKg: 10,
    description:
      "The household pack. Enough fruit for juice in the morning and peeling after dinner for about a week, packed the same week it is picked.",
    bestFor: "Families who go through a crate a week",
    featured: true,
  },
  {
    id: "crate-20kg-juice",
    name: "20 kg juice crate",
    pack: "20 kg mandi crate",
    grade: "Grade B",
    unitLabel: "crate",
    pricePkr: 3400,
    weightKg: 20,
    description:
      "Slightly smaller or skin-marked fruit with the same juice. This is the crate juice shops and homes with a press buy — more litres, less polish.",
    bestFor: "Fresh juice and bulk cooking",
  },
  {
    id: "crate-8kg-export",
    name: "8 kg export-grade crate",
    pack: "8 kg wooden crate",
    grade: "Export",
    unitLabel: "crate",
    pricePkr: 1980,
    weightKg: 8,
    description:
      "Extra-large, low-blemish kinnow packed the way exporters grade it. Firmer rind for travel, still easy to peel, with a deep orange colour.",
    bestFor: "Guests and longer-distance delivery",
    featured: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export const featuredProducts = products.filter((product) => product.featured);
