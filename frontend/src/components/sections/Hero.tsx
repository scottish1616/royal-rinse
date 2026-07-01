"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, ShieldCheck, Sparkles, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { icon: Shirt, label: "Fresh Fold" },
  { icon: Droplets, label: "Dry Clean" },
  { icon: ShieldCheck, label: "Secure" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-bg-main.jpg"
          alt="Premium laundry folding on a marble surface"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.2),transparent_30%),linear-gradient(120deg,rgba(15,23,42,0.9),rgba(15,23,42,0.6),rgba(15,23,42,0.92))]" />
      </div>

      <div className="mx-auto flex min-h-[92vh] max-w-6xl items-center px-6 py-24 lg:py-32">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/20 bg-white/10 p-8 text-left shadow-2xl shadow-[#0F172A]/30 backdrop-blur-2xl sm:p-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/15 px-3 py-1 text-sm font-medium text-[#FDE68A]">
              <Sparkles size={16} />
              Laundry. Simplified.
            </div>

            <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Premium Laundry Pickup &amp; Delivery at Your Fingertips
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              From same-day pickup to careful delivery, Royal Rinse brings a premium laundry experience directly to your doorstep.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/schedule-pickup">
                <Button className="bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90">
                  Schedule Pickup
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                >
                  Get Started
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                <ShieldCheck size={14} className="text-[#F59E0B]" />
                Trusted by busy households
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1">
                <ArrowRight size={14} className="text-[#F59E0B]" />
                Pickup and delivery across Nairobi
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-[#0F172A]/30 backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/20 bg-[#0F172A]/70 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#F59E0B]">Luxury service</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-white">What makes us premium</h2>
                <ul className="mt-6 space-y-4 text-sm text-white/80">
                  <li className="flex items-center gap-3"><span className="rounded-full bg-[#F59E0B]/20 p-2 text-[#F59E0B]"><Sparkles size={14} /></span> Professional finishing and folding</li>
                  <li className="flex items-center gap-3"><span className="rounded-full bg-[#F59E0B]/20 p-2 text-[#F59E0B]"><Droplets size={14} /></span> Careful cleaning with premium products</li>
                  <li className="flex items-center gap-3"><span className="rounded-full bg-[#F59E0B]/20 p-2 text-[#F59E0B]"><ShieldCheck size={14} /></span> Real-time tracking and secure handling</li>
                </ul>
              </div>
            </div>

            {floatingIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 4 + index, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute -left-6 top-8 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-xl"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-[#F59E0B]" />
                    {item.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
