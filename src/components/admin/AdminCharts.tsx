"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { revenueData } from "@/data/catalog";

export function AdminCharts() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="h-80 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(7,17,31,0.07)]">
        <h3 className="mb-4 font-semibold">Revenue Analytics</h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="sales" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#D4A853" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stroke="#D4A853" fill="url(#sales)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="h-80 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(7,17,31,0.07)]">
        <h3 className="mb-4 font-semibold">Sales Analytics</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#07111F" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
