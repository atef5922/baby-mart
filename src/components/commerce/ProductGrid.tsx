import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/types/commerce";

export function ProductGrid({
  products,
  compact = false,
  cardVariant = "home",
  viewMode = "grid"
}: {
  products: Product[];
  compact?: boolean;
  cardVariant?: "default" | "home";
  viewMode?: "grid" | "list";
}) {
  const gridClass =
    viewMode === "list"
      ? "grid-cols-1 gap-4"
      : cardVariant === "home"
        ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5";

  return (
    <div className={`grid ${gridClass}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          compact={compact}
          cardVariant={cardVariant}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
