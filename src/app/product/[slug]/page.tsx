import { ChevronRight } from "lucide-react";
import { FrequentlyBoughtSlider } from "@/components/commerce/FrequentlyBoughtSlider";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { ProductInfoPanel } from "@/components/commerce/ProductInfoPanel";
import { ProductTabs } from "@/components/commerce/ProductTabs";
import { RatingBreakdown } from "@/components/commerce/RatingBreakdown";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { getProductBySlug, getRelatedProducts } from "@/services/catalogService";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.category, product.id, 8);

  return (
    <div className="bg-white">
      <Container className="py-8 lg:py-10">
        <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="capitalize">{product.category.replaceAll("-", " ")}</span>
          <ChevronRight size={14} />
          <span className="font-medium text-slate-700">{product.name}</span>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="min-w-0">
            <ProductGallery product={product} />
          </div>
          <div className="min-w-0">
            <ProductInfoPanel product={product} />
          </div>
        </div>

        <div className="mt-8 rounded-[28px] bg-slate-50 px-4 py-5 sm:px-5 sm:py-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <ProductTabs product={product} />
            <RatingBreakdown product={product} />
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <FrequentlyBoughtSlider products={related} />
        </div>
      </Container>
    </div>
  );
}
