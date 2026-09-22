import { orders } from "@/lib/mockData";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders / Transactions</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F3F4F6] text-left">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-[#E5E7EB]">
                <td className="p-4">{o.id}</td>
                <td className="p-4">{o.date}</td>
                <td className="p-4">R{o.total}</td>
                <td className="p-4">{o.paymentStatus}</td>
                <td className="p-4">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}