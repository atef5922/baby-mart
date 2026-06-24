"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Eye, Heart, Scale, ShoppingCart, Star, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/commerce";

const hashColorFromSeed = (seed: string) => {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1_000_000_007;
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 70% 54%)`;
};

const getProductSwatches = (product: Product) => {
  if (product.colorVariants?.length) {
    return product.colorVariants.slice(0, 3);
  }

  const palette = [product.image, ...product.gallery].map((entry, index) => hashColorFromSeed(`${product.id}-${entry}-${index}`));

  if (palette.length >= 3) {
    return palette.slice(0, 3);
  }

  return [
    ...palette,
    hashColorFromSeed(`${product.id}-variant-1`),
    hashColorFromSeed(`${product.id}-variant-2`),
    hashColorFromSeed(`${product.id}-variant-3`)
  ].slice(0, 3);
};

const fallbackImageByCategory: Record<Product["category"], string> = {
  "baby-food": "/products/baby%20food/1752902705.jpg",
  "baby-products": "/products/baby%20product/0_16.jpg",
  "baby-skin-care": "/products/baby%20skin%20care/1761121421.jpg",
  frocks: "/products/frogs/0590000017664.webp",
  "kids-dress": "/products/kids%20dress/kids11_e392b641-3589-4512-81ea-5e7f54f6e199_600x.webp",
  pampers: "/products/pampers/1761122103.jpg",
  shorts: "/products/shorts/download.jpg",
  toys: "/products/toy/0_6.jpeg"
};

export function ProductCard({
  product,
  compact = false,
  cardVariant = "default",
  viewMode = "grid"
}: {
  product: Product;
  compact?: boolean;
  cardVariant?: "default" | "home";
  viewMode?: "grid" | "list";
}) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const toggleCompare = useCartStore((state) => state.toggleCompare);
  const wishlist = useCartStore((state) => state.wishlist);
  const compare = useCartStore((state) => state.compare);
  const lines = useCartStore((state) => state.lines);

  const [quickOpen, setQuickOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const [activeSwatch, setActiveSwatch] = useState(0);

  const wished = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  const inCart = lines.some((line) => line.product.id === product.id);
  const homeCartStyle = cardVariant === "home";
  const homeSwatches = getProductSwatches(product);
  const fallbackImage = fallbackImageByCategory[product.category];
  const displayImage = imageFailed ? fallbackImage : product.image;
  const unoptimizedImage = displayImage.startsWith("http");
  const handleImageError = () => {
    if (imageFailed) {
      setFallbackFailed(true);
      return;
    }

    setImageFailed(true);
  };

  const quickViewModal = quickOpen ? (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#07111F]/55 p-4 backdrop-blur-sm" onClick={() => setQuickOpen(false)}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="grid max-h-[min(92vh,860px)] w-full max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-[0_35px_120px_rgba(7,17,31,0.35)] md:grid-cols-[0.9fr_1.1fr]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-[330px] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f8fafc_78%,#eef3f8_100%)]">
          {fallbackFailed ? (
            <div className="grid h-full place-items-center px-5 text-center text-sm font-semibold text-slate-500">{product.name}</div>
          ) : (
            <Image src={displayImage} alt={product.name} fill className="object-contain p-8" sizes="50vw" unoptimized={unoptimizedImage} onError={handleImageError} />
          )}
        </div>
        <div className="overflow-y-auto p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge>{product.badge ?? "Premium Pick"}</Badge>
              <h3 className="mt-3 text-2xl font-bold text-[#07111F]">{product.name}</h3>
            </div>
            <button
              className="grid h-10 w-10 place-items-center rounded-md hover:bg-slate-100"
              onClick={() => setQuickOpen(false)}
              aria-label="Close quick view"
            >
              <X size={18} />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Star className="fill-[#D4A853] text-[#D4A853]" size={16} />
            {product.rating} rating / {product.reviewCount} reviews
          </div>
          <div className="mt-4 text-3xl font-black text-[#07111F]">{formatPrice(product.price)}</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {product.warranty}. Monthly EMI starts at {formatPrice(product.emiMonthly)}.
          </p>
          <div className="mt-5 grid gap-2">
            {product.features.slice(0, 4).map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                <Check size={16} className="text-[#D4A853]" />
                {feature}
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button
              variant="gold"
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart`);
              }}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
            <Button asChild variant="outline">
              <Link href={`/product/${product.slug}`}>Product Details</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  ) : null;

  if (homeCartStyle) {
    return (
      <>
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="group flex h-full min-h-[420px] flex-col overflow-hidden rounded-[14px] border border-slate-200/90 bg-white p-3 shadow-[0_4px_8px_rgba(0,0,0,0.06)] transition duration-250 ease-in-out hover:shadow-[0_12px_34px_rgba(0,0,0,0.14)]"
        >
          <Link href={`/product/${product.slug}`} className="block" aria-label={`Open ${product.name}`}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px] shadow-[0_4px_8px_rgba(0,0,0,0.06)]">
              {fallbackFailed ? (
                <div className="grid h-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 text-center">
                  <div>
                    <div className="text-sm font-black text-[#07111F]">{product.brand}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">{product.category.replaceAll("-", " ")}</div>
                  </div>
                </div>
              ) : (
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, (min-width: 768px) 48vw, 92vw"
                  className="bg-white object-contain transition duration-250 group-hover:scale-105"
                  unoptimized={unoptimizedImage}
                  onError={handleImageError}
                />
              )}
              {product.discount ? (
                <span className="absolute left-3 top-3 rounded-full border border-[#ddd6fe] bg-[#7c3aed] px-2.5 py-1 text-xs font-semibold text-white">
                  -{product.discount}%
                </span>
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
              {product.oldPrice ? <span className="pb-0.5 text-sm font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</span> : null}
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <div className="flex items-center gap-2">
                {homeSwatches.map((swatch, index) => (
                  <button
                    type="button"
                    key={`${product.id}-${index}`}
                    aria-label={`Select color ${index + 1}`}
                    onClick={() => setActiveSwatch(index)}
                    className={`h-4 w-4 rounded-full border transition hover:scale-110 ${
                      activeSwatch === index ? "scale-110 ring-2 ring-[#7c3aed]" : "scale-100 ring-1 ring-white/80"
                    }`}
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <ProductActionButton
                  label={wished ? "Remove from Wishlist" : "Add to Wishlist"}
                  active={wished}
                  variant="home"
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
                  }}
                >
                  <Heart size={16} className={wished ? "fill-red-500 text-red-500" : ""} />
                </ProductActionButton>
                <ProductActionButton label="Quick View" variant="home" onClick={() => setQuickOpen(true)}>
                  <Eye size={16} />
                </ProductActionButton>
                <ProductActionButton
                  label={inCart ? "Add more to cart" : "Add to cart"}
                  variant="home"
                  onClick={() => {
                    addToCart(product);
                    toast.success(inCart ? `${product.name} quantity updated` : `${product.name} added to cart`);
                  }}
                >
                  {inCart ? <Check size={16} className="text-emerald-600" /> : <ShoppingCart size={16} />}
                </ProductActionButton>
              </div>
            </div>
          </div>
        </motion.article>
        {quickViewModal}
      </>
    );
  }

  if (viewMode === "list") {
    return (
      <>
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_16px_38px_rgba(7,17,31,0.07)] transition duration-300 hover:border-[#D4A853]/55 hover:shadow-[0_28px_70px_rgba(7,17,31,0.14)]"
        >
          <div className="flex h-full flex-col md:flex-row">
            <Link
              href={`/product/${product.slug}`}
              className="relative block min-h-[240px] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 md:min-h-full md:w-[280px] md:flex-none"
            >
              {fallbackFailed ? (
                <div className="grid h-full place-items-center px-4 text-center">
                  <div>
                    <div className="text-sm font-black text-[#07111F]">{product.brand}</div>
                    <div className="mt-1 text-xs font-semibold text-slate-500">{product.category.replaceAll("-", " ")}</div>
                  </div>
                </div>
              ) : (
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 280px, 100vw"
                  className="bg-white object-contain p-5 transition duration-500 group-hover:scale-105"
                  unoptimized={unoptimizedImage}
                  onError={handleImageError}
                />
              )}
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {product.discount ? <Badge className="border-rose-200/70 bg-rose-600 text-white">-{product.discount}%</Badge> : null}
                {product.isNew ? <Badge className="border-emerald-200/70 bg-emerald-600 text-white">New</Badge> : null}
              </div>
            </Link>

            <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">{product.brand}</div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                        product.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {product.stock > 0 ? "In Stock" : "Sold Out"}
                    </span>
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-3 block line-clamp-2 text-xl font-bold leading-tight text-slate-950 transition hover:text-[#9a6d21]"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {product.features.slice(0, 2).join(" • ")}
                  </p>
                </div>

                <div className="flex items-center gap-2 md:flex-col">
                  <ProductActionButton
                    label={wished ? "Remove from Wishlist" : "Add to Wishlist"}
                    active={wished}
                    variant="default"
                    onClick={() => {
                      toggleWishlist(product.id);
                      toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
                    }}
                  >
                    <Heart size={17} className={wished ? "fill-red-500 text-red-500" : ""} />
                  </ProductActionButton>
                  <ProductActionButton
                    label={compared ? "Remove from Compare" : "Compare"}
                    active={compared}
                    variant="default"
                    onClick={() => {
                      toggleCompare(product.id);
                      toast.success(compared ? "Removed from compare" : "Added to compare");
                    }}
                  >
                    {compared ? <Check size={17} className="text-emerald-600" /> : <Scale size={17} />}
                  </ProductActionButton>
                  <ProductActionButton label="Quick View" dark={true} variant="default" onClick={() => setQuickOpen(true)}>
                    <Eye size={17} />
                  </ProductActionButton>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8EA] px-3 py-1.5 font-semibold text-[#9a6d21]">
                  <Star className="fill-[#D4A853] text-[#D4A853]" size={14} />
                  {product.rating} ({product.reviewCount} reviews)
                </div>
                <span className="text-slate-400">{product.category.replaceAll("-", " ")}</span>
                <span className="text-slate-400">EMI from {formatPrice(product.emiMonthly)}</span>
              </div>

              <div className="mt-5 flex flex-wrap items-end gap-2">
                <div className="text-[1.55rem] font-extrabold tracking-[-0.03em] text-[#07111F]">{formatPrice(product.price)}</div>
                {product.oldPrice ? <div className="pb-0.5 text-sm font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</div> : null}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
                <Button
                  variant="gold"
                  className="w-full sm:flex-1"
                  onClick={() => {
                    addToCart(product);
                    toast.success(inCart ? `${product.name} quantity updated` : `${product.name} added to cart`);
                  }}
                >
                  <ShoppingCart size={16} />
                  {inCart ? "Add Again" : "Add to Cart"}
                </Button>
                <Button asChild variant="outline" className="w-full sm:flex-1">
                  <Link href={`/product/${product.slug}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.article>
        {quickViewModal}
      </>
    );
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="group flex h-full min-h-[390px] cursor-pointer flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] shadow-[0_16px_38px_rgba(7,17,31,0.07)] transition duration-300 hover:border-[#D4A853]/55 hover:shadow-[0_28px_70px_rgba(7,17,31,0.14)]"
      >
        <div
          className={`relative overflow-visible bg-gradient-to-br from-slate-50 via-white to-slate-100 p-2.5 ${
            compact ? "h-[160px] sm:h-[176px]" : "h-[178px] sm:h-[192px] xl:h-[206px]"
          }`}
        >
          <div className="relative h-full overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f9fbff_72%,#eef3f8_100%)] shadow-inner">
            <div className="absolute inset-x-8 bottom-2 h-5 rounded-full bg-[#07111F]/8 blur-xl" />
            {fallbackFailed ? (
              <div className="grid h-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 text-center">
                <div>
                  <div className="text-sm font-black text-[#07111F]">{product.brand}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-500">{product.category.replaceAll("-", " ")}</div>
                </div>
              </div>
            ) : (
              <Image
                src={displayImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 20vw"
                className="bg-white object-contain transition duration-700 ease-out group-hover:scale-105"
                unoptimized={unoptimizedImage}
                onError={handleImageError}
              />
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.discount ? <Badge className="border-rose-200/70 bg-rose-600 text-white shadow-[0_10px_26px_rgba(225,29,72,0.22)]">-{product.discount}%</Badge> : null}
            {product.badge?.toLowerCase().includes("best") ? (
              <Badge className="border-[#E6C675]/55 bg-[linear-gradient(135deg,#F8E6BD,#D4A853)] text-[#5e420d] shadow-[0_10px_26px_rgba(212,168,83,0.24)]">Best Seller</Badge>
            ) : null}
            {product.isNew ? <Badge className="border-emerald-200/70 bg-emerald-600 text-white shadow-[0_10px_26px_rgba(5,150,105,0.18)]">New</Badge> : null}
          </div>
          <div className="absolute right-4 top-4 grid gap-2 translate-x-0 opacity-100 transition duration-300 md:translate-x-3 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
            <ProductActionButton
              label={wished ? "Remove from Wishlist" : "Add to Wishlist"}
              active={wished}
              variant={homeCartStyle ? "home" : "default"}
              onClick={() => {
                toggleWishlist(product.id);
                toast.success(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
            >
              <Heart size={17} className={wished ? "fill-red-500 text-red-500" : ""} />
            </ProductActionButton>
            <ProductActionButton
              label="Compare"
              active={compared}
              variant="default"
              onClick={() => {
                toggleCompare(product.id);
                toast.success(compared ? "Removed from compare" : "Added to compare");
              }}
            >
              {compared ? <Check size={17} className="text-emerald-600" /> : <Scale size={17} />}
            </ProductActionButton>
            <ProductActionButton label="Quick View" dark={true} variant="default" onClick={() => setQuickOpen(true)}>
              <Eye size={17} />
            </ProductActionButton>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-4.5">
          <div className="flex items-center gap-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">{product.brand}</div>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                product.stock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Sold Out"}
            </span>
          </div>
          <Link href={`/product/${product.slug}`} className="mt-2 line-clamp-2 min-h-12 text-[15px] font-semibold leading-6 text-slate-950 transition hover:text-[#9a6d21] sm:text-base">
            {product.name}
          </Link>
          <div className="mt-3 flex items-center gap-1 text-xs">
            <Star className="fill-[#D4A853] text-[#D4A853]" size={15} />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-400">({product.reviewCount})</span>
            <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{product.stock} Ready</span>
          </div>
          <div className="mt-3 flex flex-wrap items-end gap-2">
            <div className="text-[1.35rem] font-extrabold tracking-[-0.03em] text-[#07111F]">{formatPrice(product.price)}</div>
            {product.oldPrice ? <div className="pb-0.5 text-xs font-medium text-slate-400 line-through">{formatPrice(product.oldPrice)}</div> : null}
          </div>
          <div className="mt-2 inline-flex w-fit items-center rounded-full border border-[#D4A853]/18 bg-[#FFF8EA] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a6d21]">
            EMI from {formatPrice(product.emiMonthly)}
          </div>
          <div className="mt-auto grid gap-2 pt-4">
            <Button
              variant="gold"
              className="w-full cursor-pointer shadow-[0_16px_34px_rgba(212,168,83,0.22)]"
              onClick={() => {
                addToCart(product);
                toast.success(inCart ? `${product.name} quantity updated` : `${product.name} added to cart`);
              }}
            >
              <ShoppingCart size={16} className="transition duration-300 group-hover:scale-110" />
              {inCart ? "Add Again" : "Add to Cart"}
            </Button>
            <Button asChild variant="outline" className="w-full bg-white/90">
              <Link href={`/product/${product.slug}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </motion.article>
      {quickViewModal}
    </>
  );
}

function ProductActionButton({
  label,
  active,
  dark,
  variant = "default",
  onClick,
  children
}: {
  label: string;
  active?: boolean;
  dark?: boolean;
  variant?: "default" | "home";
  onClick: () => void;
  children: React.ReactNode;
}) {
  const homeClass = variant === "home";

  if (homeClass) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        title={label}
        className={`group/icon relative grid h-8 w-8 flex-none place-items-center rounded-full border border-slate-200 bg-white text-[#111827] transition-transform duration-250 ease-in-out shadow-[0_4px_8px_rgba(0,0,0,0.05)] hover:scale-105 hover:border-[#7c3aed] hover:text-[#7c3aed] hover:shadow-[0_10px_24px_rgba(124,58,237,0.2)] ${
          active ? "border-[#7c3aed] bg-[#F5F3FF] text-[#7c3aed]" : ""
        }`}
      >
        {children}
        <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 whitespace-nowrap rounded-[4px] bg-[#111827] px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-[0_10px_24px_rgba(7,17,31,0.24)] transition duration-200 group-hover/icon:opacity-100">
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`group/action premium-hover relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border shadow-sm hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] ${
        dark
          ? "border-[#07111F] bg-[#07111F] text-white hover:border-[#D4A853] hover:bg-[#D4A853] hover:text-[#07111F]"
          : active
            ? "border-[#D4A853]/45 bg-[#FFF7E6] text-[#9a6d21] hover:bg-[#F3D28A]"
            : "border-white/90 bg-white/92 text-slate-700 hover:border-[#D4A853] hover:bg-[#FFF7E6] hover:text-[#9a6d21]"
      }`}
    >
      {children}
      <span className="pointer-events-none absolute right-full top-1/2 z-20 mr-2 -translate-y-1/2 whitespace-nowrap rounded-[4px] bg-[#07111F] px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-[0_12px_30px_rgba(7,17,31,0.2)] transition duration-200 group-hover/action:opacity-100 group-focus-visible/action:opacity-100">
        {label}
      </span>
    </button>
  );
}
