"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 bg-[#FFF8F2] min-h-screen">
        {children}
      </main>
    </div>
  );
}