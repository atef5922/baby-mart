import { Star } from "lucide-react";
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

      </div>

      <ProductPurchasePanel product={product} />
    </div>
  );
}
