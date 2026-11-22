"use client";

import { Bell, Box, ChevronRight, Clock3, PackageCheck, ShoppingBag, Store, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { Order } from "@/lib/types";

export default function PartnerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const payload = await apiRequest<Order[] | { items: Order[] } | { data: Order[] }>("/api/shop/orders");
      setOrders(Array.isArray(payload) ? payload : "items" in payload ? payload.items : payload.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load shop orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    apiRequest<Order[] | { items: Order[] } | { data: Order[] }>("/api/shop/orders")
      .then((payload) => {
        if (!active) return;
        setOrders(Array.isArray(payload) ? payload : "items" in payload ? payload.items : payload.data);
      })
      .catch((caught) => {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load shop orders.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function accept(orderId: number) {
    try {
      await apiRequest(`/api/shop/orders/${orderId}/accept`, { method: "PATCH", body: "{}" });
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not accept order.");
    }
  }

  async function reject(orderId: number) {
    const reason = window.prompt("Reason for rejecting this order:");
    if (!reason?.trim()) return;
    try {
      await apiRequest(`/api/shop/orders/${orderId}/reject`, {
        method: "PATCH",
        body: JSON.stringify({ reason: reason.trim() }),
      });
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not reject order.");
    }
  }

  async function advance(orderId: number, status: "PREPARING" | "READY_FOR_PICKUP") {
    try {
      await apiRequest(`/api/shop/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update order.");
    }
  }
  return (
    <main className="min-h-dvh bg-[#f5f7f2] pb-20 md:pb-0">
      <aside className="hidden w-64 border-r border-[#e5e9df] bg-white p-5 md:fixed md:inset-y-0 md:left-0 md:flex md:flex-col">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1d6f3b] text-lg font-black text-white">M</span>
          <div><p className="font-black text-[#18351f]">Minto</p><p className="text-xs text-[#92998f]">Partner Hub</p></div>
        </div>
        <nav className="mt-8 space-y-2 text-sm font-bold">
          <a className="flex h-11 items-center gap-3 rounded-xl bg-[#edf5e9] px-3 text-[#1d6f3b]"><ShoppingBag size={18} /> Orders</a>
          <a className="flex h-11 items-center gap-3 rounded-xl px-3 text-[#6e786f]"><Box size={18} /> Catalog</a>
          <a className="flex h-11 items-center gap-3 rounded-xl px-3 text-[#6e786f]"><Store size={18} /> Store</a>
        </nav>
        <button className="mt-auto flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold text-[#6e786f]"><UserRound size={18} /> Profile</button>
      </aside>
      <div className="md:ml-64">
        <header className="flex h-16 items-center border-b border-[#e5e9df] bg-white px-4 md:px-8">
          <div><p className="text-xs text-[#92998f]">Good morning</p><h1 className="text-lg font-black text-[#18351f]">Chiplun Store</h1></div>
          <button className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-[#e5e9df]"><Bell size={19} /></button>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-8">
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Today", "₹8,420", ShoppingBag],
              ["Orders", "28", PackageCheck],
              ["Avg. time", "11 min", Clock3],
              ["Ready", "3", Store],
            ].map(([label, value, Icon]) => {
              const MetricIcon = Icon as typeof ShoppingBag;
              return (
                <article key={String(label)} className="rounded-2xl border border-[#e5e9df] bg-white p-4">
                  <MetricIcon size={18} className="text-[#1d6f3b]" />
                  <p className="mt-3 text-xl font-black text-[#26342a]">{String(value)}</p>
                  <p className="mt-1 text-xs text-[#92998f]">{String(label)}</p>
                </article>
              );
            })}
          </section>
          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#18351f]">Active orders</h2>
              <button className="text-sm font-bold text-[#1d6f3b]">View history</button>
            </div>
            <div className="space-y-3">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-28 animate-pulse rounded-2xl bg-white" />)
              ) : error ? (
                <div className="rounded-2xl border border-[#eadfd7] bg-white p-5">
                  <p className="font-bold text-[#9d5a50]">Orders unavailable</p>
                  <p className="mt-1 text-sm text-[#92998f]">{error}</p>
                  <button onClick={load} className="mt-4 h-10 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white">Retry</button>
                </div>
              ) : orders.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#dfe5da] bg-white p-8 text-center text-sm text-[#92998f]">No active shop orders.</div>
              ) : orders.map((order) => (
                <article key={order.id} className="rounded-2xl border border-[#e5e9df] bg-white p-4">
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center gap-2"><h3 className="font-black text-[#26342a]">{order.order_number ?? `#MT${order.id}`}</h3><span className="rounded-md bg-[#fff1dc] px-2 py-1 text-[10px] font-black text-[#a86c1d]">{order.status}</span></div>
                      <p className="mt-1 text-xs text-[#92998f]">{order.items.length} items</p>
                    </div>
                    <div className="ml-auto text-right"><p className="font-black text-[#26342a]">₹{order.total}</p></div>
                    <ChevronRight size={18} className="ml-3 text-[#abb2aa]" />
                  </div>
                  {order.status === "PENDING_SHOP_CONFIRMATION" && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button onClick={() => reject(order.id)} className="h-10 rounded-xl border border-[#e5e9df] text-xs font-bold text-[#9d5a50]">Reject</button>
                      <button onClick={() => accept(order.id)} className="h-10 rounded-xl bg-[#1d6f3b] text-xs font-bold text-white">Accept order</button>
                    </div>
                  )}
                  {order.status === "ACCEPTED" && (
                    <button onClick={() => advance(order.id, "PREPARING")} className="mt-4 h-10 w-full rounded-xl border border-[#dce8d7] bg-[#f6faf4] text-xs font-bold text-[#1d6f3b]">
                      Start preparing
                    </button>
                  )}
                  {order.status === "PREPARING" && (
                    <button onClick={() => advance(order.id, "READY_FOR_PICKUP")} className="mt-4 h-10 w-full rounded-xl border border-[#dce8d7] bg-[#f6faf4] text-xs font-bold text-[#1d6f3b]">
                      Mark ready for pickup
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-16 grid-cols-3 border-t border-[#e5e9df] bg-white md:hidden">
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#1d6f3b]"><ShoppingBag size={19} />Orders</button>
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#92998f]"><Box size={19} />Catalog</button>
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#92998f]"><Store size={19} />Store</button>
      </nav>
    </main>
  );
}
