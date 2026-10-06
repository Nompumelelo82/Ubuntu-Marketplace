"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  buyerId: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      const snap = await getDoc(doc(db, "orders", params.id));
      if (snap.exists()) {
        setOrder(snap.data() as Order);
      }
      setFetching(false);
    }
    fetchOrder();
  }, [params.id]);

  if (loading || fetching) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!order) {
    return (
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Link href="/dashboard/orders" className="btn btn-primary">
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      {order.paymentStatus === "Paid" && (
        <div className="card p-6 mb-6 bg-[#2E7D32]/10 border-[#2E7D32]">
          <p className="text-[#2E7D32] font-bold text-lg">
            ✓ Payment confirmed!
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">Order #{params.id.slice(0, 8)}</h1>

      <div className="card p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#1F2937]/60">Date</span>
          <span className="font-medium">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#1F2937]/60">Payment Status</span>
          <span className="font-medium">{order.paymentStatus}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#1F2937]/60">Order Status</span>
          <span className="font-medium">{order.status}</span>
        </div>
        <div className="border-t border-[#E5E7EB] pt-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>R{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold pt-2">
          <span>Total</span>
          <span>R{order.total}</span>
        </div>
      </div>

      <Link href="/dashboard/orders" className="btn btn-primary mt-6 inline-block">
        View My Orders
      </Link>
    </div>
  );
}