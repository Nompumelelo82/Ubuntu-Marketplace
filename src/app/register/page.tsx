"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AccountType = "Student" | "Faculty" | "Resident" | "Vendor" | null;

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/login");
  }

  return (
    <>
      <Navbar />
      <section className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Your Account
        </h1>

        {!accountType ? (
          <div className="card p-6">
            <p className="font-semibold mb-4">Choose Account Type</p>
            <div className="grid grid-cols-2 gap-3">
              {(["Student", "Faculty", "Resident", "Vendor"] as const).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setAccountType(type)}
                    className="btn btn-outline"
                  >
                    {type}
                  </button>
                )
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-6 space-y-4">
            <p className="font-semibold">
              Registering as: <span className="text-[#E95420]">{accountType}</span>{" "}
              <button
                type="button"
                onClick={() => setAccountType(null)}
                className="text-sm text-[#772953] underline ml-2"
              >
                Change
              </button>
            </p>

            <input className="input" placeholder="First Name" required />
            <input className="input" placeholder="Last Name" required />
            <input className="input" type="email" placeholder="Email" required />
            <input className="input" type="tel" placeholder="Phone Number" required />

            {accountType === "Vendor" && (
              <>
                <input className="input" placeholder="Business Name" required />
                <input
                  className="input"
                  placeholder="Business Registration Document (upload reference)"
                />
              </>
            )}

            <input className="input" type="password" placeholder="Password" required />
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              required
            />

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#772953] font-medium">
            Login
          </Link>
        </p>
      </section>
      <Footer />
    </>
  );
}