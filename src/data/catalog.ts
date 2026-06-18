import type { Category, CategorySlug, Order, Product } from "@/types/commerce";
import { brandNames } from "@/data/brands";

const emiFrom = (price: number) => Math.max(1, Math.ceil(price / 12 / 10) * 10);
const oldPriceFrom = (price: number, discount?: number) => (discount ? Math.round(price / (1 - discount / 100) / 10) * 10 : undefined);

const productImage = {
  cerelacAppleCherry: "/products/bd/cerelac-wheat-apple-cherry-350g.webp",
  lactogenOne: "/products/bd/lactogen-1-350g.webp",
  ellasMangoYogurt: "/products/baby%20food/1752902705.jpg",
  heinzAppleBiscotti: "/products/baby%20food/1752918216.jpg",
  cowGateBananaPorridge: "/products/baby%20food/1758710696.jpg",
  tescoFruityPorridge: "/products/baby%20food/1768388828.jpg",
  nursingPillow: "/products/baby%20product/0_16.jpg",
  babySupportPillow: "/products/baby%20product/0_17.jpg",
  playMat: "/products/baby%20product/1753009767.jpg",
  feedingSet: "/products/baby%20product/1753090043.jpg",
  merilShampoo: "/products/bd/meril-baby-shampoo.webp",
  merilPowder: "/products/bd/meril-baby-powder.jpg",
  merilToothbrush: "/products/bd/meril-baby-toothbrush.webp",
  sebamedBubbleBath: "/products/baby%20skin%20care/1761121421.jpg",
  skinCarePackOne: "/products/baby%20skin%20care/1761124579.jpg",
  skinCarePackTwo: "/products/baby%20skin%20care/1761129326.jpg",
  skinCarePackThree: "/products/baby%20skin%20care/1763889814.jpg",
  skinCarePackFour: "/products/baby%20skin%20care/1763889935.jpg",
  frockNavyMesh: "/products/frogs/0590000017664.webp",
  frockPinkParty: "/products/frogs/0590000017754.webp",
  frockFloralCream: "/products/frogs/0590000018010.webp",
  frockDenim: "/products/frogs/0590000018031.webp",
  frockEmbroidered: "/products/frogs/0590000018178.webp",
  frockPrinted: "/products/frogs/0590000018289.webp",
  kidsHoodie: "/products/kids%20dress/hoodie.jpg",
  kidsPinkSet: "/products/kids%20dress/kids11_e392b641-3589-4512-81ea-5e7f54f6e199_600x.webp",
  kidsCasualSet: "/products/kids%20dress/kids12_aad30319-2e4b-42a8-8aec-6db015078ec1_600x.webp",
  kidsSummerSet: "/products/kids%20dress/kids22_600x.webp",
  kidsPremiumSet: "/products/kids%20dress/kids27_db75f7b4-ed3c-431d-8aa9-19a34b6e2998_600x.webp",
  savlonTwinklePant: "/products/bd/savlon-twinkle-pant-m-50.webp",
  babyFreshWipes: "/products/pampers/1761122103.jpg",
  girlsDenimShortsSet: "/products/shorts/download.jpg",
  boysCasualShorts: "/products/shorts/download%20(1).jpg",
  girlsPrintedShorts: "/products/shorts/download%20(2).jpg",
  toddlerCottonShorts: "/products/shorts/download%20(3).jpg",
  summerShortsSet: "/products/shorts/download%20(4).jpg",
  kidsRideOnBike: "/products/toy/0_6.jpeg"
} as const;

