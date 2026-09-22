import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10 bg-[#FFF8F2] min-h-screen">
        {children}
      </main>
    </div>
  );
}