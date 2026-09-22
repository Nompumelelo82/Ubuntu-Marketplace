import { reviews } from "@/lib/mockData";

export default function VendorReviewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="card p-4">
            <div className="flex justify-between">
              <p className="font-semibold">{r.productName}</p>
              <p> {r.rating}</p>
            </div>
            <p className="text-[#1F2937]/70 text-sm mt-1">{r.comment}</p>
            <p className="text-xs text-[#1F2937]/50 mt-2">
              {r.reviewer} · {r.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}