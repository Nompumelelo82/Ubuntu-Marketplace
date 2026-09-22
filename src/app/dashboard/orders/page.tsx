import Link from "next/link";
import { orders } from "@/lib/mockData";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/dashboard/orders/${order.id}`}
            className="card p-4 flex items-center justify-between hover:shadow-lg transition"
          >
            <div>
              <p className="font-semibold">{order.id}</p>
              <p className="text-sm text-[#1F2937]/60">{order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">R{order.total}</p>
              <p className="text-sm text-[#2E7D32]">{order.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}