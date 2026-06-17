"use client";

import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CartQuantityControl } from "@/components/commerce/CartQuantityControl";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/commerce";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card className="sticky top-32 mt-6 p-5">
      <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
        <CartQuantityControl
          quantity={quantity}
          onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
          onIncrease={() => setQuantity((current) => current + 1)}
        />
        <Button
          variant="gold"
          onClick={() => {
            addToCart(product, quantity);
            toast.success(`${product.name} added to cart`);
          }}
        >
          Add to Cart
        </Button>
      </div>
      <Button
        className="mt-3 w-full"
        onClick={() => {
          addToCart(product, quantity);
          toast.success(`${product.name} added to cart`);
        }}
      >
        Buy Now
      </Button>
      <div className="mt-3 flex justify-center gap-6 text-sm text-slate-500">
        <span className="flex items-center gap-1"><Heart size={16} /> Compare</span>
        <span className="flex items-center gap-1"><Share2 size={16} /> Share</span>
      </div>
    </Card>
  );
}
