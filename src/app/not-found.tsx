import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-[800px] place-items-center px-4 text-center">
      <div>
        <h1 className="text-5xl font-black">404</h1>
        <p className="mt-3 text-slate-500">This premium baby shop route is not available yet.</p>
        <Button asChild className="mt-6"><Link href="/shop">Back to Shop</Link></Button>
      </div>
    </div>
  );
}
