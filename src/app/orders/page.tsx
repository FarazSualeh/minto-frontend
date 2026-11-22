"use client";

import { ArrowLeft, ChevronRight, Clock3, PackageCheck, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { Order } from "@/lib/types";

function unwrapOrders(payload: unknown) {
  if (Array.isArray(payload)) return payload as Order[];
  if (payload && typeof payload === "object") {
    const record = payload as { items?: Order[]; data?: Order[]; results?: Order[] };
    return record.items ?? record.data ?? record.results ?? [];
  }
  return [];
}

const statusLabels: Record<string, string> = {
  PENDING_SHOP_CONFIRMATION: "Awaiting shop",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  READY_FOR_PICKUP: "Ready for pickup",
  PICKED_UP: "Picked up",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const payload = await apiRequest<unknown>("/api/orders");
        if (active) setOrders(unwrapOrders(payload));
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load orders.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [retry]);

  async function cancelOrder(orderId: number) {
    setError("");
    try {
      await apiRequest(`/api/orders/${orderId}/cancel`, { method: "POST", body: "{}" });
      setRetry((value) => value + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not cancel the order.");
    }
  }

  return (
    <main className="mx-auto min-h-dvh max-w-2xl px-4 pb-24 pt-4">
      <header className="flex h-12 items-center gap-3">
        <Link href="/account" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e3e7de]"><ArrowLeft size={20} /></Link>
        <h1 className="text-lg font-black text-[#18351f]">My orders</h1>
      </header>
      {loading ? (
        <div className="mt-5 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-2xl bg-white" />)}
        </div>
      ) : error ? (
        <div className="mt-5 rounded-2xl border border-[#eadfd7] bg-white p-5">
          <p className="font-bold text-[#9d5a50]">Orders unavailable</p>
          <p className="mt-1 text-sm text-[#92998f]">{error}</p>
          <button onClick={() => setRetry((value) => value + 1)} className="mt-4 flex h-10 items-center gap-2 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white"><RefreshCw size={14} /> Retry</button>
        </div>
      ) : orders.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-5xl">📦</p>
          <h2 className="mt-5 font-black text-[#26342a]">No orders yet</h2>
          <Link href="/home" className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#1d6f3b] px-5 text-sm font-bold text-white">Start shopping</Link>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {orders.map((order) => {
            const delivered = order.status === "DELIVERED";
            const cancellable = ["PENDING_SHOP_CONFIRMATION", "ACCEPTED"].includes(order.status);
            return (
              <article key={order.id} className="rounded-2xl border border-[#e8ebe3] bg-white p-4">
                <div className="flex items-center">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl ${delivered ? "bg-[#edf7e8] text-[#3e7950]" : "bg-[#fff1dc] text-[#a86c1d]"}`}>
                    {delivered ? <PackageCheck size={20} /> : <Clock3 size={20} />}
                  </span>
                  <div className="ml-3">
                    <h2 className="text-sm font-black text-[#26342a]">{order.order_number ?? `#MT${order.id}`}</h2>
                    <p className="mt-1 text-xs text-[#92998f]">{statusLabels[order.status] ?? order.status}</p>
                  </div>
                  <ChevronRight size={18} className="ml-auto text-[#abb2aa]" />
                </div>
                {order.status_history?.length ? (
                  <div className="mt-4 border-t border-[#edf0e9] pt-3">
                    {order.status_history.map((history, index) => (
                      <div key={`${history.status}-${index}`} className="flex items-center gap-2 py-1 text-xs">
                        <span className="h-2 w-2 rounded-full bg-[#1d6f3b]" />
                        <span className="font-bold text-[#26342a]">{statusLabels[history.status] ?? history.status}</span>
                        <time className="ml-auto text-[#92998f]">{history.changed_at}</time>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-4 flex items-center border-t border-[#edf0e9] pt-3">
                  {cancellable && (
                    <button onClick={() => cancelOrder(order.id)} className="h-9 rounded-lg border border-[#eadfd7] px-3 text-xs font-bold text-[#9d5a50]">Cancel</button>
                  )}
                  <strong className="ml-auto text-sm">₹{order.total}</strong>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
