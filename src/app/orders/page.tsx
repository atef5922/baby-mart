import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { orders } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Order Tracking" };

export default function OrdersPage() {
  return (
    <Container className="py-8">
      <h1 className="text-3xl font-semibold tracking-normal">Order Tracking</h1>
      <div className="mt-6 grid gap-4">
        {orders.map((order) => <Card key={order.id} className="flex flex-wrap items-center justify-between gap-3 p-5"><div><div className="font-semibold">{order.id}</div><div className="text-sm text-slate-500">{order.date}</div></div><div className="font-semibold">{formatPrice(order.amount)}</div><span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">{order.status}</span></Card>)}
      </div>
    </Container>
  );
}
