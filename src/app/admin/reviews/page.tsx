import { reviews } from "@/lib/mockData";

export default function AdminReviewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="card p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{r.productName} — {r.rating}</p>
              <p className="text-sm text-[#1F2937]/60">{r.comment}</p>
            </div>
            <button className="btn btn-danger">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}