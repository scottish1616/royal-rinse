"use client";

import Link from "next/link";

import { useCurrentUser } from "@/lib/use-current-user";
import { Button } from "@/components/ui/button";

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
          <Button
            onClick={logout}
            variant="outline"
            className="border-[#0F172A]/15"
          >
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
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <DashboardCard title="Active Orders" value="0" hint="No pickups scheduled yet" />
      <DashboardCard title="Total Orders" value="0" hint="Your order history" />
      <DashboardCard title="Loyalty Status" value="New" hint="Member since today" />
      <div className="sm:col-span-3 rounded-2xl border border-[#0F172A]/10 bg-white p-8 text-center">
        <p className="text-[#0F172A]/70">You haven't scheduled a pickup yet.</p>
        <Link href="/schedule-pickup">
          <Button className="mt-4 bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90">
            Schedule Your First Pickup
          </Button>
        </Link>
      </div>
    </div>
  );
}

function DriverDashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <DashboardCard title="Assigned Pickups" value="0" hint="Today's route" />
      <DashboardCard title="Completed" value="0" hint="This week" />
      <DashboardCard title="Earnings" value="KES 0" hint="This week" />
      <div className="sm:col-span-3 rounded-2xl border border-[#0F172A]/10 bg-white p-8 text-center">
        <p className="text-[#0F172A]/70">No pickups assigned yet.</p>
      </div>
    </div>
  );
}

function StaffDashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <DashboardCard title="Orders In Progress" value="0" hint="At the facility" />
      <DashboardCard title="Ready for Delivery" value="0" hint="Awaiting driver" />
      <DashboardCard title="Today's Throughput" value="0" hint="Items processed" />
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <DashboardCard title="Total Users" value="—" hint="Across all roles" />
      <DashboardCard title="Total Orders" value="—" hint="All time" />
      <DashboardCard title="Revenue" value="—" hint="This month" />
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
      <p className="mt-2 font-serif text-3xl font-semibold text-[#0F172A]">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#0F172A]/40">{hint}</p>
    </div>
  );
}
