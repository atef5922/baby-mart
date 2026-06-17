import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { babyBrands } from "@/data/brands";

export const metadata = {
  title: "Frocks Collection",
  description: "Dedicated collection of baby and kids frocks with filters and sorting."
};

const hasFrockTag = (value: string) => ["frock", "frocks", "frocks set", "frock set"].includes(value);

export default async function FrocksPage({
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
    const matchesType = tags.some((tag) => hasFrockTag(tag)) || product.name.toLowerCase().includes("frock");
    const matchesBrand = !activeBrand || product.brand.toLowerCase() === activeBrand.toLowerCase();
    return matchesType && matchesBrand;
  });

  return (
    <Container className="py-8">
      <CatalogExplorer
        products={visibleProducts}
        title="Frocks"
        subtitle="Browse soft and stylish baby frocks with full shop-style search, sorting, and filter behavior."
        initialBrand={activeBrand}
        productCardMode="home"
      />
    </Container>
  );
}
