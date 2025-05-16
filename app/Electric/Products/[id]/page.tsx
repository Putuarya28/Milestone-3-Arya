import { getProductById } from '@/lib/api';
import Image from 'next/image';
import { Product } from '@/app/types/product';
import { AddToCartButton } from '@/components/AddToCartButton';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product: Product = await getProductById(Number(id));

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Image Section */}
        <div className="flex justify-center items-center bg-gray-100 dark:bg-neutral-800 rounded-xl p-8 mx-auto">
          <div className="relative w-72 h-96 md:w-96 md:h-[28rem]">
            <Image
              src={product.images[0] || '/placeholder-guitar.jpg'}
              alt={product.title}
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
        {/* Details Section */}
        <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left w-full max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {product.title}
          </h1>
          <span className="text-lg text-gray-800 dark:text-gray-200">
            Color: <span className="font-medium">{product.color || '—'}</span>
          </span>
          <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            ${product.price}
          </span>
          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
            {product.description}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}