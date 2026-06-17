import { Award, CreditCard, Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/category/diapers" },
  { label: "Baby Brands", href: "/brands" },
  { label: "Deals", href: "/deals" },
  { label: "Parenting Guide", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const trustBadges = [
  { icon: ShieldCheck, title: "100% Original", text: "Brand authorized products" },
  { icon: Truck, title: "Free Delivery", text: "On selected orders above Tk 2,000" },
  { icon: RotateCcw, title: "Easy Returns", text: "7 days replacement promise" },
  { icon: Award, title: "Safety Certified", text: "100% non-toxic child-safe" },
  { icon: CreditCard, title: "0% EMI Available", text: "Up to 12 months on baby gear" },
  { icon: Headphones, title: "24/7 Support", text: "Expert parenting assistance" }
];

export const faqs = [
  {
    q: "Do you sell authentic baby brands?",
    a: "Yes. Baby Mart lists only 100% original, brand-authorized products with certified safety standards."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 7-day easy replacement policy for unused and sealed baby products."
  },
  {
    q: "How fast is delivery?",
    a: "Dhaka metro deliveries are typically 24-48 hours. Outside Dhaka, shipping takes 2-4 business days."
  },
  {
    q: "Is this backend-ready?",
    a: "Yes, the frontend uses fully typed, modular React code, state stores, and dynamic endpoints."
  }
];
