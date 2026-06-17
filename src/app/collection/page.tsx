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
  const visibleProducts = activeBrand
    ? products.filter((product) => product.brand.toLowerCase() === activeBrand.toLowerCase())
    : products;

  return (
    <Container className="py-8">
      <CatalogExplorer
        products={visibleProducts}
        title="Collection"
        subtitle="Browse collection products with live filters, sorting, and search exactly like shop." 
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
