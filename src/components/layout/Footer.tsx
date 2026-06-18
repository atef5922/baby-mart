import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, MapPin, MessageCircle, Phone, Radio } from "lucide-react";
import { categories, newArrivalsLogo } from "@/data/catalog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#07111F] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#EF8A9B] to-transparent" />
      <Container className="grid gap-8 py-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_0.9fr_1.25fr]">
        <div>
          <Image src={newArrivalsLogo} alt="Baby Mart logo" width={320} height={96} className="h-[70px] w-auto object-contain" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Premium baby clothing, diapers, feeding essentials, and toys from certified international brands.
            <br />
            <span className="mt-2 block font-semibold text-[#EF8A9B]">Baby Mart - Caring for Every Little Smile</span>
          </p>
          <div className="mt-6 flex gap-3 text-[#EF8A9B]">
            {[Globe2, MessageCircle, Radio].map((Icon, index) => (
              <Link
                key={index}
                href={index === 0 ? "/contact" : index === 1 ? "/orders" : "/blog"}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[#EF8A9B] transition hover:border-[#FF3366] hover:bg-[#FF3366] hover:text-white"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#EF8A9B]">Baby Care</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            {categories.slice(0, 6).map((category) => (
              <Link key={category.slug} href={`/category/${category.slug}`}>{category.name}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#EF8A9B]">Customer Support</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            {["About Us", "Contact Us", "Shipping Info", "Returns Policy", "FAQs", "Terms of Service"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#EF8A9B]">Parenting Guide</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            {["Newborn Checklist", "Diapering Tips", "Feeding Guide", "Safety Measures", "Travel Essentials", "Product Compare"].map((item) => (
              <Link key={item} href={item === "Product Compare" ? "/shop" : "/blog"}>{item}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#EF8A9B]">Stay Updated</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">Get baby discounts, new arrivals, and parenting guides.</p>
          <form action="/contact" className="mt-4 flex flex-col gap-2 xl:flex-row">
            <Input name="email" type="email" required placeholder="Email address" className="border-white/10 bg-white/10 text-white placeholder:text-slate-400" />
            <Button type="submit" variant="outline" className="rounded-md !border-transparent !bg-[#FF3366] !text-white hover:!bg-black hover:!text-white">Join</Button>
          </form>
          <div className="mt-5 grid gap-2 text-sm text-slate-300">
            <span className="flex items-center gap-2"><MapPin size={16} /> Gulshan, Dhaka</span>
            <span className="flex items-center gap-2"><Phone size={16} /> +880 1700-000000</span>
            <span className="flex items-center gap-2"><Mail size={16} /> care@babymart.com</span>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">&copy; 2026 Baby Mart. Caring for Every Little Smile.</div>
    </footer>
  );
}
