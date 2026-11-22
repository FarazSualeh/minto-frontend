"use client";

import { Bell, CheckCircle2, MapPin, Navigation, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

type DeliveryOrder = {
  id: number;
  order_number?: string;
  status: string;
  delivery_address?: { line1: string; city: string };
  total: number;
};

export default function DeliveryPage() {
  const [orders, setOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const payload = await apiRequest<DeliveryOrder[] | { items: DeliveryOrder[] }>("/api/delivery/orders");
      setOrders(Array.isArray(payload) ? payload : payload.items ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load deliveries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    apiRequest<DeliveryOrder[] | { items: DeliveryOrder[] }>("/api/delivery/orders")
      .then((payload) => {
        if (active) setOrders(Array.isArray(payload) ? payload : payload.items ?? []);
      })
      .catch((caught) => {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load deliveries.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function advance(orderId: number) {
    try {
      await apiRequest(`/api/delivery/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: "OUT_FOR_DELIVERY" }),
      });
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update delivery.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#f5f7f2] pb-20">
      <header className="flex h-16 items-center border-b border-[#e5e9df] bg-white px-4">
        <div>
          <p className="text-xs text-[#92998f]">Minto delivery</p>
          <h1 className="text-lg font-black text-[#18351f]">Active deliveries</h1>
        </div>
        <button className="ml-auto grid h-10 w-10 place-items-center rounded-xl border border-[#e5e9df]"><Bell size={19} /></button>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-5">
        {loading ? (
          <div className="space-y-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-2xl bg-white" />)}</div>
        ) : error ? (
          <div className="rounded-2xl border border-[#eadfd7] bg-white p-5">
            <p className="font-bold text-[#9d5a50]">Deliveries unavailable</p>
            <p className="mt-1 text-sm text-[#92998f]">{error}</p>
            <button onClick={load} className="mt-4 h-10 rounded-xl bg-[#1d6f3b] px-4 text-xs font-bold text-white">Retry</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-16 text-center"><CheckCircle2 className="mx-auto text-[#1d6f3b]" size={42} /><h2 className="mt-4 font-black">No active deliveries</h2></div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-[#e5e9df] bg-white p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf5e9] text-[#1d6f3b]"><Package size={20} /></span>
                  <div>
                    <h2 className="font-black text-[#26342a]">{order.order_number ?? `#MT${order.id}`}</h2>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#92998f]"><MapPin size={13} /> {order.delivery_address?.line1 ?? "Address pending"}, {order.delivery_address?.city ?? "Chiplun"}</p>
                  </div>
                  <strong className="ml-auto text-sm">₹{order.total}</strong>
                </div>
                <button onClick={() => advance(order.id)} className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1d6f3b] text-xs font-bold text-white"><Navigation size={16} /> Start delivery</button>
              </article>
            ))}
          </div>
        )}
      </div>
      <nav className="fixed inset-x-0 bottom-0 grid h-16 grid-cols-2 border-t border-[#e5e9df] bg-white">
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#1d6f3b]"><Navigation size={19} />Deliveries</button>
        <button className="flex flex-col items-center justify-center gap-1 text-[10px] font-bold text-[#92998f]"><Package size={19} />History</button>
      </nav>
    </main>
  );
}
