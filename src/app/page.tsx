import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { AnimatedSection } from "@/components/home/AnimatedSection";
import { FlashSale } from "@/components/home/FlashSale";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { CrazyCollectionsSection } from "@/components/home/CrazyCollectionsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BrandMarqueeSection } from "@/components/commerce/BrandMarqueeSection";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { products } from "@/data/catalog";
import { trustBadges } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <AnimatedSection className="py-16 lg:py-20">
        <Container className="max-w-[1440px]">
          <header className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
            <div className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.24em] text-[#C8922D]">
              Editorial Highlights
            </div>
            <h2 className="mt-3 text-[2rem] font-black leading-[1.02] tracking-[-0.05em] text-[#07111F] sm:text-[2.6rem] lg:text-[3rem]">
              Baby Fashion Editorial
            </h2>
          </header>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-[3fr_2fr] lg:items-stretch">
            <Card className="group relative overflow-hidden rounded-none border-0 bg-white p-0 shadow-[0_20px_45px_rgba(7,17,31,0.08)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_30px_70px_rgba(7,17,31,0.12)]">
              <div className="relative grid h-full min-h-[360px] items-end gap-6 sm:min-h-[440px]">
                <div className="absolute inset-0">
                  <Image
                    src="/products/warm%20clothes.png"
                    alt="Baby fashion model"
                    fill
                    className="pointer-events-none object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 58vw, 92vw"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,31,0) 24%,rgba(7,17,31,0.28) 75%,rgba(7,17,31,0.56) 100%)]" />
                  <span className="absolute left-[-12%] top-[-16%] h-[180px] w-[180px] rounded-full bg-[#ffe3ef] blur-3xl" />
                  <span className="absolute right-[-10%] bottom-[-20%] h-[220px] w-[220px] rounded-full bg-[#d9f6e9] blur-3xl" />
                </div>
                <div className="relative z-10 flex max-w-[28rem] flex-col gap-3 p-6 sm:p-8">
                  <div className="text-[12px] font-black uppercase tracking-[0.22em] text-[#ffe6f0]">Get Set 2017</div>
                  <h3 className="text-[2.1rem] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.6rem]">Warm Clothes</h3>
                  <p className="text-sm font-medium text-white/85">Baby Fashion Collection</p>
                  <Button asChild className="mt-4 h-11 w-fit rounded-md bg-[linear-gradient(120deg,#FDE68A,#FECACA)] px-6 font-bold uppercase text-[#371a00] transition duration-200 hover:scale-[1.02] hover:bg-[linear-gradient(120deg,#ffd17a,#ff9f9f)] hover:text-[#fff8f1] hover:shadow-[0_20px_40px_rgba(254,215,170,0.45)]">
                    <Link href="/shop">SHOP NOW</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4 sm:grid-rows-2 sm:gap-5">
              <Card className="group relative overflow-hidden rounded-none border-0 bg-gradient-to-br from-[#e7f7ef] to-[#d8f0df] p-6 shadow-[0_18px_38px_rgba(7,17,31,0.08)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_26px_56px_rgba(7,17,31,0.12)] sm:min-h-[220px] sm:p-6">
                <div className="absolute inset-0">
                  <Image
                    src="/products/hoodie.jpg"
                    alt="Hoods & Tops"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 20vw, 43vw"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(236,254,244,0) 22%,rgba(16,34,24,0.58) 92%)]" />
                </div>
                <div className="relative z-10 flex h-[12rem] flex-col justify-end sm:h-[14rem]">
                  <Button asChild variant="gold" className="h-11 w-fit rounded-md bg-[linear-gradient(120deg,#ffe8b1_10%,#f8d56c_100%)] px-5 text-[12px] font-semibold text-[#4a3a00] shadow-[0_16px_34px_rgba(248,189,80,0.35)] transition hover:text-[#4a3a00] hover:bg-[linear-gradient(120deg,#ffd96f,#f6d46f)] hover:shadow-[0_22px_40px_rgba(248,189,80,0.45)]">
                    <Link href="/category/clothing">BUY NOW</Link>
                  </Button>
                </div>
              </Card>

              <Card className="group relative overflow-hidden rounded-none border-0 bg-gradient-to-br from-[#ffe4ec] to-[#fbc5de] p-6 shadow-[0_18px_38px_rgba(7,17,31,0.08)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_26px_56px_rgba(7,17,31,0.12)] sm:min-h-[220px] sm:p-6">
                <div className="absolute inset-0">
                  <Image
                    src="/products/show.jpg"
                    alt="Princess Delight Shoes"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 20vw, 43vw"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,244,249,0) 22%,rgba(60,24,24,0.54) 92%)]" />
                </div>
                <div className="relative z-10 flex h-[12rem] flex-col justify-end sm:h-[14rem]">
                  <Button asChild className="h-11 w-fit rounded-md bg-[linear-gradient(120deg,#fbd0df,#ffc3a3)] px-5 text-[12px] font-bold text-[#2f1529] shadow-[0_16px_34px_rgba(255,181,206,0.45)] transition hover:text-[#2f1529] hover:bg-[linear-gradient(120deg,#fbc5de,#ffc9a8)] hover:shadow-[0_20px_40px_rgba(255,181,206,0.55)]">
                    <Link href="/shop">BUY NOW</Link>
                  </Button>
                </div>
              </Card>

              <Card className="group relative overflow-hidden rounded-none border-0 bg-[radial-gradient(circle_at_74%_78%,#fff4dd_0%,#ffd5b9_42%,#ffe0d5_100%)] p-6 shadow-[0_18px_38px_rgba(7,17,31,0.08)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_26px_56px_rgba(7,17,31,0.12)] sm:col-span-2 sm:min-h-[220px] sm:p-8">
                <div className="absolute inset-0">
                  <Image
                    src="/products/30%25off.png"
                    alt="30% off banner"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 46vw, 92vw"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,245,225,0) 18%,rgba(111,74,60,0.58) 92%)]" />
                </div>
                <div className="relative z-10 h-full">
                  <span className="pointer-events-none absolute left-[-14%] top-[-22%] h-[210px] w-[210px] rounded-full border border-[#f7d7a4]/40" />
                  <span className="pointer-events-none absolute right-[-10%] bottom-[-24%] h-[180px] w-[180px] rounded-full border border-[#f6b5c8]/35" />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </AnimatedSection>

      <FlashSale />

      <AnimatedSection className="bg-white py-16 lg:py-20">
        <Container className="max-w-[1440px]">
          <NewArrivalsSection products={products} />
        </Container>
      </AnimatedSection>
      <AnimatedSection className="py-6 lg:py-8">
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] lg:aspect-[16/4]">
            <Image
              src="/products/welcomebanner.png"
              alt="Welcome to Baby Mart banner"
              fill
              className="object-contain sm:object-cover transition-transform duration-300 ease-in-out hover:scale-[1.02]"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent" />
            <div className="absolute inset-0 flex items-end p-4 sm:p-8">
              <div className="max-w-xl rounded-lg bg-white/20 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm">
                <p className="font-poppins text-xs sm:text-sm font-medium uppercase tracking-[0.3em] text-white">
                  New collection is here
                </p>
                <h2 className="mt-2 text-xl sm:text-3xl font-bold text-white">Welcome to Baby Mart</h2>
                <a
                  href="/products"
                  className="mt-4 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#7c3aed] transition duration-200 ease-in-out hover:bg-violet-100"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection className="py-16 lg:py-20">
        <Container className="max-w-[1440px]">
          <CrazyCollectionsSection products={products} />
        </Container>
      </AnimatedSection>

      <AnimatedSection className="py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1536px] px-0">
          <div className="relative overflow-hidden min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=80"
              alt="Premium baby event banner"
              fill
              className="h-full w-full object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.78)_0%,rgba(7,17,31,0.46)_46%,rgba(7,17,31,0.1)_100%)]" />

            <div className="absolute inset-y-0 left-0 flex w-full items-center px-6 sm:px-8 lg:px-10">
              <div className="max-w-[540px] text-white">
                <div className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.24em] text-[#F8DEAA]">
                  Premium Baby Event
                </div>
                <h2 className="mt-5 max-w-[520px] text-[2.45rem] font-black leading-[1.05] tracking-[-0.055em] sm:text-[3.2rem] lg:text-[4rem]">
                  Upgrade Every Moment of Your Baby&apos;s Comfort
                </h2>
                <p className="mt-5 max-w-[480px] text-sm leading-7 text-white/82 sm:text-[1rem]">
                  Discover premium baby cribs, strollers, nursery furniture, and toys selected for maximum safety and comfort.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button asChild variant="gold" className="h-12 rounded-full px-6 !text-[#07111F]">
                    <Link href="/shop">Explore Collection</Link>
                  </Button>
                  <div className="inline-flex items-center rounded-full border border-white/16 bg-white/8 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/88">
                    100% original • Safety certified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>


      <BrandMarqueeSection />

      <AnimatedSection className="bg-[#07111F] py-16 lg:py-20 text-white">
        <Container className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="rounded-xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.22)]">
              <badge.icon className="text-[#EF8A9B]" size={25} />
              <div className="mt-3 font-semibold">{badge.title}</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">{badge.text}</div>
            </div>
          ))}
        </Container>
      </AnimatedSection>

      <ReviewsSection />

    </>
  );
}
