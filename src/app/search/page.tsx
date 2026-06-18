import Link from "next/link";
import { Search } from "lucide-react";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";
import { categories, products } from "@/data/catalog";

export const metadata = {
  title: "Search",
  description: "Premium instant search experience with suggestions, popular searches, recent searches, categories, products, history, and empty states."
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q?.trim() ?? "";
  const normalized = query.toLowerCase();

  const filteredProducts = normalized
    ? products.filter((product) =>
        [
          product.name,
          product.brand,
          product.category,
          ...product.tags
        ].some((field) => field.toLowerCase().includes(normalized))
      )
    : products.slice(0, 8);

  const matchingCategories = normalized
    ? categories.filter((category) =>
        [category.name, category.description, category.slug].some((field) => field.toLowerCase().includes(normalized))
      )
    : categories.slice(0, 4);

  const helperTags = query
    ? [query, ...matchingCategories.slice(0, 3).map((category) => category.name)]
    : ["Baby Food", "Kids Dress", "Frocks", "Pampers"];

  return (
    <Container className="py-8">
      <Card className="p-6">
        <h1 className="text-3xl font-semibold tracking-normal">Search Baby Mart</h1>
        <form action="/search" className="relative mt-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            name="q"
            defaultValue={query}
            placeholder="Search baby food, frocks, kids dress, pampers..."
            className="h-12 rounded-xl pl-10 pr-32"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#07111F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#10243C] hover:text-[#F8DEAA]"
          >
            Search
          </button>
        </form>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <SearchBox title="Popular Searches" items={helperTags} />
          <SearchBox title="Relevant Categories" items={matchingCategories.map((category) => category.name)} />
          <SearchBox title="Quick Filters" items={["EMI", "Warranty", "Best Seller", "New Arrival"]} />
        </div>
      </Card>

      <section className="mt-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Product Results</h2>
            <p className="mt-1 text-sm text-slate-500">
              {query
                ? `${filteredProducts.length} result${filteredProducts.length === 1 ? "" : "s"} found for "${query}".`
                : "Showing popular baby product searches."}
            </p>
          </div>
        </div>
        {filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="mt-2 text-sm text-slate-500">
              Try a different spelling, browse categories, or search for baby food, frocks, kids dress, pampers, shorts, or toys.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#fff8ea] hover:text-[#7a5616]"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </Card>
        )}
      </section>
    </Container>
  );
}

function SearchBox({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-semibold">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item}
            href={`/search?q=${encodeURIComponent(item)}`}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-[#fff8ea] hover:text-[#7a5616]"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
