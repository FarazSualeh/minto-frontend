"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { NetworkStatus } from "@/components/network-status";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, phone: phone.trim(), password, role: "customer" }),
      });
      router.push("/login");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Registration failed.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-5 py-7 sm:justify-center">
      <NetworkStatus />
      <Link href="/" className="mb-10 flex items-center gap-3 sm:mb-8">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1d6f3b] text-lg font-black text-white">M</span>
        <span className="text-xl font-black text-[#18351f]">Minto</span>
      </Link>
      <p className="text-sm font-bold text-[#1d6f3b]">Create account</p>
      <h1 className="mt-2 text-3xl font-black text-[#18351f]">Join Minto</h1>
      <form className="mt-7 space-y-4" onSubmit={submit}>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#465248]">Full name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} required className="h-12 w-full rounded-xl border border-[#dce3d7] bg-white px-4 text-base outline-none focus:border-[#1d6f3b]" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#465248]">Phone number</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} required className="h-12 w-full rounded-xl border border-[#dce3d7] bg-white px-4 text-base outline-none focus:border-[#1d6f3b]" placeholder="+91 98765 43210" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-[#465248]">Password</span>
          <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" className="h-12 w-full rounded-xl border border-[#dce3d7] bg-white px-4 text-base outline-none focus:border-[#1d6f3b]" placeholder="Create password" />
        </label>
        {error && <p role="alert" className="rounded-xl border border-[#eadfd7] bg-[#fffaf7] p-3 text-sm text-[#9d5a50]">{error}</p>}
        <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1d6f3b] text-sm font-bold text-white disabled:opacity-60">
          {loading ? "Creating account..." : "Continue"} <ArrowRight size={18} />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[#788178]">
        Already have an account? <Link href="/login" className="font-bold text-[#1d6f3b]">Sign in</Link>
      </p>
    </main>
  );
}
