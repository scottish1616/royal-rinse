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

export type OrderItem = {
  id: string;
  service_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export type Order = {
  id: string;
  status: string;
  pickup_address: string;
  delivery_address: string;
  pickup_time: string | null;
  delivery_time: string | null;
  total_amount: number;
  notes: string | null;
  items: OrderItem[];
};

export async function getMyOrders(): Promise<Order[]> {
  const token = getToken();
  const res = await fetch(API_URL + "/orders", {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  return res.json();
}

export async function getOrder(orderId: string): Promise<Order> {
  const token = getToken();
  const res = await fetch(API_URL + "/orders/" + orderId, {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch order");
  }
  return res.json();
}

export async function getAllOrders(): Promise<Order[]> {
  const token = getToken();
  const res = await fetch(API_URL + "/orders/all/list", {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  return res.json();
}

export async function updateOrderStatus(orderId: string, status: string): Promise<Order> {
  const token = getToken();
  const res = await fetch(API_URL + "/orders/" + orderId + "/status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to update status");
  }
  return res.json();
}
