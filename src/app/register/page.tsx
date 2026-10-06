"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type AccountType = "Student" | "Faculty" | "Resident" | "Vendor" | null;

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        accountType,
        businessName: accountType === "Vendor" ? form.businessName : null,
        createdAt: new Date().toISOString(),
      });

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <input className="input" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input className="input" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input className="input" name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input className="input" name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />

            {accountType === "Vendor" && (
              <>
                <input className="input" name="businessName" placeholder="Business Name" onChange={handleChange} required />
                <input
                  className="input"
                  placeholder="Business Registration Document (upload reference)"
                />
              </>
            )}

            <input className="input" name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input className="input" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
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