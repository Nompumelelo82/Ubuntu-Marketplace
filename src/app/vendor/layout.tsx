import VendorSidebar from "@/components/VendorSidebar";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <VendorSidebar />
      <main className="flex-1 p-6 md:p-10 bg-[#FFF8F2] min-h-screen">
        {children}
      </main>
    </div>
  );
}