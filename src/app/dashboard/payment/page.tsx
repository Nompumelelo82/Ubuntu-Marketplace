"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function PaymentPage() {
  const { subtotal, clearCart } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<"PayFast" | "SnapScan">("PayFast");
  const [status, setStatus] = useState<"idle" | "processing" | "failed">("idle");

  function handlePay() {
    setStatus("processing");
    setTimeout(() => {
      // Simulated payment — always succeeds in this demo
      clearCart();
      router.push("/dashboard/orders/ORD-NEW");
    }, 1500);
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      <div className="card p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-[#1F2937]/60">Order Amount</span>
          <span className="font-bold">R{subtotal}</span>
        </div>

        <div>
          <p className="text-sm text-[#1F2937]/60 mb-2">Payment Method</p>
          <div className="grid grid-cols-2 gap-3">
            {(["PayFast", "SnapScan"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`btn ${method === m ? "btn-primary" : "btn-outline"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#1F2937]/50">
          🔒 Payments are encrypted and processed securely.
        </p>

        {status === "failed" && (
          <p className="text-[#DC2626] text-sm">
            Payment failed. Please try again.
          </p>
        )}

        <button
          onClick={handlePay}
          disabled={status === "processing"}
          className="btn btn-primary w-full"
        >
          {status === "processing" ? "Processing..." : `Pay R${subtotal}`}
        </button>
      </div>
    </div>
  );
}