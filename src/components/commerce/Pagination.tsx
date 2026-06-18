"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function buildPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages] as const;
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages] as const;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pageItems = buildPageItems(currentPage, totalPages);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        className="rounded-md"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      {pageItems.map((item, index) =>
        item === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-sm font-semibold text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? "page" : undefined}
            className={cn(
              "grid h-10 min-w-10 place-items-center rounded-md border px-3 text-sm font-semibold transition",
              item === currentPage
                ? "border-[#FF3366] bg-[#FF3366] text-white shadow-[0_12px_24px_rgba(255,51,102,0.22)]"
                : "border-slate-200 bg-white text-slate-700 hover:border-[#FF3366] hover:text-[#FF3366]"
            )}
          >
            {item}
          </button>
        )
      )}

      <Button
        variant="outline"
        className="rounded-md"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
