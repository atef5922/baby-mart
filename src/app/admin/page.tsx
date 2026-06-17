import { Bell, Boxes, ChartNoAxesCombined, LayoutDashboard, Package, Settings, ShoppingCart, Tags, TicketPercent, Users } from "lucide-react";
import { AdminChartsPanel } from "@/components/admin/AdminChartsPanel";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { orders, products } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard",
  description: "Premium SaaS-quality admin dashboard with analytics, orders, products, inventory, reports, coupons, and activity feed."
};

export default function AdminPage() {
  const nav = [
    ["Dashboard", LayoutDashboard],
    ["Orders", ShoppingCart],
    ["Products", Package],
    ["Brands", Tags],
    ["Categories", Boxes],
    ["Customers", Users],
    ["Coupons", TicketPercent],
    ["Reports", ChartNoAxesCombined],
    ["Notifications", Bell],
    ["Settings", Settings]
  ] as const;

  return (
    <Container className="grid gap-6 py-8 lg:grid-cols-[250px_1fr]">
      <aside className="rounded-lg bg-[#07111F] p-4 text-white">
        <div className="mb-6 px-3 text-xl font-black text-[#D4A853]">Admin</div>
        <div className="grid gap-1">
          {nav.map(([label, Icon], index) => (
            <button key={label} className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold ${index === 0 ? "bg-[#D4A853] text-[#07111F]" : "text-slate-300 hover:bg-white/10"}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </div>
      </aside>
      <div>
        <h1 className="text-3xl font-semibold tracking-normal">Admin Dashboard</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[["Total Sales", "Tk 12,45,000", "+12.5%"], ["Total Orders", "1,250", "+8.6%"], ["Customers", "2,350", "+21%"], ["Products", "320", "+6%"]].map(([label, value, delta]) => (
            <Card key={label} className="p-5"><div className="text-sm text-slate-500">{label}</div><div className="mt-2 text-2xl font-black">{value}</div><div className="mt-1 text-sm font-semibold text-green-600">{delta}</div></Card>
          ))}
        </div>
        <div className="mt-6"><AdminChartsPanel /></div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden">
            <div className="border-b border-slate-100 p-5 text-xl font-semibold">Recent Orders</div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Order ID</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>{orders.map((order) => <tr key={order.id} className="border-t border-slate-100"><td className="p-4 font-semibold">{order.id}</td><td>Rasel Hossain</td><td>{formatPrice(order.amount)}</td><td><span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">{order.status}</span></td></tr>)}</tbody>
            </table>
          </Card>
          <Card className="p-5">
            <h2 className="text-xl font-semibold">Top Products</h2>
            <div className="mt-4 grid gap-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between gap-3">
                  <div><div className="text-sm font-semibold">{product.name}</div><div className="text-xs text-slate-500">{formatPrice(product.price)}</div></div>
                  <div className="text-xs font-semibold text-slate-500">{product.stock} left</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-md border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">Low stock alerts: 3 products need replenishment.</div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
