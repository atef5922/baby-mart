import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Header } from "@/components/layout/Header";
import { LiveActivityPopup } from "@/components/layout/LiveActivityPopup";
import { MobileNav } from "@/components/layout/MobileNav";
import { Providers } from "@/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://babymart.com"),
  title: {
    default: "Baby Mart | Premium Baby E-Commerce",
    template: "%s | Baby Mart"
  },
  description:
    "Premium baby clothing, diapers, strollers, toys, and feeding essentials from global brands with fast delivery across Bangladesh.",
  openGraph: {
    title: "Baby Mart",
    description: "Premium baby care e-commerce experience.",
    type: "website",
    locale: "en_BD"
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Mart",
    description: "Premium baby care e-commerce experience."
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-clip">
        <Providers>
          <Header />
          <main className="min-h-screen overflow-x-clip pt-[56px] pb-20 md:pt-[56px] lg:pt-[156px] md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <LiveActivityPopup />
          <FloatingActions />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
