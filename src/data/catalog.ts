import type { Category, Order, Product } from "@/types/commerce";
import { brandNames } from "@/data/brands";

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
const emiFrom = (price: number) => Math.ceil(price / 12 / 10) * 10;

export const categories: Category[] = [
  {
    slug: "diapers",
    name: "Diapers & Hygiene",
    description: "Ultra-absorbent and soft disposable diapers, organic wet wipes, and diaper change essentials.",
    productCount: 34,
    image: img("photo-1622273509381-22ab7270a6d8"),
    guide: "Select diapers with wetness indicators and breathable materials to protect soft baby skin."
  },
  {
    slug: "clothing",
    name: "Baby Clothing",
    description: "Super-soft organic cotton onesies, rompers, sleepwear, and adorable outfits for all seasons.",
    productCount: 28,
    image: img("photo-1522771739844-6a9f6d5f14af"),
    guide: "Look for 100% organic cotton fabrics with tagless labels to prevent diaper rashes."
  },
  {
    slug: "feeding",
    name: "Feeding & Nursing",
    description: "Anti-colic baby bottles, breast pumps, milk formula containers, and high chairs.",
    productCount: 31,
    image: img("photo-1555252333-9f8e92e65df9"),
    guide: "Choose wide-neck anti-colic bottles to mimic natural breastfeeding and reduce spit-ups."
  },
  {
    slug: "toys",
    name: "Baby Toys",
    description: "Non-toxic wooden blocks, soft plush toys, activity gyms, and learning kits for early growth.",
    productCount: 26,
    image: img("photo-1537655780520-1e392edd816a"),
    guide: "Pick toy sizes that prevent choking hazards and carry safety certificates."
  },
  {
    slug: "safety",
    name: "Safety Products",
    description: "Smart baby monitors, protective crib guards, corner bumpers, and safety gates.",
    productCount: 15,
    image: img("photo-1558085324-42ff7b5fa371"),
    guide: "Ensure baby monitors have night vision and clear audio range for reliable remote check-ins."
  },
  {
    slug: "strollers",
    name: "Baby Travel Gear",
    description: "Premium lightweight strollers, crash-tested infant car seats, and breathable baby carriers.",
    productCount: 19,
    image: img("photo-1594911774802-8822a7079db1"),
    guide: "Opt for strollers with multi-recline seats and single-hand folding features for active travel."
  },
  {
    slug: "bath-care",
    name: "Bath & Skin Care",
    description: "Tear-free shampoos, moisturizing lotions, soft towels, and ergonomic baby bathtubs.",
    productCount: 24,
    image: img("photo-1603561591411-07134e71a2a9"),
    guide: "Always test bath water temperature on your wrist first and use hypoallergenic washes."
  },
  {
    slug: "baby-gear",
    name: "Baby Gear",
    description: "Comfy baby bouncers, automated swings, baby walkers, and premium activity centers.",
    productCount: 22,
    image: img("photo-1596461404969-9ae70f2830c1"),
    guide: "Prioritize baby swings with adjustable speed levels and secure five-point harness straps."
  },
  {
    slug: "learning",
    name: "Early Learning",
    description: "Interactive board books, sensory cards, and developmental learning kits.",
    productCount: 18,
    image: img("photo-1516627145497-ae6968895b74"),
    guide: "Sensory learning kits help babies build fine motor skills and tactile sensitivity."
  },
  {
    slug: "nursing",
    name: "Maternity & Nursing",
    description: "Supportive nursing pillows, postpartum items, and maternity wear.",
    productCount: 12,
    image: img("photo-1519689680058-324335c77ebe"),
    guide: "Nursing pillows support proper latch positioning and reduce maternal back fatigue."
  },
  {
    slug: "nursery-furniture",
    name: "Nursery Furniture",
    description: "Solid wood cribs, baby bassinets, changing tables, and organizers.",
    productCount: 14,
    image: img("photo-1581888227599-779811939961"),
    guide: "Verify crib slats are spaced safely to protect baby limbs and head."
  },
  {
    slug: "bedding",
    name: "Bedding & Swaddles",
    description: "Breathable cotton swaddles, sleep sacks, crib sheets, and baby blankets.",
    productCount: 20,
    image: img("photo-1502086223501-7ea6ecd79368"),
    guide: "Breathable swaddles promote deep sleep and prevent baby startle reflex."
  }
];

