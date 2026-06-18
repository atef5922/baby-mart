"use client";

import { Grid2X2, List, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/commerce";
import { DropdownSelect } from "@/components/commerce/DropdownSelect";
import { Filters, defaultFilterState, type FilterState } from "@/components/commerce/Filters";
import { Pagination } from "@/components/commerce/Pagination";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { babyBrands } from "@/data/brands";

const PRODUCTS_PER_PAGE = 8;

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
  subtitle?: string;
  lockedCategory?: string;
  initialBrand?: string;
  hideToolbar?: boolean;
  productCardMode?: "default" | "home";
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [brand, setBrand] = useState(initialBrand);
  const [category, setCategory] = useState(lockedCategory ?? "");
  const [page, setPage] = useState(1);
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

  const totalPages = Math.max(1, Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = visibleProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileFiltersOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileFiltersOpen]);

  const resetAll = () => {
    setQuery("");
    setSort("popular");
    setBrand(initialBrand);
    setCategory(lockedCategory ?? "");
    setPage(1);
    setFilters({
      ...defaultFilterState,
      brands: initialBrand ? [initialBrand] : [],
      categories: lockedCategory ? [lockedCategory] : []
    });
  };

  const updateFilters = (next: FilterState) => {
    setPage(1);
    setFilters(next);
    if (!lockedCategory) setCategory(next.categories.length === 1 ? next.categories[0] : "");
    if (!initialBrand) setBrand(next.brands.length === 1 ? next.brands[0] : "");
  };

  const updateCategory = (nextCategory: string) => {
    setPage(1);
    setCategory(nextCategory);
    if (!lockedCategory) {
      setFilters((current) => ({
        ...current,
        categories: nextCategory ? [nextCategory] : []
      }));
    }
  };

  const categoryOptions = [...new Set(products.map((product) => product.category))].map((item) => ({
    label: item.replaceAll("-", " "),
    value: item
  }));

  const brandOptions = babyBrands.map((entry) => ({
    label: entry.name,
    value: entry.name
  }));

  const sortOptions = [
    { label: "Sort by Popular", value: "popular" },
    { label: "Latest Arrivals", value: "latest" },
    { label: "Price Low-High", value: "price-asc" },
    { label: "Price High-Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
    { label: "Brand A-Z", value: "brand" }
  ];

  return (
    <>
      {!hideToolbar && (
        <div className="rounded-lg bg-white p-5 shadow-[0_12px_40px_rgba(7,17,31,0.07)]">
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="w-fit max-w-full bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text font-['Inter',_'Poppins',_sans-serif] text-[2rem] font-bold leading-[1.02] tracking-normal text-transparent sm:text-[2.7rem]">
                {title}
              </h1>
              {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-md" aria-label="Grid view"><Grid2X2 size={18} /></Button>
              <Button variant="outline" size="icon" className="rounded-md" aria-label="List view"><List size={18} /></Button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_180px_180px_180px]">
            <Input value={query} onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }} placeholder="Search within products..." />
            <DropdownSelect value={category} onChange={updateCategory} options={categoryOptions} placeholder="All Categories" disabled={!!lockedCategory} />
            <DropdownSelect value={brand} onChange={(nextBrand) => {
              setBrand(nextBrand);
              setPage(1);
            }} options={brandOptions} placeholder="All Brands" />
            <DropdownSelect value={sort} onChange={(nextSort) => {
              setSort(nextSort);
              setPage(1);
            }} options={sortOptions} placeholder="Sort by Popular" />
          </div>
        </div>
      )}

      <div className={`${hideToolbar ? "" : "mt-6"} grid gap-6 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr]`}>
        <aside className="hidden lg:block">
          <Filters value={filters} onChange={updateFilters} onReset={resetAll} />
        </aside>

        <div>
          <Button variant="outline" className="mb-4 rounded-md lg:hidden" onClick={() => setMobileFiltersOpen(true)}><SlidersHorizontal size={17} /> Mobile Filters</Button>

          {visibleProducts.length ? (
            <>
              <ProductGrid products={paginatedProducts} cardVariant={productCardMode} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
            </>
          ) : (
            <Card className="grid place-items-center px-6 py-16 text-center">
              <h2 className="text-xl font-semibold">No matching products found</h2>
              <p className="mt-2 text-sm text-slate-500">Try another brand, category, or reset the filters.</p>
              <Button className="mt-5 rounded-md bg-[#FF3366] text-white hover:bg-[#07111F] hover:text-white" onClick={resetAll}>Reset Filters</Button>
            </Card>
          )}

        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] bg-[#07111F]/45 p-4 backdrop-blur-sm lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mx-auto mt-10 max-h-[calc(100vh-5rem)] max-w-md overflow-y-auto rounded-[24px] bg-white p-4 shadow-[0_28px_90px_rgba(7,17,31,0.28)]" onClick={(event) => event.stopPropagation()}>
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
