import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { faqs } from "@/data/site";

export const metadata = {
  title: "About Us",
  description: "Learn about Baby Mart's mission, sourcing standards, and child-safe product focus."
};

export default function AboutUsPage() {
  return (
    <Container className="py-8">
      <div className="grid gap-8">
        <section className="grid gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#ff2d55]">Who We Are</p>
          <h1 className="text-4xl font-semibold tracking-normal">About Baby Mart</h1>
          <p className="max-w-4xl text-sm leading-7 text-slate-600">
            Baby Mart is built for parents who care deeply about quality. We curated a modern catalog of trusted baby and kids essentials so families can shop confidently
            with product safety, comfort, and practical value in mind.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              To make premium, safe, and well-vetted baby products easy to discover through a clean shopping experience designed for real families.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Product Quality</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              We prioritize trusted brands, skin-safe materials, and category experts who focus on durability, comfort, and long-term usage.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Support You Can Trust</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Every listing is prepared for easy filtering by brand, style, and category, making it simple to find what fits your child and budget.
            </p>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">What we deliver</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              <li>Fast, organized browsing using a live catalog experience.</li>
              <li>Backend-ready product structure prepared for production integration.</li>
              <li>Responsive UI with clear filters, categories, and product details.</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Common Questions</h2>
            <div className="mt-4 space-y-4">
              {faqs.slice(0, 3).map((faq) => (
                <div key={faq.q}>
                  <h3 className="text-sm font-semibold text-slate-800">{faq.q}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
