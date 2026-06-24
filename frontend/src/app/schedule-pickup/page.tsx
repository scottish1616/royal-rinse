"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getServices, type Service } from "@/lib/api";
import { createOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/services-config";
import { Button } from "@/components/ui/button";

type SelectedItem = {
  service: Service;
  quantity: number;
};

export default function SchedulePickupPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [selected, setSelected] = useState<{ [id: string]: number }>({});
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setError("Could not load services. Is the backend running?"))
      .finally(() => setLoadingServices(false));
  }, []);

  function toggleService(service: Service) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[service.id]) {
        delete next[service.id];
      } else {
        next[service.id] = 1;
      }
      return next;
    });
  }

  function updateQuantity(serviceId: string, quantity: number) {
    setSelected((prev) => ({ ...prev, [serviceId]: Math.max(1, quantity) }));
  }

  const selectedItems: SelectedItem[] = Object.entries(selected)
    .map(([id, quantity]) => {
      const service = services.find((s) => s.id === id);
      return service ? { service, quantity } : null;
    })
    .filter((x): x is SelectedItem => x !== null);

  const total = selectedItems.reduce((sum, item) => {
    if (item.service.unit === "custom") return sum;
    return sum + item.service.price * item.quantity;
  }, 0);

  const hasCustomPricedItem = selectedItems.some((i) => i.service.unit === "custom");

  const categories = Array.from(new Set(services.map((s) => s.category)));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (selectedItems.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    if (!pickupDate || !pickupTime) {
      setError("Please choose a pickup date and time.");
      return;
    }

    setSubmitting(true);
    try {
      const pickupDateTime = pickupDate + "T" + pickupTime + ":00";
      await createOrder({
        pickup_address: pickupAddress,
        delivery_address: sameAddress ? pickupAddress : deliveryAddress,
        pickup_time: pickupDateTime,
        notes: notes || undefined,
        items: selectedItems.map((i) => ({
          service_id: i.service.id,
          quantity: i.quantity,
        })),
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingServices) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-[#0F172A]/60">Loading services...</p>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-[#F8FAFC] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-semibold text-[#0F172A]">
          Schedule a Pickup
        </h1>
        <p className="mt-1 text-sm text-[#0F172A]/60">
          Choose your services, set a time, and we&apos;ll handle the rest.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="rounded-2xl border border-[#0F172A]/10 bg-white p-6">
            <h2 className="font-serif text-lg font-semibold text-[#0F172A]">
              1. Select services
            </h2>
            <div className="mt-4 space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#1E3A8A]">
                    {category}
                  </p>
                  <div className="mt-2 space-y-2">
                    {services
                      .filter((s) => s.category === category)
                      .map((service) => {
                        const isSelected = !!selected[service.id];
                        return (
                          <div
                            key={service.id}
                            className={
                              isSelected
                                ? "flex items-center justify-between rounded-xl border-2 border-[#1E3A8A] bg-[#1E3A8A]/5 p-3"
                                : "flex items-center justify-between rounded-xl border border-[#0F172A]/10 p-3"
                            }
                          >
                            <label className="flex flex-1 items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleService(service)}
                                className="h-4 w-4 accent-[#1E3A8A]"
                              />
                              <div>
                                <p className="text-sm font-medium text-[#0F172A]">
                                  {service.name}
                                </p>
                                <p className="text-xs text-[#0F172A]/50">
                                  {formatPrice(service.price, service.unit)}
                                </p>
                              </div>
                            </label>
                            {isSelected && service.unit !== "custom" && (
                              <input
                                type="number"
                                min={1}
                                value={selected[service.id]}
                                onChange={(e) =>
                                  updateQuantity(service.id, parseInt(e.target.value) || 1)
                                }
                                className="w-16 rounded-lg border border-[#0F172A]/15 px-2 py-1 text-center text-sm"
                              />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#0F172A]/10 bg-white p-6">
            <h2 className="font-serif text-lg font-semibold text-[#0F172A]">
              2. Pickup &amp; delivery
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A]">
                  Pickup address
                </label>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
                  placeholder="e.g. Riverside Drive, Nairobi"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-[#0F172A]/70">
                <input
                  type="checkbox"
                  checked={sameAddress}
                  onChange={(e) => setSameAddress(e.target.checked)}
                  className="h-4 w-4 accent-[#1E3A8A]"
                />
                Deliver to the same address
              </label>

              {!sameAddress && (
                <div>
                  <label className="text-sm font-medium text-[#0F172A]">
                    Delivery address
                  </label>
                  <input
                    type="text"
                    required={!sameAddress}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
                    placeholder="e.g. Westlands, Nairobi"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#0F172A]">
                    Pickup date
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A]">
                    Pickup time
                  </label>
                  <input
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#0F172A]">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
                  placeholder="Gate code, special instructions, etc."
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#F59E0B] bg-white p-6">
            <h2 className="font-serif text-lg font-semibold text-[#0F172A]">
              Order summary
            </h2>
            {selectedItems.length === 0 ? (
              <p className="mt-2 text-sm text-[#0F172A]/50">
                No services selected yet.
              </p>
            ) : (
              <ul className="mt-3 space-y-1">
                {selectedItems.map((item) => (
                  <li
                    key={item.service.id}
                    className="flex justify-between text-sm text-[#0F172A]/80"
                  >
                    <span>
                      {item.service.name}
                      {item.service.unit !== "custom" ? " x " + item.quantity : ""}
                    </span>
                    <span>
                      {item.service.unit === "custom"
                        ? "Custom"
                        : "KES " + (item.service.price * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-between border-t border-[#0F172A]/10 pt-4">
              <span className="font-semibold text-[#0F172A]">
                {hasCustomPricedItem ? "Estimated Total" : "Total"}
              </span>
              <span className="font-serif text-xl font-semibold text-[#1E3A8A]">
                KES {total.toLocaleString()}
                {hasCustomPricedItem ? " +" : ""}
              </span>
            </div>
            {hasCustomPricedItem && (
              <p className="mt-2 text-xs text-[#0F172A]/50">
                One or more selected services have custom pricing — we&apos;ll
                confirm the final total with you directly.
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1E3A8A] py-6 text-base text-white hover:bg-[#1E3A8A]/90"
          >
            {submitting ? "Scheduling..." : "Confirm Pickup"}
          </Button>
        </form>
      </div>
    </main>
  );
}