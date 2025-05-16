export const revalidate = 60; 

import ProductList from '@/components/ProductList';
import { getFenderGuitars } from '@/lib/api';
import type { Product } from '@/app/types/product'; 

export default async function Home() {
  // Fetch products from Platzi API
  const products: Product[] = await getFenderGuitars();
  console.log("Fetched products:", products);
  
  
  const guitarProducts = products.filter((product) => 
    product.title.includes('Stratocaster')
  );
  console.log("Filtered guitars:", guitarProducts);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Premium Guitars</h1>
      <ProductList products={guitarProducts} />
    </div>
  );
}