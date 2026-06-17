"use client";

import dynamic from "next/dynamic";

const AdminCharts = dynamic(() => import("@/components/admin/AdminCharts").then((module) => module.AdminCharts), {
  ssr: false,
  loading: () => (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="h-80 animate-pulse rounded-lg border border-slate-200 bg-white" />
      <div className="h-80 animate-pulse rounded-lg border border-slate-200 bg-white" />
    </div>
  )
});

export function AdminChartsPanel() {
  return <AdminCharts />;
}
