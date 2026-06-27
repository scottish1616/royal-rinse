const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$|$/g, "");

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  unit: string;
  is_active: boolean;
}

export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/services`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch services: ${res.status}`);
  }
  return res.json();
}
