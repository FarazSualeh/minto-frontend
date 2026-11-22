"use client";

import { ArrowLeft, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { Address } from "@/lib/types";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("Chiplun");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const payload = await apiRequest<Address[] | { items: Address[]; addresses: Address[] }>("/api/addresses");
      setAddresses(Array.isArray(payload) ? payload : payload.items ?? payload.addresses ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load addresses.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    apiRequest<Address[] | { items: Address[]; addresses: Address[] }>("/api/addresses")
      .then((payload) => {
        if (active) setAddresses(Array.isArray(payload) ? payload : payload.items ?? payload.addresses ?? []);
      })
      .catch((caught) => {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load addresses.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function addAddress(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await apiRequest("/api/addresses", {
        method: "POST",
        body: JSON.stringify({ line1, city, state: "Maharashtra" }),
      });
      setLine1("");
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not add address.");
    }
  }

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <header className="flex h-12 items-center gap-3">
        <Link href="/account" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">Saved addresses</h1>
      </header>
      {loading ? (
        <div className="mt-5 h-28 animate-pulse rounded-2xl bg-white" />
      ) : error ? (
        <div className="mt-5 rounded-2xl border border-[#eadfd7] bg-white p-5">
          <p className="font-bold text-[#9d5a50]">Addresses unavailable</p>
          <p className="mt-1 text-sm text-[#92998f]">{error}</p>
          <button onClick={load} className="mt-4 h-10 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white">Retry</button>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {addresses.length === 0 && <p className="rounded-2xl border border-dashed border-[#dfe5da] bg-white p-8 text-center text-sm text-[#92998f]">No saved addresses yet.</p>}
          {addresses.map((address) => (
            <article key={address.id} className="flex items-start gap-3 rounded-2xl border border-[#e8ebe3] bg-white p-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#edf5e9] text-[#1d6f3b]"><MapPin size={18} /></span>
              <div><h2 className="text-sm font-black">{address.label ?? "Delivery address"}</h2><p className="mt-1 text-xs text-[#92998f]">{address.line1}, {address.city}</p></div>
            </article>
          ))}
          <form onSubmit={addAddress} className="rounded-2xl border border-[#e8ebe3] bg-white p-4">
            <h2 className="flex items-center gap-2 font-black"><Plus size={18} className="text-[#1d6f3b]" /> Add address</h2>
            <input value={line1} onChange={(event) => setLine1(event.target.value)} required placeholder="Address line" className="mt-4 h-12 w-full rounded-xl border border-[#dce3d7] px-4 text-sm outline-none" />
            <input value={city} onChange={(event) => setCity(event.target.value)} required placeholder="City" className="mt-3 h-12 w-full rounded-xl border border-[#dce3d7] px-4 text-sm outline-none" />
            <button className="mt-3 h-11 w-full rounded-xl bg-[#1d6f3b] text-sm font-bold text-white">Save address</button>
          </form>
        </div>
      )}
    </main>
  );
}