const babyProductImages = {
  diapers: "https://images.unsplash.com/photo-1622273509381-22ab7270a6d8?auto=format&fit=crop&w=600&q=80",
  romper: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
  bottle: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
  stroller: "https://images.unsplash.com/photo-1594911774802-8822a7079db1?auto=format&fit=crop&w=600&q=80",
  toys: "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=600&q=80",
  formula: "https://images.unsplash.com/photo-1584263347416-85a696b4dea9?auto=format&fit=crop&w=600&q=80",
  guard: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80",
  bathtub: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
  monitor: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=600&q=80",
  wipes: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
} as const;

export const products: Product[] = [
  {
    id: "p-001",
    slug: "pampers-swaddlers-premium-diapers-pack",
    name: "Pampers Swaddlers Premium Disposable Diapers Pack",
    brand: "Pampers",
    category: "diapers",
    price: 2250,
    oldPrice: 2800,
    discount: 20,
    rating: 4.9,
    reviewCount: 312,
    stock: 25,
    warranty: "Manufacturer Authenticity Guaranteed",
    badge: "Best Seller",
    image: babyProductImages.diapers,
    gallery: [babyProductImages.diapers, babyProductImages.diapers, babyProductImages.diapers],
    features: ["Ultra-absorbent wetness indicator", "Hypoallergenic soft air channels", "Gentle flex elastic leg barriers", "Umbilical cord notch protection"],
    specifications: { Size: "Size 1 (Newborn)", Count: "96 Diapers", Material: "Cotton Soft", Fragrance: "Unscented" },
    tags: ["diapers", "hygiene", "newborn", "absorbent"],
    isBestSeller: true,
    emiMonthly: emiFrom(2250)
  },
  {
    id: "p-002",
    slug: "chicco-organic-newborn-cotton-romper-set",
    name: "Chicco Organic Newborn Cotton Romper Set (3 Pack)",
    brand: "Chicco",
    category: "clothing",
    price: 1850,
    oldPrice: 2400,
    discount: 23,
    rating: 4.8,
    reviewCount: 148,
    stock: 15,
    warranty: "100% Skin Safe Guarantee",
    badge: "Pure Cotton",
    image: babyProductImages.romper,
    gallery: [babyProductImages.romper, babyProductImages.romper, babyProductImages.romper],
    features: ["100% Certified organic cotton", "Tagless neck labels for sensitive skin", "Two-way zippers for easy diapering", "Fold-over mitten cuffs for scratch prevention"],
    specifications: { Size: "Newborn to 3M", Fabric: "Organic Cotton", Closure: "Double Zipper", Pieces: "3 Rompers" },
    tags: ["clothing", "wear", "cotton", "romper"],
    isBestSeller: true,
    emiMonthly: emiFrom(1850)
  },
  {
    id: "p-003",
    slug: "philips-avent-anti-colic-natural-baby-bottle",
    name: "Philips Avent Anti-Colic Natural Baby Bottle Set",
    brand: "Philips Avent",
    category: "feeding",
    price: 1450,
    oldPrice: 1900,
    discount: 24,
    rating: 4.7,
    reviewCount: 228,
    stock: 18,
    warranty: "BPA-Free Safety Approved",
    badge: "Anti-Colic",
    image: babyProductImages.bottle,
    gallery: [babyProductImages.bottle, babyProductImages.bottle, babyProductImages.bottle],
    features: ["Airflex valve system to reduce colic", "Breast-like wide shape nipple", "Easy-to-clean wide neck opening", "Secure leak-proof locking cap"],
    specifications: { Capacity: "260ml / 9oz", NippleFlow: "Slow Flow", Material: "BPA-Free Polypropylene", Count: "2 Bottles" },
    tags: ["feeding", "nursing", "bottle", "avent"],
    emiMonthly: emiFrom(1450)
  },
  {
    id: "p-004",
    slug: "graco-jetsetter-premium-foldable-stroller",
    name: "Graco Jetsetter Premium Lightweight Foldable Stroller",
    brand: "Graco",
    category: "strollers",
    price: 28500,
    oldPrice: 35000,
    discount: 19,
    rating: 4.9,
    reviewCount: 94,
    stock: 8,
    warranty: "2 Years Brand Warranty",
    badge: "Premium Gear",
    image: babyProductImages.stroller,
    gallery: [babyProductImages.stroller, babyProductImages.stroller, babyProductImages.stroller],
    features: ["One-hand ultra-compact fast fold", "Multi-position reclining padded seat", "UV 50+ canopy with viewing mesh window", "Spacious under-seat storage basket"],
    specifications: { Weight: "14 lbs", Recline: "Infant Flat Recline", Harness: "5-Point Safety Harness", Capacity: "Up to 50 lbs" },
    tags: ["stroller", "travel", "gear", "graco"],
    emiMonthly: emiFrom(28500)
  },
  {
    id: "p-005",
    slug: "fisher-price-soft-plush-animal-friends-set",
    name: "Fisher-Price Soft Plush Animal Friends Gym & Toy Set",
    brand: "Fisher-Price",
    category: "toys",
    price: 1250,
    oldPrice: 1800,
    discount: 30,
    rating: 4.8,
    reviewCount: 165,
    stock: 30,
    warranty: "Child-Safe Certified Materials",
    badge: "Play & Learn",
    image: babyProductImages.toys,
    gallery: [babyProductImages.toys, babyProductImages.toys, babyProductImages.toys],
    features: ["Ultra-soft texture for tactile play", "Built-in squeaker & rattle modules", "Detachable stroller attachments", "Bright colors for visual stimulation"],
    specifications: { AgeRange: "0 Months +", Material: "Hypoallergenic Polyester", Clean: "Machine Washable", Pieces: "3 Toys" },
    tags: ["toys", "playtime", "plush", "fisher-price"],
    isNew: true,
    emiMonthly: emiFrom(1250)
  },
  {
    id: "p-006",
    slug: "philips-avent-smart-milk-formula-dispenser",
    name: "Philips Avent Smart Milk Formula Dispenser Container",
    brand: "Philips Avent",
    category: "feeding",
    price: 950,
    oldPrice: 1300,
    discount: 27,
    rating: 4.6,
    reviewCount: 84,
    stock: 22,
    warranty: "Food Grade Safety Material",
    badge: "Smart feeding",
    image: babyProductImages.formula,
    gallery: [babyProductImages.formula, babyProductImages.formula, babyProductImages.formula],
    features: ["Three separate pre-measured compartments", "Rotating easy-pour nozzle design", "Converts to a dry food snack cup", "Sterilizer and microwave safe"],
    specifications: { Capacity: "3 x 260ml formula feeds", Material: "BPA-Free Plastic", Division: "3 Compartments", Lid: "Snap-on Leakproof" },
    tags: ["feeding", "bottle", "dispenser", "avent"],
    emiMonthly: emiFrom(950)
  },
  {
    id: "p-007",
    slug: "chicco-breathable-mesh-baby-crib-guard",
    name: "Chicco Breathable Mesh Baby Safety Crib Guard",
    brand: "Chicco",
    category: "safety",
    price: 3800,
    oldPrice: 4500,
    discount: 15,
    rating: 4.7,
    reviewCount: 71,
    stock: 12,
    warranty: "1 Year Safety Guarantee",
    badge: "Safe Sleep",
    image: babyProductImages.guard,
    gallery: [babyProductImages.guard, babyProductImages.guard, babyProductImages.guard],
    features: ["Breathable mesh padding prevents entanglement", "Secure-fit hook & loop attachment system", "Padded top rail protects baby gums", "Hypoallergenic skin-safe outer fabric"],
    specifications: { Dimension: "120cm x 30cm", Material: "Polyester Mesh", Fit: "Standard Cribs", Breathability: "High airflow" },
    tags: ["safety", "crib", "protection", "chicco"],
    emiMonthly: emiFrom(3800)
  },
  {
    id: "p-008",
    slug: "johnsons-baby-bath-tub-wash-essentials-set",
    name: "Johnson’s Baby Bath Tub & Wash Essentials Set",
    brand: "Johnson’s Baby",
    category: "bath-care",
    price: 2950,
    oldPrice: 3800,
    discount: 22,
    rating: 4.8,
    reviewCount: 184,
    stock: 10,
    warranty: "No More Tears Formula Certified",
    badge: "Bath Time",
    image: babyProductImages.bathtub,
    gallery: [babyProductImages.bathtub, babyProductImages.bathtub, babyProductImages.bathtub],
    features: ["Ergonomic baby bathtub with newborn slip insert", "Hypoallergenic moisturizing lotion included", "Tear-free head-to-toe baby wash", "Soft cotton bath towel & washcloth"],
    specifications: { Bathtub: "Anti-slip design", LiquidItems: "Lotion 200ml, Wash 200ml", Formula: "Clinically Proven Mildness", TowelSize: "30x30 inches" },
    tags: ["bath", "skin-care", "wash", "johnson"],
    emiMonthly: emiFrom(2950)
  },
  {
    id: "p-009",
    slug: "graco-smart-video-baby-monitor-camera",
    name: "Graco Smart Video Baby Monitor Camera System",
    brand: "Graco",
    category: "safety",
    price: 8500,
    oldPrice: 11000,
    discount: 22,
    rating: 4.8,
    reviewCount: 112,
    stock: 14,
    warranty: "1 Year Replacement Warranty",
    badge: "Smart Safety",
    image: babyProductImages.monitor,
    gallery: [babyProductImages.monitor, babyProductImages.monitor, babyProductImages.monitor],
    features: ["High-definition infrared night vision", "Real-time room temperature warning system", "Two-way talkback intercom audio", "Preloaded soothing baby lullabies"],
    specifications: { Display: "3.2 inch TFT LCD", Range: "Up to 1000 feet", Frequency: "2.4 GHz FHSS", Battery: "Rechargeable 950mAh" },
    tags: ["safety", "monitor", "camera", "graco"],
    emiMonthly: emiFrom(8500)
  },
  {
    id: "p-010",
    slug: "pampers-sensitive-skin-baby-wipes-pack",
    name: "Pampers Sensitive Skin Baby Wipes Pack (4 Pack)",
    brand: "Pampers",
    category: "diapers",
    price: 480,
    oldPrice: 650,
    discount: 26,
    rating: 4.9,
    reviewCount: 402,
    stock: 50,
    warranty: "Dermatologically Tested Safety",
    badge: "Soft Wipes",
    image: babyProductImages.wipes,
    gallery: [babyProductImages.wipes, babyProductImages.wipes, babyProductImages.wipes],
    features: ["Dermatologically tested alcohol-free formula", "Restores natural skin pH balance", "Thick and soft texture for gentle wiping", "Convenient pop-up travel lid seal"],
    specifications: { Count: "80 Wipes per pack", Fragrance: "Fragrance-Free", Alcohol: "0% Ethanol", PackSize: "4 Packs" },
    tags: ["diapers", "hygiene", "wipes", "pampers"],
    isNew: true,
    emiMonthly: emiFrom(480)
  }
];

export const brands = brandNames;
export const newArrivalsLogo = "/products/logo.png";

export const orders: Order[] = [
  { id: "#ORD-10025", date: "June 12, 2026", amount: 4850, status: "Delivered" },
  { id: "#ORD-10024", date: "June 10, 2026", amount: 2250, status: "Shipped" },
  { id: "#ORD-10023", date: "June 08, 2026", amount: 950, status: "Processing" },
  { id: "#ORD-10022", date: "June 05, 2026", amount: 28500, status: "Delivered" }
];

export const revenueData = [
  { month: "Jan", sales: 120000, orders: 42 },
  { month: "Feb", sales: 180000, orders: 58 },
  { month: "Mar", sales: 210000, orders: 65 },
  { month: "Apr", sales: 290000, orders: 92 },
  { month: "May", sales: 340000, orders: 110 },
  { month: "Jun", sales: 410000, orders: 135 }
];
