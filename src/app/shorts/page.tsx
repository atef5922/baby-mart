import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { babyBrands } from "@/data/brands";

export const metadata = {
  title: "Shorts Collection",
  description: "Dedicated shorts selection with shop-like filtering and sorting."
};

const hasShortsTag = (value: string) => ["shorts", "short", "shorts set", "short set"].includes(value);

export default async function ShortsPage({
  searchParams
}: {
  searchParams?: Promise<{ brand?: string }>;
}) {
  const params = await searchParams;
  const activeBrandSlug = params?.brand ? decodeURIComponent(params.brand).toLowerCase() : "";
  const activeBrandMeta = babyBrands.find((brand) => brand.slug === activeBrandSlug);
  const activeBrand = activeBrandMeta?.name ?? "";

  const visibleProducts = products.filter((product) => {
    const tags = product.tags.map((tag) => tag.toLowerCase());
    const matchesType = tags.some((tag) => hasShortsTag(tag)) || product.name.toLowerCase().includes("short");
    const matchesBrand = !activeBrand || product.brand.toLowerCase() === activeBrand.toLowerCase();
    return matchesType && matchesBrand;
  });

  return (
    <Container className="py-8">
      <CatalogExplorer
        products={visibleProducts}
        title="Shorts"
        subtitle="Explore practical baby shorts collections with search, sort, and category-level filtering."
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
