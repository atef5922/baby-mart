import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";

export const metadata = {
  title: "Contact",
  description: "Contact Baby Mart support for orders, baby product guidance, delivery, and returns."
};

const contactMethods = [
  { icon: MapPin, title: "Store Location", text: "Gulshan, Dhaka, Bangladesh" },
  { icon: Phone, title: "Phone Support", text: "+880 1700-000000" },
  { icon: Mail, title: "Email Care", text: "care@babymart.com" }
];

export default function ContactPage() {
  return (
    <Container className="py-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[28px] bg-[linear-gradient(135deg,#07111F,#182940)] p-6 text-white shadow-[0_24px_72px_rgba(7,17,31,0.22)] sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#F8DEAA]">
            <MessageCircle size={14} />
            Baby Mart Care
          </div>
          <h1 className="mt-5 bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text text-[2.35rem] font-black leading-[1.02] tracking-normal text-transparent sm:text-[3.25rem]">
            Contact Baby Mart
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
            Get help with product selection, order status, delivery timing, returns, and baby-care guidance from one place.
          </p>

          <div className="mt-7 grid gap-3">
            {contactMethods.map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/7 p-4">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white text-[#ff2d55]">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-sm font-black">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-300">{item.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-3 rounded-2xl border border-[#F8DEAA]/20 bg-[#F8DEAA]/10 p-4 text-sm text-[#F8DEAA] sm:grid-cols-2">
            <div className="flex items-center gap-2"><Clock size={18} /> 10 AM - 9 PM</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} /> Secure customer care</div>
          </div>
        </section>

        <Card className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff2d55]">Send Message</p>
              <h2 className="mt-2 text-3xl font-black text-[#07111F]">Tell us what you need</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/shop">Browse Shop</Link>
            </Button>
          </div>

          <form className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Full name" aria-label="Full name" />
              <Input placeholder="Phone number" aria-label="Phone number" />
            </div>
            <Input placeholder="Email address" aria-label="Email address" />
            <select className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-[#ff2d55] focus:ring-4 focus:ring-[#ff2d55]/10" defaultValue="">
              <option value="" disabled>Choose topic</option>
              <option>Order support</option>
              <option>Product guidance</option>
              <option>Delivery question</option>
              <option>Return or replacement</option>
            </select>
            <textarea
              placeholder="Write your message"
              className="min-h-36 resize-none rounded-md border border-slate-200 p-3 text-sm outline-none transition focus:border-[#ff2d55] focus:ring-4 focus:ring-[#ff2d55]/10"
            />
            <Button type="button" className="w-full rounded-md !border-transparent !bg-[#FF3366] !text-white hover:!bg-[#07111F] hover:!text-white sm:w-fit">
              <Send size={16} />
              Submit Message
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  );
}
