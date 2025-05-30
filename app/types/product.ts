export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  color?: string;
}

export type NewProduct = Omit<Product, "id">;