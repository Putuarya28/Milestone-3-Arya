"use client";
import { useCart } from "./CartContext";
import Image from "next/image";
import React from "react";

export default function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, clearCart } = useCart();
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-neutral-900 shadow-lg z-[999] transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="cursor-pointer text-2xl">&times;</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image src={item.images[0]} alt={item.title} fill className="object-contain rounded" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-500">x{item.quantity}</div>
                <div className="text-sm text-blue-600">${item.price}</div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-lg ml-2">&times;</button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <button onClick={clearCart} className="w-full bg-red-500 text-white py-2 rounded">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}