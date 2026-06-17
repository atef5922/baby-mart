import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/types/commerce";

export function ProductGrid({
  products,
  compact = false,
  cardVariant = "default"
}: {
  products: Product[];
  compact?: boolean;
  cardVariant?: "default" | "home";
}) {
  const gridClass = cardVariant === "home" ? "grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-5 2xl:grid-cols-5";

  return (
    <div className={`grid ${gridClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} cardVariant={cardVariant} />
      ))}
    </div>
  );
}
