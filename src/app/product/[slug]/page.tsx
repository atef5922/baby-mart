import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Star, Truck, Video, View } from "lucide-react";
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";
import { getProductBySlug, getRelatedProducts } from "@/services/catalogService";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product.category, product.id);

  return (
    <Container className="py-8">
      <div className="text-sm text-slate-500">Home / {product.category.replaceAll("-", " ")} / {product.name}</div>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 md:grid-cols-[90px_1fr]">
          <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:grid md:overflow-visible">
            {[...product.gallery, product.image].slice(0, 4).map((image, index) => (
              <div key={`${image}-${index}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
                <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" sizes="80px" />
              </div>
            ))}
          </div>
          <Card className="order-1 relative min-h-[520px] overflow-hidden md:order-2">
            <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 hover:scale-105" priority />
            <div className="absolute left-5 top-5 flex gap-2">
              {product.discount ? <Badge className="border-red-200 bg-red-50 text-red-600">-{product.discount}%</Badge> : null}
              {product.badge ? <Badge>{product.badge}</Badge> : null}
            </div>
            <div className="absolute bottom-5 left-5 flex gap-2">
              <Button variant="outline"><Video size={16} /> Video Preview</Button>
              <Button variant="outline"><View size={16} /> 360 View</Button>
            </div>
          </Card>
        </div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{product.brand}</Badge>
            <Badge className="border-green-200 bg-green-50 text-green-700">In Stock</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star className="fill-[#D4A853] text-[#D4A853]" size={18} />
            <b>{product.rating}</b>
            <span className="text-slate-500">({product.reviewCount} Reviews)</span>
          </div>
          <div className="mt-6 flex items-end gap-3">
            <div className="text-4xl font-black text-[#07111F]">{formatPrice(product.price)}</div>
            {product.oldPrice ? <div className="text-lg text-slate-400 line-through">{formatPrice(product.oldPrice)}</div> : null}
          </div>
          {product.oldPrice && product.discount ? (
            <div className="mt-2 text-sm font-semibold text-green-600">You save {formatPrice(product.oldPrice - product.price)} ({product.discount}%)</div>
          ) : null}
          <div className="mt-6 grid gap-3">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-sm">
                <Check className="text-green-600" size={18} /> {feature}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Info icon={Truck} title="Free Delivery" text="On orders above Tk 15,000" />
            <Info icon={ShieldCheck} title={product.warranty} text="Official service support" />
            <Info icon={Check} title="7 Days Return" text="No questions asked" />
          </div>
          <ProductPurchasePanel product={product} />
        </div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card className="p-6">
          <div className="flex gap-6 border-b border-slate-100 text-sm font-semibold">
            {["Description", "Specifications", "Reviews", "Q&A", "Shipping & Returns"].map((tab, index) => (
              <span key={tab} className={`pb-3 ${index === 0 ? "border-b-2 border-[#D4A853] text-[#9a6d21]" : "text-slate-500"}`}>{tab}</span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            The {product.name} brings premium performance, dependable warranty support, and modern design into one buying experience. It is prepared for backend-driven inventory, reviews, questions, and fulfillment updates.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between rounded-md bg-slate-50 p-3 text-sm">
                <span className="text-slate-500">{key}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Ratings Breakdown</h2>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="mt-4 flex items-center gap-3 text-sm">
              <span>{rating}★</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#D4A853]" style={{ width: `${rating * 17}%` }} /></div>
              <span className="text-slate-500">{rating * 18}</span>
            </div>
          ))}
        </Card>
      </div>
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-semibold">Frequently Bought Together</h2>
        <ProductGrid products={related.length ? related : products.slice(0, 4)} />
      </section>
    </Container>
  );
}

function Info({ icon: Icon, title, text }: { icon: typeof Truck; title: string; text: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <Icon className="text-[#D4A853]" size={20} />
      <div className="mt-2 text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{text}</div>
    </div>
  );
}
