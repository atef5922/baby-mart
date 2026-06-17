"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { useCartStore } from "@/store/cartStore";

export function WishlistContents() {
  const wishlist = useCartStore((state) => state.wishlist);
  const saved = products.filter((product) => wishlist.includes(product.id));

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-semibold tracking-normal">Wishlist</h1>
      <p className="mt-2 text-sm text-slate-500">Saved premium baby products for your baby&apos;s needs.</p>
      {saved.length ? (
        <div className="mt-6"><ProductGrid products={saved} /></div>
      ) : (
        <div className="mt-6 grid place-items-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center shadow-[0_16px_50px_rgba(7,17,31,0.06)]">
          <Heart className="text-slate-300" size={42} />
          <h2 className="mt-4 text-xl font-semibold">No saved products yet</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Tap the heart on any product to build a premium shortlist of baby essentials.</p>
          <Button asChild variant="gold" className="mt-5"><Link href="/shop">Browse Products</Link></Button>
        </div>
      )}
    </Container>
  );
}
