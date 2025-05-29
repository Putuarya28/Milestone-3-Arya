import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`);
    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }
    const product = await res.json();
    return NextResponse.json(product);
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    console.error('Failed to fetch product:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      throw new Error(`Update failed with status: ${res.status}`);
    }

    const updatedProduct = await res.json();
    revalidatePath('/admin');
    return NextResponse.json(updatedProduct);
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    console.error('Failed to update product:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`, {
      method: 'DELETE',
    });

    
    if (!res.ok) {
      throw new Error(`Failed to delete product. Status: ${res.status}`);
    }
    
    revalidatePath('/admin');
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    
    console.error('Delete operation failed:', errorMessage);
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}