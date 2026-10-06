"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/useAuth";
import { communityPosts } from "@/lib/mockData";
import { db } from "@/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

type PreviewProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  verifiedSeller: boolean;
};

export default function HomePage() {
  const [previewProducts, setPreviewProducts] = useState<PreviewProduct[]>([]);
  const previewPosts = communityPosts.slice(0, 2);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPreviewProducts(
        snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name,
            price: data.price,
            image: data.image,
            verifiedSeller: data.verifiedSeller,
          };
        })
      );
    });
    return () => unsubscribe();
  }, []);

  function handleShopNow() {
    if (user) {
      router.push("/marketplace");
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <Navbar forceGuestView />

      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 flex">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=500&fit=crop"
            alt="Ubuntu Marketplace student"
            className="w-1/2 h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=500&fit=crop"
            alt="Ubuntu Marketplace student"
            className="w-1/2 h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ubuntu Marketplace
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl">
            A trusted campus-community marketplace for buying, selling,
            trading and connecting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleShopNow} className="btn btn-primary">
              Browse Marketplace
            </button>
            <Link
              href="/register"
              className="btn btn-outline bg-white/10 text-white border-white hover:bg-white/20"
            >
              Join Ubuntu Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Marketplace preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Marketplace Preview</h2>
        {previewProducts.length === 0 ? (
          <p className="text-[#1F2937]/60">No listings yet — be the first to add one.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {previewProducts.map((product) => (
              <div key={product.id} className="card overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-[#1F2937]">
                      {product.name}
                    </h3>
                    {product.verifiedSeller && (
                      <span className="text-xs bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[#E95420] font-bold mt-1">
                    R{product.price}
                  </p>
                  <button onClick={handleShopNow} className="btn btn-primary w-full mt-4">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Community preview */}
      <section className="bg-[#F3F4F6] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Community Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {previewPosts.map((post) => (
              <div key={post.id} className="card p-6">
                <span className="text-xs font-semibold text-[#E95420] uppercase">
                  {post.category}
                </span>
                <h3 className="font-semibold text-lg mt-1">{post.title}</h3>
                <p className="text-[#1F2937]/70 text-sm mt-2">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/community" className="btn btn-secondary">
              View Community
            </Link>
          </div>
        </div>
      </section>

      {/* Why Ubuntu Marketplace */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Why Ubuntu Marketplace?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Trusted campus community",
            "Verified users & vendors",
            "Secure payments",
            "Second-hand trading",
            "Community connection",
          ].map((item) => (
            <div key={item} className="card p-6 text-center">
              <p className="font-semibold text-[#772953]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}