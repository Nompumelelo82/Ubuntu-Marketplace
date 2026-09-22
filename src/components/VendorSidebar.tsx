"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/vendor", label: "Dashboard" },
  { href: "/vendor/listings", label: "My Listings" },
  { href: "/vendor/listings/new", label: "Add Listing" },
  { href: "/vendor/orders", label: "Orders" },
  { href: "/vendor/reviews", label: "Reviews" },
  { href: "/vendor/community", label: "Community" },
  { href: "/vendor/notifications", label: "Notifications" },
  { href: "/vendor/profile", label: "Profile" },
];

export default function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] min-h-screen p-4 hidden md:block">
      <Link href="/" className="text-lg font-bold text-[#772953] block mb-8">
        Ubuntu <span className="text-[#E95420]">Vendor</span>
      </Link>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-lg font-medium ${
              pathname === link.href
                ? "bg-[#E95420]/10 text-[#E95420]"
                : "text-[#1F2937] hover:bg-[#F3F4F6]"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg font-medium text-[#DC2626] hover:bg-[#DC2626]/10 mt-4"
        >
          Logout
        </Link>
      </nav>
    </aside>
  );
}