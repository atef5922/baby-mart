"use client";

import Image from "next/image";
import { Video, View } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import type { Product } from "@/types/commerce";

export function ProductGallery({ product }: { product: Product }) {
  const galleryImages = useMemo(() => Array.from(new Set([product.image, ...product.gallery].filter(Boolean))), [product.gallery, product.image]);
  const [activeImage, setActiveImage] = useState(() => galleryImages[0] ?? product.image);

  return (
    <div className="grid gap-4 lg:grid-cols-[92px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto pb-1 lg:order-1 lg:grid lg:overflow-visible lg:pb-0">
        {galleryImages.map((image, index) => {
          const active = activeImage === image;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActiveImage(image)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[18px] border bg-white transition duration-200 ${
                active ? "border-[#FF4F8A] ring-2 ring-[#FFE0EA]" : "border-slate-200 hover:border-[#FFB3CC]"
              }`}
            >
              <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-contain p-2" sizes="80px" />
            </button>
          );
        })}
      </div>

      <div className="order-1 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-4 lg:order-2">
        <div className="relative overflow-hidden rounded-[24px] bg-[#F8FAFC] px-5 py-6 sm:px-7 sm:py-8">
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            {product.discount ? <Badge className="border-rose-200 bg-white text-[#FF3366]">-{product.discount}%</Badge> : null}
            {product.badge ? <Badge className="border-slate-200 bg-white text-slate-600">{product.badge}</Badge> : null}
          </div>

          <div className="relative min-h-[260px] sm:min-h-[420px] lg:min-h-[520px]">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 48vw, 92vw"
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-[#FFB3CC] hover:text-[#FF3366] sm:px-4"
            >
              <Video size={16} />
              Video Preview
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[12px] border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-[#FFB3CC] hover:text-[#FF3366] sm:px-4"
            >
              <View size={16} />
              360 View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
