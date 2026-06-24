const STEPS = [
  {
    number: "01",
    title: "Schedule Pickup",
    description: "Pick a time, drop your pin, and we'll come to you — no app download required.",
  },
  {
    number: "02",
    title: "We Wash & Care",
    description: "Your items are sorted, cleaned, and pressed by trained staff using premium products.",
  },
  {
    number: "03",
    title: "Track in Real-Time",
    description: "Follow your order from pickup to delivery, every step of the way.",
  },
  {
    number: "04",
    title: "Delivered Fresh",
    description: "Folded, pressed, and dropped back at your door — usually same day.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F8FAFC] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-[#1E3A8A]">
            How it works
          </span>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0F172A] sm:text-4xl">
            Four steps to fresh laundry
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span className="font-serif text-5xl font-semibold text-[#1E3A8A]/10">
                {step.number}
              </span>
              <h3 className="mt-2 font-serif text-lg font-semibold text-[#0F172A]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-[#0F172A]/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
