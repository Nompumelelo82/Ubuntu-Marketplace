"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

type Notification = {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Notification, "id">),
      }));
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setNotifications(items);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [user]);

  async function markAsRead(id: string) {
    await updateDoc(doc(db, "notifications", id), { read: true });
  }

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {fetching ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="text-[#1F2937]/60">No notifications yet.</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.read && markAsRead(n.id)}
              className={`card p-4 flex items-start justify-between cursor-pointer ${
                !n.read ? "border-l-4 border-l-[#E95420]" : ""
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-[#772953] uppercase">
                  {n.type}
                </span>
                <p className="mt-1">{n.message}</p>
              </div>
              <span className="text-xs text-[#1F2937]/50 whitespace-nowrap">
                {new Date(n.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}