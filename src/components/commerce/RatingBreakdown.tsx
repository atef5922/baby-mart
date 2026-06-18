import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/types/commerce";

export function RatingBreakdown({ product }: { product: Product }) {
  const rows = buildBreakdown(product.rating, product.reviewCount);
  const recommendationRate = Math.min(98, Math.max(84, Math.round(product.rating * 18)));

  return (
    <Card className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Ratings Breakdown</div>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">{product.rating.toFixed(1)}</h2>
          <div className="mt-2 flex items-center gap-1 text-[#FF3366]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`${product.id}-rating-star-${index}`}
                size={16}
                className={index < Math.round(product.rating) ? "fill-current" : "text-[#FFD8E5]"}
              />
            ))}
          </div>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3 text-right">
          <div className="text-lg font-black text-emerald-700">{recommendationRate}%</div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">Would recommend</div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {rows.map((row) => (
          <div key={`${product.id}-row-${row.label}`} className="grid grid-cols-[34px_1fr_38px] items-center gap-3 text-sm">
            <span className="font-semibold text-slate-700">{row.label}</span>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#FFE7EF]">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,#FF7AAA_0%,#FF3366_100%)]" style={{ width: `${row.percent}%` }} />
            </div>
            <span className="text-right text-slate-500">{row.count}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <MetricCard label="Verified reviews" value={product.reviewCount.toString()} />
        <MetricCard label="Parent trust score" value={`${Math.min(99, Math.round(product.rating * 19))}%`} />
      </div>
    </Card>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-xl font-black text-slate-900">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
    </div>
  );
}

function buildBreakdown(rating: number, reviewCount: number) {
  const total = Math.max(reviewCount, 5);
  const baseWeights = [5, 4, 3, 2, 1].map((value) => Math.max(0.12, 1.25 - Math.abs(value - rating) * 0.36));
  const weightTotal = baseWeights.reduce((sum, value) => sum + value, 0);

  let remaining = total;

  return baseWeights.map((weight, index) => {
    const label = `${5 - index}`;
    const count = index === baseWeights.length - 1 ? remaining : Math.max(0, Math.round((weight / weightTotal) * total));

    remaining -= count;

    return {
      label,
      count,
      percent: Math.max(6, Math.round((count / total) * 100))
    };
  });
}
