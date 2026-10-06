"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { useCart } from "@/context/CartContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const guestLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

const userLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export default function Navbar({ forceGuestView = false }: { forceGuestView?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  const showUser = !forceGuestView && !loading && user;
  const navLinks = showUser ? userLinks : guestLinks;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-[#772953]">
          Ubuntu <span className="text-[#E95420]">Marketplace</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1F2937] font-medium hover:text-[#E95420] transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/dashboard/cart" className="relative" aria-label="Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#1F2937] hover:text-[#E95420] transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 3h2l.4 2M7 13h10l3.6-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 006.5 17H17M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E95420] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {showUser ? (
            <>
              <Link href="/dashboard" className="btn btn-outline">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link href="/dashboard/cart" className="relative" aria-label="Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#1F2937]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M3 3h2l.4 2M7 13h10l3.6-8H5.4M7 13L5.4 5M7 13l-1.35 2.7A1 1 0 006.5 17H17M9 20a1 1 0 100-2 1 1 0 000 2zM17 20a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E95420] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            className="text-[#772953]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#1F2937] font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            {showUser ? (
              <>
                <Link href="/dashboard" className="btn btn-outline w-full" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary w-full">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline w-full" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary w-full" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}