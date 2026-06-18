/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, Mail, Menu, Phone, Search, ShoppingCart, UserRound, WalletCards, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { categories, newArrivalsLogo, products } from "@/data/catalog";
import { navItems } from "@/data/site";
import { useCartStore } from "@/store/cartStore";
import { CartQuantityControl } from "@/components/commerce/CartQuantityControl";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";

const utilityMenuItems = [
  { label: "About", href: "/about-us" },
  { label: "FAQ", href: "/contact" }
] as const;

const mainNavItems = [
  { label: "HOME", href: "/" },
  { label: "COLLECTION", href: "/collection" },
  { label: "KIDS", href: "/kids" },
  { label: "SHOP", href: "/shop" },
  { label: "FROCKS", href: "/frocks" },
  { label: "SHORTS", href: "/shorts" },
  { label: "PAGES", href: "/about-us" }
] as const;

const pageSubmenuItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" }
] as const;

const pagesPathnames = ["/about-us", "/contact", "/blog"] as const;

export function Header() {
  const [userOpen, setUserOpen] = useState(false);
  const [categorySidebarOpen, setCategorySidebarOpen] = useState(false);
  const userMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showHeaderGroupA, setShowHeaderGroupA] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false);
  const searchInputRef = useRef<HTMLDivElement | null>(null);
  const pagesMenuRef = useRef<HTMLDivElement | null>(null);
  const pagesCloseTimerRef = useRef<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const lines = useCartStore((state) => state.lines);
  const wishlist = useCartStore((state) => state.wishlist);
  const cartOpen = useCartStore((state) => state.cartDrawerOpen);
  const openCartDrawer = useCartStore((state) => state.openCartDrawer);
  const closeCartDrawer = useCartStore((state) => state.closeCartDrawer);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const wishlistCount = wishlist.length;
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const lastScrollY = useRef(0);
  const [userMenuStyle, setUserMenuStyle] = useState({ top: -9999, left: -9999 });
  const [searchMenuStyle, setSearchMenuStyle] = useState({ top: -9999, left: -9999, width: 0 });
  const SCROLL_THRESHOLD = 8;

  const clearPagesCloseTimer = useCallback(() => {
    if (!pagesCloseTimerRef.current) return;
    window.clearTimeout(pagesCloseTimerRef.current);
    pagesCloseTimerRef.current = null;
  }, []);

  const openPagesMenu = useCallback(() => {
    clearPagesCloseTimer();
    setIsPagesMenuOpen(true);
  }, [clearPagesCloseTimer]);

  const closePagesMenu = useCallback(() => {
    clearPagesCloseTimer();
    setIsPagesMenuOpen(false);
  }, [clearPagesCloseTimer]);

  const schedulePagesMenuClose = useCallback(() => {
    clearPagesCloseTimer();
    pagesCloseTimerRef.current = window.setTimeout(() => setIsPagesMenuOpen(false), 120);
  }, [clearPagesCloseTimer]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return products
      .filter((product) =>
        [product.name, product.brand, product.category, ...product.tags].some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        )
      )
      .slice(0, 6);
  }, [query]);

  const submitSearch = () => {
    const value = query.trim();
    if (!value) {
      toast.error("Type a product, brand, or category to search.");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
    setSearchFocused(false);
    setUserOpen(false);
    closeCartDrawer();
  };

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHasScrolled(currentY > 8);
      setShowHeaderGroupA(currentY <= SCROLL_THRESHOLD);

      lastScrollY.current = currentY;

      if (currentY >= 48) {
        setUserOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isNavActive = (href: string) => {
    const isHome = href === "/" && pathname === "/";
    if (isHome) return true;

    if (pathname === href) return true;

    const hasNestedMatch =
      href !== "/" &&
      (pathname.startsWith(`${href}/`) ||
        (href === "/kids" && ["/category/frocks", "/category/kids-dress", "/category/shorts", "/category/toys"].some((categoryPath) => pathname.startsWith(categoryPath))) ||
        (href === "/frocks" && pathname.startsWith("/category/frocks")) ||
        (href === "/shorts" && pathname.startsWith("/category/shorts")) ||
        (href === "/about-us" && pagesPathnames.some((entry) => pathname === entry || pathname.startsWith(`${entry}/`))) ||
        (href === "/collection" && pathname.startsWith("/collection/")));

    return hasNestedMatch;
  };

  const activeNavLabel = mainNavItems.find((item) => isNavActive(item.href))?.label ?? null;

  useEffect(() => {
    closeCartDrawer();
    setUserOpen(false);
    setCategorySidebarOpen(false);
    setIsPagesMenuOpen(false);
    setMobilePagesOpen(false);
    setShowHeaderGroupA(true);
    setHasScrolled(false);
    lastScrollY.current = 0;
  }, [pathname, closeCartDrawer]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!cartOpen) return;

    const timer = window.setTimeout(() => {
      closeCartDrawer();
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [cartOpen, closeCartDrawer]);

  useEffect(() => {
    if (!cartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!categorySidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCategorySidebarOpen(false);
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [categorySidebarOpen]);

  useEffect(() => {
    if (!isPagesMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (pagesMenuRef.current?.contains(target)) return;
      closePagesMenu();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePagesMenu();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPagesMenuOpen, closePagesMenu]);

  useEffect(() => {
    if (!userOpen) return;

    const updateMenuPosition = () => {
      const button = userMenuButtonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      setUserMenuStyle({
        top: rect.bottom + 8,
        left: Math.max(8, rect.right - 288)
      });
    };

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const button = userMenuButtonRef.current;
      const menu = userMenuRef.current;
      if ((button && button.contains(target)) || (menu && menu.contains(target))) return;
      setUserOpen(false);
    };

    updateMenuPosition();
    window.addEventListener("scroll", updateMenuPosition, { passive: true });
    window.addEventListener("resize", updateMenuPosition);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition);
      window.removeEventListener("resize", updateMenuPosition);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [userOpen]);

  useEffect(() => {
    if (!isClient || !searchInputRef.current) return;
    if (!query.trim().length) return;

    const updateSearchMenuPosition = () => {
      const container = searchInputRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setSearchMenuStyle({
        top: rect.bottom + 12,
        left: rect.left,
        width: rect.width
      });
    };

    updateSearchMenuPosition();
    window.addEventListener("scroll", updateSearchMenuPosition, { passive: true });
    window.addEventListener("resize", updateSearchMenuPosition);

    return () => {
      window.removeEventListener("scroll", updateSearchMenuPosition);
      window.removeEventListener("resize", updateSearchMenuPosition);
    };
  }, [isClient, query, searchFocused]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div
        className={`fixed inset-x-0 top-0 z-50 hidden h-[110px] overflow-visible bg-white transition-[transform,opacity] duration-[300ms] ease-in-out lg:block ${showHeaderGroupA ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="h-[34px] overflow-hidden border-b border-white/20 bg-[linear-gradient(90deg,rgba(255,45,85,0.95),rgba(255,77,109,0.95))] text-white backdrop-blur-[10px]">
          <Container className="flex h-full items-center justify-between gap-4 px-4 text-[12px] font-normal leading-none">
          <div className="flex items-center gap-4">
            <a href="mailto:info@baby-mart.com" className="group inline-flex items-center gap-2">
              <Mail size={14} className="transition duration-200 ease-in-out group-hover:scale-105 group-hover:text-[#ffd3df]" />
              <span>info@baby-mart.com</span>
            </a>
            <a href="tel:+880000000000" className="group inline-flex items-center gap-2">
              <Phone size={14} className="transition duration-200 ease-in-out group-hover:scale-105 group-hover:text-[#ffd3df]" />
              <span>+880-XXXX-XXXX</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {utilityMenuItems.map((item) => (
              <Link key={item.label} href={item.href} className="inline-flex items-center gap-2">
                {item.label}
              </Link>
            ))}
            <Link href="/wishlist" className="group inline-flex items-center gap-2" aria-label="Wishlist">
              <Heart size={14} className="transition duration-200 ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,45,85,0.42)]" />
              <span>Wishlist</span>
            </Link>
            <div className="relative">
              <button
                ref={userMenuButtonRef}
                onClick={() => setUserOpen((open) => !open)}
                className="group inline-flex items-center gap-2"
                aria-label="Login or register"
              >
                <UserRound size={14} className="transition duration-200 ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,45,85,0.42)]" />
                <span>Login / Register</span>
              </button>
            </div>
          </div>
          </Container>
        </div>

        <div className="relative z-50 bg-white">
          <div className="border-b border-[#e5e7eb] bg-white shadow-[0_8px_26px_rgba(0,0,0,0.05)]">
          <Container className="h-[76px] px-4">
          <div className="flex h-full items-center gap-4">
            <Link href="/" className="flex items-center gap-3 pl-5">
              <Image src={newArrivalsLogo} alt="Baby Mart logo" width={320} height={96} className="h-[68px] w-auto object-contain sm:h-[70px] xl:h-[74px]" priority />
            </Link>

            <div className="mx-4 hidden flex-1 items-center justify-center md:flex">
              <p className="text-sm font-medium text-[#111827]">Safe &amp; Certified Baby Products for Your Little Ones</p>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div
                ref={searchInputRef}
                className="relative min-w-0 flex-1 md:flex-none md:max-w-[430px]"
              >
                <div className={`relative flex h-11 items-center overflow-hidden rounded-[6px] border bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all duration-200 ${searchFocused ? "border-[#ff2d55] shadow-[0_0_0_4px_rgba(255,45,85,0.12)]" : "border-[#e5e7eb]"}`}>
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => window.setTimeout(() => setSearchFocused(false), 140)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") submitSearch();
                    }}
                    placeholder="Search baby products, toys, essentials..."
                    className="h-full border-0 bg-transparent px-4 pr-12 text-sm text-[#111827] placeholder:text-[#9ca3af] placeholder:text-[13px] shadow-none focus:border-0 focus:ring-0"
                    aria-label="Search products"
                  />
                  <button
                    type="button"
                    aria-label="Search"
                    onClick={submitSearch}
                    className="absolute right-0 flex h-full w-[44px] shrink-0 items-center justify-center text-[#6b7280] transition duration-200 ease-in-out hover:scale-105 hover:text-[#ff2d55]"
                  >
                    <Search size={18} />
                  </button>
                </div>
                {isClient && query.trim().length > 0 &&
                  createPortal(
                    <div
                      style={{ top: searchMenuStyle.top, left: searchMenuStyle.left, width: searchMenuStyle.width }}
                      className="pointer-events-auto fixed z-[200] overflow-hidden rounded-md border border-[#e5e7eb] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.15)]"
                    >
                      <div className="border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
                        Relevant Suggestions
                      </div>
                      <div className="p-2">
                        {suggestions.length ? suggestions.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => setSearchFocused(false)}
                            className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
                          >
                            <div className="min-w-0">
                              <div className="truncate text-sm font-semibold text-[#111827]">{product.name}</div>
                              <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{product.brand} &bull; {product.category}</div>
                            </div>
                            <span className="ml-4 text-sm font-semibold text-[#111827]">{formatPrice(product.price)}</span>
                          </Link>
                        )) : <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No products found. Try diapers, baby clothing, feeding, or toys.</div>}
                      </div>
                    </div>,
                    document.body
                  )}
              </div>

              <div className="hidden items-center gap-4 lg:flex">
                <div className="relative inline-flex">
                  <select className="h-11 cursor-pointer appearance-none border-0 bg-transparent px-3 pr-8 text-sm font-medium text-[#111827] outline-none transition duration-200 ease-in-out hover:text-[#ff2d55]" defaultValue="BDT">
                    <option>BDT</option>
                    <option>USD</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                </div>

                <Link href="/wishlist" aria-label="Wishlist" title="Wishlist" className="group/icon relative inline-flex h-10 w-10 items-center justify-center rounded-md text-[#111827] transition duration-200 ease-in-out hover:scale-105 hover:bg-[#fff1f3] hover:text-[#ff2d55]">
                  <Heart size={18} className="transition duration-200 ease-in-out group-hover/icon:scale-110 group-hover/icon:fill-[#ff2d55] group-hover/icon:drop-shadow-[0_0_12px_rgba(255,45,85,0.42)]" />
                  {wishlistCount > 0 ? (
                    <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[#ff2d55] px-1 text-center text-[10px] font-bold text-white">{wishlistCount}</span>
                  ) : null}
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-[120] mb-2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#07111F] px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-[0_12px_30px_rgba(7,17,31,0.2)] transition duration-200 group-hover/icon:opacity-100">
                    Wishlist
                  </span>
                </Link>

                <button
                  onClick={openCartDrawer}
                  title="Cart"
                  className="group/icon relative inline-flex h-10 w-10 items-center justify-center rounded-md text-[#111827] transition duration-200 ease-in-out hover:scale-105 hover:bg-[#fff1f3] hover:text-[#ff2d55]"
                  aria-label="Open cart"
                >
                  <ShoppingCart size={18} className="transition duration-200 ease-in-out group-hover/icon:scale-110 group-hover/icon:drop-shadow-[0_0_12px_rgba(255,45,85,0.42)]" />
                  {count > 0 && (
                    <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-[#ff2d55] px-1 text-center text-[10px] font-bold text-white">{count}</span>
                  )}
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-[120] mb-2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-[#07111F] px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-[0_12px_30px_rgba(7,17,31,0.2)] transition duration-200 group-hover/icon:opacity-100">
                    Cart
                  </span>
                </button>
              </div>
            </div>
            </div>
          </Container>
        </div>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 z-[60] bg-white transition-[top] duration-[300ms] ease-in-out ${showHeaderGroupA ? "top-0 lg:top-[110px]" : "top-0"}`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-[#ff2d55] via-[#ff9f43] via-[#ad5dff] to-[#3b82f6] shadow-[0_0_2px_rgba(255,45,85,0.35)]" />
          <Container className="flex h-[56px] items-center px-4 lg:h-[55px]">
            <div className="flex w-full items-center justify-between gap-2 lg:hidden">
              <Link href="/" className="flex min-w-0 items-center">
                <Image src={newArrivalsLogo} alt="Baby Mart logo" width={190} height={58} className="h-12 w-auto max-w-[150px] object-contain" priority />
              </Link>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Open mobile menu"
                  onClick={() => setCategorySidebarOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-[#111827] transition hover:border-[#ff2d55] hover:text-[#ff2d55]"
                >
                  <Search size={17} />
                </button>
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="relative grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-[#111827] transition hover:border-[#ff2d55] hover:text-[#ff2d55]"
                >
                  <Heart size={17} />
                  {wishlistCount > 0 ? <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-full bg-[#ff2d55] px-1 text-center text-[10px] font-bold text-white">{wishlistCount}</span> : null}
                </Link>
                <button
                  type="button"
                  onClick={openCartDrawer}
                  aria-label="Open cart"
                  className="relative grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-[#111827] transition hover:border-[#ff2d55] hover:text-[#ff2d55]"
                >
                  <ShoppingCart size={17} />
                  {count > 0 ? <span className="absolute -right-1.5 -top-1.5 min-w-5 rounded-full bg-[#ff2d55] px-1 text-center text-[10px] font-bold text-white">{count}</span> : null}
                </button>
                <button
                  type="button"
                  aria-label="Open menu"
                  onClick={() => setCategorySidebarOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-md bg-[#ff2d55] text-white transition hover:bg-[#07111F]"
                >
                  <Menu size={18} />
                </button>
              </div>
            </div>
              <button
                className="group relative mr-4 hidden h-11 items-center gap-2 rounded-[6px] bg-transparent px-4 text-sm font-medium text-[#111827] transition duration-200 ease-in-out hover:bg-[#fff1f3] lg:inline-flex"
                onClick={() => {
                setCategorySidebarOpen(true);
            }}
            aria-label="Open categories"
          >
              <Menu size={18} className="transition duration-200 ease-in-out group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,45,85,0.35)]" />
              <span>All Categories</span>
            </button>

    <nav className="relative hidden min-h-full flex-1 items-center justify-center overflow-visible lg:flex">
            <div className="mx-auto flex flex-wrap items-center justify-center gap-6 font-medium leading-none sm:gap-7">
                  {mainNavItems.map((item) => {
                const active = item.label === activeNavLabel;
                if (item.label === "PAGES") {
                    const isPagesActive = pagesPathnames.some((entry) => pathname === entry || pathname.startsWith(`${entry}/`));
                  return (
                    <div
                      key={item.label}
                      ref={pagesMenuRef}
                      className="group/pages relative"
                      onMouseEnter={openPagesMenu}
                      onMouseLeave={schedulePagesMenuClose}
                      onFocus={openPagesMenu}
                      onBlur={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
                        schedulePagesMenuClose();
                      }}
                    >
                      <button
                        type="button"
                        className={`group inline-flex h-11 cursor-pointer items-center whitespace-nowrap text-sm uppercase tracking-[0.05em] leading-none transition-colors duration-200 ease-in-out hover:text-[#ff2d55] ${isPagesActive ? "font-semibold text-[#ff2d55]" : "font-medium text-[#111827]"}`}
                        onClick={() => setIsPagesMenuOpen((open) => !open)}
                        onPointerEnter={openPagesMenu}
                        onKeyDown={(event) => {
                          if (event.key === "Escape") {
                            closePagesMenu();
                          } else if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setIsPagesMenuOpen((open) => !open);
                          }
                        }}
                        aria-expanded={isPagesMenuOpen}
                        aria-haspopup="menu"
                        aria-controls="pages-submenu"
                      >
                        <span className="relative inline-flex">
                          {item.label}
                          <span
                            className={`pointer-events-none absolute bottom-[-6px] left-1/2 z-10 h-[2px] w-full max-w-full -translate-x-1/2 rounded-full bg-[#ff2d55] transition-[transform,opacity] duration-200 ease-in-out ${isPagesActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"} group-hover:scale-x-100 group-hover:opacity-100`}
                            aria-hidden="true"
                          />
                        </span>
                        <ChevronDown size={12} className={`ml-1 transition-transform duration-200 group-hover/pages:rotate-180 ${isPagesMenuOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        id="pages-submenu"
                        role="menu"
                        className={`absolute left-1/2 top-full z-[90] mt-0 flex w-[220px] -translate-x-1/2 flex-col rounded-xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_54px_rgba(7,17,31,0.16)] ring-1 ring-white/70 transition-all duration-200 ease-in-out ${
                          isPagesMenuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
                        }`}
                      >
                        {pageSubmenuItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            role="menuitem"
                            onClick={closePagesMenu}
                            className="group/item flex items-center justify-between whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold text-[#111827] transition duration-200 ease-in-out hover:bg-[#fff1f3] hover:text-[#ff2d55] focus-visible:bg-[#fff1f3] focus-visible:text-[#ff2d55] focus-visible:outline-none"
                          >
                            <span>{subItem.label}</span>
                            <ChevronDown size={14} className="-rotate-90 text-slate-300 transition duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-[#ff2d55]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group inline-flex h-11 items-center whitespace-nowrap text-sm uppercase tracking-[0.05em] leading-none transition-colors duration-200 ease-in-out hover:text-[#ff2d55] ${active ? "font-semibold text-[#ff2d55]" : "font-medium text-[#111827]"}`}
                  >
                    <span className="relative inline-flex">
                      {item.label}
                      <span
                        className={`pointer-events-none absolute bottom-[-6px] left-1/2 z-10 h-[2px] w-full max-w-full -translate-x-1/2 rounded-full bg-[#ff2d55] transition-[transform,opacity] duration-200 ease-in-out ${active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </Container>
        <div
          className={`h-[2px] w-full bg-gradient-to-r from-[#ff2d55] via-[#ff9f43] via-[#ad5dff] to-[#3b82f6] shadow-[0_0_6px_rgba(255,45,85,0.35)] transition-opacity duration-200 ${
            hasScrolled ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      </div>
      {isClient && userOpen &&
        createPortal(
          <div
            ref={userMenuRef}
            style={{ top: userMenuStyle.top, left: userMenuStyle.left }}
            className="pointer-events-auto fixed z-[120] w-72 border border-slate-200 bg-white p-3 shadow-[0_28px_90px_rgba(7,17,31,0.18)]"
          >
            <div className="bg-[#07111F] p-4 text-white">
              <div className="font-semibold">Welcome to Baby Mart</div>
              <div className="mt-1 text-xs text-slate-300">Track orders, saved addresses, wishlist, and returns.</div>
            </div>
            {["Dashboard", "Orders", "Wishlist", "Settings"].map((item) => (
              <Link key={item} href={item === "Dashboard" ? "/dashboard" : `/${item.toLowerCase()}`} className="mt-1 flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold hover:bg-slate-50">
                {item} <ChevronDown size={14} className="-rotate-90" />
              </Link>
            ))}
          </div>,
          document.body
        )}

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-[#07111F]/42 backdrop-blur-[1px]"
            onClick={closeCartDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <motion.aside
              className="ml-auto flex h-full w-full max-w-[440px] flex-col border-l border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-100/95 p-0 shadow-[0_32px_100px_rgba(7,17,31,0.28)] backdrop-blur-sm overflow-hidden rounded-none"
              onClick={(event) => event.stopPropagation()}
              initial={{ x: 260, opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 180, opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.8 }}
            >
              <motion.div
                className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-5 py-5 backdrop-blur-xl"
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Shopping Cart</p>
                    <h2 className="mt-1 text-2xl font-black tracking-[-0.01em] text-[#07111F]">Your Cart</h2>
                    <p className="mt-1 text-sm text-slate-500">{count} item{count === 1 ? "" : "s"} ready for checkout</p>
                  </div>
                  <motion.button
                    onClick={closeCartDrawer}
                    whileHover={{ rotate: 90, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="mt-1 grid h-10 w-10 place-items-center border border-slate-200 bg-white text-slate-500 shadow-[0_10px_24px_rgba(7,17,31,0.06)] transition hover:border-[#D4A853] hover:text-[#B9832B]"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
                <motion.div
                  className="rounded-lg border border-slate-200 bg-[#07111F] px-4 py-3 text-white shadow-[0_18px_46px_rgba(7,17,31,0.2)]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F3D28A]">Estimated Total</div>
                      <div className="mt-2 text-3xl font-black tracking-[-0.04em]">{formatPrice(subtotal)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-right">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-slate-300">Benefits</div>
                      <div className="mt-1 text-sm font-semibold">EMI Ready</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              <div className="mt-5 min-h-0 flex-1 overflow-y-auto px-5 py-2 pr-2 space-y-5">
                <motion.div
                  className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  Tip: keep the cart in one place and apply checkout modifiers here before payment.
                </motion.div>
                <div className="grid gap-3">
                {lines.length ? lines.map((line) => (
                  <motion.div
                    key={line.product.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    whileHover={{ y: -2, boxShadow: "0 14px 34px rgba(7,17,31,0.12)" }}
                    className="flex gap-4 rounded-sm border border-slate-200 bg-white p-3.5 transition-shadow"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-slate-100">
                      <Image src={line.product.image} alt={line.product.name} fill className="object-contain p-2" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-sm font-semibold leading-5 text-[#07111F]">{line.product.name}</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{line.product.brand}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#7a5616]">
                        <CartQuantityControl
                          quantity={line.quantity}
                          compact
                          onDecrease={() => updateQuantity(line.product.id, line.quantity - 1)}
                          onIncrease={() => updateQuantity(line.product.id, line.quantity + 1)}
                        />
                        <span className="text-slate-300">&bull;</span>
                        <span>{formatPrice(line.product.price)}</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removeFromCart(line.product.id)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className="grid h-8 w-8 place-items-center rounded-sm border border-transparent text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove from cart"
                    >
                      <X size={15} />
                    </motion.button>
                  </motion.div>
                )) : (
                  <div className="rounded-sm border border-dashed border-slate-200 bg-white p-8 text-center">
                    <ShoppingCart className="mx-auto text-slate-400" />
                    <div className="mt-3 font-semibold">Your cart is empty</div>
                    <p className="mt-1 text-sm text-slate-500">Add a premium baby product and it will appear here instantly.</p>
                  </div>
                )}
              </div>
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold"><WalletCards className="text-[#D4A853]" size={17} /> EMI, coupon, and checkout flow ready</div>
              </div>
              <motion.div
                className="sticky bottom-0 z-10 bg-white/95 px-5 py-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="grid gap-2">
                  <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                    <Button asChild variant="gold" className="w-full !text-[#07111F]"><Link href="/cart">View Cart</Link></Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                    <Button asChild variant="default" className="w-full !text-white hover:!text-[#F8DEAA]"><Link href="/checkout">Checkout</Link></Button>
                  </motion.div>
                </div>
              </motion.div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {categorySidebarOpen && (
        <div className="fixed inset-0 z-[75] bg-[#07111F]/45 backdrop-blur-sm" onClick={() => setCategorySidebarOpen(false)}>
          <aside className="h-full w-[88vw] max-w-sm overflow-y-auto bg-white p-5 shadow-[0_28px_90px_rgba(7,17,31,0.28)]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" onClick={() => setCategorySidebarOpen(false)}>
                <Image src={newArrivalsLogo} alt="Baby Mart logo" width={236} height={72} className="h-14 w-auto object-contain" />
              </Link>
              <button onClick={() => setCategorySidebarOpen(false)} className="grid h-10 w-10 place-items-center rounded-md hover:bg-slate-100" aria-label="Close mobile menu"><X size={18} /></button>
            </div>
            <div className="mt-5">
              <Input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && submitSearch()} placeholder="Search premium baby products, brands, guides..." />
              <Button onClick={submitSearch} className="mt-2 w-full rounded-md !border-transparent !bg-[#FF3366] !text-white hover:!bg-[#07111F] hover:!text-white"><Search size={16} /> Search</Button>
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Navigation</div>
              <div className="grid gap-1">
                {mainNavItems.map((item) =>
                  item.label === "PAGES" ? (
                    <div key={item.label}>
                      <button
                        type="button"
                        onClick={() => setMobilePagesOpen((open) => !open)}
                        aria-expanded={mobilePagesOpen}
                        aria-controls="mobile-pages-menu"
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#ff2d55]"
                      >
                        <span>{item.label}</span>
                        <ChevronDown size={14} className={`transition ${mobilePagesOpen ? "rotate-180" : ""}`} />
                      </button>
                      {mobilePagesOpen ? (
                        <div id="mobile-pages-menu" className="ml-3 grid gap-1 border-l border-slate-200 pl-3">
                          {pageSubmenuItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={() => setCategorySidebarOpen(false)}
                              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-[#fff1f3] hover:text-[#ff2d55]"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setCategorySidebarOpen(false)}
                      className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#ff2d55]"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">All Categories</div>
              <div className="grid gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setCategorySidebarOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#9a6d21]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">More</div>
              <div className="grid gap-1">
                {[...navItems, { label: "Track Order", href: "/orders" }, { label: "Wishlist", href: "/wishlist" }, { label: "Dashboard", href: "/dashboard" }].map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setCategorySidebarOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#9a6d21]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-[#07111F] p-4 text-white">
              <div className="text-sm font-semibold text-[#F3D28A]">Premium Support</div>
              <p className="mt-1 text-xs leading-5 text-slate-300">Installation, EMI, warranty claims, and product guidance are one tap away.</p>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
