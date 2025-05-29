"use client";
import { useCart } from "@/components/CartContext";
import { Product } from "@/app/types/product";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    // Preserve full URL (pathname + query)
    const redirectUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    return (
      <button
        className="mt-6 w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors duration-200"
        onClick={() => router.replace(`/login?redirect=${encodeURIComponent(redirectUrl)}`)}
      >
        Add to Cart
      </button>
    );
  }

  return (
    <button
      className="mt-6 w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors duration-200"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  );
}