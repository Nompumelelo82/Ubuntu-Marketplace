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
    <div className="card overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-[#1F2937]">{product.name}</h3>
          {product.verifiedSeller && (
            <span className="text-xs bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-1 rounded-full whitespace-nowrap">
              Verified
            </span>
          )}
        </div>
        <p className="text-sm text-[#1F2937]/60 mt-1">
          {product.category} · {product.condition}
        </p>
        <p className="text-[#E95420] font-bold mt-1">R{product.price}</p>
        <p className="text-sm text-[#1F2937]/60 mt-1">Seller: {product.seller}</p>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/marketplace/${product.id}`}
            className="btn btn-outline flex-1"
          >
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn btn-primary flex-1">
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}