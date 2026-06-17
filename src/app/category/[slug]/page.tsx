import Image from "next/image";
import { notFound } from "next/navigation";
import { CatalogExplorer } from "@/components/commerce/CatalogExplorer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { categories } from "@/data/catalog";
import { getCategoryBySlug, getProducts } from "@/services/catalogService";

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const items = getProducts({ category: category.slug });

  return (
    <Container className="py-8">
      <section className="relative overflow-hidden rounded-lg bg-[#07111F] text-white">
        <Image src={category.image} alt={category.name} fill className="object-cover opacity-35" priority />
        <div className="relative z-10 max-w-3xl p-8 md:p-12">
          <Badge className="border-white/15 bg-white/10 text-[#F8DEAA]">Premium Category</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal md:text-6xl">{category.name}</h1>
          <p className="mt-4 text-base leading-7 text-slate-200">{category.description}</p>
        </div>
      </section>
      <div className="mt-6">
        <CatalogExplorer
          products={items.length ? items : getProducts().slice(0, 4)}
          title={`Featured ${category.name}`}
          subtitle="Search, sort, and refine this category with live filters while keeping the buying flow premium and backend-ready."
          lockedCategory={category.slug}
        />
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Buying Guide</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{category.guide}</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Category FAQ</h2>
          <details className="mt-4 rounded-md border border-slate-200 p-4">
            <summary className="cursor-pointer font-semibold">How do I choose the right {category.name.toLowerCase()}?</summary>
            <p className="mt-3 text-sm leading-6 text-slate-600">Compare capacity, power use, warranty, installation needs, and verified reviews before checkout.</p>
          </details>
        </Card>
      </div>
    </Container>
  );
}
