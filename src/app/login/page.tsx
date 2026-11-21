"use client";

import { ArrowRight, LockKeyhole, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, setAccessToken } from "@/lib/api";
import { NetworkStatus } from "@/components/network-status";

export default function LoginPage() {
  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body =
        mode === "phone"
          ? { phone: identifier.trim(), password }
          : { email: identifier.trim(), password };
      const response = await apiRequest<{
        access_token?: string;
        token?: string;
        user?: { role?: string };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const token = response.access_token ?? response.token;
      if (!token) throw new Error("The server did not return an access token.");
      setAccessToken(token);
      const role = response.user?.role?.toLowerCase();
      router.push(role === "admin" ? "/admin" : role?.includes("partner") ? "/partner" : "/home");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="grid min-h-dvh bg-[#f4f6f1] lg:grid-cols-[1fr_480px]">
      <NetworkStatus />
      <section className="hidden overflow-hidden bg-[#dff0d5] p-12 lg:flex lg:flex-col">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1d6f3b] text-xl font-black text-white">M</span>
          <span className="text-2xl font-black text-[#18351f]">Minto</span>
        </Link>
        <div className="mt-auto text-center text-[220px] leading-none">🥬</div>
        <h1 className="mt-8 max-w-xl text-5xl font-black leading-tight text-[#18351f]">
          Fresh essentials, delivered fast.
        </h1>
      </section>
      <section className="flex items-center px-5 py-8 sm:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="mb-12 flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1d6f3b] text-lg font-black text-white">M</span>
            <span className="text-xl font-black text-[#18351f]">Minto</span>
          </Link>
          <p className="text-sm font-bold text-[#1d6f3b]">Welcome back</p>
          <h1 className="mt-2 text-3xl font-black text-[#18351f]">Sign in to Minto</h1>
          <p className="mt-2 text-sm text-[#788178]">Continue to your customer or partner account.</p>
          <div className="mt-8 grid grid-cols-2 rounded-xl bg-[#e9ede5] p-1">
            <button onClick={() => setMode("phone")} className={`h-10 rounded-lg text-sm font-bold ${mode === "phone" ? "bg-white shadow-sm" : "text-[#778078]"}`}>
              <Phone size={16} className="mr-2 inline" /> Phone
            </button>
            <button onClick={() => setMode("email")} className={`h-10 rounded-lg text-sm font-bold ${mode === "email" ? "bg-white shadow-sm" : "text-[#778078]"}`}>
              <Mail size={16} className="mr-2 inline" /> Email
            </button>
          </div>
          <form className="mt-5 space-y-4" onSubmit={submit}>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#465248]">{mode === "phone" ? "Phone number" : "Email address"}</span>
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                required
                className="h-12 w-full rounded-xl border border-[#dce3d7] bg-white px-4 text-base outline-none focus:border-[#1d6f3b] focus:ring-2 focus:ring-[#dcead6]"
                placeholder={mode === "phone" ? "+91 98765 43210" : "name@example.com"}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-[#465248]">Password</span>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#879087]" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" className="h-12 w-full rounded-xl border border-[#dce3d7] bg-white pl-11 pr-4 text-base outline-none focus:border-[#1d6f3b] focus:ring-2 focus:ring-[#dcead6]" placeholder="Enter password" />
              </div>
            </label>
            {error && <p role="alert" className="rounded-xl border border-[#eadfd7] bg-[#fffaf7] p-3 text-sm text-[#9d5a50]">{error}</p>}
            <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d6f3b] text-sm font-bold text-white disabled:opacity-60">
              {loading ? "Signing in..." : "Sign in"} <ArrowRight size={18} />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-[#788178]">
            New to Minto? <Link href="/register" className="font-bold text-[#1d6f3b]">Create account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
