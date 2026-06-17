import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Container } from "@/components/layout/Container";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Container className="grid gap-6 py-8 lg:grid-cols-[0.8fr_1.2fr]">
      <Card className="p-6">
        <h1 className="text-3xl font-semibold tracking-normal">Contact Baby Mart</h1>
        <div className="mt-6 grid gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-3"><MapPin className="text-[#D4A853]" /> Gulshan, Dhaka</span>
          <span className="flex items-center gap-3"><Phone className="text-[#D4A853]" /> +880 1700-000000</span>
          <span className="flex items-center gap-3"><Mail className="text-[#D4A853]" /> care@babymart.com</span>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold">Send a Message</h2>
        <div className="mt-5 grid gap-3">
          <Input placeholder="Full name" /><Input placeholder="Email" /><Input placeholder="Phone" />
          <textarea placeholder="How can we help?" className="min-h-32 rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-[#D4A853]" />
          <Button variant="gold">Submit</Button>
        </div>
      </Card>
    </Container>
  );
}
