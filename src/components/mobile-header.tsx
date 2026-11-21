"use client";

import { MapPin, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function MobileHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(`/search${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#e7eadf] bg-white/95 backdrop-blur md:border-0">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
        <Link href="/home" className="mr-auto flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1d6f3b] text-lg font-black text-white">
            M
          </span>
          <span className="hidden text-xl font-black tracking-tight text-[#18351f] sm:block">
            Minto
          </span>
        </Link>
        <form onSubmit={submit} className="hidden h-11 min-w-64 items-center gap-2 rounded-xl border border-[#dde3d6] px-3 md:flex">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7b847a]"
            placeholder="Search products"
            aria-label="Search products"
          />
        </form>
        <button className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#4e5b50] lg:flex">
          <MapPin size={18} className="text-[#1d6f3b]" />
          Chiplun
        </button>
        <Link
          href="/cart"
          aria-label="Cart"
          className="relative grid h-11 w-11 place-items-center rounded-xl bg-[#edf5e9] text-[#1d6f3b]"
        >
          <ShoppingBag size={21} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#ef9d32] px-1 text-[10px] font-bold text-white">
            3
          </span>
        </Link>
      </div>
      <form onSubmit={submit} className="px-4 pb-3 md:hidden">
        <div className="flex h-11 w-full items-center gap-2 rounded-xl bg-[#f2f4ef] px-4">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7b847a]"
            placeholder="Search for groceries"
            aria-label="Search for groceries"
          />
        </div>
      </form>
    </header>
  );
}
