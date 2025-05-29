const BASE_URL = "https://api.escuelajs.co/api/v1/products";
import type { Product } from "@/app/types/product"; 
import type { NewProduct } from "@/app/types/product"; 


export async function getFenderGuitars() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch products");

  return await response.json();
}

export async function createProduct(product: NewProduct) {
  const response = await fetch("https://api.escuelajs.co/api/v1/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("API error response:", errorBody);
    throw new Error("Failed to create product");
  }
  return response.json();
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json() as Promise<Product>;
}