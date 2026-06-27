import { getToken } from "@/lib/auth";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$|$/g, "");

export type AdminUser = {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  is_active: boolean;
};

export async function getAllUsers(): Promise<AdminUser[]> {
  const token = getToken();
  const res = await fetch(API_URL + "/users", {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}
