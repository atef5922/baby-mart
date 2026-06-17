import { Bell, Heart, MapPin, PackageCheck, RotateCcw, Settings, ShoppingBag, Star, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { orders } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "User Dashboard",
  description: "Customer dashboard for orders, wishlist, addresses, tracking, returns, settings, notifications, and recent activity."
};

export default function DashboardPage() {
  const menu = [
    ["Dashboard", ShoppingBag],
    ["My Orders", PackageCheck],
    ["Wishlist", Heart],
    ["Addresses", MapPin],
    ["Order Tracking", Star],
    ["Returns", RotateCcw],
    ["Notifications", Bell],
    ["Settings", Settings]
  ] as const;

  return (
    <Container className="grid gap-6 py-8 lg:grid-cols-[260px_1fr]">
      <Card className="h-fit p-4">
        <div className="mb-4 flex items-center gap-3 rounded-md bg-[#07111F] p-4 text-white">
          <UserRound className="text-[#D4A853]" />
          <div><div className="font-semibold">Ariful Islam</div><div className="text-xs text-slate-300">Premium Member</div></div>
        </div>
        <div className="grid gap-1">
          {menu.map(([label, Icon], index) => (
            <button key={label} className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold ${index === 0 ? "bg-[#D4A853] text-[#07111F]" : "text-slate-600 hover:bg-slate-50"}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </div>
      </Card>
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-normal">Welcome back, Ariful</h1>
            <p className="mt-1 text-sm text-slate-500">Here is what is happening with your account.</p>
          </div>
          <Button variant="outline">Rutbah</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[["Total Orders", "12"], ["Total Spend", "Tk 1,25,600"], ["Wishlist Items", "8"], ["Saved Addresses", "3"]].map(([label, value]) => (
            <Card key={label} className="p-5 text-center"><div className="text-sm text-slate-500">{label}</div><div className="mt-2 text-2xl font-black">{value}</div></Card>
          ))}
        </div>
        <Card className="mt-6 overflow-hidden">
          <div className="border-b border-slate-100 p-5 text-xl font-semibold">Recent Orders</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-4">Order ID</th><th>Date</th><th>Amount</th><th>Status</th><th>Track</th></tr></thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-100">
                    <td className="p-4 font-semibold">{order.id}</td><td>{order.date}</td><td>{formatPrice(order.amount)}</td>
                    <td><span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">{order.status}</span></td>
                    <td><Button size="sm" variant="outline">Track</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  );
}
