export type CategorySlug =
  | "diapers"
  | "feeding"
  | "strollers"
  | "toys"
  | "clothing"
  | "baby-gear"
  | "nursing"
  | "bath-care"
  | "nursery-furniture"
  | "safety"
  | "bedding"
  | "learning";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  productCount: number;
  image: string;
  guide: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  warranty: string;
  badge?: string;
  image: string;
  gallery: string[];
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  emiMonthly: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  amount: number;
  status: "Delivered" | "Processing" | "Shipped" | "Returned";
}
