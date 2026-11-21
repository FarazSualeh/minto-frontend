"use client";

import {
  ArrowRight,
  Clock3,
  Plus,
  ShieldCheck,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { MobileHeader } from "@/components/mobile-header";
import { NetworkStatus } from "@/components/network-status";
import { apiRequest } from "@/lib/api";
import {
  ApiCatalogCategory,
  ApiCatalogProduct,
  Category,
  Product,
  normalizeCategory,
  normalizeProduct,
  unwrapApiCollection,
} from "@/lib/catalog";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadCatalog() {
      setLoading(true);
      setError("");
      try {
        const [categoryData, productData] = await Promise.all([
          apiRequest<ApiCatalogCategory[] | { items: ApiCatalogCategory[] }>(
            "/api/categories",
          ),
          apiRequest<ApiCatalogProduct[] | { items: ApiCatalogProduct[] }>(
            "/api/products",
          ),
        ]);
        if (!active) return;
        setCategories(
          unwrapApiCollection(categoryData).map(normalizeCategory),
        );
        setProducts(unwrapApiCollection(productData).map(normalizeProduct));
      } catch (caught) {
        if (!active) return;
        setError(
          caught instanceof Error
            ? caught.message
            : "We could not load the catalog.",
        );
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadCatalog();
    return () => {
      active = false;
    };
  }, [retry]);

  return (
    <div className="min-h-screen bg-[#f7f8f5] pb-24 md:pb-10">
      <NetworkStatus />
      <MobileHeader />
      <main className="mx-auto max-w-7xl px-4 py-5 md:px-8">
        <section className="relative overflow-hidden rounded-[22px] bg-[#dff0d5] px-5 py-6 sm:px-8 md:min-h-72 md:py-10">
          <div className="relative z-10 max-w-md">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4c744f]">
              <Clock3 size={15} />
              Delivery in 15 minutes
            </div>
            <h1 className="text-3xl font-black leading-[1.08] text-[#18351f] sm:text-4xl">
              Fresh groceries,
              <br />
              right to your door
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5e6d60]">
              Your neighbourhood essentials, delivered fast across Chiplun.
            </p>
            <button className="mt-5 flex h-12 items-center gap-2 rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,111,59,.18)]">
              Shop now <ArrowRight size={18} />
            </button>
          </div>
          <div className="absolute bottom-0 right-0 h-44 w-44 overflow-hidden rounded-tl-[80px] sm:h-52 sm:w-52 md:h-72 md:w-[45%] md:rounded-tl-[160px]">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=90"
              alt="Fresh groceries"
              fill
              sizes="(max-width: 768px) 176px, 45vw"
              className="object-cover"
            />
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8b958c]">Explore</p>
              <h2 className="mt-1 text-xl font-black text-[#18351f]">Shop by category</h2>
            </div>
            <Link href="/categories" className="text-sm font-bold text-[#1d6f3b]">View all</Link>
          </div>
          {loading ? (
            <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-w-28 animate-pulse rounded-2xl bg-white p-3 md:min-w-0">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-[#edf0e8]" />
                  <div className="mx-auto mt-3 h-3 w-16 rounded bg-[#edf0e8]" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[#eadfd7] bg-white p-5 text-sm">
              <p className="font-bold text-[#9d5a50]">Catalog unavailable</p>
              <p className="mt-1 text-[#92998f]">{error}</p>
              <button
                onClick={() => setRetry((value) => value + 1)}
                className="mt-4 h-10 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white"
              >
                Retry
              </button>
            </div>
          ) : categories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dfe5da] bg-white p-8 text-center text-sm text-[#92998f]">
              No categories are available yet.
            </div>
          ) : (
          <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
            {categories.map((category) => (
              <button
                key={category.name}
                className="min-w-28 rounded-2xl border border-[#edf0e8] bg-white p-3 text-center shadow-[0_3px_14px_rgba(41,64,45,.04)] md:min-w-0"
              >
                <span className="relative mx-auto block h-16 w-16 overflow-hidden rounded-2xl">
                  <Image src={category.image} alt={category.name} fill sizes="64px" className="object-cover" />
                </span>
                <span className="mt-2 block whitespace-nowrap text-xs font-bold text-[#424e44]">
                  {category.shortName}
                </span>
              </button>
            ))}
          </div>
          )}
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#e89a34]">Popular nearby</p>
              <h2 className="mt-1 text-xl font-black text-[#18351f]">Daily essentials</h2>
            </div>
            <Link href="/search" className="text-sm font-bold text-[#1d6f3b]">See all</Link>
          </div>
          {loading ? (
            <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-5 md:px-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="min-w-[168px] animate-pulse rounded-2xl border border-[#e9ece3] bg-white md:min-w-0">
                  <div className="h-36 rounded-t-2xl bg-[#edf0e8]" />
                  <div className="p-3"><div className="h-4 w-24 rounded bg-[#edf0e8]" /><div className="mt-3 h-3 w-16 rounded bg-[#edf0e8]" /></div>
                </div>
              ))}
            </div>
          ) : error ? null : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#dfe5da] bg-white p-8 text-center text-sm text-[#92998f]">
              No products are available in this area yet.
            </div>
          ) : (
          <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
            {products.map((product) => (
              <article
                key={product.name}
                className="min-w-[168px] overflow-hidden rounded-2xl border border-[#e9ece3] bg-white md:min-w-0"
              >
                <div className="relative h-36 overflow-hidden bg-[#fafbf8]">
                  {product.tag && (
                    <span className="absolute left-2 top-2 rounded-md bg-[#ef9d32] px-2 py-1 text-[9px] font-black text-white">
                      {product.tag}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="168px"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="truncate text-sm font-bold text-[#26342a]">{product.name}</h3>
                  <p className="mt-1 text-xs text-[#92998f]">{product.weight}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-base font-black text-[#26342a]">₹{product.price}</span>
                      {product.old && (
                        <span className="ml-1 text-xs text-[#a0a69f] line-through">₹{product.old}</span>
                      )}
                    </div>
                    <button className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce8d7] bg-[#f6faf4] text-[#1d6f3b]">
                      <Plus size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          )}
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl bg-[#fff4df] p-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#ef9d32]">
              <ShieldCheck size={22} />
            </span>
            <div>
              <h3 className="text-sm font-bold">Freshness guaranteed</h3>
              <p className="mt-1 text-xs text-[#7d806f]">Quality checked before every delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-[#edf5e9] p-4">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#1d6f3b]">
              <Star size={22} />
            </span>
            <div>
              <h3 className="text-sm font-bold">Local favourites</h3>
              <p className="mt-1 text-xs text-[#7d806f]">Products sourced around Chiplun</p>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
}
