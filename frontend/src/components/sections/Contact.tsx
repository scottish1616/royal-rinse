import { MapPin, Mail, Phone, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_100%)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-[#0F172A]/10 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1E3A8A]">Contact</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
              Reach the Royal Rinse team
            </h2>
            <p className="mt-4 text-[#0F172A]/70">
              Send a message, ask about pickup availability, or request a custom arrangement for your laundry needs.
            </p>

            <form className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="rounded-2xl border border-[#0F172A]/10 bg-white px-4 py-3 outline-none ring-0" placeholder="Name" />
                <input className="rounded-2xl border border-[#0F172A]/10 bg-white px-4 py-3 outline-none ring-0" placeholder="Email" />
              </div>
              <input className="w-full rounded-2xl border border-[#0F172A]/10 bg-white px-4 py-3 outline-none ring-0" placeholder="Subject" />
              <textarea className="min-h-32 w-full rounded-2xl border border-[#0F172A]/10 bg-white px-4 py-3 outline-none ring-0" placeholder="How can we help?" />
              <Button className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90">Send Message</Button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-[#0F172A]/10 bg-[#0F172A] p-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)]">
            <h3 className="font-serif text-2xl font-semibold">Contact details</h3>
            <div className="mt-8 space-y-5 text-sm text-white/80">
              <div className="flex items-start gap-3"><Phone size={18} className="mt-0.5 text-[#F59E0B]" /><div><p className="font-semibold text-white">Phone</p><p>+254 746484946</p></div></div>
              <div className="flex items-start gap-3"><Mail size={18} className="mt-0.5 text-[#F59E0B]" /><div><p className="font-semibold text-white">Email</p><p>kisakalevi15@gmail.com</p></div></div>
              <div className="flex items-start gap-3"><Clock3 size={18} className="mt-0.5 text-[#F59E0B]" /><div><p className="font-semibold text-white">Business hours</p><p>Mon - Sat · 7:00 AM - 8:00 PM</p></div></div>
              <div className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 text-[#F59E0B]" /><div><p className="font-semibold text-white">Location</p><p>Nairobi, Kenya</p></div></div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
              <div className="aspect-[4/3] bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.25),transparent_30%),linear-gradient(135deg,rgba(30,58,138,0.95),rgba(15,23,42,0.95))] p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-[#F59E0B]">Map placeholder</p>
                <p className="mt-3 max-w-sm text-sm text-white/70">A Google Maps embed can be dropped in here once the location is finalized.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
