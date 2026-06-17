export interface BrandLogo {
  name: string;
  slug: string;
  tagline: string;
  productCount: number;
  logoSrc?: string;
  wordmarkClass: string;
}

export const babyBrands: BrandLogo[] = [
  { name: "Pampers", slug: "pampers", tagline: "Diaper essentials", productCount: 34, wordmarkClass: "text-[#0EA5E9] font-extrabold tracking-[-0.03em]" },
  { name: "Huggies", slug: "huggies", tagline: "Soft comfort daily", productCount: 28, wordmarkClass: "text-[#E11D48] font-extrabold tracking-[-0.03em]" },
  { name: "Chicco", slug: "chicco", tagline: "Nurture on the move", productCount: 22, wordmarkClass: "text-[#8B5CF6] font-extrabold tracking-[-0.03em]" },
  { name: "Philips Avent", slug: "philips-avent", tagline: "Careful feeding", productCount: 31, wordmarkClass: "text-[#0369A1] font-extrabold tracking-[-0.02em]" },
  { name: "Fisher-Price", slug: "fisher-price", tagline: "Safe play essentials", productCount: 26, wordmarkClass: "text-[#EF4444] font-extrabold" },
  { name: "Johnson’s Baby", slug: "johnsons-baby", tagline: "Gentle baby care", productCount: 15, wordmarkClass: "text-[#D97706] font-extrabold" },
  { name: "Graco", slug: "graco", tagline: "Travel-ready comfort", productCount: 19, wordmarkClass: "text-[#16A34A] font-extrabold tracking-[-0.02em]" }
];

export const brandNames = babyBrands.map((brand) => brand.name);

// Compatibility alias for existing imports
export const applianceBrands = babyBrands;
