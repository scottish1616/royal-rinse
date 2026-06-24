"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrder, type Order } from "@/lib/orders";
import {
  STATUS_FLOW,
  STATUS_LABELS,
  STATUS_COLORS,
  statusProgress,
} from "@/lib/order-status";

export default function TrackingDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrder(orderId)
      .then(setOrder)
      .catch(() => setError("Could not load this order."))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#0F172A]/60">Loading order...</p>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-600">{error || "Order not found."}</p>
      </main>
    );
  }

  const isCancelled = order.status === "cancelled";
  const currentStepIndex = STATUS_FLOW.indexOf(order.status);

  return (
    <main className="min-h-[80vh] bg-[#F8FAFC] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/tracking" className="text-sm text-[#1E3A8A]">
          ← Back to orders
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#0F172A]/50">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-[#0F172A]">
              Order Tracking
            </h1>
          </div>
          <span
            className={
              "rounded-full px-3 py-1 text-sm font-medium " +
              (STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700")
            }
          >
            {STATUS_LABELS[order.status] || order.status}
          </span>
        </div>

        {/* Progress bar */}
        {!isCancelled && (
          <div className="mt-8 rounded-2xl border border-[#0F172A]/10 bg-white p-6">
            <div className="h-2 w-full rounded-full bg-[#0F172A]/10">
              <div
                className="h-2 rounded-full bg-[#1E3A8A] transition-all duration-500"
                style={{ width: statusProgress(order.status) + "%" }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              {STATUS_FLOW.map((step, i) => (
                <div
                  key={step}
                  className={
                    "text-center text-[10px] " +
                    (i <= currentStepIndex
                      ? "font-medium text-[#1E3A8A]"
                      : "text-[#0F172A]/30")
                  }
                  style={{ width: 100 / STATUS_FLOW.length + "%" }}
                >
                  {STATUS_LABELS[step].split(" ")[0]}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order details */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#0F172A]/10 bg-white p-6">
            <h3 className="text-sm font-semibold text-[#0F172A]">Pickup</h3>
            <p className="mt-1 text-sm text-[#0F172A]/70">{order.pickup_address}</p>
            {order.pickup_time && (
              <p className="mt-1 text-xs text-[#0F172A]/50">
                {new Date(order.pickup_time).toLocaleString()}
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-[#0F172A]/10 bg-white p-6">
            <h3 className="text-sm font-semibold text-[#0F172A]">Delivery</h3>
            <p className="mt-1 text-sm text-[#0F172A]/70">{order.delivery_address}</p>
            {order.delivery_time && (
              <p className="mt-1 text-xs text-[#0F172A]/50">
                {new Date(order.delivery_time).toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="mt-6 rounded-2xl border border-[#0F172A]/10 bg-white p-6">
          <h3 className="text-sm font-semibold text-[#0F172A]">Items</h3>
          <ul className="mt-3 divide-y divide-[#0F172A]/10">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between py-2 text-sm">
                <span className="text-[#0F172A]/70">
                  Qty {item.quantity} × KES {item.unit_price.toLocaleString()}
                </span>
                <span className="font-medium text-[#0F172A]">
                  KES {item.subtotal.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-[#0F172A]/10 pt-3">
            <span className="font-semibold text-[#0F172A]">Total</span>
            <span className="font-serif text-lg font-semibold text-[#1E3A8A]">
              KES {order.total_amount.toLocaleString()}
            </span>
          </div>
        </div>

        {order.notes && (
          <div className="mt-6 rounded-2xl border border-[#0F172A]/10 bg-white p-6">
            <h3 className="text-sm font-semibold text-[#0F172A]">Notes</h3>
            <p className="mt-1 text-sm text-[#0F172A]/70">{order.notes}</p>
          </div>
        )}
      </div>
    </main>
  );
}