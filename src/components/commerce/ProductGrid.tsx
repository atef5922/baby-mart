import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/types/commerce";

export function ProductGrid({
  products,
  compact = false,
  cardVariant = "home"
}: {
  products: Product[];
  compact?: boolean;
  cardVariant?: "default" | "home";
}) {
  const gridClass = cardVariant === "home" ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5";

  return (
    <div className={`grid ${gridClass}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} cardVariant={cardVariant} />
      ))}
    </div>
  );
}
