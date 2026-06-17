import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "premium-hover inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[linear-gradient(135deg,#07111F_0%,#122036_100%)] text-white shadow-[0_18px_36px_rgba(7,17,31,0.22)] hover:-translate-y-1 hover:bg-[linear-gradient(135deg,#10243C_0%,#1A3554_100%)] hover:text-[#F8DEAA] hover:shadow-[0_24px_48px_rgba(7,17,31,0.28)]",
        gold: "bg-[linear-gradient(135deg,#F6D58B_0%,#D4A853_45%,#C8952F_100%)] text-[#07111F] shadow-[0_18px_44px_rgba(212,168,83,0.3)] hover:-translate-y-1 hover:bg-[linear-gradient(135deg,#FFE6A6_0%,#E2B861_45%,#D6A03B_100%)] hover:text-[#07111F] hover:shadow-[0_24px_56px_rgba(212,168,83,0.4)]",
        outline: "border border-slate-200/90 bg-white/92 text-slate-950 shadow-[0_10px_24px_rgba(7,17,31,0.04)] hover:-translate-y-1 hover:border-[#D4A853]/70 hover:bg-[#fff8ea] hover:text-[#7a5616] hover:shadow-[0_16px_36px_rgba(7,17,31,0.1)]",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
      },
      size: {
        sm: "h-9 px-3.5 text-xs",
        md: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
