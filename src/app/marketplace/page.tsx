"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const conditions = ["All", "New", "Like New", "Good", "Fair"];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      const matchesCondition = condition === "All" || p.condition === condition;
      return matchesSearch && matchesCategory && matchesCondition;
    });
  }, [search, category, condition]);

  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Marketplace</h1>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search for textbooks, laptops, furniture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input mb-6"
        />

        {/* Filters */}
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

        {/* Results */}
        {filtered.length === 0 ? (
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