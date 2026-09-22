import { adminUsers, vendors, products, orders } from "@/lib/mockData";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-[#1F2937]/60 mb-8">Platform overview.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#E95420]">{adminUsers.length}</p>
          <p className="text-sm text-[#1F2937]/60">Total Users</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#772953]">{vendors.length}</p>
          <p className="text-sm text-[#1F2937]/60">Total Vendors</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#2E7D32]">{products.length}</p>
          <p className="text-sm text-[#1F2937]/60">Total Listings</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-[#772953]">{orders.length}</p>
          <p className="text-sm text-[#1F2937]/60">Total Orders</p>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="font-semibold mb-4">Pending Items Requiring Attention</h2>
        <p className="text-sm text-[#1F2937]/60">
          {vendors.filter((v) => !v.verified).length} vendor(s) awaiting verification.
        </p>
      </div>
    </div>
  );
}