"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, clearToken, type AuthUser } from "@/lib/auth";

export function useCurrentUser() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((u) => {
        if (!u) {
          router.push("/sign-in");
          return;
        }
        setUser(u);
      })
      .finally(() => setLoading(false));
  }, [router]);

  function logout() {
    clearToken();
    router.push("/sign-in");
  }

  return { user, loading, logout };
}
