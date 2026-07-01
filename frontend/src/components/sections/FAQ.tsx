"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does pickup work?",
    answer: "Choose a pickup window, confirm your address, and our team collects your laundry at the scheduled time.",
  },
  {
    question: "What about delivery?",
    answer: "Delivery is included for supported areas and arrives neatly packed with real-time order updates.",
  },
  {
    question: "Which payment methods are accepted?",
    answer: "We support secure card payments and convenient account-based billing for subscription plans.",
  },
  {
    question: "How long does turnaround take?",
    answer: "Turnaround varies by service, but most orders are completed within the same day or next day depending on volume.",
  },
  {
    question: "Are pricing and plans fixed?",
    answer: "Pricing is pulled from the backend so admins can update rates anytime without changing the front end.",
  },
  {
    question: "What if an item is lost or damaged?",
    answer: "We take care with every order and offer support for any claims related to damage or misplacement.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0F172A] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F59E0B]">FAQ</span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Everything you need to know before booking
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-serif text-lg text-white">{item.question}</span>
                  <ChevronDown className={`shrink-0 text-[#F59E0B] transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="mt-4 text-sm leading-7 text-white/70">{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
