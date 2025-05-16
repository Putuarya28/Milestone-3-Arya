"use client";
import { useCart } from "@/components/CartContext";
import { Product } from "@/app/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <button
      className="mt-6 w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors duration-200"
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  );
}