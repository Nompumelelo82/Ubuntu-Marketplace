"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "vendor" | "admin">("user");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (role === "vendor") router.push("/vendor");
    else if (role === "admin") router.push("/admin");
    else router.push("/dashboard");
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <input className="input" type="email" placeholder="Email" required />
          <input
            className="input"
            type="password"
            placeholder="Password"
            required
          />

          <div>
            <p className="text-sm text-[#1F2937]/60 mb-2">
            </p>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value as typeof role)}
            >
              <option value="user">Student / Faculty / Resident</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#772953] font-medium">
            Register
          </Link>
        </p>
      </section>
      <Footer />
    </>
  );
}