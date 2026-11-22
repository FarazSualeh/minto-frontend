"use client";

import { ArrowLeft, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useEffect } from "react";
import { NetworkStatus } from "@/components/network-status";
import { apiRequest } from "@/lib/api";
import {
  ApiCatalogProduct,
  Product,
  normalizeProduct,
  unwrapApiCollection,
} from "@/lib/catalog";

function SearchResults() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const category = searchParams.get("category") ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    const timeout = window.setTimeout(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("search", query.trim());
        if (category) params.set("category", category);
        const suffix = params.toString();
        const data = await apiRequest<
          ApiCatalogProduct[] | { items: ApiCatalogProduct[] }
        >(`/api/products${suffix ? `?${suffix}` : ""}`);
        if (active) {
          setProducts(unwrapApiCollection(data).map(normalizeProduct));
        }
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Could not search products.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    }, 350);
    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [query, category, retry]);

  const normalizedQuery = query.trim().toLowerCase();

  return (
    <main className="mx-auto min-h-dvh max-w-5xl px-4 pb-24 pt-4 md:px-8">
      <NetworkStatus />
      <header className="flex items-center gap-3">
        <Link href="/" aria-label="Back" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#e3e7de]">
          <ArrowLeft size={20} />
        </Link>
        <label className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-[#f0f3ed] px-4">
          <Search size={18} className="text-[#7b847a]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
            placeholder="Search groceries"
            autoFocus
          />
        </label>
      </header>

      <section className="mt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-[#92998f]">
          {normalizedQuery ? `Results for "${query}"` : category || "All products"}
        </p>
        {loading ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-[#e8ebe3] bg-white">
                <div className="h-36 rounded-t-2xl bg-[#edf0e8]" />
                <div className="p-3"><div className="h-4 w-24 rounded bg-[#edf0e8]" /></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-5 rounded-2xl border border-[#eadfd7] bg-white p-5 text-sm">
            <p className="font-bold text-[#9d5a50]">Search unavailable</p>
            <p className="mt-1 text-[#92998f]">{error}</p>
            <button onClick={() => setRetry((value) => value + 1)} className="mt-4 h-10 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white">Retry</button>
          </div>
        ) : products.length ? (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {products.map((product) => (
              <article key={product.name} className="overflow-hidden rounded-2xl border border-[#e8ebe3] bg-white">
                <div className="relative h-36">
                  {product.tag && <span className="absolute left-2 top-2 z-10 rounded-md bg-[#ef9d32] px-2 py-1 text-[9px] font-black text-white">{product.tag}</span>}
                  <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="p-3">
                  <h2 className="truncate text-sm font-black text-[#26342a]">{product.name}</h2>
                  <p className="mt-1 text-xs text-[#92998f]">{product.weight}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <strong className="text-sm">₹{product.price}</strong>
                    <button aria-label={`Add ${product.name}`} className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce8d7] bg-[#f6faf4] text-[#1d6f3b]"><Plus size={18} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-[#dfe5da] bg-white px-5 py-12 text-center">
            <span className="text-4xl">🔎</span>
            <h2 className="mt-4 font-black text-[#26342a]">No products found</h2>
            <p className="mt-2 text-sm text-[#92998f]">Try milk, banana, tomato, eggs, or bread.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="min-h-dvh bg-[#f7f8f5]" />}>
      <SearchResults />
    </Suspense>
  );
}
