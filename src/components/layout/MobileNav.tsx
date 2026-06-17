"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutDashboard, Search, ShoppingBag } from "lucide-react";

const items = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: Search, label: "Shop" },
  { href: "/cart", icon: ShoppingBag, label: "Cart" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Account" }
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-12px_35px_rgba(7,17,31,0.1)] backdrop-blur md:hidden">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 rounded-md py-1 text-[11px] font-semibold transition ${pathname === item.href ? "bg-[#D4A853]/15 text-[#07111F]" : "text-slate-600 hover:text-[#9a6d21]"}`}>
          <item.icon size={20} />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
