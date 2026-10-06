"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-[#1F2937]/60">Your cart is empty.</p>
      </div>
    );
  }

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const orderRef = await addDoc(collection(db, "orders"), {
        buyerId: user!.uid,
        buyerName: form.fullName,
        buyerEmail: form.email,
        buyerPhone: form.phone,
        location: form.location,
        items: items.map(({ product, quantity }) => ({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          sellerId: (product as any).sellerId || null,
        })),
        total: subtotal,
        status: "Pending",
        paymentStatus: "Pending",
        createdAt: new Date().toISOString(),
      });

      router.push(`/dashboard/payment?orderId=${orderRef.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
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
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            className="input"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="location"
            placeholder="Delivery / Meetup Location"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? "Processing..." : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}