"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Zap } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";
import { Button } from "@/components/ui/Button";

export function FlashSale() {
  const time = useCountdown(11);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(112deg,#5a0a14_0%,#9b1020_34%,#da3b2f_68%,#ffac45_100%)] py-12 text-white lg:py-14">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=1200&q=80"
          alt="Premium baby care showroom background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-24"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(90,10,20,0.94)_0%,rgba(155,16,32,0.92)_28%,rgba(203,38,41,0.78)_58%,rgba(255,172,69,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(7,17,31,0.18),transparent_28%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-full max-w-[40rem] lg:block">
        <div className="absolute bottom-[8%] right-[4%] h-[76%] w-[36%]">
          <Image src="https://images.unsplash.com/photo-1594911774802-8822a7079db1?auto=format&fit=crop&w=600&q=80" alt="Premium baby stroller" fill sizes="24vw" className="object-cover rounded-[24px] drop-shadow-[0_24px_28px_rgba(0,0,0,0.25)] border-2 border-white/20" />
        </div>
        <div className="absolute bottom-[8%] right-[32%] h-[58%] w-[28%]">
          <Image src="https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=600&q=80" alt="Premium baby toys" fill sizes="18vw" className="object-cover rounded-[20px] drop-shadow-[0_22px_26px_rgba(0,0,0,0.22)] border-2 border-white/20" />
        </div>
      </div>

      <div className="relative mx-auto grid min-h-[300px] w-full max-w-[1536px] items-center gap-8 px-4 sm:px-6 lg:min-h-[340px] lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="max-w-[720px]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur">
            <Zap size={14} className="text-[#ffe082]" />
            Flash Sale Live
          </div>
          <h2 className="premium-heading mt-4 text-[2.2rem] font-black leading-[0.92] tracking-[-0.05em] sm:text-[3rem] lg:text-[4rem]">
            Limited-Time Baby Offers.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/88 lg:text-base">
            Special campaign pricing on premium diaper bundles, baby clothing sets, and nursery gear with certified safety standards and fast delivery.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg" className="!text-[#07111F]">
              <Link href="/deals">Shop Baby Deals</Link>
            </Button>
            <Button asChild size="lg" className="border border-white/18 bg-white/12 !text-white shadow-none hover:bg-white/18">
              <Link href="/shop">Explore Baby Collection</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-start lg:justify-end">
          <div className="w-full max-w-[390px] rounded-[1.8rem] border border-white/16 bg-[#07111F]/36 p-5 shadow-[0_24px_64px_rgba(7,17,31,0.24)] backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-3 text-white/92">
              <Clock size={18} className="text-[#ffe082]" />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">Offer Ends In</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Hours", value: time.hours },
                { label: "Minutes", value: time.minutes },
                { label: "Seconds", value: time.seconds }
              ].map((item) => (
                <div key={item.label} className="rounded-[1.2rem] border border-white/10 bg-white/10 px-3 py-4 text-center">
                  <div className="text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">{item.value}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-3 text-sm leading-6 text-white/86">
              Top categories in campaign: Diapers & Hygiene, Baby Clothing, Feeding, and Baby Toys.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
