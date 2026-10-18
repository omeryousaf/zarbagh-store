"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { clampQty, MAX_QTY, MIN_QTY } from "@/lib/order";

type QtyStepperProps = {
  id: string;
  label: string;
  value: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
};

export function QtyStepper({
  id,
  label,
  value,
  onChange,
  disabled = false,
}: QtyStepperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Decrease quantity"
          disabled={disabled || value <= MIN_QTY}
          onClick={() => onChange(clampQty(value - 1))}
        >
          <Minus />
        </Button>
        <Input
          id={id}
          className="h-8 w-16 text-center"
          inputMode="numeric"
          min={MIN_QTY}
          max={MAX_QTY}
          value={value}
          disabled={disabled}
          aria-invalid={value < MIN_QTY || value > MAX_QTY}
          onChange={(event) => {
            const next = Number.parseInt(event.target.value, 10);
            if (event.target.value === "") {
              onChange(MIN_QTY);
              return;
            }
            onChange(clampQty(next));
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Increase quantity"
          disabled={disabled || value >= MAX_QTY}
          onClick={() => onChange(clampQty(value + 1))}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
