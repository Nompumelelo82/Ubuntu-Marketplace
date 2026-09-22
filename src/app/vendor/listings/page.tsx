import Link from "next/link";
import { products } from "@/lib/mockData";

export default function VendorListingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Link href="/vendor/listings/new" className="btn btn-primary">
          + Add Listing
        </Link>
      </div>
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="card p-4 flex items-center gap-4">
            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-semibold">{p.name}</p>
              <p className="text-[#E95420] font-bold">R{p.price}</p>
            </div>
            <span className="text-xs bg-[#2E7D32]/10 text-[#2E7D32] px-3 py-1 rounded-full">
              Active
            </span>
            <button className="btn btn-outline">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}