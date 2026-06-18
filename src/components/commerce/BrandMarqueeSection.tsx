"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { babyBrands, type BrandLogo } from "@/data/brands";

export function BrandMarqueeSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_44%,#F6F8FC_100%)] py-16 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/90 to-transparent" />
      <Container className="relative">
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <div className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.24em] text-[#C8922D]">
            Premium Brand Showcase
          </div>
          <div className="max-w-3xl">
            <h2 className="bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text text-[2rem] font-extrabold tracking-[-0.04em] text-transparent sm:text-[2.5rem]">Trusted Baby Care Brands</h2>
          </div>
          <Link href="/brands" className="premium-hover inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#07111F] shadow-[0_12px_34px_rgba(7,17,31,0.06)] hover:-translate-y-1 hover:border-[#D4A853] hover:text-[#9a6d21]">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden py-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-20 bg-gradient-to-r from-white via-white/92 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-20 bg-gradient-to-l from-white via-white/92 to-transparent lg:block" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="brand-marquee-viewport px-4 sm:px-6 lg:px-8 2xl:px-10"
          >
            <div className="brand-marquee-track">
              {[0, 1].map((group) => (
                <div key={group} className="brand-marquee-group" aria-hidden={group === 1}>
                  {babyBrands.map((brand) => (
                    <BrandLogoItem key={`${brand.slug}-${group}`} brand={brand} />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export function BrandLogoItem({ brand }: { brand: BrandLogo }) {
  return (
    <Link href={`/shop?brand=${brand.slug}`} className="brand-logo-item group" aria-label={`Shop ${brand.name} products`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative flex h-[112px] w-full items-center justify-center overflow-hidden rounded-[18px] border border-slate-200/90 bg-white px-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition duration-300 group-hover:border-[#FFB3CC] group-hover:shadow-[0_18px_42px_rgba(255,51,102,0.12),0_0_0_4px_rgba(255,51,102,0.08)]"
      >
        <div className="absolute inset-[1px] rounded-[17px] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)]" />
        <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#FFB3CC] to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-[#FF3366] opacity-0 transition duration-300 group-hover:opacity-100" />
        {brand.logoSrc ? (
          <Image src={brand.logoSrc} alt={`${brand.name} logo`} width={138} height={52} className="relative z-10 max-h-[54px] max-w-[150px] object-contain transition duration-300 group-hover:scale-[1.04]" />
        ) : (
          <span className={`relative z-10 max-w-full text-center text-[1.55rem] font-black leading-tight tracking-[-0.02em] transition duration-300 group-hover:scale-[1.04] sm:text-[1.75rem] ${brand.wordmarkClass}`}>
            {brand.name}
          </span>
        )}
      </motion.div>
    </Link>
  );
}
