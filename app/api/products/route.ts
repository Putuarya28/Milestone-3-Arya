import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export async function GET() {
  try {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    
    
    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }
    
    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    
    console.error('Failed to fetch products:', errorMessage);
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const res = await fetch('https://api.escuelajs.co/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    
    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const newProduct = await res.json();
    revalidatePath('/admin');
    return NextResponse.json(newProduct);
  } catch (error) {
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
      
    console.error('Product creation failed:', errorMessage);
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}