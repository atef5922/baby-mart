import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://babymart.com";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/shop`, lastModified: new Date() },
    ...categories.map((category) => ({ url: `${base}/category/${category.slug}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${base}/product/${product.slug}`, lastModified: new Date() }))
  ];
}
