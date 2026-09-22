"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const router = useRouter();

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard/payment");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-6">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span>{product.name} × {quantity}</span>
                <span>R{product.price * quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E5E7EB] mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>R{subtotal}</span>
          </div>
        </div>

        <form onSubmit={handleContinue} className="card p-6 space-y-4">
          <h2 className="font-semibold mb-2">Customer Information</h2>
          <input className="input" placeholder="Full Name" required />
          <input className="input" type="email" placeholder="Email" required />
          <input className="input" type="tel" placeholder="Phone Number" required />
          <input className="input" placeholder="Delivery / Meetup Location" required />
          <button type="submit" className="btn btn-primary w-full">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
}