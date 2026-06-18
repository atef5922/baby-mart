"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type DropdownOption = {
  label: string;
  value: string;
};

export function DropdownSelect({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
  className
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      setOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-md border border-[#FF3366] bg-[#FF3366] px-3 text-left text-sm text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]/35 disabled:cursor-not-allowed disabled:bg-[#ff8faa]",
          open ? "ring-2 ring-[#FF3366]/35" : ""
        )}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>
        <ChevronDown size={16} className={cn("shrink-0 transition", open ? "rotate-180" : "")} />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 top-full z-50 mt-2 max-h-64 w-full min-w-full origin-top overflow-y-auto rounded-md border border-slate-200 bg-white py-1 shadow-[0_18px_44px_rgba(7,17,31,0.12)]"
        >
          <button
            type="button"
            role="option"
            aria-selected={value === ""}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={cn(
              "flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-slate-50",
              value === "" ? "bg-[#fff1f5] font-semibold text-[#FF3366]" : "text-slate-700"
            )}
          >
            {placeholder}
          </button>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-slate-50",
                option.value === value ? "bg-[#fff1f5] font-semibold text-[#FF3366]" : "text-slate-700"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
