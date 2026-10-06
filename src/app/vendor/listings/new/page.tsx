"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { auth, db } from "@/firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";

export default function AddListingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const userSnap = await getDoc(doc(db, "users", user!.uid));
      const userData = userSnap.exists() ? userSnap.data() : null;
      const sellerName = userData
        ? `${userData.firstName} ${userData.lastName}`
        : "Unknown Seller";

      const categoryImages: Record<string, string> = {
        Textbooks:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=400&fit=crop",
        Electronics:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
        Furniture:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
      };

      await addDoc(collection(db, "products"), {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        condition: form.condition,
        image:
          categoryImages[form.category] ||
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop",
        sellerId: user!.uid,
        sellerName,
        verifiedSeller: userData?.accountType === "Vendor",
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      });

      router.push("/vendor/listings");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add Listing</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          className="input"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <textarea
          className="input"
          name="description"
          placeholder="Description"
          rows={4}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="price"
          type="number"
          placeholder="Price (R)"
          onChange={handleChange}
          required
        />
        <select className="input" name="category" onChange={handleChange} required>
          <option value="">Category</option>
          <option>Textbooks</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>
        <select className="input" name="condition" onChange={handleChange} required>
          <option value="">Condition</option>
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>
        <input className="input" type="file" accept="image/*" />
        <p className="text-xs text-[#1F2937]/50">
          Image upload isn't wired up yet — a real category photo will be used automatically.
        </p>

        <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
          {submitting ? "Publishing..." : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}