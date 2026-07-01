"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Book Pickup",
    description: "Choose a time and share a pickup location from our simple booking flow.",
  },
  {
    number: "02",
    title: "Driver Collects Laundry",
    description: "A friendly driver collects your laundry and handles it with care from the start.",
  },
  {
    number: "03",
    title: "Professional Cleaning",
    description: "Expertly washed, folded, and finished with premium-quality care.",
  },
  {
    number: "04",
    title: "Quality Inspection",
    description: "Every order is inspected for finishing, freshness, and attention to detail.",
  },
  {
    number: "05",
    title: "Delivery Back To Customer",
    description: "Your laundry is delivered neatly, on time, and ready to wear again.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1E3A8A]">How it works</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            A refined, simple journey from pickup to delivery
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#0F172A]/70">
            Every step is designed to feel effortless, polished, and dependable.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative rounded-[1.5rem] border border-[#0F172A]/10 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)]"
            >
              <span className="font-serif text-4xl font-semibold text-[#1E3A8A]/10">{step.number}</span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-[#0F172A]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#0F172A]/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
