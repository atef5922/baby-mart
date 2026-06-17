export type Testimonial = {
  id: string;
  name: string;
  location: string;
  review: string;
  rating: number;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "review-001",
    name: "Ariful Islam",
    location: "Dhaka",
    rating: 5,
    verified: true,
    review:
      "Outstanding quality! The Pampers diapers are 100% original and the delivery was incredibly fast. Highly recommended for newborn care."
  },
  {
    id: "review-002",
    name: "Nusrat Jahan",
    location: "Chattogram",
    rating: 5,
    verified: true,
    review:
      "The Graco stroller arrived in perfect condition. It is safe, soft, and lightweight. Excellent customer care and fast shipping."
  },
  {
    id: "review-003",
    name: "Mahmud Hasan",
    location: "Sylhet",
    rating: 5,
    verified: true,
    review:
      "Baby Mart has become my trusted shop for baby feeding bottles and toys. Authentic products, professional support, and quick delivery."
  },
  {
    id: "review-004",
    name: "Sadia Rahman",
    location: "Rajshahi",
    rating: 5,
    verified: true,
    review:
      "Very gentle baby clothing. The cotton romper set is super soft and chemical-free. Perfect for my baby's sensitive skin."
  },
  {
    id: "review-005",
    name: "Tanvir Ahmed",
    location: "Khulna",
    rating: 5,
    verified: true,
    review:
      "Extremely pleased with the smart baby monitor camera. Setup was easy, safety-certified build, and fast delivery to Khulna."
  },
  {
    id: "review-006",
    name: "Farzana Akter",
    location: "Barishal",
    rating: 5,
    verified: true,
    review:
      "First time ordering baby skincare items here, and I am amazed. Safe packaging, original Johnson's products, and quick assistance."
  }
];

export const reviewStats = [
  { label: "Happy Parents", value: 50000, suffix: "+" },
  { label: "Products Delivered", value: 10000, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "/5" },
  { label: "Parental Satisfaction", value: 98, suffix: "%" }
] as const;

export const reviewSources = [
  { label: "Google Reviews", color: "text-[#4285F4]" },
  { label: "Facebook Reviews", color: "text-[#1877F2]" },
  { label: "Website Reviews", color: "text-[#9a6d21]" }
] as const;
