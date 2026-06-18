"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/data/catalog";

const activityFeed = [
  {
    product: products[0],
    message: "Someone recently added this diaper pack to cart",
    ago: "2 minutes ago"
  },
  {
    product: products[1],
    message: "Trending right now in baby clothing",
    ago: "6 minutes ago"
  },
  {
    product: products[2],
    message: "Popular pick for infant feeding",
    ago: "11 minutes ago"
  },
  {
    product: products[3],
    message: "Most viewed stroller in the last hour",
    ago: "14 minutes ago"
  }
] as const;

export function LiveActivityPopup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const active = useMemo(() => activityFeed[activeIndex], [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem("babymart-live-activity-popup-dismissed") === "1";
    const timer = window.setTimeout(() => setIsDismissed(dismissed), 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    const showTimer = window.setTimeout(() => setVisible(true), 2800);

    return () => window.clearTimeout(showTimer);
  }, [isDismissed]);

  useEffect(() => {
    if (!visible) return;

    const hideTimer = window.setTimeout(() => setVisible(false), 5400);
    return () => window.clearTimeout(hideTimer);
  }, [visible, activeIndex]);

  useEffect(() => {
    if (isDismissed || visible) return;

    const nextTimer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % activityFeed.length);
      setVisible(true);
    }, 4200);

    return () => window.clearTimeout(nextTimer);
  }, [visible, isDismissed]);

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("babymart-live-activity-popup-dismissed", "1");
    }
    setIsDismissed(true);
    setVisible(false);
  };

  if (isDismissed) return null;

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-[58] sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={`${active.product.id}-${activeIndex}`}
            initial={{ opacity: 0, x: -18, y: 12 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -12, y: 8 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="pointer-events-auto w-[min(92vw,360px)] rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(7,17,31,0.16)]"
          >
            <div className="flex items-start gap-3">
              <Link href={`/product/${active.product.slug}`} className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-100">
                <Image src={active.product.image} alt={active.product.name} fill className="object-contain p-2" sizes="56px" />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-slate-400">{active.message}</div>
                <Link href={`/product/${active.product.slug}`} className="mt-1 line-clamp-2 block text-sm font-bold leading-5 text-[#07111F] hover:text-[#9a6d21]">
                  {active.product.name}
                </Link>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                  <span>{active.ago}</span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                    <CheckCircle2 size={13} />
                    Verified
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close live activity popup"
                onClick={handleDismiss}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[#07111F]"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
