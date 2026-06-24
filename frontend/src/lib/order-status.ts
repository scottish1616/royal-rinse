export const STATUS_FLOW = [
  "pending",
  "confirmed",
  "picked_up",
  "in_progress",
  "ready",
  "out_for_delivery",
  "delivered",
];

export const STATUS_LABELS: { [key: string]: string } = {
  pending: "Pending Confirmation",
  confirmed: "Confirmed",
  picked_up: "Picked Up",
  in_progress: "In Progress",
  ready: "Ready",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const STATUS_COLORS: { [key: string]: string } = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  picked_up: "bg-indigo-100 text-indigo-700",
  in_progress: "bg-purple-100 text-purple-700",
  ready: "bg-teal-100 text-teal-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export function statusProgress(status: string): number {
  const index = STATUS_FLOW.indexOf(status);
  if (index === -1) return 0;
  return ((index + 1) / STATUS_FLOW.length) * 100;
}