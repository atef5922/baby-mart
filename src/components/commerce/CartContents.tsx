"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { CartQuantityControl } from "@/components/commerce/CartQuantityControl";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/catalog";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Container } from "@/components/layout/Container";

export function CartContents() {
  const lines = useCartStore((state) => state.lines);
  const remove = useCartStore((state) => state.removeFromCart);
  const update = useCartStore((state) => state.updateQuantity);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = subtotal > 2000 ? 0 : 120;
  const discount = couponApplied ? Math.max(200, Math.round(subtotal * 0.08)) : subtotal > 10000 ? 1000 : 0;
  const total = subtotal + delivery - discount;

  return (
    <Container className="py-8">
      <motion.h1 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }} className="text-3xl font-semibold tracking-normal">Cart</motion.h1>
      <motion.div
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_130px_120px_44px] gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase text-slate-500 max-md:hidden">
            <span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span><span />
          </div>
          {lines.length ? lines.map((line) => (
            <motion.div
              key={line.product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-4 border-b border-slate-100 p-5 md:grid-cols-[1fr_120px_130px_120px_44px] md:items-center"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-100 shadow-[0_12px_30px_rgba(7,17,31,0.06)] md:h-24 md:w-24 xl:h-28 xl:w-28">
                  <Image src={line.product.image} alt={line.product.name} fill className="object-cover" sizes="112px" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{line.product.brand}</div>
                  <Link href={`/product/${line.product.slug}`} className="mt-1 block text-lg font-semibold leading-6 text-[#07111F] hover:text-[#9a6d21]">{line.product.name}</Link>
                  <div className="mt-2 text-sm text-slate-500">{line.product.warranty}</div>
                </div>
              </div>
              <div className="font-semibold">{formatPrice(line.product.price)}</div>
              <CartQuantityControl
                quantity={line.quantity}
                onDecrease={() => update(line.product.id, line.quantity - 1)}
                onIncrease={() => update(line.product.id, line.quantity + 1)}
              />
              <div className="font-semibold">{formatPrice(line.product.price * line.quantity)}</div>
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => remove(line.product.id)}
                aria-label="Remove item"
                className="grid h-10 w-10 place-items-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={17} />
              </motion.button>
            </motion.div>
          )) : (
            <div className="grid place-items-center px-6 py-16 text-center">
              <ShoppingCart className="text-slate-300" size={42} />
              <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">Explore premium baby products and add your shortlist here. Cart, checkout, coupons, and recommendations are ready.</p>
              <Button asChild variant="gold" className="mt-5"><Link href="/shop">Start Shopping</Link></Button>
            </div>
          )}
        </Card>
        <motion.div className="grid gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: 0.05 }}>
            <Card className="p-5">
            <h2 className="text-xl font-semibold">Coupon Code</h2>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (!coupon.trim()) {
                  toast.error("Enter a coupon code first.");
                  return;
                }
                setCouponApplied(true);
                toast.success("Coupon applied successfully.");
              }}
            >
              <Input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Enter coupon code" />
              <Button type="submit">Apply</Button>
            </form>
            {couponApplied ? <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">Coupon {coupon.toUpperCase()} applied.</div> : null}
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.45, delay: 0.1 }}>
            <Card className="p-5">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
            <SummaryRow label="Delivery Charge" value={delivery === 0 ? "Free" : formatPrice(delivery)} />
            <SummaryRow label="Discount" value={`-${formatPrice(discount)}`} positive />
            <div className="mt-4 border-t border-slate-100 pt-4">
              <SummaryRow label="Total" value={formatPrice(Math.max(0, total))} strong />
            </div>
            <Button asChild variant="gold" className="mt-5 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="ghost" className="mt-2 w-full">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.section initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55 }} className="mt-12">
        <h2 className="mb-5 text-2xl font-semibold">Recommended for Your Cart</h2>
        <ProductGrid products={products.slice(4, 8)} />
      </motion.section>
    </Container>
  );
}

function SummaryRow({ label, value, strong, positive }: { label: string; value: string; strong?: boolean; positive?: boolean }) {
  return (
    <div className={`mt-3 flex justify-between ${strong ? "text-lg font-black" : "text-sm"}`}>
      <span className="text-slate-500">{label}</span>
      <span className={positive ? "font-semibold text-green-600" : "font-semibold"}>{value}</span>
    </div>
  );
}
