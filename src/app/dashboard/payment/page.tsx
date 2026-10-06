"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

type Order = {
  total: number;
  buyerName: string;
  buyerEmail: string;
  status: string;
};

export default function PaymentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setFetching(false);
        return;
      }
      const snap = await getDoc(doc(db, "orders", orderId));
      if (snap.exists()) {
        setOrder(snap.data() as Order);
      }
      setFetching(false);
    }
    fetchOrder();
  }, [orderId]);

  if (loading || fetching) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!orderId || !order) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <p className="text-[#1F2937]/60">No order found.</p>
      </div>
    );
  }

  const payfastUrl = process.env.NEXT_PUBLIC_PAYFAST_URL!;
  const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID!;
  const merchantKey = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY!;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      <div className="card p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-[#1F2937]/60">Order Amount</span>
          <span className="font-bold">R{order.total}</span>
        </div>

        <p className="text-xs text-[#1F2937]/50">
          🔒 You'll be redirected to PayFast's secure sandbox to complete payment.
        </p>

        <form action={payfastUrl} method="POST">
          <input type="hidden" name="merchant_id" value={merchantId} />
          <input type="hidden" name="merchant_key" value={merchantKey} />
          <input type="hidden" name="return_url" value={`${siteUrl}/dashboard/orders?paid=${orderId}`} />
          <input type="hidden" name="cancel_url" value={`${siteUrl}/dashboard/checkout`} />
          <input type="hidden" name="notify_url" value={`${siteUrl}/api/payfast-notify`} />
          <input type="hidden" name="name_first" value={order.buyerName} />
          <input type="hidden" name="email_address" value={order.buyerEmail} />
          <input type="hidden" name="m_payment_id" value={orderId} />
          <input type="hidden" name="amount" value={order.total.toFixed(2)} />
          <input type="hidden" name="item_name" value={`Ubuntu Marketplace Order ${orderId}`} />

          <button type="submit" className="btn btn-primary w-full">
            Pay R{order.total} with PayFast
          </button>
        </form>
      </div>
    </div>
  );
}