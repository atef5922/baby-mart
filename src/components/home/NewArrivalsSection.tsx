"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import { Check, Heart, Eye, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { newArrivalsLogo } from "@/data/catalog";
import type { Product } from "@/types/commerce";

interface NewArrivalsSectionProps {
  products: Product[];
}

const paletteBank = [
  ["#ef4444", "#f97316", "#22c55e"],
  ["#8b5cf6", "#ec4899", "#0ea5e9"],
  ["#14b8a6", "#10b981", "#f59e0b"],
  ["#fb7185", "#818cf8", "#22c55e"],
  ["#f97316", "#f43f5e", "#3b82f6"]
];

const getPalette = (product: Product) => {
  const seed = product.id.split("").reduce((sum, char) => (sum + char.charCodeAt(0)) % paletteBank.length, 0);
  return paletteBank[seed % paletteBank.length];
};

function ActionIconButton({
  label,
  onClick,
  active,
  children
}: {
  label: string;
  onClick: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group/icon relative grid h-8 w-8 flex-none place-items-center rounded-full border border-slate-200 bg-white text-[#111827] transition-transform duration-250 ease-in-out shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:scale-105 hover:border-[#7c3aed] hover:text-[#7c3aed] hover:shadow-[0_10px_24px_rgba(124,58,237,0.2)] ${
        active ? "border-[#7c3aed] bg-[#F5F3FF] text-[#7c3aed]" : ""
      }`}
    >
      {children}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full bg-[#111827] px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-[0_10px_24px_rgba(7,17,31,0.24)] transition duration-200 group-hover/icon:opacity-100">
        {label}
      </span>
    </button>
  );
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  const [activeQuickProduct, setActiveQuickProduct] = useState<Product | null>(null);
  const [activeSwatch, setActiveSwatch] = useState<Record<string, string>>({});

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wishlist = useCartStore((state) => state.wishlist);
  const lines = useCartStore((state) => state.lines);

  const visibleProducts = useMemo(() => products.slice(0, 8), [products]);

  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 sm:px-6">
        <div className="mb-8 flex w-full flex-col items-center gap-3 text-center sm:mb-10">
          <div className="flex items-center justify-center">
            <Image
              src={newArrivalsLogo}
              alt="Baby Mart logo"
              width={186}
              height={58}
              className="h-10 w-auto max-w-[186px] shrink-0 object-contain sm:h-12"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#94A3B8]">
            <span aria-hidden className="text-[#94A3B8]">&bull;</span>
            Just in now
            <span aria-hidden className="text-[#94A3B8]">&bull;</span>
          </div>
          <h2 className="font-['Inter',_'Poppins',_sans-serif] text-[2rem] font-bold leading-[1.02] tracking-[-0.03em] text-transparent bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text sm:text-[2.7rem]">New Arrivals</h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => {
            const palette = getPalette(product);
            const inCart = lines.some((line) => line.product.id === product.id);
            const wished = wishlist.includes(product.id);
            const selected = activeSwatch[product.id] ?? palette[0];

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
                className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[14px] border border-slate-200/90 bg-white p-3 shadow-[0_4px_8px_rgba(0,0,0,0.06)] transition duration-250 ease-in-out hover:scale-[1.02] hover:shadow-[0_12px_34px_rgba(0,0,0,0.14)]"
              >
                <Link href={`/product/${product.slug}`} className="block" aria-label={`Open ${product.name}`}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] shadow-[0_4px_8px_rgba(0,0,0,0.06)]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition duration-250 group-hover:scale-105"
                      sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, (min-width: 768px) 48vw, 92vw"
                    />
                    {product.discount ? (
                      <span className="absolute left-3 top-3 rounded-full border border-[#ddd6fe] bg-[#7c3aed] px-2.5 py-1 text-xs font-semibold text-white">-{product.discount}%</span>
                    ) : null}
                  </div>
                </Link>

                <div className="mt-4 flex flex-1 flex-col">
                  <Link
                    href={`/product/${product.slug}`}
                    className="line-clamp-2 font-medium font-['Inter'] text-[1.04rem] leading-6 tracking-tight text-[#111827] transition duration-250 hover:text-[#7c3aed]"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs font-normal text-slate-400">{product.category}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[1.35rem] font-black leading-none text-[#7c3aed]">{formatPrice(product.price)}</span>
                    {product.oldPrice ? (
                      <span className="pb-0.5 text-sm font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {palette.map((swatch) => (
                      <button
                        type="button"
                        key={`${product.id}-${swatch}`}
                        aria-label={`Select color ${swatch}`}
                        onClick={() =>
                          setActiveSwatch((prev) => ({
                            ...prev,
                            [product.id]: swatch
                          }))
                        }
                        className={`h-4 w-4 rounded-full border transition hover:scale-110 ${selected === swatch ? "scale-110 ring-2 ring-[#7c3aed]" : "scale-100 ring-1 ring-white/80"}`}
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-end gap-3">
                    <ActionIconButton
                      label={wished ? "Remove from wishlist" : "Add to wishlist"}
                      active={wished}
                      onClick={() => {
                        toggleWishlist(product.id);
                        toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
                      }}
                    >
                      <Heart size={16} className={wished ? "fill-red-500 text-red-500" : ""} />
                    </ActionIconButton>
                    <ActionIconButton label="Quick view" onClick={() => setActiveQuickProduct(product)}>
                      <Eye size={16} />
                    </ActionIconButton>
                    <ActionIconButton
                      label={inCart ? "Add more to cart" : "Add to cart"}
                      onClick={() => {
                        addToCart(product);
                        toast.success(inCart ? `${product.name} quantity updated` : `${product.name} added to cart`);
                      }}
                    >
                      {inCart ? <Check size={16} className="text-emerald-600" /> : <ShoppingCart size={16} />}
                    </ActionIconButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeQuickProduct ? (
          <motion.div
            key={activeQuickProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-[#07111F]/55 p-4 backdrop-blur-sm"
            onClick={() => setActiveQuickProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="w-full max-w-4xl overflow-hidden rounded-[20px] bg-white shadow-[0_28px_86px_rgba(7,17,31,0.3)] md:grid md:grid-cols-[0.96fr_1.1fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative h-80 bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f8ff_72%,#edf2ff_100%)] md:h-full">
                <Image
                  src={activeQuickProduct.image}
                  alt={activeQuickProduct.name}
                  fill
                  className="object-contain p-8"
                  sizes="(min-width: 1024px) 50vw, 92vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{activeQuickProduct.brand}</div>
                    <h3 className="mt-2 text-2xl font-bold text-[#111827]">{activeQuickProduct.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveQuickProduct(null)}
                    aria-label="Close quick view"
                    className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-2xl font-black text-[#7c3aed]">{formatPrice(activeQuickProduct.price)}</span>
                  {activeQuickProduct.oldPrice ? <span className="pb-0.5 text-sm font-medium text-slate-400 line-through">{formatPrice(activeQuickProduct.oldPrice)}</span> : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {activeQuickProduct.warranty}
                </p>
                <div className="mt-6 grid gap-3">
                  <Button
                    onClick={() => {
                      addToCart(activeQuickProduct);
                      toast.success(`${activeQuickProduct.name} added to cart`);
                    }}
                    className="h-11 bg-[linear-gradient(90deg,#7c3aed,#8b5cf6)] text-white hover:bg-[linear-gradient(90deg,#6d28d9,#7c3aed)]"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/product/${activeQuickProduct.slug}`}>View full details</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

