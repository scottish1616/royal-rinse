import Link from "next/link";
import { Globe2, MessageCircle, Send } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Track Order", href: "/tracking" },
  { label: "Contact", href: "/#contact" },
];

const services = [
  "Wash & Fold",
  "Dry Cleaning",
  "Ironing",
  "Pickup & Delivery",
  "Duvets",
  "Carpets & Mats",
  "Commercial Laundry",
];

const support = ["Help Center", "FAQ", "Privacy Policy", "Terms & Conditions", "Refund Policy"];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0F172A] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F59E0B] text-[#0F172A]">
                <span className="text-sm font-semibold">R</span>
              </span>
              <span className="font-serif text-lg font-semibold">Royal Rinse</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">
              Premium laundry pickup and delivery with luxury-level care, dependable service, and effortless booking.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full border border-white/15 p-2 text-white/70 transition hover:text-white"><Globe2 size={16} /></a>
              <a href="#" className="rounded-full border border-white/15 p-2 text-white/70 transition hover:text-white"><MessageCircle size={16} /></a>
              <a href="#" className="rounded-full border border-white/15 p-2 text-white/70 transition hover:text-white"><Send size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F59E0B]">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {quickLinks.map((link) => (
                <li key={link.label}><Link href={link.href} className="transition hover:text-white">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F59E0B]">Services</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {services.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F59E0B]">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {support.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Royal Rinse. All Rights Reserved.</p>
          <p>Powered by The Levite Solutions</p>
        </div>
      </div>
    </footer>
  );
}
