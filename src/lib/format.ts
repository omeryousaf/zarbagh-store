const pkr = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

export function formatPkr(amount: number): string {
  return pkr.format(amount);
}

export function formatQty(qty: number, unitLabel: "kg" | "crate"): string {
  if (unitLabel === "kg") {
    return qty === 1 ? "1 kg" : `${qty} kg`;
  }
  return qty === 1 ? "1 crate" : `${qty} crates`;
}
