import { notifications } from "@/lib/mockData";

export default function AdminNotificationsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="card p-4">
            <span className="text-xs font-semibold text-[#772953] uppercase">
              {n.type}
            </span>
            <p className="mt-1">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}