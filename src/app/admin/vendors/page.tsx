import { vendors } from "@/lib/mockData";

export default function AdminVendorsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendors</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F3F4F6] text-left">
            <tr>
              <th className="p-4">Business</th>
              <th className="p-4">Owner</th>
              <th className="p-4">Listings</th>
              <th className="p-4">Verification</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-t border-[#E5E7EB]">
                <td className="p-4">{v.businessName}</td>
                <td className="p-4">{v.owner}</td>
                <td className="p-4">{v.listings}</td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      v.verified
                        ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                        : "bg-[#DC2626]/10 text-[#DC2626]"
                    }`}
                  >
                    {v.verified ? "Verified" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}