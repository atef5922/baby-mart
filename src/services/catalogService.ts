import { categories, products } from "@/data/catalog";
import type { CategorySlug } from "@/types/commerce";

export interface ProductQuery {
  category?: CategorySlug;
  brand?: string;
  min?: number;
  max?: number;
  search?: string;
  sort?: "latest" | "popular" | "price-asc" | "price-desc" | "rating" | "best-selling";
}

export function getProducts(query: ProductQuery = {}) {
  let result = [...products];
  if (query.category) result = result.filter((product) => product.category === query.category);
  if (query.brand) result = result.filter((product) => product.brand === query.brand);
  if (query.min) result = result.filter((product) => product.price >= query.min!);
  if (query.max) result = result.filter((product) => product.price <= query.max!);
  if (query.search) {
    const needle = query.search.toLowerCase();
    result = result.filter((product) => `${product.name} ${product.brand} ${product.tags.join(" ")}`.toLowerCase().includes(needle));
  }
  if (query.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (query.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (query.sort === "rating") result.sort((a, b) => b.rating - a.rating);
  if (query.sort === "popular" || query.sort === "best-selling") result.sort((a, b) => b.reviewCount - a.reviewCount);
  return result;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getRelatedProducts(category: CategorySlug, productId?: string, limit = 8) {
  const primary = products.filter((product) => product.category === category && product.id !== productId);
  const fallback = products.filter((product) => product.category !== category && product.id !== productId);

  return [...primary, ...fallback].slice(0, limit);
}
