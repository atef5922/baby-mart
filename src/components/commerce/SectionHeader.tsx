import Link from "next/link";
import { ArrowRight } from "lucide-react";

const emphasizedEyebrows = new Set(["Best Sellers", "Trending Products", "New Arrivals"]);

export function SectionHeader({
  eyebrow,
  title,
  text,
  href = "/shop",
  inverse = false,
  campaign = false
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  href?: string;
  inverse?: boolean;
  campaign?: boolean;
}) {
  const usePremiumEyebrow = eyebrow ? emphasizedEyebrows.has(eyebrow) : false;

  return (
    <div className={`mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6 ${campaign ? "rounded-[28px] border border-[#D4A853]/18 bg-[linear-gradient(135deg,rgba(7,17,31,0.98),rgba(15,23,42,0.95))] px-5 py-5 text-white shadow-[0_22px_72px_rgba(7,17,31,0.18)] sm:px-7" : ""}`}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <div
            className={`mb-3 inline-flex items-center uppercase ${
              usePremiumEyebrow
                ? "text-[11px] font-black tracking-[0.24em] text-[#C8922D]"
                : `text-xs font-black tracking-[0.28em] ${campaign || inverse ? "text-[#F8DEAA]" : "text-[#dc2626]"}`
            }`}
          >
            {eyebrow}
          </div>
        ) : null}
        <h2
          className={`text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance sm:text-[2.65rem] lg:text-[3rem] ${campaign || inverse ? "text-white" : "text-[#07111F]"}`}
        >
          {title}
        </h2>
        {text ? (
          <p className={`mt-4 max-w-3xl text-sm leading-7 sm:text-base ${campaign || inverse ? "text-slate-300" : "text-slate-600"}`}>{text}</p>
        ) : null}
      </div>
      <Link
        href={href}
        className={`premium-hover hidden items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-sm hover:-translate-y-1 sm:flex ${
          campaign || inverse
            ? "border-white/12 bg-white/6 text-white hover:border-[#D4A853]/60 hover:bg-white/10 hover:text-[#F8DEAA]"
            : "border-slate-200 bg-white text-[#07111F] hover:border-[#D4A853] hover:text-[#9a6d21]"
        }`}
      >
        View All <ArrowRight size={16} />
      </Link>
    </div>
  );
}
