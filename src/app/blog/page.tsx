import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { categories } from "@/data/catalog";

export const metadata = {
  title: "Buying Guides",
  description: "Baby Mart buying guides for baby food, diapers, skin care, frocks, kids dress, shorts, and toys."
};

const featuredGuides = [
  {
    title: "How to choose original baby food in Bangladesh",
    text: "Check stage, pack size, sealed condition, age suitability, and trusted Bangladesh-market listings before adding to cart.",
    image: "/products/bd/cerelac-wheat-apple-cherry-350g.webp",
    href: "/category/baby-food"
  },
  {
    title: "Diaper buying checklist for daily comfort",
    text: "Pick the right size, pant style, absorbency, and pack count so your baby stays dry without unnecessary bulk.",
    image: "/products/bd/savlon-twinkle-pant-m-50.webp",
    href: "/category/pampers"
  },
  {
    title: "Kidswear that feels soft and looks polished",
    text: "Choose breathable fabrics, easy waistbands, and occasion-ready styling for frocks, shorts, and everyday outfits.",
    image: "/products/kids%20dress/kids11_e392b641-3589-4512-81ea-5e7f54f6e199_600x.webp",
    href: "/kids"
  }
];

export default function BlogPage() {
  return (
    <Container className="py-8">
      <div className="grid gap-9">
        <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_52px_rgba(7,17,31,0.08)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd7e2] bg-[#fff1f3] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#ff2d55]">
                <BookOpen size={14} />
                Parenting Guide
              </div>
              <h1 className="mt-5 bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text text-[2.4rem] font-black leading-[1.02] tracking-normal text-transparent sm:text-[3.4rem]">
                Baby Mart Buying Guides
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                Practical product guidance for parents shopping baby food, diapers, skincare, clothing, toys, and daily baby essentials.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <CalendarDays size={18} className="text-[#ff2d55]" />
              Updated for Baby Mart catalog
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {featuredGuides.map((guide) => (
            <Link key={guide.title} href={guide.href} className="group block">
              <Card className="h-full overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(7,17,31,0.12)]">
                <div className="relative aspect-[4/3] bg-slate-50">
                  <Image src={guide.image} alt={guide.title} fill className="object-contain p-6 transition duration-250 group-hover:scale-105" sizes="(min-width: 1024px) 31vw, 92vw" />
                </div>
                <div className="p-6">
                  <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#ff2d55]">
                    <Sparkles size={13} />
                    Featured
                  </div>
                  <h2 className="text-xl font-black leading-7 text-[#07111F]">{guide.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{guide.text}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#ff2d55]">
                    Read Guide <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-black text-[#07111F]">Shop By Guide</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`} className="group block">
                <Card className="h-full overflow-hidden p-4 transition duration-200 hover:-translate-y-1 hover:border-[#ff2d55]/30 hover:shadow-[0_20px_56px_rgba(7,17,31,0.11)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50">
                    <Image src={category.image} alt={`${category.name} guide`} fill className="object-contain p-4 transition duration-250 group-hover:scale-105" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#07111F]">{category.name} Guide</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{category.guide}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
