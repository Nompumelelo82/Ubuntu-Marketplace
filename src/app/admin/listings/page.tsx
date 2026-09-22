import { products } from "@/lib/mockData";

export default function AdminListingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Listings</h1>
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="card p-4 flex items-center gap-4">
            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-[#1F2937]/60">Seller: {p.seller}</p>
            </div>
            <p className="font-bold text-[#E95420]">R{p.price}</p>
            <button className="btn btn-outline">Review</button>
            <button className="btn btn-danger">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}