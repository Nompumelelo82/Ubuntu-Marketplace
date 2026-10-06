"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

type Order = {
  id: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("buyerId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Order, "id">),
        }))
      );
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {fetching ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-[#1F2937]/60">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="card p-4 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-[#1F2937]/60">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">R{order.total}</p>
                <p
                  className={`text-sm ${
                    order.paymentStatus === "Paid" ? "text-[#2E7D32]" : "text-[#1F2937]/60"
                  }`}
                >
                  {order.status} · {order.paymentStatus}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}