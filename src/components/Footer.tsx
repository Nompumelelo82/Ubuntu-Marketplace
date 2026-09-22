import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#772953] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-2">
            Ubuntu Marketplace
          </h3>
          <p className="text-white/80 text-sm">
            A trusted campus-community marketplace for buying, selling,
            trading and connecting.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/marketplace" className="hover:text-white">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/community" className="hover:text-white">
                Community
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-white/80 text-sm">CPUT Campus, Cape Town</p>
          <p className="text-white/80 text-sm">support@ubuntumarket.co.za</p>
        </div>
      </div>

      <div className="border-t border-white/20 text-center text-white/60 text-sm py-4">
        © {new Date().getFullYear()} Ubuntu Marketplace. All rights reserved.
      </div>
    </footer>
  );
}