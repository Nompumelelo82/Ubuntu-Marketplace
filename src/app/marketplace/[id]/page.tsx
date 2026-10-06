"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Product } from "@/lib/mockData";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      const snap = await getDoc(doc(db, "products", id as string));
      if (snap.exists()) {
        const data = snap.data();
        setProduct({
          id: snap.id,
          name: data.name,
          price: data.price,
          image: data.image,
          category: data.category,
          condition: data.condition,
          seller: data.sellerName,
          verifiedSeller: data.verifiedSeller,
          description: data.description,
          rating: data.rating,
          reviewCount: data.reviewCount,
        });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <p>Product not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="text-[#772953] font-medium mb-6"
        >
          ← Back
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-[1.25rem] object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-[#E95420] text-2xl font-bold mt-2">
              R{product.price}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm bg-[#F3F4F6] px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-sm bg-[#F3F4F6] px-3 py-1 rounded-full">
                {product.condition}
              </span>
            </div>

            <p className="text-[#1F2937]/80 mt-4">{product.description}</p>

            <div className="card p-4 mt-6">
              <p className="font-semibold">
                Seller: {product.seller}{" "}
                {product.verifiedSeller && (
                  <span className="text-xs bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-1 rounded-full ml-2">
                    Verified
                  </span>
                )}
              </p>
              <p className="text-sm text-[#1F2937]/60 mt-1">
                {product.rating} ({product.reviewCount} reviews)
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full mt-6"
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}