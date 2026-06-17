"use client";

import { Grid2X2, List, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/commerce";
import { Filters, defaultFilterState, type FilterState } from "@/components/commerce/Filters";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { babyBrands } from "@/data/brands";

function sortProducts(products: Product[], sort: string) {
  const cloned = [...products];
  switch (sort) {
    case "price-asc":
      return cloned.sort((a, b) => a.price - b.price);
    case "price-desc":
      return cloned.sort((a, b) => b.price - a.price);
    case "rating":
      return cloned.sort((a, b) => b.rating - a.rating);
    case "latest":
      return cloned.reverse();
    case "brand":
      return cloned.sort((a, b) => a.brand.localeCompare(b.brand));
    default:
      return cloned.sort((a, b) => b.reviewCount - a.reviewCount);
  }
}

export function CatalogExplorer({
  products,
  title,
  subtitle,
  lockedCategory,
  initialBrand = "",
  hideToolbar = false,
  productCardMode = "default"
}: {
  products: Product[];
  title: string;
  subtitle: string;
  lockedCategory?: string;
  initialBrand?: string;
  hideToolbar?: boolean;
  productCardMode?: "default" | "home";
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [brand, setBrand] = useState(initialBrand);
  const [category, setCategory] = useState(lockedCategory ?? "");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilterState,
    brands: initialBrand ? [initialBrand] : [],
    categories: lockedCategory ? [lockedCategory] : []
  });

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !q || [product.name, product.brand, product.category, ...product.tags].some((field) => field.toLowerCase().includes(q));
      const matchesBrand = !brand || product.brand === brand;
      const matchesCategory = !category || product.category === category;
      const matchesFilterBrands = !filters.brands.length || filters.brands.includes(product.brand);
      const matchesFilterCategories = !filters.categories.length || filters.categories.includes(product.category);
      const matchesStock = !filters.inStockOnly || product.stock > 0;
      const matchesEmi = !filters.emiOnly || product.emiMonthly > 0;
      const matchesRating = product.rating >= filters.minRating;
      const matchesPrice = product.price <= filters.maxPrice;

      return matchesQuery && matchesBrand && matchesCategory && matchesFilterBrands && matchesFilterCategories && matchesStock && matchesEmi && matchesRating && matchesPrice;
    });

    return sortProducts(filtered, sort);
  }, [products, query, sort, brand, category, filters]);

  const resetAll = () => {
    setQuery("");
    setSort("popular");
    setBrand(initialBrand);
    setCategory(lockedCategory ?? "");
    setFilters({
      ...defaultFilterState,
      brands: initialBrand ? [initialBrand] : [],
      categories: lockedCategory ? [lockedCategory] : []
    });
  };

  const updateFilters = (next: FilterState) => {
    setFilters(next);
    if (!lockedCategory) setCategory(next.categories.length === 1 ? next.categories[0] : "");
    if (!initialBrand) setBrand(next.brands.length === 1 ? next.brands[0] : "");
  };

  const updateCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    if (!lockedCategory) {
      setFilters((current) => ({
        ...current,
        categories: nextCategory ? [nextCategory] : []
      }));
    }
  };

  return (
    <>
      {!hideToolbar && (
        <div className="rounded-lg bg-white p-5 shadow-[0_12px_40px_rgba(7,17,31,0.07)]">
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-normal">{title}</h1>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" aria-label="Grid view"><Grid2X2 size={18} /></Button>
              <Button variant="outline" size="icon" aria-label="List view"><List size={18} /></Button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px_180px_180px]">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search within products..." />
            <select
              value={category}
              onChange={(event) => updateCategory(event.target.value)}
              disabled={!!lockedCategory}
              className="h-11 rounded-md border border-slate-200 px-3 text-sm disabled:bg-slate-50"
            >
              <option value="">All Categories</option>
              {[...new Set(products.map((product) => product.category))].map((item) => (
                <option key={item} value={item}>{item.replaceAll("-", " ")}</option>
              ))}
            </select>
            <select value={brand} onChange={(event) => setBrand(event.target.value)} className="h-11 rounded-md border border-slate-200 px-3 text-sm">
              <option value="">All Brands</option>
              {babyBrands.map((entry) => <option key={entry.slug} value={entry.name}>{entry.name}</option>)}
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-md border border-slate-200 px-3 text-sm">
              <option value="popular">Sort by Popular</option>
              <option value="latest">Latest Arrivals</option>
              <option value="price-asc">Price Low-High</option>
              <option value="price-desc">Price High-Low</option>
              <option value="rating">Top Rated</option>
              <option value="brand">Brand A-Z</option>
            </select>
          </div>
        </div>
      )}

      <div className={`${hideToolbar ? "" : "mt-6"} grid gap-6 lg:grid-cols-[280px_1fr]`}>
        <aside className="hidden lg:block">
          <Filters value={filters} onChange={updateFilters} onReset={resetAll} />
        </aside>

        <div>
          <Button variant="outline" className="mb-4 lg:hidden" onClick={() => setMobileFiltersOpen(true)}><SlidersHorizontal size={17} /> Mobile Filters</Button>

          {visibleProducts.length ? <ProductGrid products={visibleProducts} cardVariant={productCardMode} /> : (
            <Card className="grid place-items-center px-6 py-16 text-center">
              <h2 className="text-xl font-semibold">No matching products found</h2>
              <p className="mt-2 text-sm text-slate-500">Try another brand, category, or reset the filters.</p>
              <Button variant="gold" className="mt-5" onClick={resetAll}>Reset Filters</Button>
            </Card>
          )}

        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] bg-[#07111F]/45 p-4 backdrop-blur-sm lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mx-auto mt-10 max-w-md rounded-[24px] bg-white p-4 shadow-[0_28px_90px_rgba(7,17,31,0.28)]" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-lg font-semibold">Mobile Filters</div>
              <button onClick={() => setMobileFiltersOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200"><X size={18} /></button>
            </div>
            <Filters value={filters} onChange={updateFilters} onReset={resetAll} />
          </div>
        </div>
      )}
    </>
  );
}
