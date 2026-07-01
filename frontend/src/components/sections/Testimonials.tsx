"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Asha Wanjiku",
    role: "Busy professional",
    image: "/images/testimonials/avatar-1.jpg",
    quote: "Royal Rinse feels premium from the first pickup to the final delivery. I never worry about laundry again.",
  },
  {
    name: "Daniel Otieno",
    role: "Parent of two",
    image: "/images/testimonials/avatar-2.jpg",
    quote: "The scheduling is effortless, and the quality is always consistent. It has genuinely simplified our week.",
  },
  {
    name: "Njeri Kamau",
    role: "Small business owner",
    image: "/images/testimonials/avatar-3.jpg",
    quote: "Fast, polished, and very reliable. The team treats every order like it matters, which it does.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_100%)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1E3A8A]">Testimonials</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            Trusted by customers who value quality and ease
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-[#0F172A]/10 bg-white/80 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#F59E0B]/30">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#0F172A]">{item.name}</h3>
                  <p className="text-sm text-[#0F172A]/60">{item.role}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-1 text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[#0F172A]/70">“{item.quote}”</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
