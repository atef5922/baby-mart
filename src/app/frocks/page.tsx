import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { babyBrands } from "@/data/brands";

export const metadata = {
  title: "Frocks Collection",
  description: "Dedicated collection of baby and kids frocks with filters and sorting."
};

export default async function FrocksPage({
  searchParams
}: {
  searchParams?: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const activeBrandSlug = params?.brand ? decodeURIComponent(params.brand).toLowerCase() : "";
  const activeBrandMeta = babyBrands.find((brand) => brand.slug === activeBrandSlug);
  const activeBrand = activeBrandMeta?.name ?? "";

  const visibleProducts = products.filter(
    (product) => product.category === "frocks" && (!activeBrand || product.brand.toLowerCase() === activeBrand.toLowerCase())
  );

  return (
    <Container className="py-8">
      <CatalogExplorer
        products={visibleProducts}
        title="Frocks"
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
