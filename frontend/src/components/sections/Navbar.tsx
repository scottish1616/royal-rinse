"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Tracking", href: "/tracking" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F59E0B] text-[#0F172A]">
            <CrownIcon className="h-5 w-5" />
          </span>
          <span className="font-serif leading-tight text-white">
            <span className="block text-lg font-semibold">Royal Rinse</span>
            <span className="block text-[10px] font-normal tracking-wide text-white/60">
              LAUNDRY. SIMPLIFIED.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link href="/schedule-pickup">
            <Button className="bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90">
              Schedule Pickup
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-white lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0F172A] px-6 pb-6 lg:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10" />
            <Link
              href="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-white/80 hover:text-white"
            >
              Sign in
            </Link>
            <Link href="/schedule-pickup" onClick={() => setMenuOpen(false)}>
              <Button className="w-full bg-[#F59E0B] text-[#0F172A] hover:bg-[#F59E0B]/90">
                Schedule Pickup
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2 18h20l-1.5-9-4.5 4-4-7-4 7-4.5-4L2 18z" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
    >
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
    >
      <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}