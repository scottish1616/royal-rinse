import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[90vh] flex items-center">
      {/* Background image layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-bg-main.jpg"
          alt="Premium laundry folding on a marble surface"
          fill
          priority
          className="object-cover"
        />
        {/* Glassmorphism / gradient overlay for readability + luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/60 to-[#0F172A]/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-32 text-center">
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90 backdrop-blur-md">
          Laundry. Simplified.
        </span>

        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Premium Laundry Pickup &amp; Delivery
          <span className="block text-[#F59E0B]">at Your Fingertips</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Schedule pickups, track orders, and enjoy professionally cleaned
          clothes without leaving home.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/schedule-pickup">
            <Button
              size="lg"
              className="bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90"
            >
              Schedule Pickup
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
          >
            View Pricing
          </Button>
        </div>
      </div>

      {/* Floating frosted stat card — signature element */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-xl sm:flex sm:gap-10">
        <div className="text-center">
          <p className="font-serif text-2xl font-semibold text-white">6hr</p>
          <p className="text-xs text-white/70">Express turnaround</p>
        </div>
        <div className="text-center">
          <p className="font-serif text-2xl font-semibold text-white">4.9★</p>
          <p className="text-xs text-white/70">Customer rating</p>
        </div>
        <div className="text-center">
          <p className="font-serif text-2xl font-semibold text-white">10k+</p>
          <p className="text-xs text-white/70">Orders delivered</p>
        </div>
      </div>
    </section>
  );
}
