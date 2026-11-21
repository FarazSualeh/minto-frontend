"use client";

import { ArrowLeft, ChevronRight, Headphones, MapPin, Package, Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { NetworkStatus } from "@/components/network-status";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequest<User>("/api/auth/me")
      .then((profile) => {
        if (active) setUser(profile);
      })
      .catch((caught) => {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Could not load profile.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function logout() {
    setLoggingOut(true);
    await apiRequest("/api/auth/logout", { method: "POST", body: "{}" }).catch(() => undefined);
    router.replace("/login");
  }

  const items = [
    [Package, "Your orders", "/orders"],
    [MapPin, "Saved addresses", "/account/addresses"],
    [Settings, "Profile & password", "/account/security"],
    [Headphones, "Help & support", "/account/support"],
  ] as const;
  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <NetworkStatus />
      <header className="flex h-12 items-center gap-3">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">Account</h1>
      </header>
      <section className="mt-5 flex items-center gap-4 rounded-2xl bg-[#edf5e9] p-5">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#1d6f3b]"><UserRound size={24} /></span>
        <div>
          <h2 className="font-black text-[#26342a]">{loading ? "Loading profile..." : user?.name ?? "Minto customer"}</h2>
          <p className="mt-1 text-xs text-[#92998f]">{user?.phone ?? user?.email ?? "Account details"}</p>
        </div>
      </section>
      {error && <p role="alert" className="mt-4 rounded-xl border border-[#eadfd7] bg-[#fffaf7] p-3 text-sm text-[#9d5a50]">{error}</p>}
      <section className="mt-4 overflow-hidden rounded-2xl border border-[#e8ebe3] bg-white">
        {items.map(([Icon, label, href]) => (
          <Link key={label} href={href} className="flex h-14 items-center gap-3 border-b border-[#edf0e9] px-4 last:border-0">
            <Icon size={19} className="text-[#1d6f3b]" /><span className="text-sm font-bold text-[#465248]">{label}</span><ChevronRight size={18} className="ml-auto text-[#abb2aa]" />
          </Link>
        ))}
      </section>
      <button onClick={logout} disabled={loggingOut} className="mt-4 h-11 w-full rounded-xl border border-[#eadfd7] text-sm font-bold text-[#9d5a50] disabled:opacity-60">
        {loggingOut ? "Signing out..." : "Sign out"}
      </button>
    </main>
  );
}
