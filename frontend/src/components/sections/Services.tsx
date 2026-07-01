import Image from "next/image";
import Link from "next/link";
import { getServices, type Service } from "@/lib/api";
import { CATEGORY_CONFIG, formatPrice } from "@/lib/services-config";

export default async function Services() {
  const services = await getServices();

  const grouped = services.reduce<Record<string, Service[]>>((acc, service) => {
    (acc[service.category] ||= []).push(service);
    return acc;
  }, {});

  const categories = ["BASKETS", "DUVETS", "CARPETS & MATS", "ROYAL SERVICES"].filter(
    (category) => grouped[category]?.length,
  );

  return (
    <section id="services" className="bg-[#0F172A] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-[#F59E0B]">
            What we offer
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Services built around your laundry, not ours
          </h2>
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur-2xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F59E0B]">Simple Category</p>
              <h3 className="mt-2 font-serif text-2xl text-white">Baskets, duvets, carpets and mats</h3>
            </div>
            <p className="max-w-xl text-sm text-white/70">
              Select any service to continue to sign in and schedule your pickup.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {categories.map((category) => {
              const config = CATEGORY_CONFIG[category];
              if (!config) return null;

              return (
                <div key={category} className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#0F172A]/70 shadow-2xl shadow-black/20">
                  <div className="relative h-40">
                    <Image src={config.image} alt={config.label} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif text-xl text-white">{config.label}</h4>
                    <p className="mt-2 text-sm text-white/70">{config.description}</p>
                    <div className="mt-6 space-y-3">
                      {grouped[category].slice(0, 4).map((service) => (
                        <Link key={service.id} href="/sign-in" className="block rounded-2xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/15">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-white">{service.name}</p>
                              {service.description && <p className="mt-1 text-xs text-white/60">{service.description}</p>}
                            </div>
                            <p className="text-sm font-semibold text-[#F59E0B]">{formatPrice(service.price, service.unit)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}