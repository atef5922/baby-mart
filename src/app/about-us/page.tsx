import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, HeartHandshake, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { faqs, trustBadges } from "@/data/site";

export const metadata = {
  title: "About Us",
  description: "Learn about Baby Mart's mission, sourcing standards, and child-safe product focus."
};

const values = [
  {
    icon: ShieldCheck,
    title: "Original Products",
    text: "We focus on verified baby essentials from trusted Bangladesh-market and international baby-care brands."
  },
  {
    icon: HeartHandshake,
    title: "Parent-First Support",
    text: "Our shopping flow is designed around real parent needs: safety, clear category browsing, and dependable help."
  },
  {
    icon: Award,
    title: "Quality Checked",
    text: "Every featured product is prepared with matched title, image, price, category, and retail-ready details."
  }
];

export default function AboutUsPage() {
  return (
    <Container className="py-8">
      <div className="grid gap-10">
        <section className="grid gap-8 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_18px_52px_rgba(7,17,31,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:px-10">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ffd7e2] bg-[#fff1f3] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#ff2d55]">
              <Sparkles size={14} />
              Premium Baby Care
            </div>
            <h1 className="mt-5 max-w-3xl bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text text-[2.45rem] font-black leading-[1.02] tracking-normal text-transparent sm:text-[3.6rem]">
              About Baby Mart
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Baby Mart is built for families who want safe, beautiful, and reliable baby products without confusion. We bring together baby food, skin care, diapers, frocks, kidswear, shorts, and toys in a polished shopping experience.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="rounded-md !border-transparent !bg-[#FF3366] !text-white hover:!bg-[#07111F] hover:!text-white">
                <Link href="/shop">Shop Products <ArrowRight size={16} /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[320px] bg-[linear-gradient(135deg,#fff1f3_0%,#fff8ea_52%,#eef7ff_100%)]">
            <Image
              src="/products/welcomebanner.png"
              alt="Baby Mart premium baby products"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 92vw"
              priority
            />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {values.map((item) => (
            <Card key={item.title} className="p-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(7,17,31,0.12)]">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff1f3] text-[#ff2d55]">
                <item.icon size={22} />
              </div>
              <h2 className="mt-5 text-xl font-black text-[#07111F]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] bg-[linear-gradient(135deg,#07111F,#17243A)] p-6 text-white shadow-[0_24px_72px_rgba(7,17,31,0.22)] sm:p-8">
            <div className="flex items-center gap-3 text-[#F8DEAA]">
              <Truck size={22} />
              <span className="text-sm font-black uppercase tracking-[0.16em]">Why Parents Choose Us</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-normal">A cleaner way to shop baby essentials.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The catalog is organized for fast decisions: matched images, clear pricing, brand-aware browsing, wishlist, cart, quick view, and category pages ready for backend integration.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustBadges.slice(0, 4).map((badge) => (
                <div key={badge.title} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <badge.icon className="text-[#F8DEAA]" size={20} />
                  <div className="mt-3 text-sm font-bold">{badge.title}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-300">{badge.text}</div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl font-black text-[#07111F]">Common Questions</h2>
            <div className="mt-5 divide-y divide-slate-100">
              {faqs.map((faq) => (
                <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="text-sm font-black text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
