"use client";
import { useCart } from "./CartContext";
import Image from "next/image";
import React from "react";

export default function CartSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, clearCart, total, itemCount, checkout, checkoutStatus, checkoutError, decreaseQuantity, increaseQuantity } = useCart();

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
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-lg font-bold"
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >-</button>
                  <span>x{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-lg font-bold"
                    aria-label="Increase quantity"
                  >+</button>
                </div>
                <div className="text-sm text-blue-600">${item.price}</div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-lg ml-2">&times;</button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 border-t space-y-4">
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Total Items:</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
            </div>
          </div>

          {checkoutError && (
            <div className="p-2 text-sm bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 rounded">
              {checkoutError}
            </div>
          )}

          <button
            onClick={checkout}
            disabled={checkoutStatus === "processing"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50 transition-colors duration-200"
          >
            {checkoutStatus === "processing" ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </div>
            ) : (
              `Checkout ($${total.toFixed(2)})`
            )}
          </button>

          <button 
            onClick={clearCart} 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition-colors duration-200"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}