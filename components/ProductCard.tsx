import { Product } from "@/app/types/product";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden h-[430px]">
      <div className="relative flex items-center justify-center h-64 bg-gray-50">
        <img
          src={product.images[0]}
          alt={product.title}
          className="max-h-56 w-auto object-contain"
        />
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded shadow">
          ${product.price}
        </span>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-xl font-semibold mb-1 text-gray-800 truncate">{product.title}</h2>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-400">ID: {product.id}</span>
          <Link
            href={`/Electric/Products/${product.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;