import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { babyBrands } from "@/data/brands";

export const metadata = {
  title: "Kids Products",
  description: "Curated kids baby products with live search, sorting, and filter behavior like shop."
};

const kidsCategorySlugs = ["frocks", "kids-dress", "shorts", "toys"];

export default async function KidsPage({
  searchParams
}: {
  searchParams?: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const activeBrandSlug = params?.brand ? decodeURIComponent(params.brand).toLowerCase() : "";
  const activeBrandMeta = babyBrands.find((brand) => brand.slug === activeBrandSlug);
  const activeBrand = activeBrandMeta?.name ?? "";

  const visibleProducts = products.filter((product) =>
    kidsCategorySlugs.includes(product.category) && (!activeBrand || product.brand.toLowerCase() === activeBrand.toLowerCase())
  );

  return (
    <Container className="py-8">
      <CatalogExplorer
        products={visibleProducts}
        title="Kids Collection"
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
