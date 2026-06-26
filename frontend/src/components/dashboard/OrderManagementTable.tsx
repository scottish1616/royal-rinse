"use client";

import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  recordPayment,
  getDrivers,
  assignDriver,
  type Order,
  type Driver,
} from "@/lib/orders";
import { STATUS_FLOW, STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";

export default function OrderManagementTable({
  allowStatusChange = true,
  onOrdersLoaded,
}: {
  allowStatusChange?: boolean;
  onOrdersLoaded?: (orders: Order[]) => void;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Load orders once on mount and keep the UI in sync with the latest server state.

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        if (!isMounted) return;
        setOrders(data);
        if (onOrdersLoaded) onOrdersLoaded(data);
      } catch {
        if (!isMounted) return;
        setError("Could not load orders.");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    void fetchOrders();
    getDrivers()
      .then((data) => {
        if (isMounted) setDrivers(data);
      })
      .catch(() => {
        // Non-admin/staff roles can't see drivers list; safe to ignore.
      });

    return () => {
      isMounted = false;
    };
  }, [onOrdersLoaded]);

  function updateLocalOrder(orderId: string, updated: Order) {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? updated : o));
      if (onOrdersLoaded) onOrdersLoaded(next);
      return next;
    });
  }

  async function handleStatusChange(orderId: string, newStatus: string) {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      updateLocalOrder(orderId, updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleAssignDriver(orderId: string, driverId: string) {
    if (!driverId) return;
    setUpdatingId(orderId);
    try {
      const updated = await assignDriver(orderId, driverId);
      updateLocalOrder(orderId, updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to assign driver");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleRecordPayment(orderId: string, method: string) {
    if (!confirm("Mark this order as paid via " + method.toUpperCase() + "?")) return;
    setUpdatingId(orderId);
    try {
      await recordPayment(orderId, method);
      alert("Payment recorded successfully.");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to record payment");
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
    <div className="overflow-x-auto rounded-2xl border border-[#0F172A]/10 bg-white">
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
            {drivers.length > 0 && (
              <th className="px-4 py-3 font-medium text-[#0F172A]/60">Driver</th>
            )}
            <th className="px-4 py-3 font-medium text-[#0F172A]/60">Payment</th>
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
              {drivers.length > 0 && (
                <td className="px-4 py-3">
                  <select
                    disabled={updatingId === order.id}
                    defaultValue=""
                    onChange={(e) => handleAssignDriver(order.id, e.target.value)}
                    className="rounded-lg border border-[#0F172A]/15 px-2 py-1 text-xs"
                  >
                    <option value="" disabled>
                      Assign driver
                    </option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.full_name}
                      </option>
                    ))}
                  </select>
                </td>
              )}
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button
                    disabled={updatingId === order.id}
                    onClick={() => handleRecordPayment(order.id, "cash")}
                    className="rounded-lg border border-[#0F172A]/15 px-2 py-1 text-xs hover:bg-[#0F172A]/5"
                  >
                    Cash
                  </button>
                  <button
                    disabled={updatingId === order.id}
                    onClick={() => handleRecordPayment(order.id, "mpesa")}
                    className="rounded-lg border border-[#0F172A]/15 px-2 py-1 text-xs hover:bg-[#0F172A]/5"
                  >
                    M-Pesa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}