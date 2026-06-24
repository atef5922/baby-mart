"use client";

import { Loader2, Minus, Plus, Scale, Share2, ShoppingCart, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types/commerce";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(null);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const compare = useCartStore((state) => state.compare);
  const toggleCompare = useCartStore((state) => state.toggleCompare);
  const timerRef = useRef<number | null>(null);
  const compared = compare.includes(product.id);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const runActionFeedback = (action: "cart" | "buy") => {
    setPendingAction(action);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setPendingAction(null), 360);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Baby Mart`,
          url: shareUrl
        });
        return;
      }

      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Product link copied");
        return;
      }
    } catch {
      toast.error("Unable to share right now");
      return;
    }

    toast.success("Share is ready for browser support");
  };

  return (
    <Card className="rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-5 xl:sticky xl:top-28">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Purchase Options</div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[152px_1fr] xl:grid-cols-[152px_1fr_1fr]">
        <div className="flex h-12 items-center justify-between rounded-[14px] border border-slate-200 bg-white px-2">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="grid h-9 w-9 place-items-center rounded-[10px] text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <Minus size={16} />
          </button>
          <span className="min-w-8 text-center text-base font-black text-slate-950">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => current + 1)}
            className="grid h-9 w-9 place-items-center rounded-[10px] text-slate-600 transition hover:bg-[#FFF1F6] hover:text-[#FF3366]"
          >
            <Plus size={16} />
          </button>
        </div>

        <Button
          className="h-12 rounded-[14px] bg-[linear-gradient(90deg,#FF5CA8_0%,#FF3366_100%)] text-white shadow-[0_12px_24px_rgba(255,51,102,0.18)] hover:bg-[linear-gradient(90deg,#FF4D95_0%,#FF2558_100%)] hover:text-white"
          disabled={pendingAction !== null}
          onClick={() => {
            runActionFeedback("cart");
            addToCart(product, quantity);
            toast.success(`${product.name} added to cart`);
          }}
        >
          {pendingAction === "cart" ? <Loader2 size={16} className="animate-spin" /> : <ShoppingCart size={16} />}
          Add to Cart
        </Button>

        <Button
          className="h-12 rounded-[14px] bg-[linear-gradient(135deg,#0F172A_0%,#1E293B_100%)] text-white shadow-[0_12px_24px_rgba(15,23,42,0.15)] hover:bg-[linear-gradient(135deg,#111827_0%,#1F2A44_100%)] hover:text-white"
          disabled={pendingAction !== null}
          onClick={() => {
            runActionFeedback("buy");
            addToCart(product, quantity);
            toast.success(`${product.name} is ready for checkout`);
            router.push("/checkout");
          }}
        >
          {pendingAction === "buy" ? <Loader2 size={16} className="animate-spin" /> : <Wallet size={16} />}
          Buy Now
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            toggleCompare(product.id);
            toast.success(compared ? "Removed from compare" : "Added to compare");
          }}
          className={`inline-flex h-11 items-center justify-center gap-2 rounded-[14px] border px-4 text-sm font-semibold transition ${
            compared
              ? "border-[#FFD7E4] bg-[#FFF1F6] text-[#FF3366]"
              : "border-slate-200 bg-white text-slate-700 hover:border-[#FFB3CC] hover:text-[#FF3366]"
          }`}
        >
          <Scale size={16} />
          Compare
        </button>
        <Button
          variant="outline"
          className="h-11 rounded-[14px] border-slate-200 bg-white text-slate-700 hover:border-[#FFB3CC] hover:bg-[#FFF7FA] hover:text-[#FF3366]"
          onClick={handleShare}
        >
          <Share2 size={16} />
          Share
        </Button>
      </div>
    </Card>
  );
}
