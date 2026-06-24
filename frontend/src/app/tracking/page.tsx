"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyOrders, type Order } from "@/lib/orders";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";

export default function TrackingListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setError("Could not load orders. Please sign in."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#0F172A]/60">Loading your orders...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-[#F8FAFC] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-semibold text-[#0F172A]">
          Track Your Orders
        </h1>
        <p className="mt-1 text-sm text-[#0F172A]/60">
          See the live status of every pickup you&apos;ve scheduled.
        </p>

        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

        {!error && orders.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#0F172A]/10 bg-white p-8 text-center">
            <p className="text-[#0F172A]/70">You don&apos;t have any orders yet.</p>
            <Link
              href="/schedule-pickup"
              className="mt-4 inline-block text-sm font-medium text-[#1E3A8A]"
            >
              Schedule your first pickup →
            </Link>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={"/tracking/" + order.id}
              className="block rounded-2xl border border-[#0F172A]/10 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#0F172A]/50">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="mt-1 text-sm text-[#0F172A]/70">
                    {order.pickup_address}
                  </p>
                </div>
                <span
                  className={
                    "rounded-full px-3 py-1 text-xs font-medium " +
                    (STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700")
                  }
                >
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#0F172A]/10 pt-4">
                <span className="text-sm text-[#0F172A]/60">
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </span>
                <span className="font-serif text-lg font-semibold text-[#1E3A8A]">
                  KES {order.total_amount.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}