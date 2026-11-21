"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NetworkStatus } from "@/components/network-status";
import { apiRequest } from "@/lib/api";
import {
  ApiCatalogCategory,
  Category,
  normalizeCategory,
  unwrapApiCollection,
} from "@/lib/catalog";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await apiRequest<
          ApiCatalogCategory[] | { items: ApiCatalogCategory[] }
        >("/api/categories");
        if (active) {
          setCategories(unwrapApiCollection(data).map(normalizeCategory));
        }
      } catch (caught) {
        if (active) {
          setError(caught instanceof Error ? caught.message : "Could not load categories.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [retry]);

  return (
    <main className="mx-auto min-h-dvh max-w-5xl px-4 pb-24 pt-4">
      <NetworkStatus />
      <header className="flex h-12 items-center gap-3">
        <Link href="/" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">Categories</h1>
      </header>
      {loading ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-2xl border border-[#e8ebe3] bg-white p-3">
              <div className="h-24 rounded-xl bg-[#edf0e8]" />
              <div className="mt-3 h-4 w-28 rounded bg-[#edf0e8]" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="mt-5 rounded-2xl border border-[#eadfd7] bg-white p-5 text-sm">
          <p className="font-bold text-[#9d5a50]">Categories unavailable</p>
          <p className="mt-1 text-[#92998f]">{error}</p>
          <button onClick={() => setRetry((value) => value + 1)} className="mt-4 h-10 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white">Retry</button>
        </div>
      ) : categories.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-[#dfe5da] bg-white p-10 text-center text-sm text-[#92998f]">No categories are available yet.</div>
      ) : (
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/search?category=${encodeURIComponent(category.name)}`}
            className="rounded-2xl border border-[#e8ebe3] bg-white p-3 text-left"
          >
            <span className="relative block h-24 overflow-hidden rounded-xl">
              <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover" />
            </span>
            <h2 className="mt-3 text-sm font-black text-[#26342a]">{category.name}</h2>
            <p className="mt-1 text-xs text-[#92998f]">Browse essentials</p>
          </Link>
        ))}
      </div>
      )}
    </main>
  );
}
