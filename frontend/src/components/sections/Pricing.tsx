import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getServices } from "@/lib/api";
import { formatPrice } from "@/lib/services-config";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Pay Per Order",
    description: "Best for occasional pickups and one-time cleaning.",
    serviceName: "Wash & Fold",
    fallbackPrice: 650,
    featured: false,
    href: "/sign-in",
  },
  {
    name: "Subscription Plans",
    description: "Flexible monthly coverage for regular laundry routines.",
    serviceName: "Subscription Plans",
    fallbackPrice: 2400,
    featured: true,
    href: "/sign-up",
  },
  {
    name: "Monthly Plans",
    description: "Convenient monthly bundles with priority pickup slots.",
    serviceName: "Dry Cleaning",
    fallbackPrice: 1800,
    featured: false,
    href: "/sign-in",
  },
  {
    name: "Weekly Plans",
    description: "Ideal for busy families and professional routines.",
    serviceName: "Ironing",
    fallbackPrice: 1400,
    featured: false,
    href: "/sign-in",
  },
  {
    name: "Family Plans",
    description: "Shared pricing for larger households and bulk laundry.",
    serviceName: "Express Service",
    fallbackPrice: 3200,
    featured: false,
    href: "/sign-up",
  },
];

export default async function Pricing() {
  const services = await getServices();

  return (
    <section id="pricing" className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_35%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1E3A8A]">Pricing</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            Premium care, made simple and transparent
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#0F172A]/70">
            Select a plan that fits your routine. Every option is designed for effortless pickup, professional cleaning, and premium delivery.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const service = services.find((item) => item.name === plan.serviceName);
            const price = service ? service.price : plan.fallbackPrice;
            const unit = service?.unit ?? "per_month";
            const isFeatured = plan.featured;

            return (
              <div
                key={plan.name}
                className={`rounded-[1.75rem] border p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.12)] ${
                  isFeatured
                    ? "border-[#F59E0B]/60 bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] text-white"
                    : "border-white/80 bg-white/70 text-[#0F172A]"
                }`}
              >
                {isFeatured && (
                  <span className="inline-flex rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0F172A]">
                    Most Popular
                  </span>
                )}
                <h3 className="mt-6 font-serif text-2xl font-semibold">{plan.name}</h3>
                <p className={`mt-3 text-sm ${isFeatured ? "text-white/70" : "text-[#0F172A]/70"}`}>
                  {plan.description}
                </p>
                <p className={`mt-6 font-serif text-3xl font-semibold ${isFeatured ? "text-[#FDE68A]" : "text-[#1E3A8A]"}`}>
                  {formatPrice(price, unit)}
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className={isFeatured ? "text-[#F59E0B]" : "text-[#1E3A8A]"} /> Flexible pickup windows</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className={isFeatured ? "text-[#F59E0B]" : "text-[#1E3A8A]"} /> Premium care and inspection</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className={isFeatured ? "text-[#F59E0B]" : "text-[#1E3A8A]"} /> Fast delivery with tracking</li>
                </ul>
                <Link href={plan.href} className="mt-8 block">
                  <Button className={`w-full ${isFeatured ? "bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90" : "bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"}`}>
                    Choose {plan.name}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
