"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login, saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await login({ email, password });
      saveToken(result.access_token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F8FAFC] px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#0F172A]/10 bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-[#0F172A]">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-[#0F172A]/60">
          Sign in to track orders and manage pickups.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A]">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#0F172A]/15 px-3 py-2 text-sm outline-none focus:border-[#1E3A8A]"
              placeholder="Your password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#0F172A]/60">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-[#1E3A8A]">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
