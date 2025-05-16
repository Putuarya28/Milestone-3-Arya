"use client";
import { useEffect, useState } from "react";
import { getFenderGuitars } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/app/types/product";

const ProductsPage = () => {
  const [guitars, setGuitars] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFenderGuitars();
        setGuitars(data);
      } catch (error) {
        console.error("Error fetching guitars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Fender Guitars</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : guitars.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {guitars.map((guitar) => (
            <ProductCard key={guitar.id} product={guitar} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No Fender guitars found.</p>
      )}
    </div>
  );
};

export default ProductsPage;