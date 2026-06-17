"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, Product } from "@/types/commerce";

interface CartStore {
  lines: CartLine[];
  wishlist: string[];
  compare: string[];
  recent: Product[];
  cartDrawerOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  addRecent: (product: Product) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      lines: [],
      wishlist: [],
      compare: [],
      recent: [],
      cartDrawerOpen: false,
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.product.id === product.id);
          if (existing) {
            return {
              cartDrawerOpen: true,
              lines: state.lines.map((line) =>
                line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line
              )
            };
          }
          return {
            cartDrawerOpen: true,
            lines: [...state.lines, { product, quantity }]
          };
        }),
      removeFromCart: (id) => set((state) => ({ lines: state.lines.filter((line) => line.product.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          lines: state.lines.map((line) => (line.product.id === id ? { ...line, quantity: Math.max(1, quantity) } : line))
        })),
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id) ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id]
        })),
      toggleCompare: (id) =>
        set((state) => ({
          compare: state.compare.includes(id)
            ? state.compare.filter((item) => item !== id)
            : [...state.compare, id].slice(-4)
        })),
      addRecent: (product) =>
        set((state) => ({
          recent: [product, ...state.recent.filter((item) => item.id !== product.id)].slice(0, 6)
        })),
      openCartDrawer: () => set({ cartDrawerOpen: true }),
      closeCartDrawer: () => set({ cartDrawerOpen: false }),
      clearCart: () => set({ lines: [] })
    }),
    {
      name: "babymart-commerce-state",
      partialize: (state) => ({
        lines: state.lines,
        wishlist: state.wishlist,
        compare: state.compare,
        recent: state.recent
      })
    }
  )
);
