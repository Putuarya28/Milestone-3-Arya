"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/app/types/product";

type CartItem = Product & { quantity: number };

// Add new types for checkout
type CheckoutStatus = "idle" | "processing" | "success" | "error";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  // Add new checkout-related properties
  total: number;
  itemCount: number;
  checkout: () => Promise<void>;
  checkoutStatus: CheckoutStatus;
  checkoutError: string | null;
  updateQuantity: (id: number, quantity: number) => void;
  decreaseQuantity: (id: number) => void;
  increaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Add new state for checkout
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Calculate total and item count
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Clear cart when user logs out
  useEffect(() => {
    if (status === "unauthenticated") {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [status]);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // 
  };

  const decreaseQuantity = (id: number) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

  // Add quantity update function
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  
  const checkout = async () => {
    setCheckoutStatus("processing");
    setCheckoutError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      
      const checkoutData = {
        items: cart,
        total,
        date: new Date().toISOString(),
      };
      console.log("Checkout data:", checkoutData);

      clearCart();
      setCheckoutStatus("success");
    } catch (error) {
      setCheckoutStatus("error");
      setCheckoutError(
        error instanceof Error ? error.message : "Checkout failed"
      );
    }
  };

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        itemCount,
        checkout,
        checkoutStatus,
        checkoutError,
        updateQuantity,
        decreaseQuantity,
        increaseQuantity, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};