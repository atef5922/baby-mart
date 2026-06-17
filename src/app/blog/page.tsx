import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { categories } from "@/data/catalog";

export const metadata = { title: "Buying Guides" };

export default function BlogPage() {
  return (
    <Container className="py-8">
      <h1 className="text-3xl font-semibold tracking-normal">Buying Guides</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {categories.slice(0, 6).map((category) => <Card key={category.slug} className="p-6"><h2 className="text-xl font-semibold">{category.name} Guide</h2><p className="mt-3 text-sm leading-6 text-slate-600">{category.guide}</p></Card>)}
      </div>
    </Container>
  );
}
