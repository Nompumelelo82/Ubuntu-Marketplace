import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, communityPosts } from "@/lib/mockData";

export default function HomePage() {
  const previewProducts = products.slice(0, 3);
  const previewPosts = communityPosts.slice(0, 2);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-[#FFF8F2] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#772953] mb-4">
            Ubuntu Marketplace
          </h1>
          <p className="text-lg text-[#1F2937] mb-8">
            A trusted campus-community marketplace for buying, selling,
            trading and connecting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="btn btn-primary">
              Browse Marketplace
            </Link>
            <Link href="/register" className="btn btn-outline">
              Join Ubuntu Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Marketplace preview */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Marketplace Preview</h2>
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
                <Link
                  href={`/marketplace/${product.id}`}
                  className="btn btn-outline w-full mt-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
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