"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/data/reviews";

export function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    containScroll: "trimSnaps"
  });
  const autoPlayRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const stop = () => {
      if (autoPlayRef.current) {
        window.clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };

    const start = () => {
      stop();
      autoPlayRef.current = window.setInterval(() => {
        if (!isHovered) emblaApi.scrollNext();
      }, 3200);
    };

    start();
    emblaApi.on("pointerDown", stop);
    emblaApi.on("settle", start);

    return () => {
      stop();
    };
  }, [emblaApi, isHovered]);

  return (
    <section className="section-shell py-16 lg:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.24em] text-[#C8922D]">
            Customer Reviews
          </div>
          <h2 className="mt-3 bg-[linear-gradient(90deg,#ff5ca8,#ff8b2c,#ffd54a,#67d8b4,#5bb5ff,#a27dff)] bg-clip-text text-3xl font-black leading-tight tracking-[-0.04em] text-transparent sm:text-4xl lg:text-[2.75rem]">
            Trusted by Parents Across Bangladesh
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          className="mt-10"
        >
          <div
            className="mx-auto max-w-[calc(100%-1rem)] overflow-hidden md:max-w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="embla" ref={emblaRef}>
              <div className="flex gap-4 sm:gap-5">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_calc(50%-0.625rem)] lg:flex-[0_0_calc(33.333%-0.833rem)]">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function TestimonialCard({
  testimonial
}: {
  testimonial: (typeof testimonials)[number];
}) {
  const initials = testimonial.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.28, ease: "easeOut" }} className="h-full">
      <Card className="flex h-full min-h-[268px] flex-col rounded-[28px] border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(7,17,31,0.07)] transition duration-300 hover:border-[#D4A853]/60 hover:shadow-[0_26px_70px_rgba(7,17,31,0.12)] sm:p-7">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[linear-gradient(135deg,#F6D58B,#D4A853)] text-sm font-black text-[#07111F] shadow-[0_14px_32px_rgba(212,168,83,0.25)]">
            {initials}
          </div>
          <div>
            <div className="text-base font-semibold text-[#07111F]">{testimonial.name}</div>
            <div className="text-sm text-slate-500">{testimonial.location}</div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1 text-[#D4A853]">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={`${testimonial.id}-${index}`} size={16} className="fill-current" />
          ))}
        </div>
        <p className="mt-4 min-h-0 flex-1 text-sm leading-7 text-slate-600 sm:text-[0.95rem] sm:leading-7 line-clamp-4">
          &ldquo;{testimonial.review}&rdquo;
        </p>
        <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
          <BadgeCheck size={14} />
          Verified Buyer
        </div>
      </Card>
    </motion.div>
  );
}
