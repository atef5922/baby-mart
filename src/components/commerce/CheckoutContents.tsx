"use client";

import Link from "next/link";
import { CreditCard, MapPin, PackageCheck, ShieldCheck, Truck, UserRound } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

export function CheckoutContents() {
  const lines = useCartStore((state) => state.lines);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const subtotal = lines.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryCharge = useMemo(() => {
    if (!lines.length) return 0;
    switch (deliveryMethod) {
      case "express":
        return 150;
      case "same-day":
        return 220;
      default:
        return subtotal > 2000 ? 0 : 120;
    }
  }, [deliveryMethod, lines.length, subtotal]);
  const total = subtotal + deliveryCharge;

  if (!lines.length) {
    return (
      <Container className="py-8">
        <Card className="grid place-items-center rounded-[28px] px-6 py-16 text-center">
          <div className="rounded-full bg-[#FFF8EA] p-4 text-[#9a6d21]">
            <Truck size={28} />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-slate-950 sm:text-3xl">Your checkout is empty</h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Add products to cart first. After backend integration, this checkout structure can directly connect to live address,
            payment, inventory, and order APIs without redesigning the page.
          </p>
          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" className="w-full sm:flex-1">
              <Link href="/shop">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:flex-1">
              <Link href="/cart">Go to Cart</Link>
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal">Checkout</h1>
          <p className="mt-2 text-sm text-slate-500">Delivery, payment, and order review are ready for backend order processing.</p>
        </div>
        <div className="flex snap-x gap-3 overflow-x-auto pb-1 md:gap-4 lg:justify-end">
          {["Information", "Shipping", "Payment", "Review"].map((step, index) => (
            <div key={step} className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${index === 0 ? "bg-[#D4A853] text-[#07111F]" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span>
              <span className="text-sm font-semibold text-slate-600">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-5">
          <CheckoutBlock icon={UserRound} title="Customer Information">
            <div className="grid gap-3 md:grid-cols-2">
              <Input placeholder="Full name" autoComplete="name" />
              <Input placeholder="Phone number" autoComplete="tel" />
            </div>
            <Input placeholder="Email address" type="email" autoComplete="email" />
          </CheckoutBlock>
          <CheckoutBlock icon={MapPin} title="Delivery Address">
            <Input placeholder="Street address" autoComplete="street-address" />
            <div className="grid gap-3 md:grid-cols-3">
              <Input placeholder="City" autoComplete="address-level2" />
              <Input placeholder="Area" autoComplete="address-level1" />
              <Input placeholder="Post code" autoComplete="postal-code" />
            </div>
          </CheckoutBlock>
          <CheckoutBlock icon={PackageCheck} title="Delivery Method">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { id: "standard", label: "Standard Delivery", text: subtotal > 2000 ? "Free" : "Tk 120", note: "Nationwide delivery" },
                { id: "express", label: "Express Dhaka", text: "Tk 150", note: "Faster metro delivery" },
                { id: "same-day", label: "Same-Day Delivery", text: "Tk 220", note: "Selected zones only" }
              ].map((item) => (
                <label key={item.id} className={`rounded-2xl border p-4 text-sm transition ${deliveryMethod === item.id ? "border-[#D4A853] bg-[#FFF8EA]" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value={item.id}
                    checked={deliveryMethod === item.id}
                    onChange={() => setDeliveryMethod(item.id)}
                    className="mr-2 accent-[#D4A853]"
                  />
                  <span className="font-semibold text-slate-900">{item.label}</span>
                  <span className="mt-2 block text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{item.text}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{item.note}</span>
                </label>
              ))}
            </div>
          </CheckoutBlock>
          <CheckoutBlock icon={CreditCard} title="Payment Method">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { id: "cod", label: "Cash on Delivery" },
                { id: "bkash", label: "bKash" },
                { id: "nagad", label: "Nagad" },
                { id: "card", label: "Credit / Debit Card" }
              ].map((item) => (
                <label key={item.id} className={`rounded-2xl border p-4 text-sm font-semibold transition ${paymentMethod === item.id ? "border-[#D4A853] bg-[#FFF8EA]" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={item.id}
                    checked={paymentMethod === item.id}
                    onChange={() => setPaymentMethod(item.id)}
                    className="mr-2 accent-[#D4A853]"
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </CheckoutBlock>
          <CheckoutBlock icon={ShieldCheck} title="Order Notes">
            <textarea
              placeholder="Delivery instructions, baby-safe packaging note, landmark, or any special request..."
              className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#D4A853] focus:ring-4 focus:ring-[#D4A853]/15"
            />
          </CheckoutBlock>
        </div>
        <Card className="h-fit p-5 xl:sticky xl:top-28">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-2 text-sm text-slate-500">{lines.length} item{lines.length === 1 ? "" : "s"} in your order</div>
          <div className="mt-5 grid gap-4">
            {lines.map((line) => (
              <div key={line.product.id} className="flex justify-between gap-3 text-sm">
                <span className="min-w-0">
                  <span className="line-clamp-2 block font-semibold text-slate-900">{line.product.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-slate-400">Qty {line.quantity}</span>
                </span>
                <b className="shrink-0">{formatPrice(line.product.price * line.quantity)}</b>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-slate-100 pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Delivery" value={deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)} />
            <Row label="Payment" value={paymentMethodLabel(paymentMethod)} />
            <Row label="Total" value={formatPrice(total)} strong />
          </div>
          <div className="mt-5 rounded-2xl border border-[#D7F3E6] bg-[#F2FFF8] px-4 py-3 text-sm text-emerald-700">
            Order summary, pricing, and selection state are now consistent with the actual cart store.
          </div>
          <Button variant="gold" className="mt-6 w-full">Place Order</Button>
          <Button asChild variant="outline" className="mt-3 w-full">
            <Link href="/cart">Back to Cart</Link>
          </Button>
        </Card>
      </div>
    </Container>
  );
}

function CheckoutBlock({ icon: Icon, title, children }: { icon: typeof UserRound; title: string; children: ReactNode }) {
  return (
    <Card className="rounded-[24px] p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold"><Icon className="text-[#D4A853]" size={20} /> {title}</h2>
      <div className="grid gap-3">{children}</div>
    </Card>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`mt-3 flex justify-between ${strong ? "text-lg font-black" : ""}`}><span className="text-slate-500">{label}</span><span className="font-semibold">{value}</span></div>;
}

function paymentMethodLabel(value: string) {
  switch (value) {
    case "bkash":
      return "bKash";
    case "nagad":
      return "Nagad";
    case "card":
      return "Credit / Debit Card";
    default:
      return "Cash on Delivery";
  }
}
