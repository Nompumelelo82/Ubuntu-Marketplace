"use client";

import Link from "next/link";
import { Product } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
      <Link href={`/marketplace/${product.id}`} className="block relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition group-hover:scale-[1.03]"
        />
        {product.verifiedSeller && (
          <span className="absolute top-3 right-3 text-xs font-medium bg-white/95 text-[#2E7D32] px-2 py-1 rounded-full shadow-sm">
            Verified
          </span>
        )}
      </Link>

      <div className="p-4">
        <p className="text-xs text-[#1F2937]/50 uppercase tracking-wide">
          {product.category}
        </p>
        <Link href={`/marketplace/${product.id}`}>
          <h3 className="font-semibold text-[#1F2937] mt-1 hover:text-[#E95420] transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-2">
          <p className="text-[#E95420] font-bold text-lg">R{product.price}</p>
          <span className="text-xs text-[#1F2937]/50">{product.condition}</span>
        </div>

        <p className="text-xs text-[#1F2937]/50 mt-1">by {product.seller}</p>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/marketplace/${product.id}`}
            className="btn btn-outline flex-1 text-sm"
          >
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn btn-primary flex-1 text-sm">
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}