const copyByCategory: Record<CategorySlug, { features: string[]; specifications: Record<string, string>; warranty: string }> = {
  "baby-food": {
    features: ["Bangladesh-market original product", "Age-stage appropriate", "Sealed retail pack", "Verified product name and image"],
    specifications: { Type: "Baby food", Market: "Bangladesh", Pack: "Retail pack", Storage: "Cool dry place" },
    warranty: "Original Bangladesh-market listing"
  },
  "baby-products": {
    features: ["Real baby-care product", "Parenting essential", "Image matched to product type", "Ready for local retail"],
    specifications: { Type: "Baby product", Use: "Daily baby care", Market: "Bangladesh", Care: "See product label" },
    warranty: "Verified product image and title"
  },
  "baby-skin-care": {
    features: ["Gentle baby-care formula", "Bangladesh retail product", "Brand and image matched", "Daily care ready"],
    specifications: { Type: "Baby skin care", Use: "Bath and hygiene", Market: "Bangladesh", Pack: "Retail pack" },
    warranty: "Verified baby-care listing"
  },
  frocks: {
    features: ["Girls frock product", "Image and title matched", "Comfort-focused fit", "Party and casual options"],
    specifications: { Type: "Frock", Fit: "Baby girl", Occasion: "Casual and party", Care: "Machine wash gentle" },
    warranty: "Verified apparel image"
  },
  "kids-dress": {
    features: ["Kids outfit product", "Image and title matched", "Comfortable daily wear", "Bangladesh retail ready"],
    specifications: { Type: "Kids dress", Fit: "Baby and toddler", Fabric: "Soft cotton blend", Care: "Machine wash" },
    warranty: "Verified kidswear image"
  },
  pampers: {
    features: ["Diapering and wipes product", "Original Bangladesh listing", "Image and pack size matched", "Daily hygiene ready"],
    specifications: { Type: "Diapering", Use: "Daily hygiene", Market: "Bangladesh", Pack: "Retail pack" },
    warranty: "Verified diapering listing"
  },
  shorts: {
    features: ["Kids shorts product", "Image and title matched", "Play-ready fit", "Summer-friendly styling"],
    specifications: { Type: "Shorts", Fit: "Toddler", Waist: "Comfort fit", Care: "Machine wash" },
    warranty: "Verified apparel image"
  },
  toys: {
    features: ["Kids toy product", "Image and title matched", "Gift-ready retail product", "Playtime focused"],
    specifications: { Type: "Toy", AgeRange: "Baby and toddler", Use: "Playtime", Care: "Wipe clean" },
    warranty: "Verified toy image"
  }
};

type ProductSeed = {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  image: string;
  discount?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  tags?: string[];
  colorVariants?: string[];
};

