import type * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/12 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#7a5616]", className)}
      {...props}
    />
  );
}
