"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type HeroSlide = {
  id: string;
  image: string;
  imageClass?: string;
  badge?: string;
  overline?: string;
  title?: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  contentAlign?: "left" | "center" | "right";
  contentClass?: string;
};

export function Hero() {
  const [active, setActive] = useState(0);

  const slides = useMemo<HeroSlide[]>(
    () => [
      {
        id: "hero-11",
        image: "/products/banner11.png",
        imageClass: "object-center",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        contentAlign: "left",
        contentClass: "max-w-[640px] text-left"
      },
      {
        id: "hero-12",
        image: "/products/banner12.png",
        imageClass: "object-center",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        contentAlign: "left",
        contentClass: "max-w-[620px] text-left"
      },
      {
        id: "hero-13",
        image: "/products/banner13.png",
        imageClass: "object-center",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        contentAlign: "left",
        contentClass: "max-w-[620px] text-left"
      },
      {
        id: "hero-14",
        image: "/products/banner14.png",
        imageClass: "object-center",
        ctaText: "Shop Now",
        ctaLink: "/shop",
        contentAlign: "left",
        contentClass: "max-w-[680px] text-left"
      }
    ],
    []
  );
  const slidesLen = slides.length;
  const timerRef = useRef<number | null>(null);

  const slide = slides[active];

  useEffect(() => {
    const schedule = () => {
      timerRef.current = window.setInterval(() => {
        setActive((current) => (current + 1) % slidesLen);
      }, 7200);
    };

    schedule();

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [slidesLen]);
  const contentAlignClass =
    slide.contentAlign === "right"
      ? "mx-0 mr-0 ml-auto text-right"
      : slide.contentAlign === "center"
        ? "mx-auto text-center"
        : "mx-0 text-left";
  return (
    <section className="relative overflow-hidden bg-[#07111F]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(255,255,255,0.08),transparent_22%)]" />

      <div className="relative">
        <div className="relative min-h-[380px] sm:min-h-[430px] md:min-h-[500px] lg:min-h-[560px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${slide.id}-image`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 overflow-hidden rounded-none"
            >
              <Link href={slide.ctaLink} aria-label={`Go to ${slide.ctaText} (${slide.id})`} className="group block h-full w-full">
                <Image
                  src={slide.image}
                  alt="Hero banner"
                  fill
                  priority
                  sizes="100vw"
                  className={`object-cover ${slide.imageClass ?? "object-center"}`}
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${slide.id}-copy`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex min-h-[380px] items-start sm:min-h-[430px] md:min-h-[500px] lg:min-h-[560px] pt-10 pb-8"
            >
              <div className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8 2xl:px-10">
                <div className={`max-w-[680px] text-white ${slide.contentClass ?? ""} ${contentAlignClass}`}>
                  <Link href={slide.ctaLink} aria-label={`Go to ${slide.ctaText} (${slide.id})`} className="hero-copy block">
                    <div className="flex flex-col items-start gap-3">
                    {slide.overline ? (
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FF9EAE] sm:text-[0.95rem]">
                        {slide.overline}
                      </p>
                    ) : null}
                    {slide.title ? (
                      <h1 className="premium-heading mt-4 text-[2.2rem] font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-[3.2rem] lg:text-[4.2rem]">
                        {slide.title}
                      </h1>
                    ) : null}
                    {slide.subtitle ? (
                      <p className="max-w-full text-[1.1rem] font-medium leading-[1.2] tracking-[-0.02em] text-white/90 sm:text-[1.45rem] lg:text-[1.75rem]">
                        {slide.subtitle}
                      </p>
                    ) : null}
                  </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-30 flex items-center justify-center">
          <div className="flex items-center gap-2.5">
          {slides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-current={active === index ? "true" : undefined}
              aria-label={`Go to hero slide ${index + 1}`}
              className={`h-3.5 w-3.5 rounded-full border-2 transition duration-200 ${active === index ? "border-[#ff2d55] bg-[#ff2d55] shadow-[0_0_0_3px_rgba(255,45,85,0.22)]" : "border-white/70 bg-white/20 hover:border-white hover:bg-white/55"}`}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
