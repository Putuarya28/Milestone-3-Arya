"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AdminProductList from "@/components/Admin/AdminProductList";
import AdminProductForm from "@/components/Admin/AdminProductForm";
import { FiPlus } from 'react-icons/fi';
import type { Product } from "@/app/types/product";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    router.push("/login");
    return null;
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsAddingProduct(true);
  };

  const handleCloseForm = () => {
    setIsAddingProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Product Management
        </h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsAddingProduct(!isAddingProduct);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FiPlus className="h-5 w-5" aria-hidden="true" />
          <span>{isAddingProduct ? 'Cancel' : 'Add New Product'}</span>
        </button>
      </div>

      <AdminProductList onEditProduct={handleEditProduct} />

      {isAddingProduct && (
        <AdminProductForm
          product={editingProduct ?? undefined}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm();
            router.refresh();
          }}
        />
      )}
    </div>
  );
}