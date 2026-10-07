"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

type Review = {
  id: string;
  productName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export default function VendorReviewsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "reviews"),
      where("sellerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Review, "id">),
      }));
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setReviews(items);
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
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>

      {fetching ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-[#1F2937]/60">No reviews on your products yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="card p-4">
              <div className="flex justify-between">
                <p className="font-semibold">{r.productName}</p>
                <p>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              </div>
              <p className="text-[#1F2937]/70 text-sm mt-1">{r.comment}</p>
              <p className="text-xs text-[#1F2937]/50 mt-2">
                {r.reviewerName} · {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}