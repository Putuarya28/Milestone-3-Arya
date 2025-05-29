"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product } from "@/app/types/product";

type AdminProductListProps = {
  onEditProduct: (product: Product) => void;
};

export default function AdminProductList({ onEditProduct }: AdminProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      
      
      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }
      
      const data = await res.json();
      
      
      const stratocasterProducts = data.filter((product: Product) => 
        product.title.toLowerCase().includes('revoshop')
      );
      
      setProducts(stratocasterProducts);
      setFilteredProducts(stratocasterProducts);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Unknown error occurred';
      console.error('Failed to fetch products:', errorMessage);
      setError(`Failed to load products: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      
      setProducts(products.filter(p => p.id !== id));
      setFilteredProducts(filteredProducts.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  if (isLoading) return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center py-10">{error}</div>
  );

  if (filteredProducts.length === 0) return (
    <div className="text-gray-500 dark:text-gray-400 text-center py-10">
      No Stratocaster products found.
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white dark:bg-zinc-800 rounded-lg shadow p-4">
          {/* Image container with proper aspect ratio */}
          <div className="relative w-full h-[300px] mb-4 bg-gray-50 dark:bg-zinc-100 rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-contain p-4" // Added padding and changed to contain
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          
          {/* Product details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toLocaleString()}
            </p>
            
            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => onEditProduct(product)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:text-red-700 font-medium text-sm px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}