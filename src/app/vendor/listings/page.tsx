"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function VendorListingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "products"), where("sellerId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Product, "id">),
      }));
      setProducts(items);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this listing?")) return;
    await deleteDoc(doc(db, "products", id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Link href="/vendor/listings/new" className="btn btn-primary">
          + Add Listing
        </Link>
      </div>

      {fetching ? (
        <p>Loading listings...</p>
      ) : products.length === 0 ? (
        <p className="text-[#1F2937]/60">You haven't added any listings yet.</p>
      ) : (
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
              <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}