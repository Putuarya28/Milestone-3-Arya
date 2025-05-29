"use client";
import { useState } from "react";

interface AdminProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  product?: {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
  };
}

export default function AdminProductForm({
  onClose,
  onSuccess,
  product,
}: AdminProductFormProps) {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || 0,
    description: product?.description || "",
    images: product?.images || [""],
  });
  const [error, setError] = useState<string | null>(null);

  
  function isValidImageUrl(url: string) {
    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidImageUrl(formData.images[0])) {
      setError(
        "Please enter a valid image URL ending with .jpg, .jpeg, .png, .webp, or .gif"
      );
      return;
    }

    setError(null);

    try {
      const url = product ? `/api/products/${product.id}` : "/api/products";

      const res = await fetch(url, {
        method: product ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save product");

      onSuccess();
    } catch (error) {
      setError("Error saving product.");
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={formData.images[0]}
              onChange={(e) =>
                setFormData({ ...formData, images: [e.target.value] })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}