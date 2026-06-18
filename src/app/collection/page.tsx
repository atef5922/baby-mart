import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { babyBrands } from "@/data/brands";

export const metadata = {
  title: "Collection",
  description: "Browse premium baby collection products with search, category, sort, and filter capabilities."
};

export default async function CollectionPage({
  searchParams
}: {
  searchParams?: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const activeBrandSlug = params?.brand ? decodeURIComponent(params.brand).toLowerCase() : "";
  const activeBrandMeta = babyBrands.find((brand) => brand.slug === activeBrandSlug);
  const activeBrand = activeBrandMeta?.name ?? "";
  const highlightedProducts = products.filter((product) => product.isBestSeller || product.tags.includes("highlighted") || product.tags.includes("crazy-collection"));
  const visibleProducts = activeBrand
    ? highlightedProducts.filter((product) => product.brand.toLowerCase() === activeBrand.toLowerCase())
    : highlightedProducts;

  return (
    <Container className="py-8">
      <CatalogExplorer
        products={visibleProducts}
        title="Collection"
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
