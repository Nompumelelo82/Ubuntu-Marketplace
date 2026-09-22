import Link from "next/link";
import { orders } from "@/lib/mockData";

export default function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = orders.find((o) => o.id === params.id);

  // Handles the "ORD-NEW" redirect straight after payment
  const isNew = params.id === "ORD-NEW";

  return (
    <div className="max-w-lg">
      {isNew && (
        <div className="card p-6 mb-6 bg-[#2E7D32]/10 border-[#2E7D32]">
          <p className="text-[#2E7D32] font-bold text-lg">
            ✓ Order successfully placed!
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6">
        Order {isNew ? "Confirmation" : order?.id}
      </h1>

      {order ? (
        <div className="card p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#1F2937]/60">Order Number</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#1F2937]/60">Date</span>
            <span className="font-medium">{order.date}</span>
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
      ) : (
        <p className="text-[#1F2937]/60">
          Your order is being confirmed — check My Orders shortly for full details.
        </p>
      )}

      <Link href="/dashboard/orders" className="btn btn-primary mt-6 inline-block">
        View My Orders
      </Link>
    </div>
  );
}