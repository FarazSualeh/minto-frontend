import { Bell, Box, ChevronRight, Clock3, PackageCheck, ShoppingBag, Store, UserRound } from "lucide-react";

const orders = [
  { id: "#MT2481", customer: "Sahil R.", items: 4, total: "₹286", status: "New", time: "2 min", accent: "bg-[#fff1dc] text-[#a86c1d]" },
  { id: "#MT2480", customer: "Priya P.", items: 7, total: "₹492", status: "Preparing", time: "8 min", accent: "bg-[#eaf3ff] text-[#446fa1]" },
  { id: "#MT2479", customer: "Nikhil S.", items: 3, total: "₹174", status: "Ready", time: "12 min", accent: "bg-[#edf7e8] text-[#3e7950]" },
];

export default function PartnerPage() {
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
              {orders.map((order) => (
                <article key={order.id} className="rounded-2xl border border-[#e5e9df] bg-white p-4">
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center gap-2"><h3 className="font-black text-[#26342a]">{order.id}</h3><span className={`rounded-md px-2 py-1 text-[10px] font-black ${order.accent}`}>{order.status}</span></div>
                      <p className="mt-1 text-xs text-[#92998f]">{order.customer} · {order.items} items</p>
                    </div>
                    <div className="ml-auto text-right"><p className="font-black text-[#26342a]">{order.total}</p><p className="mt-1 text-xs text-[#92998f]">{order.time} ago</p></div>
                    <ChevronRight size={18} className="ml-3 text-[#abb2aa]" />
                  </div>
                  {order.status === "New" && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button className="h-10 rounded-xl border border-[#e5e9df] text-xs font-bold text-[#9d5a50]">Reject</button>
                      <button className="h-10 rounded-xl bg-[#1d6f3b] text-xs font-bold text-white">Accept order</button>
                    </div>
                  )}
                  {order.status !== "New" && (
                    <button className="mt-4 h-10 w-full rounded-xl border border-[#dce8d7] bg-[#f6faf4] text-xs font-bold text-[#1d6f3b]">
                      {order.status === "Preparing" ? "Mark ready for pickup" : "View packing details"}
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
