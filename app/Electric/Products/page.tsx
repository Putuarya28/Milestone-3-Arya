"use client";
import React, { Suspense, lazy } from "react";
import { useFenderGuitars } from "./useFenderGuitars";

const ProductCard = lazy(() => import("@/components/ProductCard"));

const ProductsPage = () => {
  const { guitars, loading } = useFenderGuitars();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Fender Guitars</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : guitars.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          <Suspense fallback={<p>Loading products...</p>}>
            {guitars.map((guitar) => (
              <ProductCard key={guitar.id} product={guitar} />
            ))}
          </Suspense>
        </div>
      ) : (
        <p className="text-gray-500">No Fender guitars found.</p>
      )}
    </div>
  );
};

export default ProductsPage;