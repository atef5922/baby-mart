export interface BrandLogo {
  name: string;
  slug: string;
  tagline: string;
  productCount: number;
  logoSrc?: string;
  wordmarkClass: string;
}

export const babyBrands: BrandLogo[] = [
  { name: "Nestle Bangladesh", slug: "nestle-bangladesh", tagline: "Cerelac and Lactogen", productCount: 2, wordmarkClass: "text-[#DC2626] font-extrabold tracking-[-0.02em]" },
  { name: "Meril Baby", slug: "meril-baby", tagline: "Bangladeshi baby care", productCount: 3, wordmarkClass: "text-[#0F766E] font-extrabold tracking-[-0.02em]" },
  { name: "Savlon Twinkle", slug: "savlon-twinkle", tagline: "Bangladeshi diapering", productCount: 1, wordmarkClass: "text-[#1D4ED8] font-extrabold tracking-[-0.02em]" },
  { name: "Baby Mart Bangladesh", slug: "baby-mart-bangladesh", tagline: "Local baby essentials", productCount: 18, wordmarkClass: "text-[#7C3AED] font-extrabold" },
  { name: "Sebamed", slug: "sebamed", tagline: "Baby bath care", productCount: 1, wordmarkClass: "text-[#0284C7] font-extrabold" },
  { name: "Watsons", slug: "watsons", tagline: "Baby wipes", productCount: 1, wordmarkClass: "text-[#EC4899] font-extrabold" },
  { name: "Ella's Kitchen", slug: "ellas-kitchen", tagline: "Baby fruit pouches", productCount: 1, wordmarkClass: "text-[#EC4899] font-extrabold" },
  { name: "Heinz", slug: "heinz", tagline: "Baby snacks", productCount: 1, wordmarkClass: "text-[#16A34A] font-extrabold" },
  { name: "Cow & Gate", slug: "cow-gate", tagline: "Baby porridge", productCount: 1, wordmarkClass: "text-[#DC2626] font-extrabold" },
  { name: "Tesco", slug: "tesco", tagline: "Organic baby porridge", productCount: 1, wordmarkClass: "text-[#7C3AED] font-extrabold" }
];

export const brandNames = babyBrands.map((brand) => brand.name);

export const applianceBrands = babyBrands;
