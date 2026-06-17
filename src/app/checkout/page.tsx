import { CreditCard, MapPin, PackageCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Checkout",
  description: "Multi-step checkout with validation-ready forms, delivery methods, payment methods, and order review."
};

export default function CheckoutPage() {
  const cart = products.slice(0, 3);
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <Container className="py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-normal">Checkout</h1>
        <div className="hidden items-center gap-4 md:flex">
          {["Information", "Shipping", "Payment", "Review"].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold ${index === 0 ? "bg-[#D4A853] text-[#07111F]" : "bg-slate-100 text-slate-500"}`}>{index + 1}</span>
              <span className="text-sm font-semibold text-slate-600">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5">
          <CheckoutBlock icon={UserRound} title="Customer Information">
            <div className="grid gap-3 md:grid-cols-2"><Input placeholder="Full name" /><Input placeholder="Phone number" /></div>
            <Input placeholder="Email address" />
          </CheckoutBlock>
          <CheckoutBlock icon={MapPin} title="Delivery Address">
            <Input placeholder="Street address" />
            <div className="grid gap-3 md:grid-cols-3"><Input placeholder="City" /><Input placeholder="Area" /><Input placeholder="Post code" /></div>
          </CheckoutBlock>
          <CheckoutBlock icon={PackageCheck} title="Delivery Method">
            <div className="grid gap-3 md:grid-cols-3">{["Standard Delivery", "Express Dhaka", "Same-Day Delivery"].map((item) => <label key={item} className="rounded-md border border-slate-200 p-4 text-sm font-semibold"><input type="radio" name="delivery" className="mr-2 accent-[#D4A853]" /> {item}</label>)}</div>
          </CheckoutBlock>
          <CheckoutBlock icon={CreditCard} title="Payment Method">
            <div className="grid gap-3 md:grid-cols-4">{["Cash on Delivery", "bKash", "Nagad", "Credit / Debit Card"].map((item) => <label key={item} className="rounded-md border border-slate-200 p-4 text-sm font-semibold"><input type="radio" name="payment" className="mr-2 accent-[#D4A853]" /> {item}</label>)}</div>
          </CheckoutBlock>
        </div>
        <Card className="h-fit p-5">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-5 grid gap-4">
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between gap-3 text-sm">
                <span>{product.name} × 1</span>
                <b>{formatPrice(product.price)}</b>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-slate-100 pt-4 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Delivery" value="Tk 100" />
            <Row label="Discount" value="-Tk 5,000" />
            <Row label="Total" value={formatPrice(subtotal + 100 - 5000)} strong />
          </div>
          <Button variant="gold" className="mt-6 w-full">Place Order</Button>
        </Card>
      </div>
    </Container>
  );
}

function CheckoutBlock({ icon: Icon, title, children }: { icon: typeof UserRound; title: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold"><Icon className="text-[#D4A853]" size={20} /> {title}</h2>
      <div className="grid gap-3">{children}</div>
    </Card>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`mt-3 flex justify-between ${strong ? "text-lg font-black" : ""}`}><span className="text-slate-500">{label}</span><span className="font-semibold">{value}</span></div>;
}
