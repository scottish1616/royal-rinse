"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, type Order } from "@/lib/orders";
import { STATUS_FLOW, STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";

export default function OrderManagementTable({
  allowStatusChange = true,
}: {
  allowStatusChange?: boolean;
  onOrdersLoaded?: (orders: Order[]) => void;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  function loadOrders() {
    setLoading(true);
    getAllOrders()
      .then(setOrders)
      .catch(() => setError("Could not load orders."))
      .finally(() => setLoading(false));
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-[#0F172A]/60">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-[#0F172A]/10 bg-white p-8 text-center">
        <p className="text-[#0F172A]/70">No orders to show yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#0F172A]/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[#0F172A]/10 bg-[#0F172A]/[0.02]">
          <tr>
            <th className="px-4 py-3 font-medium text-[#0F172A]/60">Order</th>
            <th className="px-4 py-3 font-medium text-[#0F172A]/60">Pickup</th>
            <th className="px-4 py-3 font-medium text-[#0F172A]/60">Total</th>
            <th className="px-4 py-3 font-medium text-[#0F172A]/60">Status</th>
            {allowStatusChange && (
              <th className="px-4 py-3 font-medium text-[#0F172A]/60">Update</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#0F172A]/10">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 font-mono text-xs text-[#0F172A]/70">
                #{order.id.slice(0, 8).toUpperCase()}
              </td>
              <td className="px-4 py-3 text-[#0F172A]/70">{order.pickup_address}</td>
              <td className="px-4 py-3 font-medium text-[#1E3A8A]">
                KES {order.total_amount.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={
                    "rounded-full px-3 py-1 text-xs font-medium " +
                    (STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700")
                  }
                >
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </td>
              {allowStatusChange && (
                <td className="px-4 py-3">
                  {order.status === "cancelled" || order.status === "delivered" ? (
                    <span className="text-xs text-[#0F172A]/40">No actions</span>
                  ) : (
                    <select
                      disabled={updatingId === order.id}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="rounded-lg border border-[#0F172A]/15 px-2 py-1 text-xs"
                    >
                      {STATUS_FLOW.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABELS[status]}
                        </option>
                      ))}
                      <option value="cancelled">Cancelled</option>
                    </select>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}