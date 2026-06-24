import { getServices } from "@/lib/api";
import { formatPrice } from "@/lib/services-config";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = ["Wash & Fold", "Express Service", "Subscription Plans"];

export default async function Pricing() {
  const services = await getServices();
  const cards = HIGHLIGHTS
    .map((name) => services.find((s) => s.name === name))
    .filter(Boolean);

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-[#1E3A8A]">
            Pricing
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            Simple pricing, no surprises
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#0F172A]/60">
            Pay per pickup, or save with a subscription. Every plan includes
            free pickup and delivery within Nairobi.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {cards.map((service, i) => {
            if (!service) return null;
            const isFeatured = service.name === "Express Service";
            return (
              <div
                key={service.id}
                className={
                  isFeatured
                    ? "relative rounded-2xl border-2 border-[#F59E0B] bg-[#0F172A] p-8 text-white shadow-xl"
                    : "relative rounded-2xl border border-[#0F172A]/10 bg-[#0F172A]/[0.02] p-8"
                }
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-semibold text-[#0F172A]">
                    Most Popular
                  </span>
                )}
                <h3
                  className={
                    isFeatured
                      ? "font-serif text-xl font-semibold text-white"
                      : "font-serif text-xl font-semibold text-[#0F172A]"
                  }
                >
                  {service.name}
                </h3>
                <p
                  className={
                    isFeatured
                      ? "mt-2 text-sm text-white/70"
                      : "mt-2 text-sm text-[#0F172A]/60"
                  }
                >
                  {service.description}
                </p>
                <p
                  className={
                    isFeatured
                      ? "mt-6 font-serif text-2xl font-semibold text-[#F59E0B]"
                      : "mt-6 font-serif text-2xl font-semibold text-[#1E3A8A]"
                  }
                >
                  {formatPrice(service.price, service.unit)}
                </p>
                <Button
                  className={
                    isFeatured
                      ? "mt-6 w-full bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90"
                      : "mt-6 w-full bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
                  }
                >
                  Choose Plan
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
