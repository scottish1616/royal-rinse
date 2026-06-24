import Image from "next/image";
import { getServices, type Service } from "@/lib/api";
import { CATEGORY_CONFIG, formatPrice } from "@/lib/services-config";

export default async function Services() {
  const services = await getServices();

  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const categories = Object.keys(CATEGORY_CONFIG).filter((c) => grouped[c]);

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

        <div className="mt-16 space-y-20">
          {categories.map((category) => {
            const config = CATEGORY_CONFIG[category];
            return (
              <div key={category}>
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="font-serif text-2xl text-white">{config.label}</h3>
                  <p className="text-sm text-white/60">{config.description}</p>
                </div>

                {/* Full-bleed image strip for the category, with frosted cards floating on top */}
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="relative h-full w-full">
                    <Image
                      src={config.image}
                      alt={config.label}
                      width={1600}
                      height={900}
                      className="h-full w-full object-cover"
                      style={{ minHeight: "320px" }}
                    />
                    {/* Light gradient only at the very bottom for text legibility, image stays vivid elsewhere */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/10 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {grouped[category].map((service) => (
                        <div
                          key={service.id}
                          className="rounded-2xl border border-white/30 bg-white/10 p-5 backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:bg-white/15"
                        >
                          <h4 className="font-serif text-lg font-medium text-white drop-shadow-sm">
                            {service.name}
                          </h4>
                          {service.description && (
                            <p className="mt-1 text-sm text-white/80">
                              {service.description}
                            </p>
                          )}
                          <p className="mt-3 text-sm font-semibold text-[#F59E0B]">
                            {formatPrice(service.price, service.unit)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}