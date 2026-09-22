import { products, orders, reviews } from "@/lib/mockData";

export default function VendorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Vendor Dashboard</h1>
      <p className="text-[#1F2937]/60 mb-8">Manage your listings and orders.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#E95420]">{products.length}</p>
          <p className="text-sm text-[#1F2937]/60">Total Listings</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#772953]">{products.length}</p>
          <p className="text-sm text-[#1F2937]/60">Active Listings</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#2E7D32]">{orders.length}</p>
          <p className="text-sm text-[#1F2937]/60">Recent Orders</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#772953]">{reviews.length}</p>
          <p className="text-sm text-[#1F2937]/60">Recent Reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold mb-4">Recent Orders</h2>
          {orders.map((o) => (
            <div key={o.id} className="flex justify-between text-sm py-1">
              <span>{o.id}</span>
              <span>R{o.total} · {o.status}</span>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <h2 className="font-semibold mb-4">Recent Reviews</h2>
          {reviews.map((r) => (
            <div key={r.id} className="text-sm py-1">
              <p className="font-medium">{r.productName} — {r.rating}</p>
              <p className="text-[#1F2937]/60">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}