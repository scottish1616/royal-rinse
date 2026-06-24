import { getToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type OrderItemInput = {
  service_id: string;
  quantity: number;
};

export type CreateOrderInput = {
  pickup_address: string;
  delivery_address: string;
  pickup_time: string;
  notes?: string;
  items: OrderItemInput[];
};

export async function createOrder(data: CreateOrderInput) {
  const token = getToken();
  const res = await fetch(API_URL + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create order");
  }
  return res.json();
}
