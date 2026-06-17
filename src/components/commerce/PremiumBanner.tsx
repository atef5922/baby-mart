"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type PremiumBannerProps = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  href: string;
  cta: string;
  align?: "left" | "right";
  compact?: boolean;
};

export function PremiumBanner({
  eyebrow,
  title,
  text,
  image,
  href,
  cta,
  align = "left",
  compact = false
}: PremiumBannerProps) {
  const visualTheme = align === "right"
    ? {
        background: "bg-[linear-gradient(115deg,#0d2943_0%,#1766b2_34%,#34b6f1_62%,#e5f9ff_100%)]",
        overlay: "bg-gradient-to-l from-[#07111F]/82 via-[#07111F]/36 to-transparent",
        tint: "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_24%)]"
      }
    : {
        background: "bg-[linear-gradient(115deg,#ff7a00_0%,#ff8e1d_34%,#ffab40_58%,#fff0d8_100%)]",
        overlay: "bg-gradient-to-r from-[#07111F]/82 via-[#07111F]/34 to-transparent",
        tint: "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_24%)]"
      };
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`relative overflow-hidden text-white shadow-[0_32px_90px_rgba(7,17,31,0.18)] ${visualTheme.background} ${compact ? "min-h-[260px] sm:min-h-[290px] lg:min-h-[320px]" : "min-h-[300px] sm:min-h-[340px] lg:min-h-[380px]"}`}>
        <div className={`absolute inset-0 ${visualTheme.tint}`} />
        <div className={`absolute ${align === "right" ? "right-0 top-0 h-full w-full sm:w-[46%]" : "left-0 top-0 h-full w-full sm:w-[46%]"}`}>
          <Image src={image} alt={title} fill className={`object-cover transition duration-700 ${align === "right" ? "object-center" : "object-center"} scale-[1.02]`} sizes="(min-width: 640px) 46vw, 100vw" />
        </div>
        <div className={`absolute inset-0 ${visualTheme.overlay}`} />
        <div className={`relative z-10 flex h-full ${align === "right" ? "sm:justify-end" : "justify-start"}`}>
          <div className={`max-w-2xl p-6 sm:p-8 lg:p-10 ${align === "right" ? "sm:text-right" : ""}`}>
            <Badge className="border-white/18 bg-white/12 text-white">{eyebrow}</Badge>
            <h3 className="mt-5 text-[2rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-balance sm:text-[2.4rem] lg:text-[2.8rem]">{title}</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/88 sm:text-[0.98rem]">{text}</p>
            <Button asChild variant="gold" className="mt-7">
              <Link href={href}>
                {cta} <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