const seeds: ProductSeed[] = [
  {
    id: "food-cerelac-wheat-apple-cherry-350g",
    name: "Nestle Cerelac Wheat Apple & Cherry With Milk 350gm",
    brand: "Nestle Bangladesh",
    category: "baby-food",
    price: 450,
    image: productImage.cerelacAppleCherry,
    stock: 44,
    rating: 4.8,
    reviewCount: 491,
    badge: "Bangladesh Retail",
    isBestSeller: true,
    isNew: true,
    tags: ["baby food", "cerelac", "new-arrival", "highlighted"],
    colorVariants: ["#FDE68A", "#DC2626", "#FFFFFF"]
  },
  {
    id: "food-lactogen-1-350g",
    name: "Nestle Lactogen 1 Infant Formula 350gm BIB",
    brand: "Nestle Bangladesh",
    category: "baby-food",
    price: 650,
    image: productImage.lactogenOne,
    stock: 25,
    rating: 4.7,
    reviewCount: 34,
    badge: "Formula",
    tags: ["baby food", "formula", "lactogen"],
    colorVariants: ["#1D4ED8", "#14B8A6", "#FFFFFF"]
  },
  {
    id: "food-ellas-mango-yogurt",
    name: "Ella's Kitchen Mango Yogurt Fruity Faves 6+ Months",
    brand: "Ella's Kitchen",
    category: "baby-food",
    price: 420,
    image: productImage.ellasMangoYogurt,
    discount: 8,
    stock: 30,
    rating: 4.6,
    reviewCount: 120,
    badge: "Imported",
    isNew: true,
    tags: ["baby food", "fruit pouch", "new-arrival"],
    colorVariants: ["#F97316", "#EC4899", "#FFFFFF"]
  },
  {
    id: "food-heinz-apple-biscotti",
    name: "Heinz So Yummy Apple Biscotti 7+ Months",
    brand: "Heinz",
    category: "baby-food",
    price: 380,
    image: productImage.heinzAppleBiscotti,
    stock: 28,
    rating: 4.6,
    reviewCount: 86,
    badge: "Baby Snack",
    tags: ["baby food", "biscotti", "snack"],
    colorVariants: ["#7DD3FC", "#22C55E", "#FBBF24"]
  },
  {
    id: "food-cow-gate-banana-porridge",
    name: "Cow & Gate Banana Porridge 4-6 Months",
    brand: "Cow & Gate",
    category: "baby-food",
    price: 620,
    image: productImage.cowGateBananaPorridge,
    stock: 22,
    rating: 4.5,
    reviewCount: 72,
    badge: "Porridge",
    tags: ["baby food", "porridge", "banana"],
    colorVariants: ["#FACC15", "#22C55E", "#F8FAFC"]
  },
  {
    id: "food-tesco-fruity-porridge",
    name: "Tesco Organic Multigrain Fruity Porridge 10+ Months",
    brand: "Tesco",
    category: "baby-food",
    price: 740,
    image: productImage.tescoFruityPorridge,
    discount: 9,
    stock: 18,
    rating: 4.5,
    reviewCount: 61,
    badge: "Organic",
    tags: ["baby food", "organic", "crazy-collection"],
    colorVariants: ["#A855F7", "#F97316", "#F9A8D4"]
  },
  {
    id: "gear-u-shape-nursing-pillow",
    name: "U-Shaped Baby Nursing & Feeding Pillow",
    brand: "Baby Mart Bangladesh",
    category: "baby-products",
    price: 1450,
    image: productImage.nursingPillow,
    discount: 12,
    stock: 25,
    rating: 4.7,
    reviewCount: 132,
    badge: "Parent Pick",
    isBestSeller: true,
    tags: ["baby products", "nursing pillow", "highlighted"],
    colorVariants: ["#EF4444", "#38BDF8", "#F9A8D4"]
  },
  {
    id: "gear-infant-support-pillow",
    name: "Infant Support & Lounger Pillow",
    brand: "Baby Mart Bangladesh",
    category: "baby-products",
    price: 1650,
    image: productImage.babySupportPillow,
    stock: 18,
    rating: 4.6,
    reviewCount: 98,
    badge: "Comfort Gear",
    tags: ["baby products", "support pillow"],
    colorVariants: ["#60A5FA", "#FCA5A5", "#FFFFFF"]
  },
  {
    id: "gear-soft-activity-play-mat",
    name: "Soft Baby Activity Play Mat",
    brand: "Baby Mart Bangladesh",
    category: "baby-products",
    price: 2200,
    image: productImage.playMat,
    discount: 10,
    stock: 14,
    rating: 4.7,
    reviewCount: 116,
    badge: "New Arrival",
    isNew: true,
    tags: ["baby products", "play mat", "new-arrival"],
    colorVariants: ["#22C55E", "#FACC15", "#38BDF8"]
  },
  {
    id: "gear-silicone-feeding-set",
    name: "Baby Silicone Feeding Essentials Set",
    brand: "Baby Mart Bangladesh",
    category: "baby-products",
    price: 990,
    image: productImage.feedingSet,
    stock: 42,
    rating: 4.5,
    reviewCount: 151,
    badge: "Feeding",
    tags: ["baby products", "feeding", "crazy-collection"],
    colorVariants: ["#F97316", "#14B8A6", "#F8FAFC"]
  },
  {
    id: "care-meril-baby-shampoo-110ml",
    name: "Meril Baby Shampoo With Mild Conditioner 110ml",
    brand: "Meril Baby",
    category: "baby-skin-care",
    price: 160,
    image: productImage.merilShampoo,
    stock: 40,
    rating: 4.8,
    reviewCount: 82,
    badge: "Bangladeshi Brand",
    isNew: true,
    tags: ["baby skin care", "shampoo", "new-arrival", "highlighted"],
    colorVariants: ["#FDE047", "#FFFFFF", "#F97316"]
  },
  {
    id: "care-meril-baby-powder-100gm",
    name: "Meril Baby Gentle Soft Powder 100gm",
    brand: "Meril Baby",
    category: "baby-skin-care",
    price: 129,
    image: productImage.merilPowder,
    stock: 52,
    rating: 4.8,
    reviewCount: 1,
    badge: "Bangladeshi Brand",
    isBestSeller: true,
    tags: ["baby skin care", "powder", "highlighted"],
    colorVariants: ["#14B8A6", "#FFFFFF", "#F97316"]
  },
  {
    id: "care-meril-baby-toothbrush",
    name: "Meril Baby Soft Toothbrush Panda",
    brand: "Meril Baby",
    category: "baby-skin-care",
    price: 60,
    image: productImage.merilToothbrush,
    stock: 36,
    rating: 4.6,
    reviewCount: 31,
    badge: "Oral Care",
    tags: ["baby skin care", "toothbrush", "oral care"],
    colorVariants: ["#22C55E", "#FACC15", "#FFFFFF"]
  },
  {
    id: "care-sebamed-bubble-bath",
    name: "Sebamed Baby Bubble Bath With Camomile",
    brand: "Sebamed",
    category: "baby-skin-care",
    price: 980,
    image: productImage.sebamedBubbleBath,
    discount: 7,
    stock: 29,
    rating: 4.8,
    reviewCount: 244,
    badge: "pH 5.5",
    tags: ["baby skin care", "bubble bath", "crazy-collection"],
    colorVariants: ["#38BDF8", "#EC4899", "#FFFFFF"]
  },
  {
    id: "care-baby-lotion-pack",
    name: "Baby Gentle Lotion Care Pack",
    brand: "Baby Mart Bangladesh",
    category: "baby-skin-care",
    price: 760,
    image: productImage.skinCarePackOne,
    stock: 33,
    rating: 4.5,
    reviewCount: 88,
    badge: "Daily Care",
    tags: ["baby skin care", "lotion"],
    colorVariants: ["#FFFFFF", "#60A5FA", "#F9A8D4"]
  },
  {
    id: "frock-navy-mesh-embroidered",
    name: "Baby Girl Navy Mesh Embroidered Party Frock",
    brand: "Baby Mart Bangladesh",
    category: "frocks",
    price: 1890,
    image: productImage.frockNavyMesh,
    discount: 15,
    stock: 16,
    rating: 4.8,
    reviewCount: 74,
    badge: "Party Frock",
    isBestSeller: true,
    tags: ["frocks", "girls dress", "highlighted"],
    colorVariants: ["#1E3A8A", "#FDE68A", "#FFFFFF"]
  },
  {
    id: "frock-pink-party-layered",
    name: "Baby Girl Pink Layered Party Frock",
    brand: "Baby Mart Bangladesh",
    category: "frocks",
    price: 1750,
    image: productImage.frockPinkParty,
    discount: 10,
    stock: 21,
    rating: 4.7,
    reviewCount: 82,
    badge: "New Arrival",
    isNew: true,
    tags: ["frocks", "party dress", "new-arrival"],
    colorVariants: ["#F9A8D4", "#EC4899", "#FFFFFF"]
  },
  {
    id: "frock-cream-floral",
    name: "Baby Girl Cream Floral Premium Frock",
    brand: "Baby Mart Bangladesh",
    category: "frocks",
    price: 2050,
    image: productImage.frockFloralCream,
    stock: 13,
    rating: 4.8,
    reviewCount: 69,
    badge: "Premium",
    tags: ["frocks", "floral", "crazy-collection"],
    colorVariants: ["#FEF3C7", "#F472B6", "#84CC16"]
  },
  {
    id: "frock-denim-casual",
    name: "Baby Girl Denim Casual Frock",
    brand: "Baby Mart Bangladesh",
    category: "frocks",
    price: 1550,
    image: productImage.frockDenim,
    stock: 22,
    rating: 4.6,
    reviewCount: 57,
    badge: "Casual",
    tags: ["frocks", "denim"],
    colorVariants: ["#1D4ED8", "#BFDBFE", "#FFFFFF"]
  },
  {
    id: "dress-kids-hoodie",
    name: "Kids Premium Cotton Hoodie",
    brand: "Baby Mart Bangladesh",
    category: "kids-dress",
    price: 1680,
    image: productImage.kidsHoodie,
    discount: 12,
    stock: 20,
    rating: 4.7,
    reviewCount: 104,
    badge: "Warm Wear",
    tags: ["kids dress", "hoodie", "highlighted"],
    colorVariants: ["#111827", "#94A3B8", "#F8FAFC"]
  },
  {
    id: "dress-pink-top-denim-set",
    name: "Kids Pink Top & Denim Shorts Set",
    brand: "Baby Mart Bangladesh",
    category: "kids-dress",
    price: 1350,
    image: productImage.kidsPinkSet,
    stock: 30,
    rating: 4.6,
    reviewCount: 92,
    badge: "Summer Set",
    tags: ["kids dress", "girls outfit", "shorts"],
    colorVariants: ["#EC4899", "#1D4ED8", "#FFFFFF"]
  },
  {
    id: "dress-casual-printed-set",
    name: "Kids Casual Printed Outfit Set",
    brand: "Baby Mart Bangladesh",
    category: "kids-dress",
    price: 1490,
    image: productImage.kidsCasualSet,
    discount: 8,
    stock: 24,
    rating: 4.5,
    reviewCount: 81,
    badge: "Everyday",
    isNew: true,
    tags: ["kids dress", "casual", "new-arrival"],
    colorVariants: ["#60A5FA", "#F97316", "#FFFFFF"]
  },
  {
    id: "dress-summer-denim-set",
    name: "Kids Summer Denim Shorts Outfit Set",
    brand: "Baby Mart Bangladesh",
    category: "kids-dress",
    price: 1280,
    image: productImage.kidsSummerSet,
    stock: 26,
    rating: 4.6,
    reviewCount: 64,
    badge: "Summer",
    tags: ["kids dress", "summer"],
    colorVariants: ["#F472B6", "#1D4ED8", "#FFFFFF"]
  },
  {
    id: "pampers-savlon-twinkle-pant-m-50",
    name: "Savlon Twinkle Baby Pant Diaper Medium 50pcs",
    brand: "Savlon Twinkle",
    category: "pampers",
    price: 874,
    image: productImage.savlonTwinklePant,
    discount: 27,
    stock: 28,
    rating: 4.7,
    reviewCount: 218,
    badge: "Bangladeshi Brand",
    isBestSeller: true,
    tags: ["pampers", "diapers", "highlighted"],
    colorVariants: ["#1E3A8A", "#FFFFFF", "#EC4899"]
  },
  {
    id: "pampers-watsons-fresh-wipes",
    name: "Watsons Fresh Baby Hypoallergenic Wipes 60 Pack",
    brand: "Watsons",
    category: "pampers",
    price: 360,
    image: productImage.babyFreshWipes,
    discount: 5,
    stock: 48,
    rating: 4.6,
    reviewCount: 220,
    badge: "Wipes",
    tags: ["pampers", "baby wipes", "crazy-collection"],
    colorVariants: ["#F9A8D4", "#FFFFFF", "#22C55E"]
  },
  {
    id: "shorts-girls-denim-embroidered",
    name: "Girls Denim Embroidered Shorts Set",
    brand: "Baby Mart Bangladesh",
    category: "shorts",
    price: 890,
    image: productImage.girlsDenimShortsSet,
    stock: 27,
    rating: 4.7,
    reviewCount: 86,
    badge: "Girls Shorts",
    tags: ["shorts", "girls shorts", "highlighted"],
    colorVariants: ["#1D4ED8", "#EC4899", "#FFFFFF"]
  },
  {
    id: "shorts-boys-casual-cotton",
    name: "Boys Casual Cotton Shorts",
    brand: "Baby Mart Bangladesh",
    category: "shorts",
    price: 720,
    image: productImage.boysCasualShorts,
    discount: 8,
    stock: 35,
    rating: 4.5,
    reviewCount: 73,
    badge: "Cotton",
    isNew: true,
    tags: ["shorts", "boys shorts", "new-arrival"],
    colorVariants: ["#111827", "#16A34A", "#FACC15"]
  },
  {
    id: "shorts-girls-printed-summer",
    name: "Girls Printed Summer Shorts",
    brand: "Baby Mart Bangladesh",
    category: "shorts",
    price: 780,
    image: productImage.girlsPrintedShorts,
    stock: 26,
    rating: 4.6,
    reviewCount: 64,
    badge: "Summer",
    tags: ["shorts", "girls shorts", "crazy-collection"],
    colorVariants: ["#F472B6", "#F97316", "#FFFFFF"]
  },
  {
    id: "shorts-toddler-cotton",
    name: "Toddler Cotton Pull-On Shorts",
    brand: "Baby Mart Bangladesh",
    category: "shorts",
    price: 690,
    image: productImage.toddlerCottonShorts,
    stock: 24,
    rating: 4.5,
    reviewCount: 49,
    badge: "Play Wear",
    tags: ["shorts", "toddler"],
    colorVariants: ["#60A5FA", "#FACC15", "#FFFFFF"]
  },
  {
    id: "toy-electric-ride-on-bike",
    name: "Kids Electric Ride-On Motorbike Toy",
    brand: "Baby Mart Bangladesh",
    category: "toys",
    price: 7490,
    image: productImage.kidsRideOnBike,
    discount: 10,
    stock: 9,
    rating: 4.7,
    reviewCount: 118,
    badge: "Ride-On Toy",
    isBestSeller: true,
    tags: ["toys", "ride on", "highlighted", "crazy-collection"],
    colorVariants: ["#EF4444", "#111827", "#FFFFFF"]
  }
];

