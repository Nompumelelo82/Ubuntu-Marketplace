"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { products, communityPosts, orders, notifications } from "@/lib/mockData";

export default function DashboardHome() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <button onClick={handleLogout} className="btn btn-outline text-sm">
          Logout
        </button>
      </div>
      <p className="text-[#1F2937]/60 mb-8">Here's what's happening on Ubuntu Marketplace.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold mb-4">Featured Listings</h2>
          <div className="space-y-3">
            {products.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/marketplace/${p.id}`}
                className="flex justify-between text-sm hover:text-[#E95420]"
              >
                <span>{p.name}</span>
                <span className="font-semibold">R{p.price}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="flex justify-between text-sm">
                <span>{o.id}</span>
                <span className="font-semibold">R{o.total} · {o.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold mb-4">Recent Community Posts</h2>
          <div className="space-y-3">
            {communityPosts.slice(0, 2).map((post) => (
              <div key={post.id} className="text-sm">
                <p className="font-medium">{post.title}</p>
                <p className="text-[#1F2937]/60">{post.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-semibold mb-4">Notifications</h2>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <p key={n.id} className="text-sm">{n.message}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}