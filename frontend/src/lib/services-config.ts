type CategoryInfo = {
  label: string;
  image: string;
  description: string;
};

const config: { [key: string]: CategoryInfo } = {
  "BASKETS": {
    label: "Baskets",
    image: "/images/services/service-baskets-bg.jpg",
    description: "Everyday wash & fold, sized to how much you bring.",
  },
  "DUVETS": {
    label: "Duvets",
    image: "/images/services/service-duvets-bg.jpg",
    description: "Deep cleaning for bedding, sized to fit your duvet.",
  },
  "CARPETS & MATS": {
    label: "Carpets & Mats",
    image: "/images/services/service-carpets-bg.jpg",
    description: "Floor coverings, deep-cleaned and refreshed.",
  },
  "ROYAL SERVICES": {
    label: "Royal Services",
    image: "/images/services/service-royal-bg.jpg",
    description: "Our signature tiers, from express turnaround to subscriptions.",
  },
};

export const CATEGORY_CONFIG = config;

export function formatPrice(price: number, unit: string) {
  if (unit === "custom") {
    return "Custom Pricing";
  }
  const unitLabels: { [key: string]: string } = {
    per_kg: "/kg",
    per_item: "/item",
    per_month: "/mo",
  };
  const suffix = unitLabels[unit] || "";
  return "From KES " + price.toLocaleString() + suffix;
}
