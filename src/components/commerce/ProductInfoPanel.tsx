import { Check, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/commerce";

export function ProductInfoPanel({ product }: { product: Product }) {
  const isInStock = product.stock > 0;
  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const colorVariants = product.colorVariants?.slice(0, 4) ?? [];

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border-[#FFD4E2] bg-[#FFF1F6] text-[#FF3366]">{product.brand}</Badge>
          <Badge className="border-slate-200 bg-white text-slate-600">{product.category.replaceAll("-", " ")}</Badge>
          <Badge className={isInStock ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-500"}>
            {isInStock ? `${product.stock} in stock` : "Out of stock"}
          </Badge>
        </div>

        <h1 className="mt-4 text-[2rem] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-[2.6rem]">
          {product.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF1F6] px-3 py-1.5 font-semibold text-[#FF3366]">
            <Star size={16} className="fill-current" />
            {product.rating.toFixed(1)}
          </div>
          <span>{product.reviewCount} verified reviews</span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
          <span>Official Baby Mart selection</span>
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <div className="text-4xl font-black tracking-[-0.04em] text-[#FF3366]">{formatPrice(product.price)}</div>
          {product.oldPrice ? <div className="pb-1 text-lg font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</div> : null}
          {savings > 0 ? (
            <div className="rounded-full border border-[#D7F3E6] bg-[#F2FFF8] px-3 py-1 text-sm font-semibold text-emerald-700">
              Save {formatPrice(savings)}
            </div>
          ) : null}
        </div>

        {colorVariants.length ? (
          <div className="mt-5 flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Colors</span>
            <div className="flex items-center gap-2">
              {colorVariants.map((swatch, index) => (
                <span
                  key={`${product.id}-detail-swatch-${index}`}
                  className="h-5 w-5 rounded-full border border-white ring-1 ring-slate-200"
                  style={{ backgroundColor: swatch }}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-5">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Why parents pick this</div>
          <div className="mt-3 grid gap-3">
            {product.features.slice(0, 5).map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#FFF1F6] text-[#FF3366]">
                  <Check size={12} />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ServiceCard icon={Truck} title="Fast Delivery" text="Dhaka and nationwide delivery support with live tracking readiness." accent="rose" />
        <ServiceCard icon={ShieldCheck} title={product.warranty} text="Original product with service-friendly support structure." accent="sky" />
        <ServiceCard icon={Sparkles} title="Parent Approved" text="Curated for comfort, safety, and everyday baby use." accent="mint" />
      </div>

      <ProductPurchasePanel product={product} />
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  text,
  accent
}: {
  icon: typeof Truck;
  title: string;
  text: string;
  accent: "rose" | "sky" | "mint";
}) {
  const accentClass =
    accent === "rose"
      ? "bg-[#FFF2F7] text-[#FF3366] border-[#FFD7E4]"
      : accent === "sky"
        ? "bg-[#EFF7FF] text-sky-700 border-sky-200"
        : "bg-[#EEFFF8] text-emerald-700 border-emerald-200";

  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-4">
      <div className={`grid h-10 w-10 place-items-center rounded-[14px] border ${accentClass}`}>
        <Icon size={18} />
      </div>
      <div className="mt-3 text-sm font-bold text-slate-900">{title}</div>
      <div className="mt-1 text-sm leading-6 text-slate-500">{text}</div>
    </div>
  );
}
