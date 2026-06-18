"use client";

import { useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/types/commerce";

export function FrequentlyBoughtSlider({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-6">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Frequently Bought Together</div>
        <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">Complete the routine with matching essentials</h2>
      </div>

      <div className="relative mt-6">
        <SliderButton label="Previous products" disabled={!canScrollPrev} onClick={() => emblaApi?.scrollPrev()} className="-left-3 sm:-left-5">
          <ChevronLeft size={18} />
        </SliderButton>
        <SliderButton label="Next products" disabled={!canScrollNext} onClick={() => emblaApi?.scrollNext()} className="-right-3 sm:-right-5">
          <ChevronRight size={18} />
        </SliderButton>

        <div
          className="overflow-hidden"
          ref={emblaRef}
          tabIndex={0}
          aria-label="Frequently bought products carousel"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              emblaApi?.scrollPrev();
            }

            if (event.key === "ArrowRight") {
              event.preventDefault();
              emblaApi?.scrollNext();
            }
          }}
        >
          <div className="flex gap-4">
            {products.map((product) => (
              <div key={product.id} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.5rem)] lg:flex-[0_0_calc(33.333%-0.75rem)] 2xl:flex-[0_0_calc(25%-0.75rem)]">
                <ProductCard product={product} cardVariant="home" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderButton({
  label,
  disabled,
  onClick,
  children,
  className = ""
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_10px_20px_rgba(15,23,42,0.08)] transition hover:border-[#FFB3CC] hover:bg-[#FFF7FA] hover:text-[#FF3366] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
