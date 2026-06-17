import { BrandMarqueeSection } from "@/components/commerce/BrandMarqueeSection";
import { Container } from "@/components/layout/Container";

export const metadata = { title: "Brands" };

export default function BrandsPage() {
  return (
    <>
      <Container className="py-10">
        <h1 className="text-3xl font-semibold tracking-normal text-[#07111F]">Featured Brands</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Explore authorized baby care partners with original products, safety certifications, and premium shopping flows.
        </p>
      </Container>
      <BrandMarqueeSection />
    </>
  );
}
