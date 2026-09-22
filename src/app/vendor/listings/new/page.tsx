"use client";

import { useRouter } from "next/navigation";

export default function AddListingPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/vendor/listings");
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add Listing</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <input className="input" placeholder="Product Name" required />
        <textarea className="input" placeholder="Description" rows={4} required />
        <input className="input" type="number" placeholder="Price (R)" required />
        <select className="input" required>
          <option value="">Category</option>
          <option>Textbooks</option>
          <option>Electronics</option>
          <option>Furniture</option>
        </select>
        <select className="input" required>
          <option value="">Condition</option>
          <option>New</option>
          <option>Like New</option>
          <option>Good</option>
          <option>Fair</option>
        </select>
        <input className="input" type="file" accept="image/*" />
        <button type="submit" className="btn btn-primary w-full">
          Publish Listing
        </button>
      </form>
    </div>
  );
}