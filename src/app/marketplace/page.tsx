"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair";
  seller: string;
  verifiedSeller: boolean;
  description: string;
  rating: number;
  reviewCount: number;
};

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
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
        } as Product;
      });
      setProducts(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const conditions = ["All", "New", "Like New", "Good", "Fair"];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      const matchesCondition = condition === "All" || p.condition === condition;
      return matchesSearch && matchesCategory && matchesCondition;
    });
  }, [search, category, condition, products]);

  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Marketplace</h1>

        <input
          type="text"
          placeholder="Search for textbooks, laptops, furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input mb-6"
        />

        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input w-auto"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="input w-auto"
          >
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="text-[#1F2937]/60">No products match your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}