export const products: Product[] = seeds.map((seed) => {
  const categoryCopy = copyByCategory[seed.category];
  const discount = seed.discount && seed.discount > 0 ? seed.discount : undefined;

  return {
    id: seed.id,
    slug: seed.id,
    name: seed.name,
    brand: seed.brand,
    category: seed.category,
    price: seed.price,
    oldPrice: oldPriceFrom(seed.price, discount),
    discount,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    stock: seed.stock,
    warranty: categoryCopy.warranty,
    badge: seed.badge,
    image: seed.image,
    gallery: [seed.image],
    colorVariants: seed.colorVariants,
    features: categoryCopy.features,
    specifications: categoryCopy.specifications,
    tags: [seed.category, ...(seed.tags ?? [])],
    isBestSeller: seed.isBestSeller,
    isNew: seed.isNew,
    emiMonthly: emiFrom(seed.price)
  };
});

export const categories: Category[] = [
  {
    slug: "baby-food",
    name: "Baby Food",
    description: "Bangladesh-market baby cereals, formula, pouches, and snacks with matching product images.",
    productCount: products.filter((product) => product.category === "baby-food").length,
    image: productImage.cerelacAppleCherry,
    guide: "Choose age-stage appropriate baby food and always follow the product label and pediatric guidance."
  },
  {
    slug: "baby-products",
    name: "Baby Products",
    description: "Baby feeding, nursing, support, and play essentials with verified local images.",
    productCount: products.filter((product) => product.category === "baby-products").length,
    image: productImage.nursingPillow,
    guide: "Choose stable, easy-clean products suitable for the baby's age and daily routine."
  },
  {
    slug: "baby-skin-care",
    name: "Baby Skin Care",
    description: "Bangladesh baby-care brands and retail hygiene products including Meril Baby and Sebamed.",
    productCount: products.filter((product) => product.category === "baby-skin-care").length,
    image: productImage.merilPowder,
    guide: "Pick gentle formulas, age-appropriate hygiene items, and products with clear labeling."
  },
  {
    slug: "frocks",
    name: "Frocks",
    description: "Baby girl frocks with product titles matched directly to the visible garment images.",
    productCount: products.filter((product) => product.category === "frocks").length,
    image: productImage.frockNavyMesh,
    guide: "Check fabric comfort, fit, stitching, and easy-wash care for baby girl frocks."
  },
  {
    slug: "kids-dress",
    name: "Kids Dress",
    description: "Kids outfit sets, hoodies, and summer wear with matching product images.",
    productCount: products.filter((product) => product.category === "kids-dress").length,
    image: productImage.kidsPinkSet,
    guide: "Choose breathable, comfortable fits for all-day play and easy movement."
  },
  {
    slug: "pampers",
    name: "Pampers",
    description: "Bangladesh diapering and wipes products including Savlon Twinkle and baby wipes.",
    productCount: products.filter((product) => product.category === "pampers").length,
    image: productImage.savlonTwinklePant,
    guide: "Select diapers and wipes by size, absorbency, skin sensitivity, and pack quantity."
  },
  {
    slug: "shorts",
    name: "Shorts",
    description: "Girls and boys shorts products with matched images and practical Bangladesh retail pricing.",
    productCount: products.filter((product) => product.category === "shorts").length,
    image: productImage.girlsDenimShortsSet,
    guide: "For shorts, check waistband comfort, breathable fabric, and play-ready stitching."
  },
  {
    slug: "toys",
    name: "Toys",
    description: "Kids toy products with image, title, and price kept aligned.",
    productCount: products.filter((product) => product.category === "toys").length,
    image: productImage.kidsRideOnBike,
    guide: "Choose toys with age-appropriate interaction, stable design, and safe finishes."
  }
];

export const brands = brandNames;
export const newArrivalsLogo = "/products/logo.png";

export const orders: Order[] = [
  { id: "#ORD-10025", date: "June 12, 2026", amount: 874, status: "Delivered" },
  { id: "#ORD-10024", date: "June 10, 2026", amount: 1890, status: "Shipped" },
  { id: "#ORD-10023", date: "June 08, 2026", amount: 400, status: "Processing" },
  { id: "#ORD-10022", date: "June 05, 2026", amount: 7490, status: "Delivered" }
];

export const revenueData = [
  { month: "Jan", sales: 120000, orders: 42 },
  { month: "Feb", sales: 180000, orders: 58 },
  { month: "Mar", sales: 210000, orders: 65 },
  { month: "Apr", sales: 290000, orders: 92 },
  { month: "May", sales: 340000, orders: 110 },
  { month: "Jun", sales: 410000, orders: 135 }
];
