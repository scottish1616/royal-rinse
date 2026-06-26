"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "@/lib/use-current-user";
import { getMyOrders, type Order } from "@/lib/orders";
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/order-status";
import { Button } from "@/components/ui/button";
import OrderManagementTable from "@/components/dashboard/OrderManagementTable";
import { getAllUsers } from "@/lib/users";

const ACTIVE_STATUSES = [
  "pending",
  "confirmed",
  "picked_up",
  "in_progress",
  "ready",
  "out_for_delivery",
];

export default function DashboardPage() {
  const { user, loading, logout } = useCurrentUser();

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#0F172A]/60">Loading your dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-[80vh] bg-[#F8FAFC] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[#1E3A8A]">
              {roleLabel(user.role)} Dashboard
            </p>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-[#0F172A]">
              Welcome back, {user.full_name.split(" ")[0]}
            </h1>
          </div>
          <Button onClick={logout} variant="outline" className="border-[#0F172A]/15">
            Sign out
          </Button>
        </div>

        <div className="mt-10">
          {user.role === "customer" && <CustomerDashboard />}
          {user.role === "driver" && <DriverDashboard />}
          {user.role === "staff" && <StaffDashboard />}
          {user.role === "admin" && <AdminDashboard />}
        </div>
      </div>
    </main>
  );
}

function roleLabel(role: string) {
  const labels: { [key: string]: string } = {
    customer: "Customer",
    driver: "Driver",
    staff: "Staff",
    admin: "Admin",
  };
  return labels[role] || role;
}

function CustomerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const activeOrders = orders.filter((o) => ACTIVE_STATUSES.includes(o.status));

  if (loading) {
    return <p className="text-sm text-[#0F172A]/60">Loading your orders...</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <DashboardCard
        title="Active Orders"
        value={String(activeOrders.length)}
        hint={activeOrders.length === 0 ? "No pickups in progress" : "In progress right now"}
      />
      <DashboardCard
        title="Total Orders"
        value={String(orders.length)}
        hint="Your order history"
      />
      <DashboardCard
        title="Loyalty Status"
        value={orders.length >= 10 ? "Gold" : orders.length >= 3 ? "Silver" : "New"}
        hint={orders.length === 0 ? "Member since today" : "Based on order count"}
      />

      <div className="sm:col-span-3 rounded-2xl border border-[#0F172A]/10 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold text-[#0F172A]">
            Recent Orders
          </h3>
          <Link href="/tracking" className="text-sm font-medium text-[#1E3A8A]">
            View all →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[#0F172A]/70">You haven&apos;t scheduled a pickup yet.</p>
            <Link href="/schedule-pickup">
              <Button className="mt-4 bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90">
                Schedule Your First Pickup
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={"/tracking/" + order.id}
                className="flex items-center justify-between rounded-xl border border-[#0F172A]/10 p-4 transition-colors hover:bg-[#0F172A]/[0.02]"
              >
                <div>
                  <p className="text-xs text-[#0F172A]/50">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-[#0F172A]/70">{order.pickup_address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={
                      "rounded-full px-3 py-1 text-xs font-medium " +
                      (STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700")
                    }
                  >
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#1E3A8A]">
                    KES {order.total_amount.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DriverDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const activeCount = orders.filter((o) =>
    ["picked_up", "in_progress", "out_for_delivery"].includes(o.status)
  ).length;
  const completedCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <DashboardCard title="Assigned Pickups" value={String(activeCount)} hint="Currently active" />
        <DashboardCard title="Completed" value={String(completedCount)} hint="Delivered by you" />
        <DashboardCard title="Total Assigned" value={String(orders.length)} hint="All time" />
      </div>
      <OrderManagementTable allowStatusChange={true} onOrdersLoaded={setOrders} />
    </div>
  );
}

function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const inProgress = orders.filter((o) =>
    ["confirmed", "picked_up", "in_progress"].includes(o.status)
  ).length;
  const readyForDelivery = orders.filter((o) => o.status === "ready").length;
  const totalItems = orders.reduce((sum, o) => sum + o.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        <DashboardCard title="Orders In Progress" value={String(inProgress)} hint="At the facility" />
        <DashboardCard title="Ready for Delivery" value={String(readyForDelivery)} hint="Awaiting driver" />
        <DashboardCard title="Total Items" value={String(totalItems)} hint="Across all orders" />
      </div>
      <OrderManagementTable allowStatusChange={true} onOrdersLoaded={setOrders} />
    </div>
  );
}

function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userCount, setUserCount] = useState<number | null>(null);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0);

  useEffect(() => {
    getAllUsers()
      .then((users) => setUserCount(users.length))
      .catch(() => setUserCount(null));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-4">
        <DashboardCard title="Total Users" value={userCount !== null ? String(userCount) : "—"} hint="Across all roles" />
        <DashboardCard title="Total Orders" value={String(orders.length)} hint="All time" />
        <DashboardCard title="Revenue" value={"KES " + totalRevenue.toLocaleString()} hint="From visible orders" />
        <DashboardCard title="Delivered" value={String(orders.filter((o) => o.status === "delivered").length)} hint="Completed orders" />
      </div>
      <OrderManagementTable allowStatusChange={true} onOrdersLoaded={setOrders} />
    </div>
  );
}

function DashboardCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-[#0F172A]/10 bg-white p-6">
      <p className="text-sm text-[#0F172A]/60">{title}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-[#0F172A]">{value}</p>
      <p className="mt-1 text-xs text-[#0F172A]/40">{hint}</p>
    </div>
  );
}