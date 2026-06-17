import { CartContents } from "@/components/commerce/CartContents";

export const metadata = {
  title: "Cart",
  description: "Premium cart with coupons, shipping calculator, cross-sells, upsells, and recommended products."
};

export default function CartPage() {
  return <CartContents />;
}
