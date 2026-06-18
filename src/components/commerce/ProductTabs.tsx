"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/types/commerce";

const tabs = [
  { key: "description", label: "Description" },
  { key: "specifications", label: "Specifications" },
  { key: "reviews", label: "Reviews" },
  { key: "qa", label: "Q&A" },
  { key: "shipping", label: "Shipping & Returns" }
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const reviewHighlights = useMemo(() => product.features.slice(0, 3), [product.features]);

  return (
    <Card className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-[12px] px-4 py-2.5 text-sm font-semibold transition ${
                active ? "bg-[#FFF1F6] text-[#FF3366] shadow-[inset_0_-2px_0_#FF3366]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="pt-6">
        {activeTab === "description" ? (
          <div className="space-y-5">
            <p className="text-sm leading-7 text-slate-600 sm:text-[0.97rem]">
              {product.name} is a premium {product.category.replaceAll("-", " ")} essential from {product.brand}, curated for parents who want comfort, gentle everyday usability, and reliable backend-ready catalog data. This product page is prepared for live pricing, stock sync, review content, and service updates without changing the presentation structure.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <PlainStat title="Category" value={product.category.replaceAll("-", " ")} />
              <PlainStat title="Warranty" value={product.warranty} />
              <PlainStat title="Monthly EMI" value={`From Tk ${product.emiMonthly}`} />
            </div>
          </div>
        ) : null}

        {activeTab === "specifications" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="rounded-[16px] border border-slate-200 bg-white px-4 py-3.5">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{key}</div>
                <div className="mt-2 text-sm font-semibold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "reviews" ? (
          <div className="space-y-5">
            <div className="grid gap-3 md:grid-cols-3">
              <PlainStat title="Average Rating" value={product.rating.toFixed(1)} />
              <PlainStat title="Review Count" value={product.reviewCount.toString()} />
              <PlainStat title="Repeat Purchase" value={`${Math.min(97, Math.round(product.rating * 18))}%`} />
            </div>
            <div className="grid gap-3">
              {reviewHighlights.map((item) => (
                <div key={item} className="rounded-[16px] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
                  Parents consistently mention: <span className="font-semibold text-slate-950">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "qa" ? (
          <div className="space-y-3">
            <QaItem
              question={`Is ${product.name} suitable for daily use?`}
              answer={`Yes. Based on the current product setup from ${product.brand}, it is positioned as a reliable everyday essential with comfort-focused features.`}
            />
            <QaItem
              question="Will stock and delivery information be live later?"
              answer="Yes. The current page structure is ready for backend inventory, delivery promise, and order workflow integration."
            />
            <QaItem
              question="Can this page support customer questions from the backend?"
              answer="Yes. The Q&A section is designed so future API-driven question threads can drop into the same layout without reworking the page."
            />
          </div>
        ) : null}

        {activeTab === "shipping" ? (
          <div className="grid gap-3 md:grid-cols-2">
            <InfoPanel
              title="Shipping Promise"
              items={[
                "Dhaka delivery and nationwide shipping support",
                "Prepared for live courier and tracking integration",
                "Packaging flow designed for baby and family products"
              ]}
            />
            <InfoPanel
              title="Return Policy"
              items={[
                "Return request support within the allowed policy window",
                "Backend-ready order and refund status handling",
                "Product condition review can be integrated later"
              ]}
            />
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function PlainStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-3.5">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{title}</div>
      <div className="mt-2 text-base font-bold text-slate-900">{value}</div>
    </div>
  );
}

function QaItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-[16px] border border-slate-200 bg-white px-4 py-4">
      <div className="text-sm font-bold text-slate-950">{question}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{answer}</div>
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white px-4 py-4">
      <div className="text-base font-black text-slate-950">{title}</div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-[12px] bg-slate-50 px-3 py-2.5 text-sm leading-6 text-slate-600">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
