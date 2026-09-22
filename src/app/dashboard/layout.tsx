import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10 bg-[#FFF8F2] min-h-screen">
        {children}
      </main>
    </div>
  );
}