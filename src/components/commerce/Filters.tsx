"use client";

import { SlidersHorizontal } from "lucide-react";
import { categories } from "@/data/catalog";
import { brandNames } from "@/data/brands";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export type FilterState = {
  categories: string[];
  brands: string[];
  inStockOnly: boolean;
  emiOnly: boolean;
  minRating: number;
  maxPrice: number;
};

export const defaultFilterState: FilterState = {
  categories: [],
  brands: [],
  inStockOnly: false,
  emiOnly: false,
  minRating: 0,
  maxPrice: 50000
};

export function Filters({
  value,
  onChange,
  onReset
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  const toggleItem = (key: "categories" | "brands", item: string) => {
    const current = value[key];
    onChange({
      ...value,
      [key]: current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]
    });
  };

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal size={18} /> Filters
        </div>
        <button type="button" onClick={onReset} className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3366] hover:text-[#07111F]">
          Reset
        </button>
      </div>

      <FilterGroup
        title="Categories"
        items={categories.map((item) => ({ label: `${item.name} (${item.productCount})`, value: item.slug }))}
        selected={value.categories}
        onToggle={(item) => toggleItem("categories", item)}
      />
      <FilterGroup
        title="Brands"
        items={brandNames.slice(0, 10).map((item) => ({ label: item, value: item }))}
        selected={value.brands}
        onToggle={(item) => toggleItem("brands", item)}
      />

      <div className="border-b border-slate-100 py-4">
        <div className="mb-3 text-sm font-semibold">Availability</div>
        <div className="grid gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={value.inStockOnly} onChange={(event) => onChange({ ...value, inStockOnly: event.target.checked })} className="h-4 w-4 rounded border-slate-300 accent-[#FF3366]" />
            In Stock Only
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={value.emiOnly} onChange={(event) => onChange({ ...value, emiOnly: event.target.checked })} className="h-4 w-4 rounded border-slate-300 accent-[#FF3366]" />
            EMI Available
          </label>
        </div>
      </div>

      <div className="border-b border-slate-100 py-4">
        <div className="mb-3 text-sm font-semibold">Minimum Rating</div>
        <div className="grid gap-2">
          {[0, 4, 4.5].map((rating) => (
            <label key={rating} className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="radio"
                name="rating"
                checked={value.minRating === rating}
                onChange={() => onChange({ ...value, minRating: rating })}
                className="h-4 w-4 border-slate-300 accent-[#FF3366]"
              />
              {rating === 0 ? "All Ratings" : `${rating}+ stars`}
            </label>
          ))}
        </div>
      </div>

      <div className="py-4">
        <div className="mb-2 text-sm font-semibold">Max Price</div>
        <input
          type="range"
          min="200"
          max="50000"
          step="100"
          value={value.maxPrice}
          onChange={(event) => onChange({ ...value, maxPrice: Number(event.target.value) })}
          className="w-full accent-[#FF3366]"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>Tk 200</span>
          <span>{`Tk ${value.maxPrice.toLocaleString()}`}</span>
        </div>
      </div>

      <Button variant="outline" className="mt-5 w-full rounded-md !border-transparent !bg-[#FF3366] !text-white hover:!bg-[#07111F] hover:!text-white">Filters Applied Live</Button>
    </Card>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle
}: {
  title: string;
  items: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="border-b border-slate-100 py-4 first:pt-0 last:border-0">
      <div className="mb-3 text-sm font-semibold">{title}</div>
      <div className="grid gap-2">
        {items.map((item) => (
          <label key={item.value} className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={selected.includes(item.value)}
              onChange={() => onToggle(item.value)}
              className="h-4 w-4 rounded border-slate-300 accent-[#FF3366]"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}
