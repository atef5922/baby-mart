import type * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[28px] border border-slate-200/90 bg-white shadow-[0_18px_52px_rgba(7,17,31,0.08)]", className)} {...props} />;
}
