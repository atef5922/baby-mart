"use client";

import { Minus, Plus } from "lucide-react";

export function CartQuantityControl({
  quantity,
  onDecrease,
  onIncrease,
  compact = false
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white shadow-[0_10px_24px_rgba(7,17,31,0.06)] ${
        compact ? "h-9 gap-1 px-1.5" : "h-11 gap-2 px-2"
      }`}
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className={`grid place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-[#07111F] ${
          compact ? "h-7 w-7" : "h-8 w-8"
        }`}
      >
        <Minus size={compact ? 14 : 15} />
      </button>
      <span className={`min-w-6 text-center font-bold text-[#07111F] ${compact ? "text-sm" : "text-base"}`}>{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className={`grid place-items-center rounded-full text-slate-600 transition hover:bg-[#FFF7E6] hover:text-[#9a6d21] ${
          compact ? "h-7 w-7" : "h-8 w-8"
        }`}
      >
        <Plus size={compact ? 14 : 15} />
      </button>
    </div>
  );
}
