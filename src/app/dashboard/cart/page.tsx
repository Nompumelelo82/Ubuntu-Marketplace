"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p className="text-[#1F2937]/60 mb-6">Your cart is empty.</p>
        <Link href="/marketplace" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="card p-4 flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-semibold">{product.name}</p>
              <p className="text-[#E95420] font-bold">R{product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="btn btn-outline px-3 py-1"
              >
                -
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="btn btn-outline px-3 py-1"
              >
                +
              </button>
            </div>
            <p className="font-semibold w-20 text-right">
              R{product.price * quantity}
            </p>
            <button
              onClick={() => removeFromCart(product.id)}
              className="text-[#DC2626] text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="card p-6 mt-6 flex items-center justify-between">
        <div>
          <p className="text-[#1F2937]/60">Total</p>
          <p className="text-2xl font-bold">R{subtotal}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/marketplace" className="btn btn-outline">
            Continue Shopping
          </Link>
          <Link href="/dashboard/checkout" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}