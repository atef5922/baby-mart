import { FlashSale } from "@/components/home/FlashSale";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";

export const metadata = { title: "Deals" };

export default function DealsPage() {
  return (
    <>
      <FlashSale />
      <Container className="py-8">
        <h1 className="mb-5 text-3xl font-semibold tracking-normal">Exclusive Deals</h1>
        <ProductGrid products={products} />
      </Container>
    </>
  );
}
