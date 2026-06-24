import { CheckoutContents } from "@/components/commerce/CheckoutContents";

export const metadata = {
  title: "Checkout",
  description: "Multi-step checkout with validation-ready forms, delivery methods, payment methods, and order review."
};

export default function CheckoutPage() {
  return <CheckoutContents />;
}
