import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { babyBrands } from "@/data/brands";

export const metadata = {
  title: "Kids Products",
  description: "Curated kids baby products with live search, sorting, and filter behavior like shop."
};

const kidsCategorySlugs = ["diapers", "clothing", "feeding", "toys", "safety", "baby-gear", "bath-care", "learning", "nursery-furniture", "bedding"];

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
        subtitle="Shop baby and kids essentials in one place with live filters, sorting, and brand-aware selection."
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
